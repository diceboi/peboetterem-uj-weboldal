// MenuCategoryTile.tsx

import { TbEye, TbShoppingCartPlus } from "react-icons/tb";
import { useEffect, useState } from "react";
import Modal from "./UI/AllergenekModal";
import MenuButton from "./UI/MenuButton";

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

interface MenuCategoryTileProps {
  category: string;
  termekek: any[]; // Replace 'any[]' with the actual type of your menu items
}

const MenuCategoryTile: React.FC<MenuCategoryTileProps> = ({ category, termekek }) => {

    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [alapadatok, setAlapadatok] = useState<any[]>([]);
    
    const openModal = () => {
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
      };

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

    useEffect(() => {
        if (
          alapadatokData &&
          alapadatokData.nyitvatartashepe &&
          alapadatokData.nyitvatartasszo &&
          alapadatokData.nyitvatartasv &&
          alapadatokData.rendelesfelvetel
        ) {
          const currentTime = new Date();
          const currentHour = currentTime.getHours();
          const currentMinutes = currentTime.getMinutes();
          const currentDay = currentTime.getDay(); // Get the current day (0-6, where 0 is Sunday)
      
          const parseTime = (timeStr: string) => {
            return timeStr === 'Zárva' ? -1 : (timeStr && timeStr.split(':')[0] ? parseInt(timeStr.split(':')[0], 10) : -1);
          };
      
          const [openingHourHePeStr, closingHourHePeStr] = alapadatokData.nyitvatartashepe.split(' - ');
          const [openingHourSzoStr, closingHourSzoStr] = alapadatokData.nyitvatartasszo.split(' - ');
          const [openingHourVStr, closingHourVStr] = alapadatokData.nyitvatartasv.split(' - ');
      
          const openingHourHePe = parseTime(openingHourHePeStr);
          const closingHourHePe = parseTime(closingHourHePeStr);
          const openingHourSzo = parseTime(openingHourSzoStr);
          const closingHourSzo = parseTime(closingHourSzoStr);
          const openingHourV = parseTime(openingHourVStr);
          const closingHourV = parseTime(closingHourVStr);
      
          const ordersClosingTime = alapadatokData.rendelesfelvetel; // Dynamic closing time from data
      
          const [closingHour, closingMinute] = ordersClosingTime.split(':').map(Number);
          const ordersClosingMinutes = closingHour * 60 + closingMinute;
      
          let isButtonDisabled = false;
      
          if (
            ((currentDay === 1 && (currentHour < openingHourHePe || currentHour >= closingHourHePe)) || // Monday
            (currentDay === 6 && (currentHour < openingHourSzo || currentHour >= closingHourSzo)) || // Saturday
            (currentDay === 0 && (currentHour < openingHourV || currentHour >= closingHourV)) || // Sunday
            (currentDay >= 2 && currentDay <= 5)) // Tuesday to Friday
            ||
            (currentHour === closingHour && currentMinutes > closingMinute) // Orders close at specified time
          ) {
            isButtonDisabled = true;
          }
      
          setIsButtonDisabled(isButtonDisabled);
        }
      }, [alapadatokData]);

  return (
    <>
    <Modal isOpen={isModalOpen} closeModal={closeModal} />
    <div id={category} className='flex flex-col w-full min-h-max pb-4 lg:pb-8 bg-[--grey] shadow-2xl rounded-md'>
      <div className="flex items-center justify-between gap-1 lg:gap-4 px-4 lg:px-0 pt-4 lg:mx-16 h-[50px] lg:h-[100px]">
        <h2 className="categorytitle z-0">{category}</h2>
        <button className="transparent-btn" onClick={openModal}>
        <TbEye className="w-5 h-5 -mt-1"/>Allergének
        </button>
      </div>
      
      {termekek.map((termek:any, index:any) => (
        <div key={index} className="flex flex-row gap-2 justify-between items-end pt-4 pb-4 -mb-[1px] mx-4 lg:mx-16 border-b border-[--navy]">
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2 w-full">
                    <p className="text-[--navy] font-bold text-base lg:text-lg">{termek.nev}</p>
                    Allergének: {termek.allergenek}
                </div>
                <div className="flex min-w-max gap-4 justify-start items-center">
                    {termek.elsodlegesar && (
                        <div className="flex gap-2 bg-[--shadowgrey] px-2 py-1 rounded-md">
                        <p className="menuprice text-[--navy]">{termek.elsoelotag}</p>
                        <p className="menuprice text-[--navy]">{termek.elsodlegesar} Ft</p>
                        </div>
                    )}
                    {termek.masodlagosar && (
                        <div className="flex gap-2 bg-[--shadowgrey] px-2 py-1 rounded-md">
                        <p className="menuprice text-[--navy]">{termek.masodikelotag}</p>
                        <p className="menuprice text-[--navy]">{termek.masodlagosar} Ft</p>
                        </div>
                    )}
                </div>
            </div>
            <div>
            {alapadatokData && (
                <MenuButton title={"Kosárba"} icon={<TbShoppingCartPlus />} disabled={''} rendelesfelvetel={alapadatokData.rendelesfelvetel} termek={termek}/>
            )}
            </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default MenuCategoryTile;
