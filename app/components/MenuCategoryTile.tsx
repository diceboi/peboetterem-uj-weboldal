// MenuCategoryTile.tsx

import { TbEye, TbShoppingCartPlus } from "react-icons/tb";
import { useEffect, useState } from "react";
import AllergenekModal from "./UI/AllergenekModal";
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

const parseTimeToMinutes = (timeStr: string) => {
  if (timeStr === 'Zárva') return -1;
  const parts = timeStr.split(':');
  if (parts.length !== 2) {
    console.error('Invalid time format:', timeStr);
    return -1; // Handle invalid format
  }
  return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
};

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
          const currentMinutesSinceMidnight = currentTime.getHours() * 60 + currentTime.getMinutes();
          const currentDayOfWeek = currentTime.getDay();
          const ordersClosingMinutes = parseTimeToMinutes(alapadatokData.rendelesfelvetel);

          const isOpenToday = (openTimeStr: string, closeTimeStr: string) => {
            if (openTimeStr === 'Zárva') return false;
            const openingMinutes = parseTimeToMinutes(openTimeStr);
            const closingMinutes = parseTimeToMinutes(closeTimeStr);
            return currentMinutesSinceMidnight >= openingMinutes && currentMinutesSinceMidnight < closingMinutes;
          };
      
          // Determine if the restaurant is currently open based on the day of the week.
          let isDisabled = currentDayOfWeek === 0 ? !isOpenToday('00:00', '00:00') : // Sunday is always closed
          currentDayOfWeek === 6 ? !isOpenToday(alapadatokData.nyitvatartasszo.split(' - ')[0], alapadatokData.nyitvatartasszo.split(' - ')[1]) : // Saturday
          !isOpenToday(alapadatokData.nyitvatartashepe.split(' - ')[0], alapadatokData.nyitvatartashepe.split(' - ')[1]); // Weekdays

          // Check if it's past the order acceptance time.
          isDisabled = isDisabled || currentMinutesSinceMidnight > ordersClosingMinutes;

          setIsButtonDisabled(isDisabled);
        }
      }, [alapadatokData]);

  return (
    <>
    <AllergenekModal isOpen={isModalOpen} closeModal={closeModal} />
    <div id={category} className='flex flex-col w-full min-h-max pb-4 lg:pb-8 bg-[--grey] shadow-2xl rounded-md'>
      <div className="flex items-center justify-between gap-1 lg:gap-4 px-4 lg:px-0 pt-4 lg:mx-16 h-[50px] lg:h-[100px]">
        <h2 className="categorytitle z-0">{category}</h2>
        <button className="transparent-btn" onClick={openModal}>
        <TbEye className="w-5 h-5 -mt-1"/>Allergének
        </button>
      </div>
      
      {termekek.map((termek:any, index:any) => (
        <div key={index} className="flex flex-col lg:flex-row gap-2 justify-between items-start lg:items-end pt-4 pb-4 -mb-[1px] mx-4 lg:mx-16 border-b border-[--navy]">
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
            <div className="flex flex-col xl:flex-row gap-2 min-w-max">
            {alapadatokData && (
                <MenuButton title={`Kosárba ${termek.elsoelotag}`} icon={<TbShoppingCartPlus />} disabled={isButtonDisabled} rendelesfelvetel={alapadatokData.rendelesfelvetel} termek={termek} price={termek.elsodlegesar}/>
              )}
              {termek.masodlagosar && (
                <MenuButton title={`Kosárba ${termek.masodikelotag}`} icon={<TbShoppingCartPlus />} disabled={isButtonDisabled} rendelesfelvetel={alapadatokData.rendelesfelvetel} termek={termek} price={termek.masodlagosar}/>
              )}
            </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default MenuCategoryTile;
