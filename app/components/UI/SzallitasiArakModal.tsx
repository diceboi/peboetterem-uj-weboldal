"use client"

import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

const getNapimenuadatok = async () => {
    try {
        const res = await fetch('/api/napimenuadatok', { next: { revalidate: 5 } });
  
        if (!res.ok) {
            throw new Error("Az adatok letöltése nem sikerült");
        }
  
        return res.json();
    } catch (error) {
        console.log("Az adatok betöltése sikertlen", error);
        return null;
    }
  };

  const getSpecialisarak = async () => {
    try {
        const res = await fetch('/api/specialisarak', { next: { revalidate: 5 } });
  
        if (!res.ok) {
            throw new Error("Az adatok letöltése nem sikerült");
        }
  
        return res.json();
    } catch (error) {
        console.log("Az adatok betöltése sikertlen", error);
        return null;
    }
  };

export default function AllergenekModal({ isOpen, closeModal }:any) {

    const [napimenu, setNapimenu] = useState<any[]>([]);
    const [napimenuadatok, setNapimenuadatok] = useState<any[]>([]);
    const [alapadatok, setAlapadatok] = useState<any[]>([]);
    const [specialisarak, setSpecialisarak] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getNapimenuadatok();
                if (data && data.data && Array.isArray(data.data.Napimenuadatok)) {
                  setNapimenuadatok(data.data.Napimenuadatok);
                } else {
                    throw new Error("Invalid data format received");
                }
            } catch (error) {
                console.error("Error fetching or handling data:", error);
            }
        };
        fetchData();
      }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getSpecialisarak();
                if (data && data.data && Array.isArray(data.data.Specialisarak)) {
                  setSpecialisarak(data.data.Specialisarak);
                } else {
                    throw new Error("Invalid data format received");
                }
            } catch (error) {
                console.error("Error fetching or handling data:", error);
            }
        };
        fetchData();
      }, []);

    const napimenuadatData = napimenuadatok.length > 0 ? napimenuadatok[0] : null;
    const specialisarakData = specialisarak.length > 0 ? specialisarak[0] : null;

    return (
        isOpen && (
          <div className="fixed flex justify-center items-center top-0 left-0 w-[100vw] h-[100vh] backdrop-blur-md z-50">
            <div className="relative w-11/12 lg:w-6/12 m-auto bg-[--lightnavy] shadow-xl p-8 z-50 lg: overflow-y-auto rounded-md border border-[--lightnavy]">
                <button className="absolute top-4 right-4" onClick={closeModal}>
                    <IoMdClose className=" w-6 h-6 text-[--grey]"/>
                </button>
                {specialisarakData && (
                    <>
                    <p className='container m-auto text-center text-[--grey] text-lg py-4'>A szállítás Kaposváron belül ingyenes! Szállítási díjak városon kívül:</p>
                    <div className='gap-4'>
                    <p className='container m-auto text-center text-[--grey] text-sm'>Kaposfüred: {specialisarakData.kaposfured} Ft</p>
                    <p className='container m-auto text-center text-[--grey] text-sm'>Toponár: {specialisarakData.toponar} Ft</p>
                    <p className='container m-auto text-center text-[--grey] text-sm'>Juta: {specialisarakData.juta} Ft</p>
                    <p className='container m-auto text-center text-[--grey] text-sm'>Kaposújlak: {specialisarakData.kaposujlak} Ft</p>
                    <p className='container m-auto text-center text-[--grey] text-sm'>Taszár: {specialisarakData.taszar} Ft</p>
                    </div>
                    </>
                )}
            </div>
          </div>
        )
      );
    };
								
								