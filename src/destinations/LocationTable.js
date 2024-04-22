import React, { useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, TablePagination } from '@material-ui/core';

const LocationTable = ({ availableLocations, onLocationSelect }) => {
    const [selectedId, setSelectedId] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5); // Number of rows per page

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleRowClick = (id) => {
        setSelectedId(id);
        onLocationSelect(availableLocations.find(location => location.id === id)); // Pass the selected location object
    };

    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><b>ID</b></TableCell>
                            <TableCell><b>Title</b></TableCell>
                            <TableCell><b>Location</b></TableCell>
                            <TableCell><b>Description</b></TableCell>
                            <TableCell><b>Price</b></TableCell>
                            <TableCell><b>Discount</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {availableLocations.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((location) => (
                            <TableRow
                                key={location.id}
                                onClick={() => handleRowClick(location.id)}
                                style={{ backgroundColor: selectedId === location.id ?  'rgba(5, 148, 180, 0.3)' : 'transparent' }} // Highlight selected row
                            >
                                <TableCell>{location.id}</TableCell>
                                <TableCell>{location.title}</TableCell>
                                <TableCell>{location.location}</TableCell>
                                <TableCell>{location.description}</TableCell>
                                <TableCell>{location.price}</TableCell>
                                <TableCell>{location.discount}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={availableLocations.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    );
};

export default LocationTable;
