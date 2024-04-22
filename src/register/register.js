import React, {useState} from 'react'
import {Grid, Paper, Avatar, Typography, TextField, Button} from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import axios from "axios";
import {withRouter} from "react-router-dom";
import NavigationBar from "../navigation-bar";

const Signup = ({history}) => {
    const containerStyle = { backgroundColor: '#0594B4', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }; // Set background color to #0594B4
    const paperStyle = {
        padding: 70,
        height: '70vh',
        width: 500,
        margin: "20px auto",
        marginTop: '0px',
    }
    const headerStyle = {margin: 0}
    const avatarStyle = {backgroundColor: '#04579B'}
    const marginTop = {marginTop: 20}
    const btnstyle = {backgroundColor: '#04579B',color: 'white',  margin: '8px 0', borderRadius: '10px', marginTop: '30px',}
    const [name, setName] = useState('');
    const [role, setRole] = useState('admin');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleRoleChange = (event) => {
        setRole(event.target.value); // Update the selectedValue when a radio button is clicked
    };
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/register', {
                name: name,
                username: username,
                password: password,
                role: role
            });
            // Handle successful registration, for example, redirect to login page
            history.push('/login');
        } catch (error) {
            // Handle registration error, display error message or take appropriate action
            console.error('Registration failed:', error);
        }
    };
    return (
        <div>
            <NavigationBar  />

        <div style={containerStyle}>
            <Paper elevation={20} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <AddCircleOutlineOutlinedIcon/>
                    </Avatar>
                    <h2 style={headerStyle}>Sign Up</h2>
                </Grid>
                <form>
                    <TextField fullWidth label='Name'  onChange={(e)=> setName(e.target.value)} placeholder="Enter your name"/>
                    <TextField fullWidth label='Username'  onChange={(e)=> setUsername(e.target.value)} placeholder="Enter your email"/>
                    <FormControl component="fieldset" style={marginTop}>
                        <FormLabel component="legend">Role</FormLabel>
                        <RadioGroup aria-label="role" defaultValue={'admin'} onChange={handleRoleChange} name="Role" style={{display: 'initial'}}>
                            <FormControlLabel value="agent" control={<Radio/>} label="Agent"/>
                            <FormControlLabel value="client" control={<Radio/>} label="Client"/>
                        </RadioGroup>
                    </FormControl>
                    <TextField fullWidth label='Password'  onChange={(e)=> setPassword(e.target.value)} placeholder="Enter your password"/>
                    <Button type='submit' variant="contained" style={btnstyle} fullWidth onClick={handleRegister}><b>Sign up</b></Button>
                </form>
            </Paper>
        </div>
        </div>
    )
}

export default withRouter(Signup);
