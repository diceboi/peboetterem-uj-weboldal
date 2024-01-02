"use client";

import { createContext, useEffect, useState } from "react";

interface CartItem {
  count: number;
  _id: string;
  // Add other properties as needed
}

export const AddToCartContext = createContext({});

export default function AddToCartProvider({ children }:any) {

  useEffect(() => {
    const storedCart = localStorage.getItem('pebocart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  /*Cart opening toggle*/ 
  const [isCartClosed, setIsCartClosed] = useState(true);

  const toggleCartOpen = () => {
    setIsCartClosed((prevState) => !prevState);
  };

  const setCartOpen = () => {
    setIsCartClosed(false);
  };
  
  const setCartClose = () => {
    setIsCartClosed(true);
  };

  const cartClassName = isCartClosed ? '-right-[10vw] opacity-0 hidden:delay-200' : 'right-0';
        

  /*Manage cart items*/ 
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    if (cartItems.length > 0){
      localStorage.setItem('pebocart', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  function handleAddToCart(newItem: CartItem) {
    setCartItems((prevCartItems) => {
      const itemIndex = prevCartItems.findIndex((item) => item._id === newItem._id);

      if (itemIndex !== -1) {
        return prevCartItems.map((item, index) =>
          index === itemIndex ? { ...item, count: item.count + 1 } : item
        );
      } else {
        return [...prevCartItems, { ...newItem, count: 1 }];
      }
    });
  }

  function handleDecreaseCount({ _id, count }: CartItem) {
    const itemIndex = cartItems.findIndex((item) => item._id === _id);

    if (itemIndex !== -1 && cartItems[itemIndex].count > 1) {
      setCartItems((prevItems) =>
        prevItems.map((item, index) =>
          index === itemIndex ? { ...item, count: item.count - 1 } : item
        )
      );
    } else if (itemIndex !== -1 && cartItems[itemIndex].count === 1) {
      const updatedCart = cartItems.filter((item) => item._id !== _id);
      setCartItems(updatedCart);
    }
  }

  function handleDeleteCartItem(itemId: string) {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item._id !== itemId)
    );
  }

  function getTotalItemCount() {
    return cartItems.reduce((total, item) => total + item.count, 0);
  }

  return (
    <AddToCartContext.Provider value={{
      isCartOpen: !isCartClosed,
      cartItems, 
      handleAddToCart, 
      handleDecreaseCount, 
      handleDeleteCartItem,
      toggleCartOpen,
      setCartOpen,
      setCartClose,
      getTotalItemCount
    }}>
      {children}
    </AddToCartContext.Provider>
  );
}
