"use client"

import Image from "next/image"
import Link from "next/link"
import { PiPhone } from "react-icons/pi"
import { TbPhone, TbShoppingCartPlus, TbSoup } from "react-icons/tb"
import { LuCakeSlice } from "react-icons/lu";
import MenuButton from "./MenuButton"
import { useEffect, useState } from 'react'
import { GiHotMeal } from "react-icons/gi"

const getTermekek = async () => {
    try {
        const res = await fetch('/api/termekek', { next: { revalidate: 5 } });
  
        if (!res.ok) {
            throw new Error("Az adatok letöltése nem sikerült");
        }
  
        return res.json();
    } catch (error) {
        console.log("Az adatok betöltése sikertlen", error);
        return null;
    }
  };

export default function CurrentTile() {

    const [termekek, setTermekek] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const fetchedData = await getTermekek();
    
            if (fetchedData && fetchedData.data && Array.isArray(fetchedData.data.Termekek)) {
              // Filter the termek with the specified index (91st item)
              const filteredTermekek = [fetchedData.data.Termekek[91]];
              console.log(fetchedData.data.Termekek[91]);
              setTermekek(fetchedData.data.Termekek[91]);
            } else {
              throw new Error("Invalid data format received");
            }
          } catch (error) {
            console.error("Error fetching or handling data:", error);
          }
        };
        fetchData();
      }, []);

  return (
    <div className="flex flex-col container m-auto -mt-20">
      <div className="flex flex-col p-8 bg-gradient-to-br from-[--grey] to-[--navy] backdrop-blur-lg rounded-md shadow-2xl">
          <Image 
              src='/ballagas-kalap.png'
              alt="egyketto"
              width={1000}
              height={1000}
              className="absolute opacity-25 rounded-md bottom-4 right-4 w-64"
          />
          <div className="flex lg:flex-row flex-col items-center justify-center gap-8 ">
            <h1 className='leading-[.75em] z-10  text-[--navy] text-center'>Ballagási ajánlat</h1>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-2 text-[white] p-3 bg-[--alert] rounded-md"><p className="text-4xl font-bebas">5 500 Ft</p><p className="text-xs">+ 500 Ft csomagolás</p></div>
          </div>
          <div className="flex flex-col lg:flex-row justify-center items-center w-full m-auto gap-0 lg:gap-8 py-8 text-white z-10">
              <div className="flex flex-col items-center justify-center p-4 rounded-md  bg-[#ffffff15] backdrop-blur-sm shadow-2xl w-full lg:w-1/3">

                  <p className="font-bebas text-[--navy] text-center text-3xl">🍲Tárkonyos csirkeraguleves</p>

              </div>
              <p className="font-bebas text-[--okker]  text-6xl">+</p>
              <div className="flex flex-col items-center justify-center p-4 rounded-md  bg-[#ffffff15] backdrop-blur-sm shadow-2xl w-full lg:w-1/3">

                  <p className="font-bebas text-[--navy] text-center text-3xl">🍗 cigánypecsenye, csirke cordon, szezámos csirke, rántott csülök, rizibizi, hasábburgonya</p>

              </div>
              <p className="font-bebas text-[--okker] text-6xl">+</p>
              <div className="flex flex-col items-center justify-center p-4 rounded-md  bg-[#ffffff15] backdrop-blur-sm shadow-2xl w-full lg:w-1/3">

                  <p className="font-bebas text-[--navy] text-center text-3xl">🍰 hideg túrógombóc dió köntösben, málnaraguval</p>

              </div>
          </div>
          <div className="flex flex-col justify-center items-center w-min-max z-10">
            
            <Link href={'/etlap'}><button className="flex flex-nowrap items-center gap-1 hover:gap-3 py-1 lg:py-2 px-2 lg:px-4 bg-[--alert] text-white font-bebas h-min text-2xl hover:bg-[--alerthover] rounded-md shadow-md hover:shadow-lg transition-all ease-in-out z-10">Előrendelés</button></Link>
          </div>
      </div>
    </div>
  )
}
