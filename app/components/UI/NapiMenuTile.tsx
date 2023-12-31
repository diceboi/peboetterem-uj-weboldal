"use client"

import { useEffect, useState } from 'react'
import { GiHotMeal } from 'react-icons/gi'
import { TbShoppingCartPlus, TbSoup } from 'react-icons/tb'
import NapiMenuButton from './NapiMenuButton'

export default function NapiMenuTile({id, day, date, aMenuLeves, aMenuFoetel, bMenuLeves, bMenuFoetel, isCurrentDay, menurendeles, napimenuadatok }:any) {

  const currentDayColor = isCurrentDay ? 'bg-[--lightestnavy]' : 'bg-[--lightnavy]';

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

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

  return (
    <>
          <div key={id} className={`relative flex flex-col ${currentDayColor} shadow-xl w-full lg:w-1/5 p-2 h-fit rounded-md`}>
            {isCurrentDay && (
              <div className="absolute left-0 bg-[--lightestnavy] -top-7 rounded-t-md text-white text-xl font-playball px-2 py-1">Mai Menü</div>
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
                      <NapiMenuButton title={"Kosárba"} icon={<TbShoppingCartPlus />} disabled={isButtonDisabled} menurendeles={menurendeles} menunev={'A menü'} menuar={napimenuadatok.amenuar}/>
                      <NapiMenuButton title={"Csak főétel"} icon={<TbShoppingCartPlus />} disabled={isButtonDisabled} menurendeles={menurendeles}  menunev={'A menü (csak főétel)'} menuar={napimenuadatok.amenucsakfoetel}/>
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
                    <NapiMenuButton title={"Kosárba"} icon={<TbShoppingCartPlus />} disabled={isButtonDisabled} menurendeles={menurendeles} menunev={'B menü'} menuar={napimenuadatok.bmenuar}/>
                    <NapiMenuButton title={"Csak főétel"} icon={<TbShoppingCartPlus />} disabled={isButtonDisabled} menurendeles={menurendeles} menunev={'B menü (csak főétel)'} menuar={napimenuadatok.bmenucsakfoetel}/>
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

