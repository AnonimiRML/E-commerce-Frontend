import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, CircularProgress, Button } from '@mui/material';
import { useCart } from '../context/CartContext';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { cartItems, addToCart, removeFromCart, getCartQuantity } = useCart();

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

  const quantityInCart = getCartQuantity(product.id);

  return (
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>{product.name}</Typography>
      <Typography variant="body1" gutterBottom>{product.description}</Typography>
      <Typography variant="h6">${product.price}</Typography>
      <Typography variant="body2" color="textSecondary">In Stock: {product.stock}</Typography>
      <Typography variant="body2" color="textSecondary">Quantity in Cart: {quantityInCart}</Typography>
      <Button variant="contained" color="primary" onClick={() => addToCart({ ...product, quantity: 1 })}>
        Add to Cart
      </Button>
      {quantityInCart > 0 && (
        <Button variant="contained" color="secondary" onClick={() => removeFromCart(product.id)}>
          Remove from Cart
        </Button>
      )}
    </Container>
  );
};

export default ProductPage;
