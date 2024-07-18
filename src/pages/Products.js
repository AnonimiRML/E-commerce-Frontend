import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Product from '../components/Product';
import { Grid, CircularProgress, Container, Typography, Button } from '@mui/material';

const Products = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/products`);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>Products</Typography>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <Product product={product} addToCart={addToCart} />
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to={`/product/${product._id}`}
              style={{ marginTop: '10px' }}
            >
              View Details
            </Button>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Products;
