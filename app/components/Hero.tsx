"use client"

export const dynamic = "force-dynamic";

import Image from "next/image";
import Current from "./Current";


export default function Hero() {

  return (
    <section id="mainhero" className="relative flex flex-col justify-center items-center gap-10 w-full lg:mt-0 mt-[55px] min-h-[50vh] bg-[--navy]">
      <div className="absolute w-full h-full opacity-50 mix-blend-overlay bg-[url('/herobg-pizza-2.webp')] bg-cover bg-no-repeat bg-center"></div>
      <div className="container m-auto flex flex-wrap lg:flex-nowrap gap-10 justify-center items-center z-10 px-4">
        <Image src='/pebo-hero-logo.png' alt='pebo-logo' width={300} height={300} className="max-w-[100px] lg:max-w-[200px] max-h-[100px] lg:max-h-[200px]"/>
        <p className="w-11/12 lg:w-1/2 text-center lg:text-left text-md lg:text-lg text-[--grey]">Olaszos és klasszikus ízekkel, vagy egy igazán jó kávéval várunk Kaposvár szívében. Szerezz örömteli pillanatokat nálunk hangulatos környezetben.</p>
      </div>
    </section>
  )
}
