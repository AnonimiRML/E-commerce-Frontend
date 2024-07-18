import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Container, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/categories`);
        setCategories(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  const handleCategoryClick = (category) => {
    navigate(`/products?category=${category.name}`);
  };

  return (
    <div>
      <Box
        sx={{
          width: '100%',
          height: 'calc(100vh - 64px)', // Adjust for navbar height
          backgroundColor: '#90ee90', // Light green color
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          textAlign: 'center',
          marginTop: 0,
          padding: 0,
        }}
      >
        <Container>
          <Typography variant="h2" component="div" gutterBottom>
            FashionHub
          </Typography>
          <Typography variant="h5" component="div">
            Discover Your Style with Our Exclusive Clothing Collection
          </Typography>
        </Container>
      </Box>
      <Container maxWidth="lg" style={{ marginTop: '20px' }}>
        <Grid container spacing={2}>
          {categories.map((category) => (
            <Grid item key={category._id} xs={12}>
              <Box
                sx={{
                  padding: '24px',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  textAlign: 'center',
                  width: '100%',
                }}
              >
                <Typography variant="h5" gutterBottom>
                  {category.name}
                </Typography>
                <Typography variant="body1" color="textSecondary" paragraph>
                  {category.description}
                </Typography>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: 'black', color: 'white' }}
                  onClick={() => handleCategoryClick(category)}
                >
                  Learn More
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Home;
