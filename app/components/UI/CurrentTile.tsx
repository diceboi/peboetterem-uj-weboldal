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
    <div className="flex flex-col container m-auto">
      <div className="flex flex-col p-4 bg-gradient-to-br from-[--grey] to-[--navy] backdrop-blur-lg rounded-md shadow-2xl">
          <Image 
              src='/husveti-talak.webp'
              alt="egyketto"
              style={{objectFit: "contain", objectPosition: "right center"}}
              fill={true}
              className="opacity-25 rounded-md"
          />
          <div className="flex lg:flex-row flex-col items-center justify-center gap-8 ">
            <h1 className='leading-[.75em] z-10  text-[--navy] text-center'>Húsvéti ajánlat</h1>
            <div className="flex flex-col justify-center items-center gap-2 text-[white] p-3 bg-[--alert] rounded-md"><p className="text-3xl">6 990 Ft</p><p className="text-xs">+ 500 Ft csomagolás</p></div>
          </div>
          <div className="flex flex-col lg:flex-row justify-center items-center w-full m-auto gap-0 lg:gap-8 py-8 text-white z-10">
              <div className="flex flex-col p-4 rounded-md  bg-[#ffffff15] backdrop-blur-sm shadow-2xl w-full lg:w-1/3">
                <div className="flex flex-nowrap justify-between w-full gap-2 pb-2 border-b border-[--lightestnavy]">
                  <GiHotMeal className='text-[--navy] w-8 h-auto -mt-2'/>
                  <p className="font-bebas text-[--navy] text-3xl">Hímes tojás tál 2 főre</p>
                </div>
                <div className="flex flex-col pt-2 gap-4">
                    <p className="text-md text-[--navy]">Franciasaláta, majonézes burgonyasaláta, kaszinótojás, főtt sonka, fasírtgolyó, csirkemell tekercs tojással töltve</p>
                </div> 
              </div>
              <p className="font-bebas text-[--okker] text-6xl">vagy</p>
              <div className="flex flex-col p-4 rounded-md  bg-[#ffffff15] backdrop-blur-sm shadow-2xl w-full lg:w-1/3">
                <div className="flex flex-nowrap justify-between w-full gap-2 pb-2 border-b border-[--lightestnavy]">
                  <GiHotMeal className='text-[--navy] w-8 h-auto -mt-2'/>
                  <p className="font-bebas text-[--navy] text-3xl">Locsoló tál 2 főre</p>
                </div>
                <div className="flex flex-col pt-2 gap-4">
                    <p className="text-md text-[--navy]">Kemencés csülök,  rántott füstölt csülök, tormával töltött csirke rántva, rántott karfiol, rizs, steak burgonya</p>
                </div> 
              </div>
          </div>
          <div className="flex flex-col justify-center items-center w-min-max z-10">
            <p className="p-2 text-center text-white border border-white rounded-md my-8"><strong>Előrendelést</strong> 03.29-ig veszünk fel. <strong>Kiszállítás</strong> 03.30-án vagy 03.31-én délig telefonos egyeztetés alapján!</p>
            <Link href={'/etlap'}><button className="flex flex-nowrap items-center gap-1 hover:gap-3 py-1 lg:py-2 px-2 lg:px-4 bg-[--okker] text-[--navy] font-bebas h-min text-lg hover:bg-[--okkerdark] rounded-md shadow-md hover:shadow-lg transition-all ease-in-out z-10">Előrendelés</button></Link>
          </div>
      </div>
    </div>
  )
}
