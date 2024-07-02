import React from 'react';
import { useSelector } from 'react-redux';

const CartIcon = () => {
  const {cartTotalQuantity} = useSelector(state => state.cart)

  return (
    <span className="relative group ">
      <svg className="h-7 w-8 text-black group-hover:text-blue-300 group-hover:transition duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
      </svg>
      <span className="absolute top-1 right-0 flex justify-center items-center h-4 w-4 rounded-full bg-red-500 text-white group-hover:bg-blue-300 group-hover:transition duration-300"
        style={{ fontSize: '1rem', fontWeight: 100, letterSpacing: '0' }}>
        {cartTotalQuantity}
      </span>
    </span>
  );
};

export default CartIcon;
