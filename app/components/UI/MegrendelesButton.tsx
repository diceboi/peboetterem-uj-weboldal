"use client"

import { AddToCartContext } from '@/app/addToCart';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { Toaster, toast } from 'sonner';

const getAlapadatok = async () => {
  try {
      const res = await fetch('/api/alapadatok', { next: { revalidate: 5 } });

      if (!res.ok) {
          throw new Error("Az adatok letöltése nem sikerült");
      }

      return res.json();
  } catch (error) {
      console.log("Az adatok betöltése sikertlen", error);
      return null;
  }
};

export default function MegrendelesButton({title, icon, formData, elkeszult, kiszallitva}:any) {

  const {cartItems, emptyCart}:any = useContext(AddToCartContext)

  const router = useRouter()

  const [isOrderingOpen, setIsOrderingOpen] = useState(true);
  const [alapadatok, setAlapadatok] = useState<any[]>([]);
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

  useEffect(() => {
    const fetchData = async () => {
        try {
            const data = await getAlapadatok();
            if (data && data.data && Array.isArray(data.data.Alapadatok)) {
              setAlapadatok(data.data.Alapadatok);
            } else {
                throw new Error("Invalid data format received");
            }
        } catch (error) {
            console.error("Error fetching or handling data:", error);
        }
    };
    fetchData();
  }, []);

  const alapadatokData = alapadatok.length > 0 ? alapadatok[0] : null;

  useEffect(() => {
    const checkOrderingStatus = () => {
      if (alapadatokData && alapadatokData.rendelesfelvetel) {
        const orderingTime = new Date(`${new Date().toDateString()} ${alapadatokData.rendelesfelvetel}`);
        const currentTime = new Date();

        const timeDifference = currentTime.getTime() - orderingTime.getTime();
        const timeDifferenceInMinutes = timeDifference / (1000 * 60);

        if (timeDifferenceInMinutes > 10) {
          setCursorClassName('flex flex-nowrap items-center gap-1 py-1 lg:py-2 px-2 lg:px-4 bg-[--okker] text-[--navy] font-bebas h-min text-sm lg:text-lg rounded-md shadow-md cursor-not-allowed opacity-50');
          setIsOrderingOpen(false);
        } else {
          setIsOrderingOpen(true);
        }
      }
    };

    // Check ordering status initially
    checkOrderingStatus();

    // Check ordering status every minute
    const intervalId = setInterval(() => {
      checkOrderingStatus();
    }, 60 * 1000);

    return () => {
      clearInterval(intervalId); // Cleanup interval on component unmount
    };
  }, [alapadatokData]);



  async function handleEmail(event: any) {
    event.preventDefault();

    setLoading(true); // Töltési állapot beállítása

    if (!isOrderingOpen) {
      setLoading(false);
      return;
    }

    const data = { formData, cartItems };

    const response = await fetch("/api/email/rendeles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    setLoading(false); // Töltési állapot visszaállítása

    if (response.ok) {
      setSubmissionMessage('Az üzenetet sikeresen elküldtük'); // Sikeres küldés üzenetének beállítása
    } else {
      setSubmissionMessage('Az üzenet küldése sikertelen volt'); // Sikertelen küldés üzenetének beállítása
    }
  }

  const handleDb = async () => {
    if (!isOrderingOpen) {
      toast.error(`A rendelésfelvétel ${alapadatokData.rendelesfelvetel}-ig volt lehetséges, sajnos a mai napra már nem tudunk rendeléseket felvenni.`, {
        className: 'warningtoaster',
        duration: 5000,
      });
      return;
    }

    const data = { formData, cartItems, elkeszult, kiszallitva };

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
        console.log(data);
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
