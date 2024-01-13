'use client'

import { createContext, useEffect, useState } from "react";

interface CartItem {
  count: number;
  _id: string;
}

interface AddToCartContextProps {
  isCartOpen: boolean;
  cartItems: CartItem[];
  handleAddToCart: (item: CartItem) => void;
  handleDecreaseCount: (item: CartItem) => void;
  handleDeleteCartItem: (itemId: string) => void;
  toggleCartOpen: () => void;
  setCartOpen: () => void;
  setCartClose: () => void;
  isMenuClosed: boolean,
  toggleMenuOpen: () => void,
  setMenuOpen: () => void,
  setMenuClose: () => void,
  getTotalItemCount: () => number; // Adjusted this return type from 0 to number
  getTotalPrice: () => number;
  emptyCart: () => void;
  itemNotes: { [itemId: string]: string };
  updateItemNote: (itemId: string, note: string) => void;
}

export const AddToCartContext = createContext<AddToCartContextProps>({
  // Provide default values for context properties
  isCartOpen: false,
  cartItems: [],
  handleAddToCart: (item: CartItem) => {},
  handleDecreaseCount: (item: CartItem) => {},
  handleDeleteCartItem: (itemId: string) => {},
  toggleCartOpen: () => {},
  setCartOpen: () => {},
  setCartClose: () => {},
  isMenuClosed: true,
  toggleMenuOpen: () => {},
  setMenuOpen: () => {},
  setMenuClose: () => {},
  getTotalItemCount: () => 0,
  getTotalPrice: () => 0,
  emptyCart: () => {},
  itemNotes: {},
  updateItemNote: (itemId: string, note: string) => {},
});

export default function AddToCartProvider({ children }: any) {
  const [isCartClosed, setIsCartClosed] = useState(true);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isMenuClosed, setIsMenuClosed] = useState(false);
  const [itemNotes, setItemNotes] = useState<{ [itemId: string]: string }>({});

  // Access `localStorage` only within this `useEffect` to ensure it’s client-side
  useEffect(() => {
    const storedCart = typeof window !== 'undefined' ? localStorage.getItem('pebocart') : null;
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    // Only update local storage if we have items
    if (cartItems.length > 0) {
      localStorage.setItem('pebocart', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  /*Cart opening toggle*/ 

  const toggleCartOpen = () => {
    setIsCartClosed((prevState) => !prevState);
  };

  const setCartOpen = () => {
    setIsCartClosed(false);
  };
  
  const setCartClose = () => {
    setIsCartClosed(true);
  };

  /*Menu opening toggle*/

  const toggleMenuOpen = () => {
    setIsMenuClosed((prevState) => !prevState);
  };

  const setMenuOpen = () => {
    setIsMenuClosed(false);
  };
  
  const setMenuClose = () => {
    setIsMenuClosed(false);
  };


 /*Megjegyzés minden termékhez */
 const updateItemNote = (itemId: string, note: string) => {
  setItemNotes((prevNotes) => ({
    ...prevNotes,
    [itemId]: note,
  }));
};
        

  /*Manage cart items*/ 

  function handleAddToCart(newItem: CartItem) {
    setCartItems((prevCartItems) => {
      const itemIndex = prevCartItems.findIndex((item) => item._id === newItem._id);
  
      if (itemIndex !== -1) {
        // If the item already exists, update its count and notes
        return prevCartItems.map((item, index) =>
          index === itemIndex ? { ...item, count: item.count + 1, notes: itemNotes[newItem._id] || '' } : item
        );
      } else {
        // If the item is new, add it to the cart with count and notes
        return [...prevCartItems, { ...newItem, count: 1, notes: itemNotes[newItem._id] || '' }];
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


  function getTotalPrice() {
    return cartItems.reduce((accumulator: number, currentItem: any) => {
      const itemPrice = currentItem.type === 0 ? currentItem.elsodlegesar : currentItem.masodlagosar;
      return accumulator + itemPrice * currentItem.count;
    }, 0);
  }

  function emptyCart() {
    setCartItems([]);
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
      isMenuClosed,
      toggleMenuOpen,
      setMenuClose,
      setMenuOpen,
      getTotalItemCount,
      getTotalPrice,
      emptyCart,
      itemNotes,
      updateItemNote,
    }}>
      {children}
    </AddToCartContext.Provider>
  );
}
