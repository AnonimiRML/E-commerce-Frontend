import React, { useState, useEffect } from 'react';
import { Box, Tabs, Tab, TextField, Button, Typography, Paper, Container, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Products = () => {
  const [tabValue, setTabValue] = useState(0);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const { token } = useAuth();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      name,
      description,
      stock,
      price,
      category,
      image,
    };

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/products`, productData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setMessage('Product added successfully!');
      setName('');
      setDescription('');
      setStock('');
      setPrice('');
      setCategory('');
      setImage(null);
      fetchProducts();
    } catch (error) {
      console.error('Error adding product:', error);
      setMessage('Failed to add product.');
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/products`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/categories`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [token]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/products/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setMessage('Product deleted successfully!');
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      setMessage('Failed to delete product.');
    }
  };

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setName(product.name);
    setDescription(product.description);
    setStock(product.stock);
    setPrice(product.price);
    setCategory(product.category?._id);
    setImage(product.image);
    setEditDialogOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      name,
      description,
      stock,
      price,
      category,
      image,
    };

    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/products/${currentProduct._id}`, productData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setMessage('Product updated successfully!');
      setName('');
      setDescription('');
      setStock('');
      setPrice('');
      setCategory('');
      setImage(null);
      setEditDialogOpen(false);
      fetchProducts();
    } catch (error) {
      console.error('Error updating product:', error);
      setMessage('Failed to update product.');
    }
  };

  return (
    <Container>
      <Paper style={{ padding: '16px', marginTop: '20px' }}>
        <Typography variant="h4" gutterBottom>Products</Typography>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="View Products" />
          <Tab label="Add New Product" />
        </Tabs>
        {tabValue === 0 && (
          <Box p={3}>
            {loading ? (
              <CircularProgress />
            ) : (
              <TableContainer component={Paper}>
                <Table aria-label="products table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell align="right">Stock</TableCell>
                      <TableCell align="right">Price</TableCell>
                      <TableCell align="right">Category</TableCell>
                      <TableCell align="right">Options</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product._id}>
                        <TableCell component="th" scope="row">
                          {product.name}
                        </TableCell>
                        <TableCell>{product.description}</TableCell>
                        <TableCell align="right">{product.stock}</TableCell>
                        <TableCell align="right">{product.price}</TableCell>
                        <TableCell align="right">{product.category?.name}</TableCell>
                        <TableCell align="right">
                          <IconButton color="primary" aria-label="edit product" onClick={() => handleEdit(product)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton color="secondary" aria-label="delete product" onClick={() => handleDelete(product._id)}>
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>
        )}
        {tabValue === 1 && (
          <Box p={3}>
            <form onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Product Name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="description"
                label="Description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="stock"
                label="Stock"
                name="stock"
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="price"
                label="Price"
                name="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <FormControl variant="outlined" margin="normal" fullWidth required>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  label="Category"
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat._id} value={cat._id}>
                      {cat.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="image"
                type="file"
                onChange={handleImageChange}
              />
              <label htmlFor="image">
                <Button variant="contained" color="primary" component="span">
                  Upload Image
                </Button>
                {image && <Typography variant="body2" style={{ marginLeft: '10px' }}>{image.name}</Typography>}
              </label>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
              >
                Add Product
              </Button>
              {message && <Typography variant="body2" color="textSecondary">{message}</Typography>}
            </form>
          </Box>
        )}
      </Paper>

      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Make changes to the product details below.
          </DialogContentText>
          <form onSubmit={handleEditSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Product Name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="description"
              label="Description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="stock"
              label="Stock"
              name="stock"
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="price"
              label="Price"
              name="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <FormControl variant="outlined" margin="normal" fullWidth required>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                label="Category"
              >
                {categories.map((cat) => (
                  <MenuItem key={cat._id} value={cat._id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="edit-image"
              type="file"
              onChange={handleImageChange}
            />
            <label htmlFor="edit-image">
              <Button variant="contained" color="primary" component="span">
                Upload Image
              </Button>
              {image && <Typography variant="body2" style={{ marginLeft: '10px' }}>{image.name}</Typography>}
            </label>
            <DialogActions>
              <Button onClick={() => setEditDialogOpen(false)} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Save Changes
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default Products;
