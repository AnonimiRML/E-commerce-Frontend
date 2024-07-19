import React, { useState } from 'react';
import axios from 'axios';
import { Container, Grid, Typography, TextField, Button, FormControlLabel, Checkbox, List, ListItem, ListItemText } from '@mui/material';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const { cartItems } = useCart();
  const [isShippingCompleted, setIsShippingCompleted] = useState(false);
  const [guest, setGuest] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [shippingAddress, setShippingAddress] = useState({
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });

  const handleGuestChange = (e) => {
    setGuest({ ...guest, [e.target.name]: e.target.value });
  };

  const handleShippingChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setIsShippingCompleted(true);
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    const order = {
      guest,
      shippingAddress,
      products: cartItems.map((item) => ({
        product: item._id,
        quantity: item.quantity,
      })),
    };

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/orders`, order);
      alert('Order submitted successfully');
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Failed to submit order');
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: '20px' }}>
      <Grid container spacing={3}>
        {/* Summary Section */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>Summary</Typography>
          <List>
            {cartItems.map((item, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`${item.name} x ${item.quantity}`}
                  secondary={`$${(item.price * item.quantity).toFixed(2)}`}
                />
              </ListItem>
            ))}
            <ListItem>
              <ListItemText primary="Total" secondary={`$${calculateTotal()}`} />
            </ListItem>
          </List>
        </Grid>

        {/* Shipping Address Form */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>{isShippingCompleted ? 'Payment details' : 'Shipping address'}</Typography>
          {isShippingCompleted ? (
            <form onSubmit={handlePaymentSubmit}>
              <TextField
                required
                id="cardName"
                name="cardName"
                label="Name on card"
                fullWidth
                variant="outlined"
                margin="normal"
              />
              <TextField
                required
                id="cardNumber"
                name="cardNumber"
                label="Card number"
                fullWidth
                variant="outlined"
                margin="normal"
              />
              <TextField
                required
                id="expDate"
                name="expDate"
                label="Expiry date"
                fullWidth
                variant="outlined"
                margin="normal"
              />
              <TextField
                required
                id="cvv"
                name="cvv"
                label="CVV"
                fullWidth
                variant="outlined"
                margin="normal"
              />
              <Button variant="contained" color="primary" type="submit" style={{ marginTop: '20px' }}>
                Submit Payment
              </Button>
            </form>
          ) : (
            <form onSubmit={handleShippingSubmit}>
              <TextField
                required
                id="firstName"
                name="firstName"
                label="First name"
                fullWidth
                autoComplete="given-name"
                variant="outlined"
                margin="normal"
                value={guest.firstName}
                onChange={handleGuestChange}
              />
              <TextField
                required
                id="lastName"
                name="lastName"
                label="Last name"
                fullWidth
                autoComplete="family-name"
                variant="outlined"
                margin="normal"
                value={guest.lastName}
                onChange={handleGuestChange}
              />
              <TextField
                required
                id="email"
                name="email"
                label="Email"
                fullWidth
                autoComplete="email"
                variant="outlined"
                margin="normal"
                value={guest.email}
                onChange={handleGuestChange}
              />
              <TextField
                required
                id="phone"
                name="phone"
                label="Phone"
                fullWidth
                autoComplete="tel"
                variant="outlined"
                margin="normal"
                value={guest.phone}
                onChange={handleGuestChange}
              />
              <TextField
                required
                id="addressLine1"
                name="addressLine1"
                label="Address line 1"
                fullWidth
                autoComplete="shipping address-line1"
                variant="outlined"
                margin="normal"
                value={shippingAddress.addressLine1}
                onChange={handleShippingChange}
              />
              <TextField
                id="addressLine2"
                name="addressLine2"
                label="Address line 2"
                fullWidth
                autoComplete="shipping address-line2"
                variant="outlined"
                margin="normal"
                value={shippingAddress.addressLine2}
                onChange={handleShippingChange}
              />
              <TextField
                required
                id="city"
                name="city"
                label="City"
                fullWidth
                autoComplete="shipping address-level2"
                variant="outlined"
                margin="normal"
                value={shippingAddress.city}
                onChange={handleShippingChange}
              />
              <TextField
                required
                id="state"
                name="state"
                label="State"
                fullWidth
                autoComplete="shipping address-level1"
                variant="outlined"
                margin="normal"
                value={shippingAddress.state}
                onChange={handleShippingChange}
              />
              <TextField
                required
                id="zipCode"
                name="zipCode"
                label="Zip / Postal code"
                fullWidth
                autoComplete="shipping postal-code"
                variant="outlined"
                margin="normal"
                value={shippingAddress.zipCode}
                onChange={handleShippingChange}
              />
              <TextField
                required
                id="country"
                name="country"
                label="Country"
                fullWidth
                autoComplete="shipping country"
                variant="outlined"
                margin="normal"
                value={shippingAddress.country}
                onChange={handleShippingChange}
              />
              <FormControlLabel
                control={<Checkbox color="primary" name="saveAddress" value="yes" />}
                label="Use this address for payment details"
              />
              <Button variant="contained" color="primary" type="submit" style={{ marginTop: '20px' }}>
                Next
              </Button>
            </form>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Checkout;
