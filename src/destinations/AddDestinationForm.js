import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography, makeStyles, Modal } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: theme.spacing(4), // Increased padding for bigger size
        borderRadius: theme.spacing(2), // Increased border radius for rounded corners
        textAlign: 'center',
    },
    textField: {
        marginBottom: theme.spacing(2), // Add margin between text fields
    },
}));

const AddDestinationForm = ({ open, onClose }) => {
    const classes = useStyles();
    const [formData, setFormData] = useState({
        title: '',
        location: '',
        description: '',
        price: '',
        discount: '',
    });
    const [addSuccess, setAddSuccess] = useState(false);
    const [addFailed, setAddFailed] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleAdd = () => {
        const token = sessionStorage.getItem('token');
        fetch('http://localhost:5000/destination', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`, // Include JWT token in the headers
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to add destination');
                }
                return response.json();
            })
            .then(data => {
                console.log('Destination added:', data);
                // Show success popup
                setAddSuccess(true);
                onClose(); // Close the dialog after successfully adding the destination
            })
            .catch(error => {
                console.error('Error adding destination:', error);
                // Show failure popup
                setAddFailed(true);
            });
    };

    return (
        <>
            <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Destination</DialogTitle>
                <DialogContent className={classes.modalContent}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        name="title"
                        label="Title"
                        type="text"
                        fullWidth
                        value={formData.title}
                        onChange={handleInputChange}
                        className={classes.textField}
                    />
                    <TextField
                        margin="dense"
                        id="location"
                        name="location"
                        label="Location"
                        type="text"
                        fullWidth
                        value={formData.location}
                        onChange={handleInputChange}
                        className={classes.textField}
                    />
                    <TextField
                        margin="dense"
                        id="description"
                        name="description"
                        label="Description"
                        type="text"
                        fullWidth
                        value={formData.description}
                        onChange={handleInputChange}
                        className={classes.textField}
                    />
                    <TextField
                        margin="dense"
                        id="price"
                        name="price"
                        label="Price"
                        type="text"
                        fullWidth
                        value={formData.price}
                        onChange={handleInputChange}
                        className={classes.textField}
                    />
                    <TextField
                        margin="dense"
                        id="discount"
                        name="discount"
                        label="Discount"
                        type="text"
                        fullWidth
                        value={formData.discount}
                        onChange={handleInputChange}
                        className={classes.textField}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAdd} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Success Popup */}
            <Modal open={addSuccess} onClose={() => setAddSuccess(false)} className={classes.modal}>
                <div className={classes.modalContent}>
                    <Typography variant="h6" gutterBottom>
                        Destination added successfully.
                    </Typography>
                </div>
            </Modal>

            {/* Failure Popup */}
            <Modal open={addFailed} onClose={() => setAddFailed(false)} className={classes.modal}>
                <div className={classes.modalContent}>
                    <Typography variant="h6" gutterBottom>
                        Failed to add destination.
                    </Typography>
                </div>
            </Modal>
        </>
    );
};

export default AddDestinationForm;
