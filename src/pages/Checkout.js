import React, { useState } from 'react';
import { Container, Grid, Typography, TextField, Button, FormControlLabel, Checkbox, List, ListItem, ListItemText } from '@mui/material';

const Checkout = ({ cart, addToCart, removeFromCart }) => {
  const [isShippingCompleted, setIsShippingCompleted] = useState(false);
  
  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setIsShippingCompleted(true);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    alert('Payment Submitted');
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: '20px' }}>
      <Grid container spacing={3}>
        {/* Summary Section */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>Summary</Typography>
          <List>
            {cart.map((item, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`${item.name} x ${item.quantity}`}
                  secondary={`$${(item.price * item.quantity).toFixed(2)}`}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => addToCart(item)}
                  style={{ marginRight: '10px' }}
                >
                  +
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => removeFromCart(item._id)}
                >
                  -
                </Button>
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
              />
              <TextField
                required
                id="email1"
                name="email1"
                label="Email"
                fullWidth
                autoComplete="email"
                variant="outlined"
                margin="normal"
              />
              <TextField
                required
                id="phone1"
                name="phone1"
                label="Phone Number"
                fullWidth
                autoComplete="phone-number"
                variant="outlined"
                margin="normal"
              />
              <TextField
                required
                id="address1"
                name="address1"
                label="Address line 1"
                fullWidth
                autoComplete="shipping address-line1"
                variant="outlined"
                margin="normal"
              />
              <TextField
                id="address2"
                name="address2"
                label="Address line 2"
                fullWidth
                autoComplete="shipping address-line2"
                variant="outlined"
                margin="normal"
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
              />
              <TextField
                required
                id="zip"
                name="zip"
                label="Zip / Postal code"
                fullWidth
                autoComplete="shipping postal-code"
                variant="outlined"
                margin="normal"
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
