import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography, TextField } from '@material-ui/core';
import ReservationTable from './ReservationTable'; // Assuming you have imported the ReservationTable component

const Reservations = ({ onReservationSelect, destinationId }) => {
    const [reservations, setReservations] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchReservations();
    }, [destinationId]); // Fetch reservations whenever destinationId changes

    const fetchReservations = async () => {
        try {
            const token = sessionStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/reservation/${destinationId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`, // Include JWT token in the headers
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const data = await response.json();
                setReservations(data.reservations);
            } else {
                throw new Error('Failed to fetch reservations');
            }
        } catch (error) {
            console.error('Error fetching reservations:', error);
            // Handle error scenario
        }
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Filter reservations based on search query
    const filteredReservations = reservations.filter(reservation =>
        reservation.destination_id.toString().includes(searchQuery.toLowerCase())
    );

    return (
        <Grid>
            <Grid item xs={10} md={8}>
                <Paper elevation={3} style={{ padding: '20px', marginTop: '20px', width: '1200px' }}>
                    <Typography variant="h5" gutterBottom align="center">
                        <b>Reservations</b>
                    </Typography>
                    <TextField
                        id="search"
                        label="Search reservations"
                        type="search"
                        fullWidth
                        variant="outlined"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        style={{ marginBottom: '20px' }}
                    />
                    <ReservationTable reservations={filteredReservations} onReservationSelect={onReservationSelect} />
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Reservations;
