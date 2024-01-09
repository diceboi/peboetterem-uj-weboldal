"use client"

import { TbMenu2, TbPhone, TbShoppingCart, TbShoppingCartCheck } from 'react-icons/tb'
import { MdClose } from 'react-icons/md'
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState, useRef, createContext, useContext, } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import Button from '../UI/NapiMenuButton';
import Cart from '../UI/Cart';
import { AddToCartContext } from '@/app/addToCart';


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



  function parseTimeToMinutes(timeStr:any) {
    if (timeStr === 'Zárva') return -1;
    const [hoursStr, minutesStr] = timeStr.split(':');
    const hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr || '0', 10);
    return hours * 60 + minutes; // Convert it to total minutes
  }
  
  function isOpenNowWithAlapadatok(alapadatokData:any) {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
  
    if (!alapadatokData) {
      console.error('alapadatokData is not defined');
      return false;
    }
  
    let openingTimeStr, closingTimeStr;
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      openingTimeStr = alapadatokData.nyitvatartashepe.split(' - ')[0];
      closingTimeStr = alapadatokData.nyitvatartashepe.split(' - ')[1];
    } else if (dayOfWeek === 6) {
      openingTimeStr = alapadatokData.nyitvatartasszo.split(' - ')[0];
      closingTimeStr = alapadatokData.nyitvatartasszo.split(' - ')[1];
    } else {
      // Sunday is always closed
      return false;
    }
  
    const openingMinutes = parseTimeToMinutes(openingTimeStr);
    const closingMinutes = parseTimeToMinutes(closingTimeStr);
  
    // Ensure the opening and closing times are valid
    if (openingMinutes === -1 || closingMinutes === -1) {
      console.error('Invalid opening or closing time');
      return false;
    }
  
    return currentMinutes >= openingMinutes && currentMinutes < closingMinutes;
  }


  export default function MainNav() {
    const [alapadatok, setAlapadatok] = useState<any[]>([]);
    const [isRestaurantOpen, setIsRestaurantOpen] = useState(false);
  
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
      const alapadatokData = alapadatok.length > 0 ? alapadatok[0] : null;
  
      // Function to check if the restaurant is open based on alapadatokData
      const checkIfOpen = () => {
        if (alapadatokData) {
          setIsRestaurantOpen(isOpenNowWithAlapadatok(alapadatokData));
        }
      };
  
      // Initial check
      checkIfOpen();
  
      // Interval to check every minute
      const intervalId = setInterval(checkIfOpen, 60000); // 60 * 1000 ms
  
      // Cleanup interval on component unmount
      return () => clearInterval(intervalId);
    }, [alapadatok]);

  const { isCartOpen, toggleCartOpen, getTotalItemCount }:any = useContext(AddToCartContext);

    const [showAlert, setShowAlert] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const mobileMenuRef = useRef(null);
    const [isCartClosed, setIsCartClosed] = useState(true);

    const handleCloseClick = () => {
      setShowAlert(false);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    const handleCartToggle = () => {
      toggleCartOpen()
    };

    const cartClassName = isCartOpen ? 'right-0' : '-right-[10vw] opacity-0 hidden:delay-200';

    const totalItemCount = getTotalItemCount();

    const cartCountSpan = totalItemCount > 0 ? (
      <span className='absolute flex justify-center items-center right-[5px] top-[5px] bg-[--alert] text-white w-[20px] h-[20px] rounded-full text-xs'>{totalItemCount}</span>
    ) : null;

    useEffect(() => {
        // Event listener to close mobile menu on outside click
        function handleClickOutside(event: MouseEvent) {
            if (mobileMenuRef.current && !(mobileMenuRef.current as Node).contains(event.target as Node)) {
                closeMobileMenu();
            }
        }

        // Add the event listener when the mobile menu is open
        if (mobileMenuOpen) {
            document.addEventListener('click', handleClickOutside);
        } else {
            // Remove the event listener when the mobile menu is closed
            document.removeEventListener('click', handleClickOutside);
        }

        // Clean up the event listener when the component unmounts
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [mobileMenuOpen]);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const [isOpen, setIsOpen] = useState(false);
  
    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };
  
    const handleLinkClick = () => {
      setIsOpen(false);
    };
 
    return (
        <>
        <nav id='desktop-menu' className="flex justify-center w-full m-auto z-50 fixed top-0">
            <div id='menucontainer' className='relative hidden lg:flex flex-wrap items-center justify-between gap-8 mt-4 bg-[--navyblur] border border-[--lightnavy] rounded-md backdrop-blur-sm shadow-lg'>
                <div id="logo" className="absolute flex shrink-0 items-center border-r border-[--lightnavy] px-4">
                    <Link href="/">
                        <Image src="https://admin.peboetterem.hu/wp-content/uploads/2023/10/pebo-typo-logo-white.svg" id='acceptrec-logo' alt="logo" width={75} height={50} priority className="ease-in-out duration-200" />
                    </Link>
                </div>
                
                
                <ul id="menu" className='flex justify-between gap-8 items-center pl-4 text-md w-auto ml-[100px] text-[--grey]'>

                        <li id='mainlink' className='flex items-center border border-transparent hover:text-[--okker] active:text-[--okker] focus:text-[--okker] px-2 py-2 transition-all'><Link href="/napi-menu" className="flex items-center gap-2"><span>Napi menü</span></Link></li>

                        <li id='mainlink' className='flex items-center border border-transparent hover:text-[--okker] active:text-[--okker] focus:text-[--okker] px-2 py-2 transition-all'><Link href="/etlap" className="flex items-center gap-2"><span>Étlap</span></Link></li>
                                        
                        <li id='mainlink' className='flex items-center border border-transparent hover:text-[--okker] active:text-[--okker] focus:text-[--okker] px-2 py-2 transition-all'><Link href="/rolunk" className="flex items-center gap-2"><span>Rólunk</span></Link></li>
                                       
                        <li id='mainlink' className='flex items-center border border-transparent hover:text-[--okker] active:text-[--okker] focus:text-[--okker] px-2 py-2 transition-all'><Link href="/kapcsolat" className="flex items-center gap-2"><span>Kapcsolat</span></Link>
                        </li>
                </ul>
                <div className='flex flex-nowrap gap-16'>
                    <div className='flex flex-nowrap items-center gap-2 w-max'>
                        <div className='flex items-center justify-center h-full w-[55px]'>
                            <TbPhone className="text-[--okker] p-3 w-full h-full"/>
                        </div>
                        <div className='flex flex-col gap-0'>
                            <Link href="tel:0682310633"><p className="footerparagraph">06 82 310 633</p></Link>
                            <Link href="tel:06304940959"><p className="footerparagraph">06 30 494 0959</p></Link>
                        </div>
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                        <p className="footerparagraph">Jelenleg:</p>
                        <p className={isRestaurantOpen ? "open text-2xl" : "close text-2xl"}>
                        {isRestaurantOpen ? "Nyitva" : "Zárva"}
                        </p>
                    </div>
                    <div className='relative flex items-center justify-center h-full w-[55px]'>
                      {cartCountSpan}
                      <TbShoppingCart className={`p-3 w-full h-full cursor-pointer rounded-e-md ${isCartClosed ? " text-[--okker]" : " text-[--navy] bg-[--okker]"}`} onClick={handleCartToggle}/>

                      <Cart cartClassName={cartClassName} />

                    </div>
                </div>
                
            </div>    
        </nav> 

        <div id="mobile-menu" className={`fixed top-0 lg:hidden flex justify-between items-center w-full h-[64px] p-4 bg-[--navy] z-50 ${isOpen ? '' : ''}`}>
              <Link href="/"><Image src="https://admin.peboetterem.hu/wp-content/uploads/2023/10/pebo-typo-logo-white.svg" alt="logo" width={75} height={40} /></Link>
                <div className='flex flex-nowrap gap-4'>
                <div className='flex flex-nowrap gap-2 items-center'>
                        <p className="footerparagraph">Jelenleg:</p>
                        <p className={isRestaurantOpen ? "open text-2xl" : "close text-2xl"}>
                        {isRestaurantOpen ? "Nyitva" : "Zárva"}
                        </p>
                    </div> 
              <div className="flex gap-2">
                <button className="p-2" onClick={toggleMenu} aria-label="Menu"><TbMenu2 className={`h-8 w-auto cursor-pointe text-[--grey] ${isOpen ? ' hidden' : ''}`}/><MdClose className={`h-8 w-auto cursor-pointe text-[--grey] ${isOpen ? '' : ' hidden'}`}/></button>
                <div id="toggle-menu" className={`absolute top-[64px] right-0 bg-[--navy] h-auto w-full p-4 text-[--grey] transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} lg:translate-x-0 transition-transform duration-200 ease-in-out`}>
                  <ul className="relative flex flex-col items-end gap-4">
                    <li className="relative group">
                      <Link href="#aktualis" onClick={handleLinkClick}>Aktuális</Link>
                      <span className="absolute inset-x-0 bottom-0 h-[1px] bg-black transition-all duration-200 transform origin-left scale-x-0 group-hover:scale-x-100 group-focus:scale-x-100"></span>
                    </li>
                    <li className="relative group">
                      <Link href="/napi-menu" onClick={handleLinkClick}>Napi menü</Link>
                      <span className="absolute inset-x-0 bottom-0 h-[1px] bg-black transition-all duration-200 transform origin-left scale-x-0 group-hover:scale-x-100 group-focus:scale-x-100"></span>
                    </li>
                    <li className="relative group">
                      <Link href="/etlap" onClick={handleLinkClick}>Étlap</Link>
                      <span className="absolute inset-x-0 bottom-0 h-[1px] bg-black transition-all duration-200 transform origin-left scale-x-0 group-hover:scale-x-100 group-focus:scale-x-100"></span>
                    </li>
                    <li className="relative group">
                      <Link href="/rolunk" onClick={handleLinkClick}>Rólunk</Link>
                      <span className="absolute inset-x-0 bottom-0 h-[1px] bg-black transition-all duration-200 transform origin-left scale-x-0 group-hover:scale-x-100 group-focus:scale-x-100"></span>
                    </li>
                    <li className="relative group">
                      <Link href="/kapcsolat" onClick={handleLinkClick}>Kapcsolat</Link>
                      <span className="absolute inset-x-0 bottom-0 h-[1px] bg-black transition-all duration-200 transform origin-left scale-x-0 group-hover:scale-x-100 group-focus:scale-x-100"></span>
                    </li>
                    <div className='flex flex-nowrap items-center justify-between gap-2 w-full p-4'>
                            <TbPhone className="text-[--okker] w-7 h-7"/>
                            <Link href="tel:0682310633"><p className="footerparagraph">06 82 310 633</p></Link>
                            <Link href="tel:06304940959"><p className="footerparagraph">06 30 494 0959</p></Link>
                    </div>  
                  </ul>
                </div>
              </div>
              </div>
            </div>

            <div>
              {showAlert && (
                <div
                  id='alert'
                  className='fixed top-[64px] flex flex-nowrap justify-start lg:justify-center items-center -translate-x-1/2 left-1/2 w-full lg:w-6/12 bg-[--alert] py-4 px-4 z-50 text-white text-sm'
                >
                  <p className='w-[80%]'>
                    Karácsonyi nyitvatartás változás!{' '}
                    <Link href={'#footer'} className='underline'>
                      Kattints ide.
                    </Link>
                  </p>
                  <MdClose className="absolute right-2 top-2 lg:-translate-y-1/2 lg:top-1/2 cursor-pointer w-6 h-6" onClick={handleCloseClick} />
                </div>
              )}
            </div>
        </>    
    );
        
}