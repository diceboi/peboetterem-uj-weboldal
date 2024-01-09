  'use client'

  import { AddToCartContext } from "@/app/addToCart";
  import { useContext, useEffect, useState } from "react";
  import { AiOutlineClose, AiOutlineMinusSquare, AiOutlinePlusSquare } from "react-icons/ai";
import { TbSquareMinus, TbSquarePlus, TbTrash } from "react-icons/tb";

  interface CartItem {
      _id: string;
      nev: string; // or any unique identifier
      menunev: string;
      menuar: number;
      elsodlegesar: number;
      masodlagosar: number;
      elsoelotag: string;
      masodikelotag: string;
      count: number;
    }

  export default function CartItem({ _id, nev, menunev, elsodlegesar, elsoelotag, masodikelotag, menuar, masodlagosar, count: initialCount }:CartItem) {

      const [count, setCount] = useState(initialCount);
      const { handleDecreaseCount, handleAddToCart, handleDeleteCartItem }: any = useContext(AddToCartContext);

      useEffect(() => {
          // Update the local count when the initialCount changes (e.g., when cart items change)
          setCount(initialCount);
        }, [initialCount]);

      const handleCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newCount = parseInt(event.target.value);
      if (!isNaN(newCount)) {
          setCount(newCount);
          handleDecreaseCount({ _id, count: newCount });
      }
      };

      const handleIncreaseCount = () => {
        handleAddToCart({ _id, count: count + 1 });
      };
    
      const handleDecreaseLocalCount = () => {
        if (count > 0) {
          setCount(count - 1);
          handleDecreaseCount({ _id, count: count - 1 });
        }
      };
    
      const handleDeleteItem = () => {
        handleDeleteCartItem(_id);
      };

    return (
      <>
        <div id={_id} className="flex flex-col bg-[--lightnavy] p-2 gap-2 shadow-xl rounded-md my-1 mx-2">
          <div className="flex items-start gap-4 justify-between">
            <h3 className="text-[--grey] text-sm text-bold tracking-[.125em]">

            {
              elsoelotag ? (
                <>{count + ' x ' + nev + `(${elsoelotag})` || menunev}</>
              ) : (
                <>{count + ' x ' + nev || menunev}</>
              )
            }
              
            </h3>
            <button onClick={handleDeleteItem}><TbTrash className="w-6 h-6 text-[--grey] p-1 lg:hover:bg-[--alert] cursor-pointer rounded-md"/></button>
          </div>
          <div className="flex items-end gap-4 justify-between">

              <p className="smartprice text-[--okker]">{elsodlegesar * count} Ft</p>

            <div className="flex items-center justify-start gap-1">
              <p className=" text-xs text-[--grey]">Mennyiség:</p>
              <button onClick={handleDecreaseLocalCount}><AiOutlineMinusSquare className="w-6 h-6 text-[--grey]" /></button>
              <input
                type="text"
                id="mennyiseg"
                value={String(count)}
                onChange={handleCountChange}
                className="p-1 align-middle w-10 h-6 bg-[--navy] text-[--grey]"
              />
              <button onClick={handleIncreaseCount}><AiOutlinePlusSquare className="w-6 h-6 text-[--grey]" /></button>
            </div>
          </div>
        </div>     
      </>
    );
  }
