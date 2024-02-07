"use client"

import Image from "next/image"
import Link from "next/link"
import { PiPhone } from "react-icons/pi"
import { TbPhone, TbShoppingCartPlus } from "react-icons/tb"
import MenuButton from "./MenuButton"
import { useEffect, useState } from 'react'

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
      <div className="flex flex-col p-4 bg-gradient-to-br from-[--alert] to-[--navy] backdrop-blur-lg rounded-md shadow-2xl">
          <Image 
              src='/valentin-nap.webp'
              alt="egyketto"
              style={{objectFit: "contain", objectPosition: "right center"}}
              fill={true}
              className="opacity-25 rounded-md"
          />
          <div className="flex lg:flex-row flex-col items-center justify-center gap-8 ">
            <h1 className='leading-[.75em] z-10  text-white text-center'>Valentin napi ajánlat</h1>
            <p className="text-3xl text-[white] p-3 bg-[--alert] rounded-md ">9 990 Ft</p>
          </div>
          <div className="flex flex-col lg:flex-row items-center gap-0 lg:gap-8 py-8 text-white z-10">
              <div className="flex flex-col pr-8 p-4 rounded-md backdrop-blur-sm bg-[--navyblur] w-full lg:w-1/3">
                <p className="font-bebas text-[--okker] text-3xl pb-8">Romantika leves 2 főre</p>
                <div className="flex flex-col  gap-4">
                    <p className="text-md">Húsleves cérnametélttel</p>
                    <p className="text-md text-[--okker]">VAGY</p>
                    <p className="text-md">Eperkrémleves túrógombóccal</p>
                </div> 
              </div>
              <p className="font-bebas text-[--okker] text-8xl">+</p>
              <div className="flex flex-col pr-8 p-4 rounded-md backdrop-blur-sm bg-[--navyblur] w-full lg:w-1/3">
                  <p className="font-bebas text-[--okker] text-3xl pb-8">Szerelmes tál 2 főre</p>
                  <div className="flex flex-col  gap-4">
                    <p className="text-md">Aszalt szilvával+sajttal töltött csirkemell rántva, zöldségekkel+sajttal töltött csirkemell, sertésszelet lecsó ágyon, fűszeres burgonya, rizs</p>
                    <p className="text-md text-[--okker]">VAGY</p>
                    <p className="text-md">Barackkal+sajttal töltött csirkemell, sajtkrémmel töltött csirke, sertésszelet barna mártással, hasábburgonya, rizibizi</p>
                  </div>
              </div>
              <p className="font-bebas text-[--okker] text-8xl">+</p>
              <div className="flex flex-col pr-8 border p-4 rounded-md border-[--lightnavy] backdrop-blur-sm bg-[--navyblur] w-full lg:w-1/3">
                  <p className="font-bebas text-[--okker] text-3xl">Tiramisu 2 főre</p>
              </div>
              
          </div>
          <div className="flex flex-col justify-center items-center w-min-max z-10">
            <p className="p-2 text-center text-white border border-white rounded-md my-8">Kiszállítás: 02.14-én telefonos egyeztetés alapján</p>
            <Link href={'/etlap'}><button className="flex flex-nowrap items-center gap-1 hover:gap-3 py-1 lg:py-2 px-2 lg:px-4 bg-[--okker] text-[--navy] font-bebas h-min text-lg hover:bg-[--okkerdark] rounded-md shadow-md hover:shadow-lg transition-all ease-in-out z-10">Előrendelés</button></Link>
          </div>
      </div>
    </div>
  )
}
