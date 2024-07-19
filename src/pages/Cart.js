import React, { useState } from 'react';
import { Container, Typography, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, RadioGroup, FormControlLabel, Radio, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const CartPage = () => {
  const { cartItems, addToCart, removeFromCart, clearCart } = useCart();
  const [shippingCost, setShippingCost] = useState(0);
  const navigate = useNavigate();

  if (!cartItems?.length) {
    return (
      <Container>
        <Typography variant="h4" gutterBottom>
          Your Cart
        </Typography>
        <Typography variant="body1">
          Your cart is currently empty.
        </Typography>
      </Container>
    );
  }

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingOptions = [
    { label: 'Free shipping', cost: 0 },
    { label: 'Flat rate: €10.00', cost: 10 },
    { label: 'Pickup: €15.00', cost: 15 },
  ];

  const handleAddQuantity = (item) => {
    addToCart({ ...item, quantity: 1 });
  };

  const handleReduceQuantity = (item) => {
    if (item.quantity === 1) {
      removeFromCart(item._id);
    } else {
      addToCart({ ...item, quantity: -1 });
    }
  };

  const handleProceedToCheckout = () => {
    navigate('/checkout');
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Subtotal</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <img src={item.image} alt={item.name} style={{ width: '50px', marginRight: '10px' }} />
                        <Typography>{item.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>€{item.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <IconButton onClick={() => handleReduceQuantity(item)}>
                          <RemoveIcon />
                        </IconButton>
                        <Typography>{item.quantity}</Typography>
                        <IconButton onClick={() => handleAddQuantity(item)}>
                          <AddIcon />
                        </IconButton>
                      </Box>
                    </TableCell>
                    <TableCell>€{(item.price * item.quantity).toFixed(2)}</TableCell>
                    <TableCell>
                      <Button variant="contained" color="secondary" onClick={() => removeFromCart(item._id)}>
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper style={{ padding: '16px' }}>
            <Typography variant="h6" gutterBottom>
              Cart Totals
            </Typography>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Subtotal</TableCell>
                  <TableCell>€{subtotal.toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Shipping</TableCell>
                  <TableCell>
                    <RadioGroup
                      value={shippingCost}
                      onChange={(e) => setShippingCost(parseFloat(e.target.value))}
                    >
                      {shippingOptions.map((option, index) => (
                        <FormControlLabel
                          key={index}
                          value={option.cost}
                          control={<Radio />}
                          label={option.label}
                        />
                      ))}
                    </RadioGroup>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Total</TableCell>
                  <TableCell>€{(subtotal + shippingCost).toFixed(2)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleProceedToCheckout}
            >
              Proceed to Checkout
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CartPage;
