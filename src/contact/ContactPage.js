import React from 'react';
import { Container, Typography, Grid, Paper } from '@material-ui/core';
import { Email, Phone, LocationOn } from '@material-ui/icons';
import BackgroundImgUrl from '../commons/images/page.png';
import NavigationBar from "../navigation-bar";

const containerStyle = {
    backgroundImage: `url(${BackgroundImgUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
};

const paperStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 50,
    height: '400px',
    width: '500px', // Adjusted width
    borderRadius: 10,
    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
    marginTop: '-20px', // Reduce top margin
};

const contactItemStyle = {
    marginBottom: '40px', // Reduced margin bottom
};

const boldFontStyle = {
    fontWeight: 'bold',
};

const biggerFontStyle = {
    fontSize: '1.6rem',
};

const ContactPage = () => {
    return (
        <div>
            <NavigationBar  />

        <div style={containerStyle}>
            <Container maxWidth="md">
                <Grid container spacing={3} justify="center">
                    <Grid item xs={12}>
                        <Typography variant="h3" gutterBottom align="center" style={{ color: 'black', fontWeight: 'bold', marginTop: '-50px' }}>
                            Contact Us
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper elevation={20} style={paperStyle}>
                            <div style={contactItemStyle}>
                                <Typography variant="h5" align="left" style={boldFontStyle}>
                                    Email
                                </Typography>
                                <Typography variant="body1" color="textSecondary" align="left" style={biggerFontStyle}>
                                    <Email /> traveluniverse@gmail.com
                                </Typography>
                            </div>
                            <div style={contactItemStyle}>
                                <Typography variant="h5" align="left" style={boldFontStyle}>
                                    Phone
                                </Typography>
                                <Typography variant="body1" color="textSecondary" align="left" style={biggerFontStyle}>
                                    <Phone /> +1234567890
                                </Typography>
                            </div>
                            <div style={contactItemStyle}>
                                <Typography variant="h5" align="left" style={boldFontStyle}>
                                    Address
                                </Typography>
                                <Typography variant="body1" color="textSecondary" align="left" style={biggerFontStyle}>
                                    <LocationOn /> 123 Main Street, Cluj, Romania
                                </Typography>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
        </div>
    );
};

export default ContactPage;
