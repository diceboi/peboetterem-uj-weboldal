"use client"

import { TbHome2, TbMenu2 } from 'react-icons/tb'
import { MdClose } from 'react-icons/md'
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';


export default function MainNav() {

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const mobileMenuRef = useRef(null);

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

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

    useEffect(() => {
        function handleScroll() {
            const menu = document.getElementById("desktop-menu");
            const menuInner = document.getElementById("menu");
            const logo = document.getElementById("acceptrec-logo");
            const scrollY = window.scrollY;
    
            if (menu) {
                if (scrollY > 0) {
                    menu.style.height = "55px";
                    menu.style.boxShadow = "var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)";
                    menu.style.backgroundColor = "var(--navyblur)";
                    if (logo) logo.style.width = "100px";
                    if (menuInner) menuInner.style.height = "55px";
                } else {
                    menu.style.height = "96px";
                    menu.style.boxShadow = "0 0 0 0";
                    menu.style.backgroundColor = "var(--navy)";
                    if (logo) logo.style.width = "200px";
                    if (menuInner) menuInner.style.height = "96px";
                }
            }
        }
    
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
 
    return (
        <>
        <nav id='desktop-menu' style={{ height: "75px", backgroundColor: "transparent" }} className="hidden xl:flex flex-wrap justify-center px-4 w-full mx-auto z-50 sticky top-0 backdrop-blur-sm ease-in-out duration-200">
            <div className='flex justify-between items-center gap-8 w-full'>
                <div id="logo" className="flex shrink-0 items-center">
                    <Link href="/">
                        <Image src="/Accept-Stacked-Logo-with-Strapline-RGB300.webp" id='acceptrec-logo' alt="logo" width={200} height={150} priority className="w-[200px] h-auto ease-in-out duration-200" />
                    </Link>
                </div>
                
                
                <ul id="menu" className='flex items-center gap-2 text-md font-bold h-24'>

                        <li id='mainlink' className='flex items-center border border-transparent hover:border-neutral-300 rounded-full hover:bg-[#0001] px-2 '><Link href="#napimenu" className="flex items-center gap-2"><span className='flex flex-nowrap items-center gap-1'>Napi menü</span></Link></li>

                        <li id='mainlink' className='flex items-center border border-transparent hover:border-neutral-300 rounded-full hover:bg-[#0001] px-2 '><Link href="#etlap" className="flex items-center gap-2"><span>Étlap</span></Link></li>
                                        
                        <li id='mainlink' className='flex items-center border border-transparent hover:border-neutral-300 rounded-full hover:bg-[#0001] px-2'><Link href="#rolunk" className="flex items-center gap-2"><span>Rólunk</span></Link></li>
                    
                    
                        <li id='mainlink' className='flex items-center border border-transparent hover:border-neutral-300 rounded-full hover:bg-[#0001] px-2 transition-all'><Link href="#galeria" className="flex items-center gap-2"><span>Galéria</span></Link></li>

                        <li id='mainlink' className='flex items-center border border-transparent hover:border-neutral-300 rounded-full hover:bg-[#0001] px-2 transition-all'><Link href="#kapcsolat" className="flex items-center gap-2"><span>Kapcsolat</span></Link>
                        </li>
                </ul>
            </div>    
        </nav> 

        <nav className='xl:hidden sticky top-0 z-50 min-h-16 w-full overflow-x-clip' ref={mobileMenuRef}>
            <div className='flex justify-between items-center h-16 px-4 shadow-lg bg-white'>
                <div id="logo" className="flex shrink-0 items-center w-40 h-14">
                    <Link href="/">
                        <Image src="/Accept-Stacked-Logo-with-Strapline-RGB300.webp" alt="logo" className="w-40" width={150} height={40} />
                    </Link>
                </div>
                <menu className=' flex justify-center items-center gap-4'>
                    <button onClick={toggleMobileMenu}><TbMenu2 className={`h-8 w-auto cursor-pointe ${mobileMenuOpen ? ' hidden' : ''}`}/><MdClose className={`h-8 w-auto cursor-pointe ${mobileMenuOpen ? '' : ' hidden'}`}/></button>
                    <ul className={`menu-mobile absolute top-[64px] right-0 grid grid-cols-1 justify-start items-center w-screen sm:w-96 bg-white shadow-special${mobileMenuOpen ? ' active' : ''}`}>
                        <li className='flex justify-between border-t border-neutral-300'>
                            <Link href="#napimenu" className='w-full p-2 font-black text-xl'>Napi menü</Link>
                        </li>
                        <li className='flex justify-between border-t border-neutral-300'>
                            <Link href="#etlap" className='w-full p-2 font-black text-xl'>Étlap</Link>
                        </li>
                        <li className='flex justify-between border-t border-neutral-300'>
                            <Link href="#rolunk" className='w-full p-2 font-black text-xl'>Rólunk</Link>
                        </li>
                        <li className='flex justify-between border-t border-neutral-300'>
                            <Link href="#galeria" className='w-full p-2 font-black text-xl'>Galéria</Link>
                        </li>
                        <li className='flex justify-between border-t border-neutral-300'>
                            <Link href="#kapcsolat" className='w-full p-2 font-black text-xl'>Kapcsolat</Link>
                        </li>
                    </ul>
                </menu>
            </div>
        </nav>  
        </>    
    );
        
}

