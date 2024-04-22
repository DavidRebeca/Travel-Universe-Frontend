import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavbarBrand } from 'reactstrap';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutSharpIcon from '@mui/icons-material/LogoutSharp';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocationOffIcon from '@mui/icons-material/LocationOff';
import logo from './commons/images/icon.png';

const NavigationBar = () => {
    const [role, setRole] = useState(sessionStorage.getItem('role'));
    const [showLocation, setShowLocation] = useState(false);
    const [userLocation, setUserLocation] = useState(null);

    useEffect(() => {
        // Check if geolocation is supported by the browser
        if (navigator.geolocation) {
            // Check if user has opted to display location
            const locationPreference = localStorage.getItem('showLocation');
            setShowLocation(locationPreference === 'true');

            if (locationPreference === 'true') {
                // Fetch user's current location
                navigator.geolocation.getCurrentPosition((position) => {
                    setUserLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });
                });
            }
        }
    }, []);

    const handleLocationToggle = () => {
        const newShowLocation = !showLocation;
        setShowLocation(newShowLocation);
        localStorage.setItem('showLocation', newShowLocation.toString());

        if (newShowLocation) {
            // Fetch user's current location
            navigator.geolocation.getCurrentPosition((position) => {
                setUserLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            });
        } else {
            setUserLocation(null);
        }
    };

    // Function to handle logout
    const handleLogout = () => {
        // Clear sessionStorage
        sessionStorage.clear();
        // Reset role state
        setRole(null);
    };

    return (
        <div>
            <Navbar style={{ backgroundColor: '#04579B' }} light expand="md">
                <NavbarBrand href="/">
                    <img src={logo} width={"40"} height={"40"} alt="Logo" />
                </NavbarBrand>
                <Nav style={{ color: 'white', fontWeight: 'bold', marginRight: '20px' }} navbar>
                    <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
                        Home
                    </Link>
                </Nav>
                <Nav style={{ color: 'white', fontWeight: 'bold', marginRight: '20px' }} navbar>
                    <Link to="/contact" style={{ textDecoration: 'none', color: 'white' }}>
                        Contact
                    </Link>
                </Nav>
                <Nav style={{ color: 'white', fontWeight: 'bold', marginRight: '20px' }} navbar>
                    {role === 'client' &&  <Link to="/destinations" style={{ textDecoration: 'none', color: 'white' }}>Destinations</Link>}
                    {role === 'agent' &&  <Link to="/agent" style={{ textDecoration: 'none', color: 'white' }}>Agent</Link>}
                </Nav>
                <Nav className="ml-auto" navbar>
                    {showLocation ? (
                        <LocationOffIcon onClick={handleLocationToggle} style={{ color: 'white', fontSize: 30, marginRight: '20px'}} />
                    ) : (
                        <LocationOnIcon onClick={handleLocationToggle} style={{ color: 'white', fontSize: 30, marginRight: '20px' }} />
                    )}
                    <Nav>
                        <Link to="/login">
                            <AccountCircleIcon style={{ color: 'white', fontSize: 30, margin: 'auto' }} />
                        </Link>
                        <span style={{ marginRight: '10px' }}></span>
                        {role && (
                            <Link to="/" onClick={handleLogout}>
                                <LogoutSharpIcon style={{ color: 'white', fontSize: 30, margin: 'auto' }} />
                            </Link>
                        )}
                    </Nav>
                </Nav>
            </Navbar>
            {showLocation && userLocation && (
                <div style={{ textAlign: 'center', marginTop: '10px' }}>
                   <b>Your current location: Latitude {userLocation.latitude}, Longitude {userLocation.longitude}</b>
                </div>
            )}
        </div>
    );
};

export default NavigationBar;
