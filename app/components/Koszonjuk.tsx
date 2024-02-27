"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Koszonjuk() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount === 1) {
          // Redirect to the main page when countdown reaches 1
          clearInterval(countdownInterval);
          router.push('/');
        }
        return prevCount - 1;
      });
    }, 1000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(countdownInterval);
  }, [router]);

  return (
    <section className='flex flex-col items-center justify-center w-full h-[100vh] bg-[--navy]'>
      <h1>Köszönjük a vásárlást, jó étvágyat!</h1>
      <p className='text-[--grey]'>{`${countdown} másodperc múlva visszairányítjuk a főoldalra.`}</p>
    </section>
  );
}