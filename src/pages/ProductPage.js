import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Button, Paper, CircularProgress, Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { cartItems, addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <CircularProgress />;
  }

  if (!product) {
    return <Typography variant="h6">Product not found</Typography>;
  }

  const handleAddToCart = () => {
    const existingProduct = cartItems.find(item => item._id === product._id);
    if (existingProduct) {
      addToCart({ ...product, quantity: existingProduct.quantity + 1 });
    } else {
      addToCart({ ...product, quantity: 1 });
    }
  };

  return (
    <Container>
      <Grid container spacing={4} style={{ marginTop: '20px' }}>
        <Grid item xs={12} md={6}>
          <Paper>
            <img src={product.image} alt={product.name} style={{ width: '100%', borderRadius: '10px' }} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box display="flex" flexDirection="column" justifyContent="space-between" height="100%">
            <Box>
              <Typography variant="overline" display="block" gutterBottom>
                {product.category?.name}
              </Typography>
              <Typography variant="h4" gutterBottom>
                {product.name}
              </Typography>
              <Typography variant="body1" paragraph>
                {product.description}
              </Typography>
              <Typography variant="h6" gutterBottom>
                ${product.price.toFixed(2)}
              </Typography>
              <Button variant="contained" color="primary" size="large" onClick={handleAddToCart}>
                Add to Cart
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductPage;
