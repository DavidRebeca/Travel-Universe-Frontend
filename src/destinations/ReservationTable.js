import React, { useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, TablePagination } from '@material-ui/core';

const ReservationTable = ({ reservations, onReservationSelect }) => {
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
        onReservationSelect(reservations.find(reservation => reservation.id === id)); // Pass the selected reservation object
    };

    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><b>ID</b></TableCell>
                            <TableCell><b>User ID</b></TableCell>
                            <TableCell><b>Destination ID</b></TableCell>
                            <TableCell><b>Check-in Date</b></TableCell>
                            <TableCell><b>Check-out Date</b></TableCell>
                            <TableCell><b>Total Price</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reservations.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((reservation) => (
                            <TableRow
                                key={reservation.id}
                                onClick={() => handleRowClick(reservation.id)}
                                style={{ backgroundColor: selectedId === reservation.id ?  'rgba(5, 148, 180, 0.3)' : 'transparent' }} // Highlight selected row
                            >
                                <TableCell>{reservation.id}</TableCell>
                                <TableCell>{reservation.user_id}</TableCell>
                                <TableCell>{reservation.destination_id}</TableCell>
                                <TableCell>{reservation.check_in_date}</TableCell>
                                <TableCell>{reservation.check_out_date}</TableCell>
                                <TableCell>{reservation.total_price}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={reservations.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    );
};

export default ReservationTable;
