import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const users = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35, email: 'jon.snow@example.com', phone: '123-456-7890' },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42, email: 'cersei.lannister@example.com', phone: '123-456-7890' },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45, email: 'jaime.lannister@example.com', phone: '123-456-7890' },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16, email: 'arya.stark@example.com', phone: '123-456-7890' },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null, email: 'daenerys.targaryen@example.com', phone: '123-456-7890' },
  { id: 6, lastName: 'Melisandre', firstName: '', age: 150, email: 'melisandre@example.com', phone: '123-456-7890' },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44, email: 'ferrara.clifford@example.com', phone: '123-456-7890' },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36, email: 'rossini.frances@example.com', phone: '123-456-7890' },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65, email: 'harvey.roxie@example.com', phone: '123-456-7890' },
];

export default function Users() {
  return (
    <Paper style={{ padding: '16px', height: '600px', width: '100%' }}>
      <Typography variant="h5" gutterBottom>Users</Typography>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.age || 'N/A'}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
