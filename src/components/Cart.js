import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

const Cart = ({ cart }) => {
  return (
    <div>
      <Typography variant="h4">Shopping Cart</Typography>
      {cart.length === 0 ? (
        <Typography variant="body1">No items in cart</Typography>
      ) : (
        <List>
          {cart.map((item, index) => (
            <ListItem key={index}>
              <ListItemText primary={item.name} secondary={`$${item.price}`} />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default Cart;
