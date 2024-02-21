"use client";

import {
  TbMenu2,
  TbPhone,
  TbShoppingCart,
} from "react-icons/tb";
import { MdClose } from "react-icons/md";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef, createContext, useContext } from "react";
import Cart from "../UI/Cart";
import { AddToCartContext } from "@/app/addToCart";

const getAlapadatok = async () => {
  try {
    const res = await fetch("/api/alapadatok", { next: { revalidate: 5 } });

    if (!res.ok) {
      throw new Error("Az adatok letöltése nem sikerült");
    }

    return res.json();
  } catch (error) {
    console.log("Az adatok betöltése sikertlen", error);
    return null;
  }
};

function parseTimeToMinutes(timeStr: any) {
  if (timeStr === "Zárva" || !timeStr) return -1;
  const [hoursStr, minutesStr] = timeStr.split(":");
  const hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr || "0", 10);
  return hours * 60 + minutes; // Convert it to total minutes
}

function isOpenNowWithAlapadatok(alapadatokData: any) {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  if (!alapadatokData) {
    console.error("alapadatokData is not defined");
    return false;
  }

  let openingTimeStr, closingTimeStr;
  if (dayOfWeek >= 1 && dayOfWeek <= 5) {
    openingTimeStr = alapadatokData.nyitvatartashepe.split(" - ")[0];
    closingTimeStr = alapadatokData.nyitvatartashepe.split(" - ")[1];
  } else if (dayOfWeek === 6) {
    openingTimeStr = alapadatokData.nyitvatartasszo.split(" - ")[0];
    closingTimeStr = alapadatokData.nyitvatartasszo.split(" - ")[1];
  } else if (dayOfWeek === 0){
    openingTimeStr = alapadatokData.nyitvatartasv.split(" - ")[0];
    closingTimeStr = alapadatokData.nyitvatartasv.split(" - ")[1];
  }

  const openingMinutes = parseTimeToMinutes(openingTimeStr);
  const closingMinutes = parseTimeToMinutes(closingTimeStr);

  // Ensure the opening and closing times are valid
  if (openingMinutes === -1 || closingMinutes === -1) {
    console.error("Invalid opening or closing time");
    return false;
  }

  return currentMinutes >= openingMinutes && currentMinutes < closingMinutes;
}

