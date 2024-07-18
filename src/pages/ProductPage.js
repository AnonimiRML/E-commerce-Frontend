import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, CircularProgress, Button } from '@mui/material';

const ProductPage = ({ cart, addToCart, removeFromCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const getCartQuantity = () => {
    const cartItem = cart.find((item) => item._id === id);
    return cartItem ? cartItem.quantity : 0;
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (!product) {
    return <Typography variant="h6">Product not found</Typography>;
  }

  return (
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>{product.name}</Typography>
      <Typography variant="body1" gutterBottom>{product.description}</Typography>
      <Typography variant="h6">${product.price}</Typography>
      <Typography variant="body2" color="textSecondary">In Stock: {product.stock}</Typography>
      <Typography variant="body2" color="textSecondary">In Cart: {getCartQuantity()}</Typography>
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: '20px', marginRight: '10px' }}
        onClick={() => addToCart(product)}
      >
        +
      </Button>
      <Button
        variant="contained"
        color="secondary"
        style={{ marginTop: '20px' }}
        onClick={() => removeFromCart(product._id)}
        disabled={getCartQuantity() === 0}
      >
        -
      </Button>
    </Container>
  );
};

export default ProductPage;
