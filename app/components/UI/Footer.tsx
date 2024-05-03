"use client"

import Image from "next/image";
import { FaFacebook } from 'react-icons/fa'

import Link from "next/link";
import { useEffect, useState } from "react";

const getAlapadatok = async () => {
  try {
      const res = await fetch('/api/alapadatok', { next: { revalidate: 5 } });

      if (!res.ok) {
          throw new Error("Az adatok letöltése nem sikerült");
      }

      return res.json();
  } catch (error) {
      console.log("Az adatok betöltése sikertlen", error);
      return null;
  }
};

export default function Footer() {

  const [alapadatok, setAlapadatok] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const data = await getAlapadatok();
            if (data && data.data && Array.isArray(data.data.Alapadatok)) {
              setAlapadatok(data.data.Alapadatok);
            } else {
                throw new Error("Invalid data format received");
            }
        } catch (error) {
            console.error("Error fetching or handling data:", error);
        }
    };
    fetchData();
  }, []);

    const alapadatokData = alapadatok.length > 0 ? alapadatok[0] : null;

  return (
    <section id="footer" className="w-full bg-[--navy] lg:py-20 py-4 px-4">
        <div className="flex flex-col container m-auto p-4 lg:p-0">
            <div className="flex flex-col lg:flex-row justify-between border-b border-[--lightnavy] py-8 gap-8">

            {alapadatokData && (
              <>
                <div className="flex flex-col justify-start gap-4">
                    <Image src="/pebo-hero-logo.png" width={100} height={100} alt="PEBo logo"/>                   
                    <h3 className="footertitle">PEBo Gasztro Kft.</h3>
                    <p className="footerparagraph">{alapadatokData.cim}</p>
                    <div className="flex flex-nowrap">
                      <Link href="https://www.facebook.com/peboetterem" target="_blank" className="w-7 h-7"><FaFacebook className="w-full h-full text-[--grey]"/></Link>
                    </div>
                </div>
                <div className="flex flex-col justify-start gap-4">
                    <h3 className="footertitle">Nyitvatartás</h3>
                    <p className="footerparagraph">H - P: {alapadatokData.nyitvatartashepe}</p>
                    <p className="footerparagraph">Szo: {alapadatokData.nyitvatartasszo}</p>
                    <p className="footerparagraph">V: {alapadatokData.nyitvatartasv}</p>
                    <p className="footerparagraph"><b>Rendelésfelvétel: 20:15-ig</b></p>
                </div>
                <div className="flex flex-col justify-start gap-4">
                    <h3 className="footertitle">Elérhetőség</h3>
                    <Link href={`tel:${alapadatokData.vezetekes}`}><p className="footerparagraph">{alapadatokData.vezetekes}</p></Link>
                    <Link href={`tel:${alapadatokData.mobil}`}><p className="footerparagraph">{alapadatokData.mobil}</p></Link>
                </div>
                <div className="flex flex-col justify-start gap-4">
                    <h3 className="footertitle">Linkek</h3>
                    <Link href="/adatkezelesi-tajekoztato"><p className="footerparagraph hover:underline">Adatkezelési tajekoztato</p></Link>
                </div>

                </>

            )}
            </div>
            <div className="flex justify-center py-4">
                <p className="text-[--grey] opacity-25 text-sm">peboetterem.hu @ Minden jog fenntartva</p>
            </div>
        </div>
    </section>
  )
}
