import React from 'react';
import Cart from '../components/Cart';

const CartPage = ({ cart }) => {
  return (
    <div>
      <Cart cart={cart} />
    </div>
  );
};

export default CartPage;
