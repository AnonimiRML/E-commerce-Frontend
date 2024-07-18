import React, { useState } from 'react';
import { Container, Grid, Paper, Typography, List, ListItem, ListItemIcon, ListItemText, Drawer, Box, IconButton, AppBar, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StorefrontIcon from '@mui/icons-material/Storefront';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import PaymentIcon from '@mui/icons-material/Payment';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import Users from '../components/AdminDashboard/Users';
import Orders from '../components/AdminDashboard/Orders';
import Products from '../components/AdminDashboard/Products';
import Settings from '../components/AdminDashboard/Settings';
import Home from '../components/AdminDashboard/Home';
import Payments from '../components/AdminDashboard/Payments';
import Shipping from '../components/AdminDashboard/Shipping';
import Integrations from '../components/AdminDashboard/Integrations';

const drawerWidth = 240;

const AdminDashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState('Home');

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'Users':
        return <Users />;
      case 'Orders':
        return <Orders />;
      case 'Products':
        return <Products />;
      case 'Settings':
        return <Settings />;
      case 'Home':
        return <Home />;
      case 'Payments':
        return <Payments />;
      case 'Shipping':
        return <Shipping />;
      case 'Integrations':
        return <Integrations />;
      default:
        return <Home />;
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        <List>
          <ListItem button onClick={() => setSelectedComponent('Home')}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button onClick={() => setSelectedComponent('Users')}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
          <ListItem button onClick={() => setSelectedComponent('Orders')}>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Orders" />
          </ListItem>
          <ListItem button onClick={() => setSelectedComponent('Products')}>
            <ListItemIcon>
              <StorefrontIcon />
            </ListItemIcon>
            <ListItemText primary="Products" />
          </ListItem>
          <ListItem button onClick={() => setSelectedComponent('Settings')}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
          <ListItem button onClick={() => setSelectedComponent('Payments')}>
            <ListItemIcon>
              <PaymentIcon />
            </ListItemIcon>
            <ListItemText primary="Payments" />
          </ListItem>
          <ListItem button onClick={() => setSelectedComponent('Shipping')}>
            <ListItemIcon>
              <LocalShippingIcon />
            </ListItemIcon>
            <ListItemText primary="Shipping" />
          </ListItem>
          <ListItem button onClick={() => setSelectedComponent('Integrations')}>
            <ListItemIcon>
              <IntegrationInstructionsIcon />
            </ListItemIcon>
            <ListItemText primary="Integrations" />
          </ListItem>
        </List>
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        open
      >
        <Toolbar />
        <List>
          <ListItem button onClick={() => setSelectedComponent('Home')}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button onClick={() => setSelectedComponent('Users')}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
          <ListItem button onClick={() => setSelectedComponent('Orders')}>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Orders" />
          </ListItem>
          <ListItem button onClick={() => setSelectedComponent('Products')}>
            <ListItemIcon>
              <StorefrontIcon />
            </ListItemIcon>
            <ListItemText primary="Products" />
          </ListItem>
          <ListItem button onClick={() => setSelectedComponent('Settings')}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
          <ListItem button onClick={() => setSelectedComponent('Payments')}>
            <ListItemIcon>
              <PaymentIcon />
            </ListItemIcon>
            <ListItemText primary="Payments" />
          </ListItem>
          <ListItem button onClick={() => setSelectedComponent('Shipping')}>
            <ListItemIcon>
              <LocalShippingIcon />
            </ListItemIcon>
            <ListItemText primary="Shipping" />
          </ListItem>
          <ListItem button onClick={() => setSelectedComponent('Integrations')}>
            <ListItemIcon>
              <IntegrationInstructionsIcon />
            </ListItemIcon>
            <ListItemText primary="Integrations" />
          </ListItem>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, marginLeft: { sm: `${drawerWidth}px` } }}
      >
        <Toolbar />
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {renderComponent()}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
