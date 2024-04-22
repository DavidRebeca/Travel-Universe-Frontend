import React, { useEffect, useState } from 'react';
import Destinations from './destinations';
import { Grid, IconButton, makeStyles, Modal, Button, Typography } from '@material-ui/core';
import { AddCircleOutline, Edit, Delete } from '@material-ui/icons'; // Import Material-UI icons
import StyleIcon from '@mui/icons-material/Style'; // Import StyleIcon from MUI
import Reservation from './Reservation'; // Import the Reservation component
import UnavailableDatesCalendar from './UnavailableDatesCalendar'; // Import the UnavailableDatesCalendar component
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import AddDestinationForm from './AddDestinationForm';
import EditDestinationForm from './EditDestinationForm';
import { Redirect } from "react-router-dom";
import NavigationBar from "../navigation-bar";
import ReservationChart from './ReservationChart';

const useStyles = makeStyles(theme => ({
    iconButton: {
        backgroundColor: 'white',
        borderRadius: '50%',
        padding: theme.spacing(1),
        '&:hover': {
            backgroundColor: 'white',
        },
    },
    icon: {
        fontSize: '2rem',
        color: '#0594B4',
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: theme.spacing(3),
        outline: 'none',
        borderRadius: '8px',
        textAlign: 'center',
    },
    button: {
        margin: theme.spacing(2),
    },
}));

