"use client"

import { useEffect, useState } from 'react'
import { GiHotMeal } from 'react-icons/gi'
import { TbShoppingCartPlus, TbSoup } from 'react-icons/tb'
import NapiMenuButton from './NapiMenuButton'
import AMenuButton from './AMenuButton'
import BMenuButton from './BMenuButton'
import AMenuLevesButton from './AMenuLevesButton'
import BMenuLevesButton from './BMenuLevesButton'

export default function NapiMenuTile({id, day, date, aMenuLeves, aMenuFoetel, bMenuLeves, bMenuFoetel, isCurrentDay, menurendeles, napimenuadatok }:any) {

  const currentDayColor = isCurrentDay ? 'bg-[--lightestnavy]' : 'bg-[--lightnavy]';

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isamenuOutOfStock, setIsAmenuOutOfStock] = useState(false);
  const [isbmenuOutOfStock, setIsBmenuOutOfStock] = useState(false);
  const [isamenulevesOutOfStock, setIsAmenuLevesOutOfStock] = useState(false);
  const [isbmenulevesOutOfStock, setIsBmenuLevesOutOfStock] = useState(false);

  useEffect(() => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    // Extract the opening and closing hours from the menukiszallitas string
    const [openingHourStr, closingHourStr] = menurendeles.split(' - ');

    // Parse opening and closing hours as integers
    const openingHour = parseInt(openingHourStr.split(':')[0], 10);
    const closingHour = parseInt(closingHourStr.split(':')[0], 10);

    // Disable the button if the current time is outside of the extracted range
    if (currentHour < openingHour || currentHour >= closingHour) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }, [menurendeles]);

  useEffect(() => {
    if (napimenuadatok.amenuelfogyott === true) {
      setIsAmenuOutOfStock(true);
    } else {
      setIsAmenuOutOfStock(false);
    }
  })

  useEffect(() => {
    if (napimenuadatok.bmenuelfogyott === true) {
      setIsBmenuOutOfStock(true);
    } else {
      setIsBmenuOutOfStock(false);
    }
  })

  useEffect(() => {
    if (napimenuadatok.amenuleveselfogyott === true) {
      setIsAmenuLevesOutOfStock(true);
    } else {
      setIsAmenuLevesOutOfStock(false);
    }
  })

  useEffect(() => {
    if (napimenuadatok.bmenuleveselfogyott === true) {
      setIsBmenuLevesOutOfStock(true);
    } else {
      setIsBmenuLevesOutOfStock(false);
    }
  })

  return (
    <>
          <div key={id} className={`relative flex flex-col ${currentDayColor} shadow-xl w-full lg:w-1/5 p-2 h-fit rounded-md`}>
            {isCurrentDay && (
              <div className="absolute right-1/2 translate-x-1/2 bg-[--alert] -top-4 lg:-top-7 rounded-md shadow-lg text-white text-xl font-playball px-2 py-1">Mai Menü</div>
            )}
            <div className="flex flex-row lg:flex-col lg:justify-start justify-between items-center border-b border-[--navy] mt-4 mx-2 mb-4 gap-2">
              <p className="day -mt-4">{day}</p>
              <h2 className='-mt-4'>{date}</h2>
            </div>
            <div className="flex flex-col w-full px-2">
              
            {(aMenuLeves || aMenuFoetel) && (
              <div className="flex flex-col justify-between">
                <div className='flex flex-col pb-2'>
                <p className='day text-[--okker] font-black'>A menü:</p>

                  {aMenuLeves === null ? null : (
                    <div className="flex flex-nowrap items-start gap-2 py-2">
                      <div className='w-7 h-7'>
                      <TbSoup className="w-7 h-7 text-[--okker] -mt-2" />
                      </div>
                      <div className='flex flex-col lg:flex-row gap-0 lg:gap-2 text-[--grey]'>
                        <p className='lg:text-md text-sm'>{aMenuLeves}</p>
                      </div>
                    </div>
                  )}

                  {aMenuFoetel === null ? null : (
                  <div className="flex flex-nowrap items-start gap-2">
                    <div className='w-7 h-7'>
                    <GiHotMeal className="w-7 h-7 text-[--okker] -mt-2" />
                    </div>
                    <div className='flex flex-col lg:flex-row gap-0 lg:gap-2 text-[--grey]'>
                      <p className='lg:text-md text-sm'>{aMenuFoetel}</p>
                    </div>
                  </div>
                  )}
                  </div>
                  <div className='flex flex-col gap-2 justify-start pb-2'>

                  {isCurrentDay && (
                      <>
                      <AMenuButton title={"Kosárba"} icon={<TbShoppingCartPlus />} disabled={isButtonDisabled} menurendeles={menurendeles} menunev={'A menü'} menuar={napimenuadatok.amenuar} elfogyott={isamenulevesOutOfStock}/>
                      <AMenuLevesButton title={"Csak főétel"} icon={<TbShoppingCartPlus />} disabled={isButtonDisabled} menurendeles={menurendeles}  menunev={'A menü (csak főétel)'} menuar={napimenuadatok.amenucsakfoetel} elfogyott={isamenuOutOfStock}/>
                      </>
                    )}
                </div>

              </div>
              )}

              {(bMenuLeves || bMenuFoetel) && (
              <div className="flex flex-col justify-between">
                <div className='flex flex-col pb-2'>
                <p className='day text-[--okker] font-black'>B menü:</p>

                  {bMenuLeves === null ? null : (
                  <div className="flex flex-nowrap items-start gap-2 py-2">
                    <div className='w-7 h-7'>
                    <TbSoup className="w-7 h-7 text-[--okker] -mt-2" />
                    </div>
                    <div className='flex flex-col lg:flex-row gap-0 lg:gap-2 text-[--grey]'>
                      <p className='lg:text-md text-sm'>{bMenuLeves}</p>
                    </div>
                  </div>
                  )}

                  {bMenuFoetel === null ? null : (
                  <div className="flex flex-nowrap items-start gap-2">
                    <div className='w-7 h-7'>
                    <GiHotMeal className="w-7 h-7 text-[--okker] -mt-2" />
                    </div>
                    <div className='flex flex-col lg:flex-row gap-0 lg:gap-2 text-[--grey]'>
                      <p className='lg:text-md text-sm'>{bMenuFoetel}</p>
                    </div>
                </div>
                )}
                </div>
                <div className='flex flex-col gap-2 justify-start pb-2'>

                  {isCurrentDay && (
                    <>
                    <BMenuButton title={"Kosárba"} icon={<TbShoppingCartPlus />} disabled={isButtonDisabled} menurendeles={menurendeles} menunev={'B menü'} menuar={napimenuadatok.bmenuar} elfogyott={isbmenulevesOutOfStock}/>
                    <BMenuLevesButton title={"Csak főétel"} icon={<TbShoppingCartPlus />} disabled={isButtonDisabled} menurendeles={menurendeles} menunev={'B menü (csak főétel)'} menuar={napimenuadatok.bmenucsakfoetel} elfogyott={isbmenuOutOfStock}/>
                    </>
                  )}

                </div>
              </div>
              )}
              
            </div>
          </div>
        </>
  )
}

