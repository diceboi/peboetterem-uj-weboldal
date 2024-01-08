"use client"

import { AddToCartContext } from '@/app/addToCart';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

export default function PenztarButton({title, icon}:any) {

  const {cartItems, handleAddToCart, setCartClose}:any = useContext(AddToCartContext)
  const router = useRouter()

  const [cursorClassName, setCursorClassName] = useState(
    cartItems.length === 0
      ? 'flex flex-nowrap items-center gap-1 py-1 lg:py-2 px-2 lg:px-4 bg-[--okker] text-[--navy] font-bebas h-min text-sm lg:text-lg rounded-md shadow-md cursor-not-allowed opacity-50'
      : 'flex flex-nowrap items-center gap-1 hover:gap-3 py-1 lg:py-2 px-2 lg:px-4 bg-[--okker] text-[--navy] font-bebas h-min text-sm lg:text-lg hover:bg-[--okkerdark] rounded-md shadow-md hover:shadow-lg transition-all ease-in-out'
  );

  useEffect(() => {
    const newClassName =
      cartItems.length === 0
        ? 'flex flex-nowrap items-center gap-1 py-1 lg:py-2 px-2 lg:px-4 bg-[--okker] text-[--navy] font-bebas h-min text-sm lg:text-lg rounded-md shadow-md cursor-not-allowed opacity-50'
        : 'flex flex-nowrap items-center gap-1 hover:gap-3 py-1 lg:py-2 px-2 lg:px-4 bg-[--okker] text-[--navy] font-bebas h-min text-sm lg:text-lg hover:bg-[--okkerdark] rounded-md shadow-md hover:shadow-lg transition-all ease-in-out';

    setCursorClassName(newClassName);
  }, [cartItems]);

  const handleClick = () => {
    if (cartItems.length > 0) {
      router.push('/penztar');
      setCartClose();
    }
  };

  return (
    <>
    <button 
    className={cursorClassName} onClick={handleClick}>
        {icon}
        {title}
    </button>
    
    </>
  )
}
