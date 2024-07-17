import React, { useState } from 'react';
import Product from '../components/Product';
import { Grid } from '@mui/material';

const Products = ({ addToCart }) => {
  const [products] = useState([
    { name: 'Product 1', description: 'Description 1', price: 10 },
    { name: 'Product 2', description: 'Description 2', price: 20 },
    { name: 'Product 3', description: 'Description 3', price: 30 },
  ]);

  return (
    <div>
      <Grid container spacing={3}>
        {products.map((product, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Product product={product} addToCart={addToCart} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Products;
