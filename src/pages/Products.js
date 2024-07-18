import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Container, Grid, TextField, MenuItem, Select, FormControl, InputLabel, Button } from '@mui/material';
import Product from '../components/Product';
import { useLocation } from 'react-router-dom';

const Products = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
  });

  const location = useLocation();

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

    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/categories`);
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get('category') || '';
    setFilters((prevFilters) => ({
      ...prevFilters,
      category,
    }));
  }, [location]);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const applyFilters = () => {
    const filteredProducts = products.filter((product) => {
      const inCategory = filters.category ? product.category === filters.category : true;
      const inPriceRange =
        (filters.minPrice ? product.price >= filters.minPrice : true) &&
        (filters.maxPrice ? product.price <= filters.maxPrice : true);
      return inCategory && inPriceRange;
    });
    return filteredProducts;
  };

  const filteredProducts = applyFilters();

  if (loading) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  return (
    <Container maxWidth="lg" style={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>
      <Grid container spacing={2} style={{ marginBottom: '20px' }}>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {categories.map((category) => (
                <MenuItem key={category._id} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Min Price"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleFilterChange}
            type="number"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Max Price"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleFilterChange}
            type="number"
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {filteredProducts.map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={4}>
            <Product product={product} addToCart={addToCart} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Products;
