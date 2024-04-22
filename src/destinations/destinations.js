// Destinations.js
import React, { useState } from 'react';
import { Grid, Paper, Typography, TextField, Switch, FormControlLabel } from '@material-ui/core';
import LocationTable from './LocationTable';

const Destinations = ({ onLocationSelect: handleLocationSelect, isDiscountSubmenu, availableDestinations, validDates }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [discountOnly, setDiscountOnly] = useState(false); // State to toggle discount filter

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleDiscountToggle = () => {
        setDiscountOnly(!discountOnly);
    };

    // Filter locations based on the submenu type, discount filter, and search query
    const filteredDestinations = availableDestinations
        ? availableDestinations.filter(destination => {
            if (discountOnly || validDates) {
                return destination.discount !== 0;
            } else {
                return true; // Include all destinations for other submenus or when validDates is false
            }
        }).filter(destination =>
            destination.location.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : [];

    // Apply discount filter if enabled
    const locationsToDisplay = filteredDestinations;

    return (
        <Grid>
            <Grid item xs={10} md={8}>
                <Paper elevation={3} style={{ padding: '20px', marginTop: '20px', width: '1200px' }}>
                    <div>
                        <Typography variant="h5"  align="center">
                            <b>Destinations</b>
                        </Typography>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <FormControlLabel
                            control={<Switch checked={discountOnly} onChange={handleDiscountToggle} />}
                            label="Discount Only"
                        />
                    </div>
                    <TextField
                        id="search"
                        label="Search destinations"
                        type="search"
                        fullWidth
                        variant="outlined"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        style={{ marginBottom: '20px' }}
                    />
                    <LocationTable availableLocations={locationsToDisplay} onLocationSelect={handleLocationSelect} />
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Destinations;
