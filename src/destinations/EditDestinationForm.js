import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography, makeStyles } from '@material-ui/core';

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

const EditDestinationForm = ({ open, onClose, initialData }) => {
    const classes = useStyles();
    const [formData, setFormData] = useState({ ...initialData });
    const [editDone, setEditDone] = useState(false);

    useEffect(() => {
        setFormData({ ...initialData });
    }, [initialData]); // Update form data when initialData changes

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleEdit = () => {
        const token = sessionStorage.getItem('token');
        fetch(`http://localhost:5000/destination/${initialData.id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`, // Include JWT token in the headers
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to update destination');
                }
                return response.json();
            })
            .then(data => {
                console.log('Destination updated:', data);
                // Show success popup
                setEditDone(true);
                onClose(); // Close the dialog after successfully updating the destination
            })
            .catch(error => {
                console.error('Error updating destination:', error);
                // Handle error if needed
            });
    };

    const handleUpdateDoneClose = () => {
        setEditDone(false);
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit Destination</DialogTitle>
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
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleEdit} color="primary">
                        Edit
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={editDone}
                onClose={handleUpdateDoneClose}
                className={classes.modal}
            >
                <div className={classes.modalContent}>
                    <Typography variant="h6" gutterBottom>
                        Update done
                    </Typography>

                </div>
            </Dialog>
        </>
    );
};

export default EditDestinationForm;
