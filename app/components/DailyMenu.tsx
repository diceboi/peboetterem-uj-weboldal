"use client"

import { useEffect, useState } from 'react';
import NapiMenuTile from './UI/NapiMenuTile';
import { TbInfoCircle } from "react-icons/tb";
import { Toaster } from 'sonner';

const getNapimenu = async () => {
  try {
      const res = await fetch('/api/napimenu', { next: { revalidate: 5 } });

      if (!res.ok) {
          throw new Error("Az adatok letöltése nem sikerült");
      }

      return res.json();
  } catch (error) {
      console.log("Az adatok betöltése sikertlen", error);
      return null;
  }
};

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

export default function DailyMenu() {

  const days = ['Hétfő' , 'Kedd' , 'Szerda' , 'Csütörtök' , 'Péntek']
  const currentDayIndex = new Date().getDay() - 1;

  const [napimenu, setNapimenu] = useState<any[]>([]);
  const [napimenuadatok, setNapimenuadatok] = useState<any[]>([]);
  const [alapadatok, setAlapadatok] = useState<any[]>([]);
  const [specialisarak, setSpecialisarak] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const data = await getNapimenu();
            if (data && data.data && Array.isArray(data.data.Napimenu)) {
              setNapimenu(data.data.Napimenu);
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
    <>
    <section id="napimenu" className="w-full min-h-[40vh] bg-[--navy] py-20 m-auto">
      <div className='container flex flex-col gap-8 m-auto'>
          
          {napimenuadatData && (
            
            <div className="flex flex-col justify-center items-center gap-4">
              <h1 className='py-8'>Napi menü</h1>
                <div className='grid grid-cols-2 grid-rows-2 2xl:grid-cols-4 2xl:grid-rows-1 items-center gap-2 lg:gap-4'>
                  <div className='px-2 py-1 bg-[--okker] w-full text-center rounded-md'>
                    <h2 className="price text-base lg:text-xl">A menü: <b>{napimenuadatData.amenuar - 100}</b></h2>
                    <p className='price text-sm'> + 100 Ft (csomagolás)</p>
                  </div>
                  <div className='px-2 py-1 bg-[--okker] w-full text-center rounded-md'>
                    <h2 className="price text-base lg:text-xl">B menü: <b>{napimenuadatData.bmenuar - 100}</b></h2>
                    <p className='price text-sm'> + 100 Ft (csomagolás)</p>
                  </div>
                  <div className='px-2 py-1 bg-[--okker] w-full text-center rounded-md'>
                    <h2 className="price text-base lg:text-xl">A menü csak főétel: <b>{napimenuadatData.amenucsakfoetel - 50}</b></h2>
                    <p className='price text-sm'> + 50 Ft (csomagolás)</p>
                  </div>
                  <div className='px-2 py-1 bg-[--okker] w-full text-center rounded-md'>
                    <h2 className="price text-base lg:text-xl">B menü csak főétel: <b>{napimenuadatData.bmenucsakfoetel - 50}</b></h2>
                    <p className='price text-sm'> + 50 Ft (csomagolás)</p>
                  </div>
                </div>
              {specialisarakData && (
              <h3 className='text-[--okker]'>A csomagolás díja teljes menünél: 100 Ft, csak főéletnél: 50 Ft</h3>
              )}
            </div>

          )}

          
        <div className="relative w-full m-auto flex flex-col lg:flex-row lg:gap-4 gap-8">

        {napimenu.map((napimenuitem, index) => {
          const menuData = napimenuadatok.length > 0 ? napimenuadatok[0] : null;

          return (
            menuData && (
              <NapiMenuTile
                key={napimenuitem._id}
                id={napimenuitem._id}
                day={days[index]}
                date={napimenuitem.date}
                aMenuLeves={napimenuitem.aMenuLeves}
                aMenuFoetel={napimenuitem.aMenuFoetel}
                bMenuLeves={napimenuitem.bMenuLeves}
                bMenuFoetel={napimenuitem.bMenuFoetel}
                isCurrentDay={currentDayIndex === index}
                menurendeles={menuData.menurendeles}
                napimenuadatok={menuData}
                csomagolas={specialisarakData.csomagolas}
              />
            )
          );
        })}
          
        </div>
        <div className='relative flex flex-col border border-[--lightnavy] shadow-xl p-4 gap-2 rounded-md'>
        <TbInfoCircle className='absolute w-6 h-6 top-2 left-2 text-[--grey]'/>

          {napimenuadatData && (
          <p className='container m-auto text-center text-[--okker] font-bold'>A napi menüt aznap {napimenuadatData.menurendeles}-ig lehet megrendelni, kiszállítás pedig {napimenuadatData.menukiszallitas}-tól történik.</p>
          )}

          {specialisarakData && (
            <>
            <p className='container m-auto text-center text-[--grey] text-sm'>A szállítás városon belül ingyenes! Szállítási díjak városon kívül:</p>
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
      <Toaster  
      richColors 
      position='bottom-center' 
      toastOptions={{
        style: { 
          background: 'var(--okker)',
          color: 'var(--navy)',
          border: 'none' 
        },
    }}/>
    </section>
    </>
  )
}
