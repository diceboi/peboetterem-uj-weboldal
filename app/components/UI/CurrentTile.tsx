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
    <div className="relative container m-auto flex flex-col p-4 bg-[--navyblur] backdrop-blur-lg border border-[--lightnavy] rounded-md shadow-2xl">
        <Image 
            src='/valentin-nap.webp'
            alt="egyketto"
            style={{objectFit: "contain", objectPosition: "right center"}}
            fill={true}
            className="opacity-50 rounded-md"
        />
        <h1 className='leading-[.75em] z-10 -mt-12 text-[--alert]'>Valentin napi ajánlat</h1>
        <div className="flex flex-col py-8 text-white z-10">
            <div className="py-2">
                <p className="font-bebas text-[--okker] text-2xl">Romantika leves 2 főre</p>
                <p className="text-md">Húsleves cérnametélttel, VAGY Eperkrémleves túrógombóccal</p>
            </div>
            <div className="py-2">
                <p className="font-bebas text-[--okker] text-2xl">Szerelmes tál 2 főre</p>
                <p className="text-md">Aszalt szilvával+sajttal töltött csirkemell rántva, zöldségekkel+sajttal töltött csirkemell, sertésszelet lecsó ágyon, fűszeres burgonya, rizs, VAGY Barackkal+sajttal töltött csirkemell, sajtkrémmel töltött csirke, sertésszelet barna mártással, hasábburgonya, rizibizi</p>
            </div>
            <div className="py-2">
                <p className="font-bebas text-[--okker] text-2xl">Tiramisu 2 főre</p>
            </div>
        </div>
        <MenuButton title={`Előrendelés`} icon={<TbShoppingCartPlus />} disabled={''} rendelesfelvetel={''} termek={termekek} tipus ={0} />
    </div>
  )
}
