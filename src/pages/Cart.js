import React from 'react';
import { Container, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();

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

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>
      <List>
        {cartItems.map((item) => (
          <ListItem key={item.id}>
            <ListItemText primary={item.name} secondary={`Price: $${item.price}`} />
            <Button variant="contained" color="secondary" onClick={() => removeFromCart(item.id)}>
              Remove
            </Button>
          </ListItem>
        ))}
      </List>
      <Button variant="contained" color="primary" onClick={clearCart}>
        Clear Cart
      </Button>
    </Container>
  );
};

export default CartPage;
