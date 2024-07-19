import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const { token } = useAuth();

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/orders/all`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token]);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseDialog = () => {
    setSelectedOrder(null);
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/orders/${orderId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setOrders(orders.filter(order => order._id !== orderId));
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const handleChangeStatusClick = (order) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
    setStatusDialogOpen(true);
  };

  const handleStatusChange = async () => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/orders/status`, 
        { orderId: selectedOrder._id, status: newStatus }, 
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      setOrders(orders.map(order => order._id === selectedOrder._id ? { ...order, status: newStatus } : order));
      setStatusDialogOpen(false);
      setSelectedOrder(null);
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const handleStatusDialogClose = () => {
    setStatusDialogOpen(false);
    setSelectedOrder(null);
  };

  return (
    <Container>
      <Paper style={{ padding: '16px', marginTop: '20px' }}>
        <Typography variant="h4" gutterBottom>Orders</Typography>
        {loading ? (
          <CircularProgress />
        ) : (
          <TableContainer component={Paper}>
            <Table aria-label="orders table">
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell align="right">Total Amount</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="right">Order Date</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell component="th" scope="row">
                      {order._id}
                    </TableCell>
                    <TableCell>
                      {order.user
                        ? `${order.user.firstName} ${order.user.lastName}`
                        : `${order.guest.firstName} ${order.guest.lastName}`}
                    </TableCell>
                    <TableCell align="right">${order.totalAmount.toFixed(2)}</TableCell>
                    <TableCell align="right">{order.status}</TableCell>
                    <TableCell align="right">{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell align="right">
                      <Button variant="outlined" color="primary" onClick={() => handleViewDetails(order)}>
                        View Details
                      </Button>
                      <Button variant="outlined" color="secondary" onClick={() => handleChangeStatusClick(order)} style={{ marginLeft: '8px' }}>
                        Change Status
                      </Button>
                      <Button variant="outlined" color="error" onClick={() => handleDeleteOrder(order._id)} style={{ marginLeft: '8px' }}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      {selectedOrder && (
        <Dialog open={Boolean(selectedOrder)} onClose={handleCloseDialog}>
          <DialogTitle>Order Details</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Typography variant="h6">Shipping Address</Typography>
              <Typography variant="body2">Address Line 1: {selectedOrder.shippingAddress.addressLine1}</Typography>
              <Typography variant="body2">Address Line 2: {selectedOrder.shippingAddress.addressLine2 || 'N/A'}</Typography>
              <Typography variant="body2">City: {selectedOrder.shippingAddress.city}</Typography>
              <Typography variant="body2">State: {selectedOrder.shippingAddress.state}</Typography>
              <Typography variant="body2">Zip Code: {selectedOrder.shippingAddress.zipCode}</Typography>
              <Typography variant="body2">Country: {selectedOrder.shippingAddress.country}</Typography>
              <Typography variant="h6" style={{ marginTop: '10px' }}>Order Date</Typography>
              <Typography variant="body2">{new Date(selectedOrder.createdAt).toLocaleDateString()}</Typography>
              <Typography variant="h6" style={{ marginTop: '10px' }}>Products</Typography>
              {selectedOrder.products.map((product) => (
                <Typography key={product.product._id} variant="body2">
                  {product.product.name} - Quantity: {product.quantity}
                </Typography>
              ))}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}

      <Dialog open={statusDialogOpen} onClose={handleStatusDialogClose}>
        <DialogTitle>Change Order Status</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="Cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleStatusDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleStatusChange} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Orders;
