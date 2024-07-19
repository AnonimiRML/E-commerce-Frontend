import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cartItems');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Error parsing cart items from localStorage:', error);
      localStorage.removeItem('cartItems');
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const itemIndex = prevItems.findIndex((i) => i._id === item._id);
      if (itemIndex >= 0) {
        const updatedItems = [...prevItems];
        updatedItems[itemIndex].quantity += item.quantity;
        return updatedItems;
      }
      return [...prevItems, item];
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartQuantity = (itemId) => {
    const item = cartItems.find((item) => item._id === itemId);
    return item ? item.quantity : 0;
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, getCartQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
