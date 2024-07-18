import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const Product = ({ product }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{product.name}</Typography>
        <Typography variant="body2" color="textSecondary">{product.description}</Typography>
        <Typography variant="h6">${product.price}</Typography>
      </CardContent>
    </Card>
  );
};

export default Product;
