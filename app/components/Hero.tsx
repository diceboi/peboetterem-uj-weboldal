"use client"

export const dynamic = "force-dynamic";

import Image from "next/image";
import Current from "./Current";
import { useEffect } from "react";
import { Toaster, toast } from "sonner";
import Link from "next/link";


export default function Hero() {

  return (
    <section id="mainhero" className="relative flex flex-col justify-center items-center gap-10 w-full lg:mt-0 mt-[55px] lg:min-h-[60vh] min-h-[80vh] bg-[--navyblur]">
      <div className="absolute w-full h-full opacity-100 mix-blend-overlay bg-[url('/herobg.webp')] bg-cover bg-no-repeat bg-center"></div>
      <div className="container flex flex-col lg:flex-nowrap gap-10 justify-center items-center z-10 w-1/3 lg:mb-0 mb-20 bg-[--navyblur] p-4 backdrop-blur-sm border border-[--lightnavy] rounded-lg">
        <h1>Kedves vendégeink</h1>
        <p className="text-center text-white">A nyári időszakra éttermünk a mai napon (2024.05.03.) bezár, megértéseteket köszönjük! Minden jót kíván a PEBo Étterem teljes csapata!</p>
        
      </div>
    </section>
  )
}
