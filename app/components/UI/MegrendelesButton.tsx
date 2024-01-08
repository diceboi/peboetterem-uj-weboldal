"use client"

import { AddToCartContext } from '@/app/addToCart';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { Toaster, toast } from 'sonner';

export default function MegrendelesButton({title, icon, formData, elkeszult, kiszallitva}:any) {

  const {cartItems, emptyCart}:any = useContext(AddToCartContext)

  const router = useRouter()

  const [loading, setLoading] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState('');
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


  async function handleEmail(event:any) {
      event.preventDefault();

      setLoading(true); // Töltési állapot beállítása
  
      const data = {formData, cartItems}
      
      const response = await fetch("/api/email/rendeles", {
          method: "POST",
          headers: {
          "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
      })

      setLoading(false); // Töltési állapot visszaállítása
      
      if (response.ok) {
          setSubmissionMessage('Az üzenetet sikeresen elküldtük'); // Sikeres küldés üzenetének beállítása
      }
      if (!response.ok) {
          setSubmissionMessage('Az üzenet küldése sikertelen volt'); // Sikertelen küldés üzenetének beállítása
      }
  }


  const handleDb = async () => {

    const data = {formData, cartItems, elkeszult, kiszallitva}

    setLoading(true);

    try {
        const res = await fetch(`/api/rendelesek`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
        });

        if (res.ok) {
            toast.success('Sikeres rendelés!', {
              duration: 5000,
            });
            emptyCart();
            setTimeout(() => {
                router.push('/');
            }, 4000);
        } else {
            toast.error('A rendelés nem sikerült.');
        }
    } catch (error) {
        console.error('Error updating data:', error);
    }
};

  return (
    <>
    <button 
    className={cursorClassName} type='submit' onClick={(event) => {handleDb(); handleEmail(event);}}>
        {icon}
        {title}
    </button>
    <Toaster richColors position="bottom-center"/>
    </>
  )
}
