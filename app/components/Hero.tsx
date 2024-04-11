"use client"

export const dynamic = "force-dynamic";

import Image from "next/image";
import Current from "./Current";
import { useEffect } from "react";
import { Toaster, toast } from "sonner";
import Link from "next/link";


export default function Hero() {

  return (
    <section id="mainhero" className="relative flex flex-col justify-center items-center gap-10 w-full lg:mt-0 mt-[55px] min-h-[60vh] bg-[--navyblur]">
      <div className="absolute w-full h-full opacity-100 mix-blend-overlay bg-[url('/herobg.webp')] bg-cover bg-no-repeat bg-center"></div>
      <div className="container flex flex-wrap lg:flex-nowrap gap-10 justify-center items-center z-10 max-w-[1024px]">
        <Image src='/pebo-hero-logo.png' alt='pebo-logo' width={300} height={300} className="max-w-[100px] lg:max-w-[200px] max-h-[100px] lg:max-h-[200px]"/>
        <div className="flex flex-col gap-4">
          <p className="w-full text-center lg:text-left text-md lg:text-lg text-white font-medium">Olaszos és klasszikus ízekkel, vagy egy igazán jó kávéval várunk Kaposvár szívében. Szerezz örömteli pillanatokat nálunk hangulatos környezetben.</p>
          <div className="flex flex-nowrap lg:justify-start justify-center gap-4">
            <Link href="/napi-menu"><button className="flex flex-nowrap items-center gap-1 hover:gap-3 py-1 lg:py-2 px-2 lg:px-4 bg-[--okker] text-[--navy] font-bebas h-min text-lg hover:bg-[--okkerdark] rounded-md shadow-md hover:shadow-lg transition-all ease-in-out z-10">Napi menü</button></Link>
            <Link href="/etlap"><button className="flex flex-nowrap items-center gap-1 hover:gap-3 py-1 lg:py-2 px-2 lg:px-4 bg-[--okker] text-[--navy] font-bebas h-min text-lg hover:bg-[--okkerdark] rounded-md shadow-md hover:shadow-lg transition-all ease-in-out z-10">Étlap</button></Link>
          </div>
        </div>
        
      </div>
    </section>
  )
}
