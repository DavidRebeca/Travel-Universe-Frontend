import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Grid, Paper, Typography, TextField, Button, Box, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import DateRangeIcon from '@material-ui/icons/DateRange';
import Destinations from './destinations';
import NavigationBar from "../navigation-bar";

const DatePickerPage = ({ filterDiscount }) => {
    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [warningMessage, setWarningMessage] = useState('');
    const [redirectToLogin, setRedirectToLogin] = useState(false);
    const [reservationSuccess, setReservationSuccess] = useState(false);
    const [reservationFailed, setReservationFailed] = useState(false);
    const [availableDestinations, setAvailableDestinations] = useState([]);
    const [allDestinations, setAllDestinations] = useState([]); // State to hold all destinations

    useEffect(() => {
        const hasAccessedBefore =
            sessionStorage.getItem('accessedBefore') === 'true';
        const roleValid = sessionStorage.getItem('role') === 'client';
        if (!hasAccessedBefore || !roleValid) {
            sessionStorage.setItem('accessedBefore', 'true');
            setRedirectToLogin(true);
        }
        const token = sessionStorage.getItem('token');
        if (!token || !roleValid) {
            setRedirectToLogin(true);
        }
        fetchAllDestinations();
    }, []);

    const handleCheckInDateChange = (date) => {
        setCheckInDate(date);
        checkDatesValidity(date, checkOutDate);
        if (date && checkOutDate) {
            fetchAvailableDestinations(date, checkOutDate);
        }
    };

    const handleCheckOutDateChange = (date) => {
        setCheckOutDate(date);
        checkDatesValidity(checkInDate, date);
        if (checkInDate && date) {
            fetchAvailableDestinations(checkInDate, date);
        }
    };

    const handleLocationSelect = (location) => {
        setSelectedLocation(location);
    };

    const checkDatesValidity = (checkInDate, checkOutDate) => {
        if (checkInDate && checkOutDate && new Date(checkInDate) >= new Date(checkOutDate)) {
            setWarningMessage('Check-out date must be after check-in date.');
        } else {
            setWarningMessage('');
        }
    };

    const fetchAvailableDestinations = (checkInDate, checkOutDate) => {
        const url = `http://localhost:5000/available_destinations?check_in_date=${checkInDate}&check_out_date=${checkOutDate}`;
        const token = sessionStorage.getItem('token');
        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                setAvailableDestinations(data.available_destinations);
                console.log(data.available_destinations);
            })
            .catch(error => console.error('Error fetching available destinations:', error));
    };
    const fetchAllDestinations = () => {
        const token = sessionStorage.getItem('token');
        fetch('http://localhost:5000/destination', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setAllDestinations(data.destinations);
            })
            .catch(error => console.error('Error fetching destinations:', error));
    };
    const handleReservation = () => {
        if (!checkInDate || !checkOutDate || !selectedLocation) {
            setWarningMessage('Please select check-in date, check-out date, and location.');
            return;
        }

        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        const durationInMilliseconds = checkOut - checkIn;
        const durationInDays = Math.ceil(durationInMilliseconds / (1000 * 60 * 60 * 24));

        const totalPrice = (selectedLocation.price - (selectedLocation.discount * selectedLocation.price / 100)) * durationInDays;

        const reservationData = {
            user_id: sessionStorage.getItem('id'),
            destination_id: selectedLocation.id,
            check_in_date: checkInDate,
            check_out_date: checkOutDate,
            total_price: totalPrice
        };
        const token = sessionStorage.getItem('token');

        fetch('http://localhost:5000/reservation', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reservationData)
        })
            .then(response => {
                if (response.ok) {
                    setReservationSuccess(true);
                } else {
                    setReservationFailed(true);
                }
            })
            .catch(error => {
                console.error('Error creating reservation:', error);
                setReservationFailed(true);
            });
    };

    const handleCloseSuccessDialog = () => {
        setReservationSuccess(false);
        window.location.reload();
    };

    const handleCloseFailedDialog = () => {
        setReservationFailed(false);
    };

    return (
        <div>
            <NavigationBar />
            <div style={{ backgroundColor: '#0594B4', minHeight: '100vh', padding: '20px' }}>
                {redirectToLogin && <Redirect to="/login" />}
                <Grid container justify="center">
                    <Grid item xs={10} md={6}>
                        <Paper elevation={3} style={{ padding: '20px', marginTop: '50px' }}>
                            <Typography variant="h5" gutterBottom align="center">
                                <b>Choose your check-in and check-out dates</b>
                            </Typography>
                            <form>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            id="check-in"
                                            label="Check-in Date"
                                            type="date"
                                            fullWidth
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            value={checkInDate}
                                            onChange={(e) => handleCheckInDateChange(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            id="check-out"
                                            label="Check-out Date"
                                            type="date"
                                            fullWidth
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            value={checkOutDate}
                                            onChange={(e) => handleCheckOutDateChange(e.target.value)}
                                        />
                                    </Grid>
                                </Grid>
                                {warningMessage && (
                                    <Typography variant="body2" color="error" align="center" style={{ marginTop: '10px' }}>
                                        {warningMessage}
                                    </Typography>
                                )}
                            </form>
                        </Paper>
                    </Grid>
                    <Grid item
                          xs={10} md={8}>
                        <Box display="flex" flexDirection="column" alignItems="center">
                            <Destinations
                                onLocationSelect={handleLocationSelect}
                                isDiscountSubmenu={filterDiscount}
                                availableDestinations={checkInDate && checkOutDate ? availableDestinations : allDestinations}
                                validDates={checkInDate && checkOutDate}
                            />

                            {checkInDate && checkOutDate && selectedLocation && !warningMessage && (
                                <Paper elevation={3} style={{ padding: '40px', marginTop: '20px', width: '850px' }}>
                                    <Typography variant="h6" gutterBottom align="center">
                                        <b> Reservation Information</b>
                                    </Typography>
                                    <Typography variant="body1" align="center">
                                        <b> Check-in Date:</b> {checkInDate}
                                    </Typography>
                                    <Typography variant="body1" align="center">
                                        <b> Check-out Date:</b> {checkOutDate}
                                    </Typography>
                                    <Typography variant="body1" align="center">
                                        <b>Destination: </b> {selectedLocation.location}
                                    </Typography>
                                    <Box display="flex" justifyContent="center">
                                        <Button
                                            variant="contained"
                                            style={{
                                                marginTop: '20px',
                                                width: '250px',
                                                backgroundColor: '#04579B',
                                                color: '#FFFFFF',
                                            }}
                                            onClick={handleReservation}
                                        >
                                            <DateRangeIcon /> Reserve
                                        </Button>
                                    </Box>
                                </Paper>
                            )}
                        </Box>
                    </Grid>
                </Grid>
            </div>

            {/* Success Dialog */}
            <Dialog open={reservationSuccess} onClose={handleCloseSuccessDialog}>
                <DialogTitle>Reservation Successful</DialogTitle>
                <DialogContent>
                    <Typography variant="body1" align="center">Your reservation has been successfully created.</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseSuccessDialog} color="primary" autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Failed Dialog */}
            <Dialog open={reservationFailed} onClose={handleCloseFailedDialog}>
                <DialogTitle>Reservation Failed</DialogTitle>
                <DialogContent>
                    <Typography variant="body1" align="center">Failed to create reservation. Please try again later.</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseFailedDialog} color="primary" autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default DatePickerPage;
