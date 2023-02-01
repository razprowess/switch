import * as React from 'react';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material//TableBody';
import TableHead from '@mui/material/TableHead';
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        color: theme.palette.mode === 'dark' ? '#000000' : '#ffffff'
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 50,
    },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function CustomizedTable() {
    return (
        <TableContainer component={Paper} sx={{ mx: 3 }}>
            <Table sx={{ minWidth: 300 }} aria-label="customized table">
                <TableHead>
                    <TableRow sx={{ bgcolor: (theme) => theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.primary.light }}>
                        <StyledTableCell>Message</StyledTableCell>
                        <StyledTableCell>Message</StyledTableCell>
                        <StyledTableCell>Message</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>Content</TableCell>
                        <TableCell>Content</TableCell>
                        <TableCell>Content</TableCell>
                    </TableRow>
                    <StyledTableRow>
                        <TableCell>Content</TableCell>
                        <TableCell>Content</TableCell>
                        <TableCell>Content</TableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <TableCell>Content</TableCell>
                        <TableCell>Content</TableCell>
                        <TableCell>Content</TableCell>
                    </StyledTableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}