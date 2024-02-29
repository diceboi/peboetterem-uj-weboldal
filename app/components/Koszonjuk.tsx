"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { sendGTMEvent } from "@next/third-parties/google";
import { useSearchParams } from 'next/navigation'
import Script from 'next/script';
import Link from 'next/link';

export default function Koszonjuk() {
  const router = useRouter();
  const searchParams = useSearchParams()
  const value = searchParams.get('value')

  return (
    <>
    <section className='flex flex-col items-center justify-center w-full h-[100vh] bg-[--navy]'>
      <h1>Köszönjük a vásárlást, jó étvágyat!</h1>
      <Link href='/'>
        <button className='flex flex-nowrap items-center gap-1 py-1 lg:py-2 px-2 lg:px-4 bg-[--okker] text-[--navy] font-bebas h-min text-sm lg:text-lg rounded-md shadow-md cursor-pointer'>Vissza a főoldalra</button>
      </Link>
    </section>
    </>
  );
}