export default function MainNav() {

  const { isCartOpen, toggleCartOpen, setCartPopup, isCartPopup, setCartClose, setMenuClose, isMenuClosed, toggleMenuOpen, getTotalItemCount }: any =
    useContext(AddToCartContext);

  const [alapadatok, setAlapadatok] = useState<any[]>([]);
  const [isRestaurantOpen, setIsRestaurantOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

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

  /*Click outside of menu close*/
  useEffect(() => {
    const handleOutsideMenuClick = (event:any) => {
      const menuContainer = document.getElementById("toggle-menu");

      // Check if the click is outside the menu container
      if (menuContainer && !menuContainer.contains(event.target)) {
        setMenuClose();
      }
    };

    // Add event listener when component mounts
    document.addEventListener("click", handleOutsideMenuClick);

    // Remove event listener when component unmounts
    return () => {
      document.removeEventListener("click", handleOutsideMenuClick);
    };
  }, []);

  const handleCloseClick = () => {
    setShowAlert(false);
  };

  const handleCartToggle = () => {
    toggleCartOpen();
    setMenuClose();
  };

  const handleMenuToggle = () => {
    toggleMenuOpen();
    setCartClose();
  }

  const cartClassName = isCartOpen
    ? " lg:-right-0"
    : "-right-full lg:-right-[10vw] opacity-0 pointer-events-none";

  const totalItemCount = getTotalItemCount();

  const cartCountSpan =
    totalItemCount > 0 ? (
      <span className="absolute flex justify-center items-center right-[0px] top-[0px] bg-[--alert] text-white w-[20px] h-[20px] rounded-full text-xs pointer-event-none">
        {totalItemCount}
      </span>
    ) : null;

  return (
    <>
      <nav
        id="desktop-menu"
        className="flex justify-center w-full m-auto z-50 fixed top-0"
      >
        <div
          id="menucontainer"
          className="relative hidden lg:flex flex-wrap items-center justify-between gap-8 mt-4 bg-[--navyblur] border border-[--lightnavy] rounded-md backdrop-blur-sm shadow-lg"
        >
          <div
            id="logo"
            className="absolute flex shrink-0 items-center border-r border-[--lightnavy] px-4"
          >
            <Link href="/">
              <Image
                src="https://admin.peboetterem.hu/wp-content/uploads/2023/10/pebo-typo-logo-white.svg"
                id="acceptrec-logo"
                alt="logo"
                width={75}
                height={50}
                priority
                className="ease-in-out duration-200"
              />
            </Link>
          </div>

          <ul
            id="menu"
            className="flex justify-between gap-8 items-center pl-4 text-md w-auto ml-[100px] text-[--grey]"
          >
            <li
              id="mainlink"
              className="flex items-center border border-transparent hover:text-[--okker] active:text-[--okker] focus:text-[--okker] px-2 py-2 transition-all"
            >
              <Link href="/napi-menu" className="flex items-center gap-2">
                <span>Napi menü</span>
              </Link>
            </li>

            <li
              id="mainlink"
              className="flex items-center border border-transparent hover:text-[--okker] active:text-[--okker] focus:text-[--okker] px-2 py-2 transition-all"
            >
              <Link href="/etlap" className="flex items-center gap-2">
                <span>Étlap</span>
              </Link>
            </li>

            <li
              id="mainlink"
              className="flex items-center border border-transparent hover:text-[--okker] active:text-[--okker] focus:text-[--okker] px-2 py-2 transition-all"
            >
              <Link href="/rolunk" className="flex items-center gap-2">
                <span>Rólunk</span>
              </Link>
            </li>

            <li
              id="mainlink"
              className="flex items-center border border-transparent hover:text-[--okker] active:text-[--okker] focus:text-[--okker] px-2 py-2 transition-all"
            >
              <Link href="/kapcsolat" className="flex items-center gap-2">
                <span>Kapcsolat</span>
              </Link>
            </li>
          </ul>
          <div className="flex flex-nowrap gap-16">
            <div className="flex flex-nowrap items-center gap-2 w-max">
              <div className="flex items-center justify-center h-full w-[55px]">
                <TbPhone className="text-[--okker] p-3 w-full h-full" />
              </div>
              <div className="flex flex-col gap-0">
                <Link href="tel:0682310633">
                  <p className="footerparagraph">06 82 310 633</p>
                </Link>
                <Link href="tel:06304940959">
                  <p className="footerparagraph">06 30 494 0959</p>
                </Link>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="footerparagraph">Jelenleg:</p>
              <p
                className={
                  isRestaurantOpen ? "open text-2xl" : "close text-2xl"
                }
              >
                {isRestaurantOpen ? "Nyitva" : "Zárva"}
              </p>
            </div>
            <div className={isCartPopup ? `relative flex items-center justify-center h-full w-[55px] rounded-md text-[--grey] bg-[--okker] animate-popup` : `relative flex items-center justify-center h-full w-[55px] text-[--grey]`}>
              {cartCountSpan}
              <TbShoppingCart
                className={`p-3 w-full h-full cursor-pointer rounded-e-md ${
                  isCartOpen
                    ? "hidden"
                    : ""
                }`}
                onClick={handleCartToggle}
              />

              <MdClose
                className={`p-3 w-full h-full cursor-pointer rounded-e-md ${
                  isCartOpen
                    ? ""
                    : "hidden"
                }`}
                onClick={handleCartToggle}
              />

              <Cart cartClassName={cartClassName} />
            </div>
          </div>
          
        </div>
        
      </nav>
      
      <div
        id="mobile-menu"
        className="fixed top-0 lg:hidden flex justify-between items-center w-full h-[64px] p-2 bg-[--navy] border-b border-[--lightnavy] shadow-lg z-50"
      >
        <Link href="/">
          <Image
            src="https://admin.peboetterem.hu/wp-content/uploads/2023/10/pebo-typo-logo-white.svg"
            alt="logo"
            width={75}
            height={40}
          />
        </Link>
        <div className="flex flex-nowrap lg:gap-4 gap-1">
          <div className="flex flex-col items-center justify-center px-2">
            <p className="footerparagraph lg:block hidden">Jelenleg:</p>
            <p
              className={isRestaurantOpen ? "open text-2xl mt-1" : "close text-2xl mt-1"}
            >
              {isRestaurantOpen ? "Nyitva" : "Zárva"}
            </p>
          </div>

          

          <div className="flex gap-2" id="toggle-menu">
            <button className="p-2" onClick={handleMenuToggle} aria-label="Menu">
              <TbMenu2
                className={`h-8 w-auto cursor-pointe text-[--grey] ${
                  isMenuClosed ? " hidden" : ""
                }`}
              />
              <MdClose
                className={`h-8 w-auto cursor-pointe text-[--grey] ${
                  isMenuClosed ? "" : " hidden"
                }`}
              />
            </button>
            <div
              
              className={`absolute top-[64px] bg-[--navy] h-auto w-full p-4 text-[--grey] border-b border-[--lightnavy] shadow-lg ${
                isMenuClosed ? "opacity-100 right-0" : "-right-[15vw] opacity-0 pointer-events-none"
              } transition-all ease-in-out`}
            >
              <ul className="relative flex flex-col items-end gap-4">
                <li className="relative group">
                  <Link href="/napi-menu" onClick={setMenuClose}>
                    Napi menü
                  </Link>
                  <span className="absolute inset-x-0 bottom-0 h-[1px] bg-black transition-all duration-200 transform origin-left scale-x-0 group-hover:scale-x-100 group-focus:scale-x-100"></span>
                </li>
                <li className="relative group">
                  <Link href="/etlap" onClick={setMenuClose}>
                    Étlap
                  </Link>
                  <span className="absolute inset-x-0 bottom-0 h-[1px] bg-black transition-all duration-200 transform origin-left scale-x-0 group-hover:scale-x-100 group-focus:scale-x-100"></span>
                </li>
                <li className="relative group">
                  <Link href="/rolunk" onClick={setMenuClose}>
                    Rólunk
                  </Link>
                  <span className="absolute inset-x-0 bottom-0 h-[1px] bg-black transition-all duration-200 transform origin-left scale-x-0 group-hover:scale-x-100 group-focus:scale-x-100"></span>
                </li>
                <li className="relative group">
                  <Link href="/kapcsolat" onClick={setMenuClose}>
                    Kapcsolat
                  </Link>
                  <span className="absolute inset-x-0 bottom-0 h-[1px] bg-black transition-all duration-200 transform origin-left scale-x-0 group-hover:scale-x-100 group-focus:scale-x-100"></span>
                </li>
              </ul>
            </div>
          </div>
          <div className={isCartPopup? `relative flex items-center justify-center h-full w-full rounded-md text-[--grey] bg-[--okker] animate-popup` : `relative flex items-center justify-center h-full w-full rounded-md text-[--grey]`} id="cart">
            {cartCountSpan}
            <TbShoppingCart
              className={`p-2 w-12 h-12 cursor-pointer ${isCartOpen ? " hidden" : ""}`}
              onClick={handleCartToggle}
            />

            <MdClose
              className={`p-2 w-12 h-12 cursor-pointer ${isCartOpen ? "" : " hidden"}`}
              onClick={handleCartToggle}
            />

            <Cart cartClassName={cartClassName} />
          </div>
        </div>
      </div>

      <div>
        {showAlert && (
          <div
            id="alert"
            className="fixed top-[64px] flex flex-nowrap justify-start lg:justify-center items-center -translate-x-1/2 left-1/2 w-full lg:w-6/12 bg-[--alert] py-4 px-4 z-50 text-white text-sm"
          >
            <p className="w-[80%]">
              Karácsonyi nyitvatartás változás!{" "}
              <Link href={"#footer"} className="underline">
                Kattints ide.
              </Link>
            </p>
            <MdClose
              className="absolute right-2 top-2 lg:-translate-y-1/2 lg:top-1/2 cursor-pointer w-6 h-6"
              onClick={handleCloseClick}
            />
          </div>
        )}
      </div>
    </>
  );
}
