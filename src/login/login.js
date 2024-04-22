import React, { useState } from 'react';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { withRouter } from "react-router-dom";
import axios from 'axios';
import NavigationBar from "../navigation-bar";

const Login = ({ history }) => {
    const containerStyle = { backgroundColor: '#0594B4', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' };
    const paperStyle = { padding: 70, height: '60vh', width: 500, margin: "20px auto", marginTop: '0px' };
    const avatarStyle = { backgroundColor: '#04579B' };
    const btnstyle = { backgroundColor: '#04579B', color: 'white', margin: '8px 0', borderRadius: '10px', marginTop: '30px' };
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorDialogOpen, setErrorDialogOpen] = useState(false);
    const handleLogin = async () => {
        sessionStorage.clear();
        if (!username || !password) {
            alert('Please enter both email and password.');
        }
        try {
            const response = await axios.post('http://localhost:5000/login', {
                username: username,
                password: password,
            });
            const token = response.data.access_token;
            sessionStorage.setItem('token', token);
            console.log(sessionStorage.getItem('token')); // Log the token here
            try {

                const responseGet = await axios.get(`http://localhost:5000/user/${username}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,

                        },
                    });
                sessionStorage.setItem('role', responseGet.data.user.role);
                sessionStorage.setItem('username', responseGet.data.user.username);
                sessionStorage.setItem('id', responseGet.data.user.id);
                sessionStorage.setItem('accessedBefore', 'true');
                console.log('role'+sessionStorage.getItem('role')); // Log the token here
                console.log(sessionStorage.getItem('username')); // Log the token here
                if(sessionStorage.getItem('role') === 'client'){
                    history.push('/destinations');
                }
                else{
                    history.push('/agent');
                }
            } catch (error) {
                console.error('Get error: 1', error);
                alert('Wrong username or password 1');
            }
        } catch (error) {
            console.error('Login error: 2', error);
            alert('Wrong username or password 2');
        }
    };
    const handleRegister = () => {
        history.push("/register");
    };

    const handleCloseErrorDialog = () => {
        setErrorDialogOpen(false);
    };

    return (
        <div>  <NavigationBar  />
        <div style={containerStyle}>
            <Paper elevation={20} style={paperStyle}>
                <Grid align='center'>
                    <Avatar color='primary' style={avatarStyle}><LockOutlinedIcon /></Avatar>
                    <Typography variant="h4" style={{ color: 'black' }}>Sign In</Typography>
                </Grid>
                <TextField label='Username' placeholder='Enter username' onChange={(e) => setUsername(e.target.value)} fullWidth required />
                <TextField label='Password' placeholder='Enter password' onChange={(e) => setPassword(e.target.value)} type='password' fullWidth required />
                <Button type='submit' variant="contained" style={btnstyle} fullWidth onClick={handleLogin}><b> Sign in</b></Button>
                <Typography align="center" style={{ marginTop: '10px' }}>
                    <b>Don't have an account? <Link onClick={handleRegister}>Register</Link></b>
                </Typography>
            </Paper>
            <Dialog open={errorDialogOpen} onClose={handleCloseErrorDialog}>
                <DialogTitle>Error</DialogTitle>
                <DialogContent dividers>
                    <Typography variant="body1">Username or password incorrect.</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseErrorDialog} color="primary" autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
        </div>
    );
};

export default withRouter(Login);