const AgentPage = () => {

    const classes = useStyles();
    const [openForm, setOpenForm] = useState(false);
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [deleteDoneOpen, setDeleteDoneOpen] = useState(false);
    const [updateDoneOpen, setUpdateDoneOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [editFormOpen, setEditFormOpen] = useState(false);
    const [rowNotSelectedPopup, setRowNotSelectedPopup] = useState(false);
    const [showReservation, setShowReservation] = useState(false);
    const [redirectToLogin, setRedirectToLogin] = useState(false);
    const [destinationId, setDestinationId] = useState(null);
    const [unavailableDates, setUnavailableDates] = useState([]);
    const [reservations, setReservations] = useState([]); // State to store reservations
    const [allDestinations, setAllDestinations] = useState([]); // State to hold all destinations

    useEffect(() => {
        const hasAccessedBefore =
            sessionStorage.getItem('accessedBefore') === 'true';
        const role_valid = sessionStorage.getItem('role') === 'agent';
        if (!hasAccessedBefore) {
            sessionStorage.setItem('accessedBefore', 'true');
            setRedirectToLogin(true); // Set redirectToLogin to true to trigger redirection
        }
        if (!role_valid) {
            setRedirectToLogin(true);
        }
        const token = sessionStorage.getItem('token');
        if (!token) {
            setRedirectToLogin(true); // Set redirectToLogin to true to trigger redirection
        }
        fetchAllDestinations();
        fetchAllDestinations();
    }, []);

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

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await fetch(`http://localhost:5000/reservation/${destinationId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    const reservationsData = data.reservations; // Rename to avoid conflicts
                    setReservations(reservationsData); // Set reservations state
                    const dates = reservationsData.flatMap(reservation => {
                        const checkIn = new Date(reservation.check_in_date);
                        const checkOut = new Date(reservation.check_out_date);
                        const interval = (checkOut - checkIn) / (1000 * 60 * 60 * 24); // interval in days
                        return Array.from({ length: interval }, (_, index) => {
                            const date = new Date(checkIn);
                            date.setDate(date.getDate() + index);
                            return date;
                        });
                    });
                    setUnavailableDates(dates);
                    console.log(dates);
                } else {
                    throw new Error('Failed to fetch reservations');
                }
            } catch (error) {
                console.error('Error fetching reservations:', error);
            }
        };

        if (destinationId) {
            fetchReservations();
        }
    }, [destinationId]);

    const handleOpenForm = () => {
        setOpenForm(true);
    };

    const handleCloseForm = () => {
        setOpenForm(false);
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };

    const handleAdd = (formData) => {
        console.log(formData);
        handleCloseForm();

    };

    const handleEdit = () => {
        if (selectedRow === null) {
            setRowNotSelectedPopup(true);
        } else {
            setEditFormOpen(true);
        }
    };

    const handleEditFormClose = () => {
        setEditFormOpen(false);
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };

    const handleDelete = () => {
        if (selectedRow === null) {
            setRowNotSelectedPopup(true);
        } else {
            setDeleteConfirmationOpen(true);
        }
    };

    const handleDeleteConfirmation = async () => {
        const token = sessionStorage.getItem('token');
        try {
            const response = await fetch(`http://localhost:5000/destination/${selectedRow.id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`, // Include JWT token in the headers
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                handleDeleteDoneClose(); // Close the deletion confirmation modal
                setDeleteDoneOpen(true); // Open the deletion success modal
                setDeleteConfirmationOpen(false); // Close the confirmation modal

            } else {
                throw new Error('Failed to delete destination');
            }
        } catch (error) {
            console.error('Error deleting destination:', error);
            // Handle error scenario
        }
    };

    const handleRowSelect = (row) => {
        setSelectedRow(row);
        setDestinationId(row.id); // Update destinationId when a row is selected
    };
    const handleDeleteDoneClose = () => {
        setDeleteDoneOpen(false);
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };

    const handleUpdateDoneClose = () => {
        setUpdateDoneOpen(false);
    };

    const handleRowNotSelectedPopupClose = () => {
        setRowNotSelectedPopup(false);
    };

    const handleShowReservation = () => {
        if (selectedRow === null) {
            setRowNotSelectedPopup(true);
        }
        else {
            setShowReservation(true);
        }
    };
    const calculateReservationsPerMonth = (reservations) => {
        const reservationsPerMonth = Array(12).fill(0);
        reservations.forEach(reservation => {
            const checkInDate = new Date(reservation.check_in_date);
            const month = checkInDate.getMonth();
            reservationsPerMonth[month]++;
        });

        // Convert the data into an array of objects with 'month' and 'reservations' properties
        const data = reservationsPerMonth.map((count, index) => ({
            month: index + 1, // Month index (adding 1 to match the month number)
            reservations: count // Number of reservations for that month
        }));
        console.log('Chart State:', data); // Log reservations state
        return data;
    };

    return (
        <div><NavigationBar />
            <div style={{ backgroundColor: '#0594B4', minHeight: '100vh' }}>
                {redirectToLogin && <Redirect to="/login" />}
                <Grid container direction="column" alignItems="center">
                    <Grid item xs={12} md={10}>
                        <Destinations onLocationSelect={handleRowSelect} availableDestinations={allDestinations}/>
                    </Grid>
                    <Grid item container justify="center" spacing={2} style={{ marginTop: '20px' }}>
                        <Grid item>
                            <IconButton className={classes.iconButton} onClick={handleOpenForm}>
                                <AddCircleOutline className={classes.icon} />
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <IconButton className={classes.iconButton} onClick={handleEdit}>
                                <Edit className={classes.icon} />
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <IconButton className={classes.iconButton} onClick={handleDelete}>
                                <Delete className={classes.icon} />
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <IconButton className={classes.iconButton} onClick={handleShowReservation}>
                                <StyleIcon className={classes.icon} style={{ fontSize: '2rem' }} />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>

                <AddDestinationForm open={openForm} onClose={handleCloseForm} onAdd={handleAdd} />

                <EditDestinationForm open={editFormOpen} onClose={handleEditFormClose} initialData={selectedRow} />

                <Modal
                    open={deleteConfirmationOpen}
                    onClose={() => setDeleteConfirmationOpen(false)}
                    className={classes.modal}
                >
                    <div className={classes.modalContent}>
                        <Typography variant="h6" gutterBottom>
                            Are you sure you want to delete?
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            onClick={handleDeleteConfirmation}
                        >
                            Yes
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                            onClick={() => setDeleteConfirmationOpen(false)}
                        >
                            No
                        </Button>
                    </div>
                </Modal>

                <Modal
                    open={deleteDoneOpen}
                    onClose={handleDeleteDoneClose}
                    className={classes.modal}
                >
                    <div className={classes.modalContent}>
                        <Typography variant="h6" gutterBottom>
                            Delete done
                        </Typography>
                    </div>
                </Modal>

                <Modal
                    open={rowNotSelectedPopup}
                    onClose={handleRowNotSelectedPopupClose}
                    className={classes.modal}
                >
                    <div className={classes.modalContent}>
                        <Typography variant="h6" gutterBottom>
                            Please select a row first.
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            onClick={handleRowNotSelectedPopupClose}
                        >
                            OK
                        </Button>
                    </div>
                </Modal>

                {/* Display Reservation Component and UnavailableDatesCalendar */}
                {showReservation && (
                    <div>
                        <Grid container direction="column" alignItems="center">
                            <Grid item xs={12}>
                                <div style={{ textAlign: 'center' }}>
                                    <Reservation destinationId={destinationId} />
                                </div>
                            </Grid>
                            <Grid item xs={12} style={{ marginTop: '20px' }}>
                                <div style={{ textAlign: 'center' }}>
                                    <UnavailableDatesCalendar
                                        unavailableDates={unavailableDates}
                                        width={800}
                                        height={500}
                                    />
                                </div>
                            </Grid>
                        </Grid>
                        <Grid  item xs={12} style={{ marginTop: '20px' }}>
                            <div style={{ textAlign: 'center' }}>
                                <ReservationChart data={calculateReservationsPerMonth(reservations)} />
                            </div>
                        </Grid>
                    </div>
                )}

            </div>
        </div>
    );
};

export default AgentPage;