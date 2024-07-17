import React from 'react';
import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';

const Product = ({ product, addToCart }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{product.name}</Typography>
        <Typography variant="body2" color="textSecondary">{product.description}</Typography>
        <Typography variant="h6">${product.price}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={() => addToCart(product)}>
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default Product;
