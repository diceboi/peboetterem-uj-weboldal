import { TbShoppingCartCheck } from "react-icons/tb";
import PenztarButton from "./PenztarButton";
import { AiOutlineClose } from "react-icons/ai";
import CartItem from "./CartItem";
import { useContext } from "react";
import { AddToCartContext } from "@/app/addToCart";

export default function Cart({ cartClassName }:any) {

    const { cartItems, setCartClose, getTotalPrice }:any = useContext(AddToCartContext) 

    const handleCartClose = () => {
        setCartClose(); // Call the setCartClose function to close the cart
      };

  return (
    <>
      <div
        id="cart"
        className={
          `absolute flex flex-col top-[65px] ${cartClassName} w-[90vw] lg:w-96 h-auto bg-[--navy] shadow-2xl border border-[--lightnavy] rounded-md transition-all ease-out z-0`
        }
      >
        <div className="flex justify-between items-center p-4 border-b border-[--lightnavy]">
          <h2 className="text-[--okker] font-bebas text-2xl">Kosár</h2>
          <AiOutlineClose
            className="w-7 h-7 text-[--grey] p-1 lg:hover:bg-[--okker] lg:hover:text-[--navy] cursor-pointer rounded-md"
            onClick={handleCartClose}
          />
        </div>

        <div className="flex flex-col py-1">
        {
            cartItems && cartItems.length > 0 ?
            cartItems.map((item: {_id: any; nev: any; menunev: any; elsodlegesar: any; elsoelotag: any; masodikelotag: any; menuar: any; masodlagosar: any; count: any}) =>
                <CartItem _id={item._id} key={item._id} nev={item.nev} menunev={item.menunev} elsodlegesar={item.elsodlegesar} elsoelotag={item.elsoelotag} masodikelotag={item.masodikelotag} menuar={item.menuar} masodlagosar={item.masodlagosar} count={item.count} />
            ) : null
        }
        </div>
        
        <div className="flex flex-col p-4 border-t border-[--lightnavy]">
          <div className="flex items-center justify-between p-2">
            <h3 className="text-[--okker] font-bebas text-2xl">Összesen:</h3>
            <h3 className="text-[--grey] font-bebas text-3xl ">{getTotalPrice()} Ft</h3>
          </div>
        </div>
        <div className="flex items-center justify-end p-4 border-t border-[--lightnavy]">
          <PenztarButton title={"Pénztár"} icon={<TbShoppingCartCheck />} />
        </div>
      </div>
    </>
  );
}
