"use client"

import { TbHome2, TbMenu2, TbPhone, TbShoppingCart, TbShoppingCartCheck } from 'react-icons/tb'
import { MdClose } from 'react-icons/md'
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState, useRef, createContext, useContext, } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import Button from '../UI/Button';


function isOpenNow() {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const hour = now.getHours();
  const minute = now.getMinutes();

  if (dayOfWeek >= 1 && dayOfWeek <= 5) {
    // Monday to Friday: 09:00 - 21:00
    const isOpenWeekday =
      (hour > 8 || (hour === 8 && minute >= 0)) &&
      (hour < 21 || (hour === 21 && minute <= 0));
    return isOpenWeekday;
  } else if (dayOfWeek === 6) {
    // Saturday: 10:00 - 21:00
    const isOpenSaturday =
      (hour > 9 || (hour === 9 && minute >= 0)) &&
      (hour < 21 || (hour === 21 && minute <= 0));
    return isOpenSaturday;
  }

  // Sunday: Closed
  return false;
}


export default function MainNav() {

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const mobileMenuRef = useRef(null);
    const [isCartClosed, setIsCartClosed] = useState(true);

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    const toggleCartOpen = () => {
      setIsCartClosed((prevState) => !prevState);
    };

    const setCartOpen = () => {
      setIsCartClosed(false);
    };
    
    const setCartClose = () => {
      setIsCartClosed(true);
    };

    const cartClassName = isCartClosed
        ? '-right-[10vw] opacity-0' // Add a CSS class for the closed state
        : 'right-0';

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

    const [isRestaurantOpen, setIsRestaurantOpen] = useState(isOpenNow());

  useEffect(() => {
    // Update the isOpen state every minute
    const timer = setInterval(() => {
      setIsRestaurantOpen(isOpenNow());
    }, 60000); // 60000 milliseconds = 1 minute

    return () => {
      clearInterval(timer); // Clean up the interval on unmount
    };
  }, []);
 
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

                        <li id='mainlink' className='flex items-center border border-transparent hover:text-[--okker] active:text-[--okker] focus:text-[--okker] px-2 py-2 transition-all'><Link href="#napimenu" className="flex items-center gap-2"><span>Napi menü</span></Link></li>

                        <li id='mainlink' className='flex items-center border border-transparent hover:text-[--okker] active:text-[--okker] focus:text-[--okker] px-2 py-2 transition-all'><Link href="#etlap" className="flex items-center gap-2"><span>Étlap</span></Link></li>
                                        
                        <li id='mainlink' className='flex items-center border border-transparent hover:text-[--okker] active:text-[--okker] focus:text-[--okker] px-2 py-2 transition-all'><Link href="#rolunk" className="flex items-center gap-2"><span>Rólunk</span></Link></li>
                                       
                        <li id='mainlink' className='flex items-center border border-transparent hover:text-[--okker] active:text-[--okker] focus:text-[--okker] px-2 py-2 transition-all'><Link href="#kapcsolat" className="flex items-center gap-2"><span>Kapcsolat</span></Link>
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
                    <div className='relative cart flex items-center justify-center h-full w-[55px]'>
                      <TbShoppingCart className={`p-3 w-full h-full cursor-pointer rounded-e-md ${isCartClosed ? " text-[--okker]" : " text-[--navy] bg-[--okker]"}`} onClick={toggleCartOpen}/>


                      <div id='cart' className={`absolute flex flex-col top-[65px] ${cartClassName} w-96 h-auto bg-[--navy] shadow-2xl border border-[--lightnavy] rounded-md transition-all ease-out z-0`}>
                        <div className='flex justify-between items-center p-4 border-b border-[--lightnavy]'>
                            <h2 className='text-[--okker] font-bebas text-2xl'>Kosár</h2>
                            <AiOutlineClose className='w-7 h-7 text-[--grey] p-1 lg:hover:bg-[--okker] lg:hover:text-[--navy] cursor-pointer' onClick={setCartClose}/>
                        </div>
                        <div className='flex flex-col gap-4 p-4'>
                            <div className='flex flex-col bg-[--lightnavy] p-2 gap-2 shadow-xl rounded-md'>
                            <div className='flex items-start gap-4 justify-between'>
                                <h3 className='text-[--grey] text-sm text-bold tracking-[.125em]'>Valami étel aminek nagyon hosszú neve van</h3>
                                <AiOutlineClose className='w-6 h-6 text-[--grey] p-1 lg:hover:bg-[--okker] lg:hover:text-[--navy] cursor-pointer' />
                            </div>
                            <div className='flex items-end gap-4 justify-between'>
                                <div className="py-1 px-2 bg-[--okker] font-[--navy] h-min text-sm rounded-sm">
                                    <p className="smartprice">1850 Ft</p>
                                </div>
                                <div className='flex items-center justify-start gap-1'>
                                <p className=' text-xs text-[--grey]'>Mennyiség:</p>
                                <input type="number" id='mennyiseg' defaultValue='1' className='p-1 align-middle w-10 h-6 bg-[--navy] text-[--grey]' />
                                </div>
                            </div>
                            </div>
                            <div className='flex flex-col bg-[--lightnavy] p-2 gap-2 shadow-xl rounded-md'>
                            <div className='flex items-start gap-4 justify-between'>
                                <h3 className='text-[--grey] text-sm text-bold tracking-[.125em]'>Valami étel aminek nagyon hosszú neve van</h3>
                                <AiOutlineClose className='w-6 h-6 text-[--grey] p-1 lg:hover:bg-[--okker] lg:hover:text-[--navy] cursor-pointer' />
                            </div>
                            <div className='flex items-end gap-4 justify-between'>
                                <div className="py-1 px-2 bg-[--okker] font-[--navy] h-min text-sm rounded-sm">
                                    <p className="smartprice">1850 Ft</p>
                                </div>
                                <div className='flex items-center justify-start gap-1'>
                                <p className='text-xs text-[--grey]'>Mennyiség:</p>
                                <input type="number" id='mennyiseg' defaultValue='1' className='p-1 align-middle w-10 h-6 bg-[--navy] text-[--grey]' />
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className='flex flex-col p-4 border-t border-[--lightnavy]'>
                            <div className='flex items-center justify-between p-2'>
                            <h3 className='text-[--okker] font-bebas text-2xl'>Összesen:</h3>
                            <h3 className='text-[--grey] font-bebas text-2xl'>2564 Ft</h3>
                            </div>
                        </div>
                        <div className='flex items-center justify-end p-4 border-t border-[--lightnavy]'>
                            <Button title={"Pénztár"} icon={<TbShoppingCartCheck />}/>
                        </div>
                    </div>


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
                      <Link href="#napimenu" onClick={handleLinkClick}>Napi menü</Link>
                      <span className="absolute inset-x-0 bottom-0 h-[1px] bg-black transition-all duration-200 transform origin-left scale-x-0 group-hover:scale-x-100 group-focus:scale-x-100"></span>
                    </li>
                    <li className="relative group">
                      <Link href="#etlap" onClick={handleLinkClick}>Étlap</Link>
                      <span className="absolute inset-x-0 bottom-0 h-[1px] bg-black transition-all duration-200 transform origin-left scale-x-0 group-hover:scale-x-100 group-focus:scale-x-100"></span>
                    </li>
                    <li className="relative group">
                      <Link href="#rolunk" onClick={handleLinkClick}>Rólunk</Link>
                      <span className="absolute inset-x-0 bottom-0 h-[1px] bg-black transition-all duration-200 transform origin-left scale-x-0 group-hover:scale-x-100 group-focus:scale-x-100"></span>
                    </li>
                    <li className="relative group">
                      <Link href="#kapcsolat" onClick={handleLinkClick}>Kapcsolat</Link>
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
        </>    
    );
        
}