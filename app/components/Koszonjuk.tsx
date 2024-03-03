"use client"

import Link from 'next/link';

export default function Koszonjuk() {
  return (
    <>
    <section className='flex flex-col items-center justify-center w-full h-[100vh] bg-[--navy] py-4'>
      <h1 className='text-center'>Köszönjük a vásárlást, jó étvágyat!</h1>
      <Link href='/'>
        <button className='flex flex-nowrap items-center gap-1 py-1 lg:py-2 px-2 lg:px-4 bg-[--okker] text-[--navy] font-bebas h-min text-sm lg:text-lg rounded-md shadow-md cursor-pointer'>Vissza a főoldalra</button>
      </Link>
    </section>
    </>
  );
}