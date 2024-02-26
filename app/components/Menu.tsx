"use client"

export const dynamic = "force-dynamic";

import Image from "next/image"

import { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";
import MenuCategoryTile from "./MenuCategoryTile";
import { TbInfoCircle } from "react-icons/tb";

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

export default function Menu() {

  const router = useRouter();

  const [categories, setCategories] = useState<any[]>([]);
  const [termekek, setTermekek] = useState<any[]>([]);
  const [alapadatok, setAlapadatok] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const data = await getTermekek();
            if (data && data.data && Array.isArray(data.data.Termekek)) {
              setTermekek(data.data.Termekek);
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

const alapadatokData = alapadatok.length > 0 ? alapadatok[0] : null;

const extractCategories = (data: any[]) => {
  const allCategories = data.map((item) => item.kategoria);
  const uniqueCategories = Array.from(new Set(allCategories));
  setCategories(uniqueCategories);
};

useEffect(() => {
  extractCategories(termekek);
}, [termekek]);

const handleCategoryClick = (category: string) => {
  router.push('#etlap'); // Assuming this is where you want to navigate

  // Update the selected category only if it's different from the current one
  setSelectedCategory((prevCategory) => (category === prevCategory ? prevCategory : category));
};

useEffect(() => {
  if (categories.length > 0) {
    // Set the first category as the default when categories are available
    setSelectedCategory(categories[12]);
  }
}, [categories]);

const termekekData = termekek.length > 0 ? termekek[0] : null;

  return (
    <section id="etlap" className="flex flex-col w-full min-h-[100vh] bg-[--navy] py-20 m-auto">
      <div className="container m-auto">
        <div className="flex flex-nowrap justify-center items-center py-8 gap-8">
          <h1>Étlap</h1>
        </div>
        <div className="relative flex flex-col gap-4 m-auto">
        
        <div className="sticky lg:relative top-[63px] lg:top-0 w-full pb-2 overflow-x-auto bg-[--navy] z-40 ">
        <div className="absolute block lg:hidden h-16 w-24 top-0 right-0 bg-gradient-to-r from-transparent to-[--navy] z-40 pointer-events-none"></div>
        <div className="sticky lg:relative top-[63px] lg:top-0 w-full overflow-x-auto">
          <ul className="relative flex flex-nowrap lg:flex-wrap justify-start lg:justify-center gap-2 lg:gap-4 h-full w-fit min-w-max lg:min-w-full py-2 z-30 mr-24 lg:mr-0">
            {['Nőnap', ...categories.slice(13)].map((category, index) => (
              <li
                key={index}
                className={`relative flex flex-row lg:flex-nowrap items-center p-1 gap-2 bg-[--shadowgrey] hover:bg-[--grey] rounded-md transition-all duration-200 cursor-pointer w-fit}`}
                onClick={() => handleCategoryClick(category)}
              >
                <div className="flex justify-center items-center w-[40px] h-[40px]">
                  <Image 
                    src={`/12.svg`} // Assuming this is the icon for 'Valentin nap'
                    alt={"Étel ikon"}
                    width={40}
                    height={40}
                    style={{ objectFit: "contain", objectPosition: "50% 50%" }}
                  />
                </div>
                <h2 className="lg:categorynames tracking-normal lg:tracking-widest text-xs lg:text-lg lg:text-left text-center font-bebas text-[--alert]">{category}</h2>
              </li>
            ))}
            {categories.slice(0, 12).map((category: string, index: number) => (
              <li
                key={index}
                className={`relative flex flex-row lg:flex-nowrap items-center p-1 gap-2 bg-[--shadowgrey] hover:bg-[--grey] rounded-md transition-all duration-200 cursor-pointer w-fit}`}
                onClick={() => handleCategoryClick(category)}
              >
                <div className="flex justify-center items-center w-[40px] h-[40px]">
                <Image 
                  src={`/${index}.svg`}
                  alt={"Étel ikon"}
                  width={40}
                  height={40}
                  style={{ objectFit: "contain", objectPosition: "50% 50%" }}
                  />
                </div>
                <h2 className="lg:categorynames tracking-normal lg:tracking-widest text-xs lg:text-lg lg:text-left text-center font-bebas text-[--navy]">{category}</h2>
              </li>
            ))}
          </ul>
          
        </div>
        </div>

        <div className="flex flex-nowrap justify-start w-full">
          {selectedCategory &&
            <MenuCategoryTile
              category={selectedCategory}
              termekek={termekek.filter(item => item.kategoria === selectedCategory)}
            />
          }
        </div>

        </div>
        <div className='relative flex flex-col items-center border border-[--lightnavy] shadow-x p-4 my-4 shadow-xl gap-2 rounded-md'>
          <TbInfoCircle className='absolute w-6 h-6 top-2 left-2 text-[--grey]'/>

            {alapadatokData && (
            <p className='text-center text-[--okker] font-bold w-10/12'>Rendeléseket nyitvatartási időben {alapadatokData.rendelesfelvetel}-ig veszünk fel.</p>
            )}

        </div>
      </div>
    </section>
  )
}
