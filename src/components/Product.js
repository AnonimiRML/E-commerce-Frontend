import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, CardActions, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import StarIcon from '@mui/icons-material/Star';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'scale(1.05)',
  },
  textDecoration: 'none',
  color: 'inherit'
}));

const Product = ({ product, addToCart }) => {
  return (
    <StyledCard component={Link} to={`/product/${product._id}`}>
      <CardMedia
        component="img"
        height="140"
        image={product.image || "default-image-url.jpg"} // Replace with actual image URL or placeholder
        alt={product.name}
      />
      <CardContent>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography gutterBottom variant="h6" component="div">
            {product.name}
          </Typography>
          <IconButton aria-label="add to favorites" onClick={(e) => e.stopPropagation()}>
            <FavoriteIcon />
          </IconButton>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {[...Array(5)].map((_, i) => (
            <StarIcon key={i} style={{ color: 'gold' }} />
          ))}
        </div>
        <Typography variant="h5" color="text.primary">
          ${product.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddShoppingCartIcon />}
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product);
          }}
        >
          Add to cart
        </Button>
      </CardActions>
    </StyledCard>
  );
};

export default Product;
