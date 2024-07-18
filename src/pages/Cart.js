import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, List, ListItem, ListItemText, Button } from '@mui/material';

const CartPage = ({ cart, addToCart, removeFromCart }) => {
  const navigate = useNavigate();

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>Shopping Cart</Typography>
      {cart.length === 0 ? (
        <Typography variant="body1">No items in cart</Typography>
      ) : (
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
      )}
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => navigate('/checkout')}
        style={{ marginTop: '20px' }}
        disabled={cart.length === 0}
      >
        Proceed to Checkout
      </Button>
    </Container>
  );
};

export default CartPage;
