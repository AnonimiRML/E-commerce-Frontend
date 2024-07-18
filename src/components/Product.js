import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, CardActions, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import StarIcon from '@mui/icons-material/Star';

const Product = ({ product, addToCart }) => {
  return (
    <Card>
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
          <IconButton aria-label="add to favorites">
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
          onClick={() => addToCart(product)}
        >
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default Product;
