  'use client'

  import { AddToCartContext } from "@/app/addToCart";
  import { useContext, useEffect, useState } from "react";
  import { AiOutlineClose } from "react-icons/ai";

  interface CartItem {
      _id: string;
      nev: string; // or any unique identifier
      elsodlegesar: number;
      masodlagosar: string;
      count: number;
    }

  export default function CartItem({ _id, nev, elsodlegesar, masodlagosar, count: initialCount }:CartItem) {

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
        <div className="flex flex-col bg-[--lightnavy] p-2 gap-2 shadow-xl rounded-md my-1 mx-2">
          <div className="flex items-start gap-4 justify-between">
            <h3 className="text-[--grey] text-sm text-bold tracking-[.125em]">
              {count + ' x ' + nev}
            </h3>
            <button onClick={handleDeleteItem}><AiOutlineClose className="w-6 h-6 text-[--grey] p-1 lg:hover:bg-[--okker] lg:hover:text-[--navy] cursor-pointer rounded-md"/></button>
          </div>
          <div className="flex items-end gap-4 justify-between">
            <div className="py-1 px-2 bg-[--okker] font-[--navy] h-min text-sm rounded-sm">
              <p className="smartprice">{elsodlegesar * count} Ft</p>
            </div>
            <div className="flex items-center justify-start gap-1">
              <p className=" text-xs text-[--grey]">Mennyiség:</p>
              <button onClick={handleDecreaseLocalCount}>-</button>
              <input
                type="text"
                id="mennyiseg"
                value={String(count)}
                onChange={handleCountChange}
                className="p-1 align-middle w-10 h-6 bg-[--navy] text-[--grey]"
              />
              <button onClick={handleIncreaseCount}>+</button>
            </div>
          </div>
        </div>     
      </>
    );
  }
