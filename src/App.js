import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import ProductPage from './pages/ProductPage';

const App = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item._id === product._id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item._id === productId);
      if (existingProduct.quantity === 1) {
        return prevCart.filter((item) => item._id !== productId);
      } else {
        return prevCart.map((item) =>
          item._id === productId ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
    });
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} />} />
        <Route path="/checkout" element={<Checkout cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} />} />
        <Route path="/product/:id" element={<ProductPage cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} />} />
      </Routes>
    </Router>
  );
};

export default App;
