import { AddToCartContext } from '@/app/addToCart';
import { useContext } from 'react';
import { toast } from 'sonner'

export default function NapiMenuButton({title, icon, disabled, menurendeles, menuar, menunev}:any) {

  const elsodlegesar = menuar
  const _id = menunev
  const nev = menunev
  const termek = {_id, elsodlegesar, nev}

  const {cartItems, handleAddToCart, setCartOpen}:any = useContext(AddToCartContext)

  const cursorClassName = disabled ? 'flex flex-nowrap items-center gap-1 py-1 lg:py-2 px-2 lg:px-4 bg-[--okker] text-[--navy] font-bebas h-min text-sm lg:text-lg rounded-md shadow-md  cursor-not-allowed opacity-50' : 'flex flex-nowrap items-center gap-1 hover:gap-3 py-1 lg:py-2 px-2 lg:px-4 bg-[--okker] text-[--navy] font-bebas h-min text-sm lg:text-lg hover:bg-[--okkerdark] rounded-md shadow-md hover:shadow-lg transition-all ease-in-out';

  const handleClick = () => {
    if (disabled) {
      // Display toast when the button is disabled
      toast.error(`A menürendelés hétköznapokon ${menurendeles} óra között elérhető.`, {
        className: 'warningtoaster',
        duration: 5000,
      });
    } else {
      const itemIndex = cartItems.findIndex((item: any) => item._id === termek._id);

      if (itemIndex !== -1) {
        // If item exists, increase its count by 1
        handleAddToCart({ ...termek, count: cartItems[itemIndex].count + 1 });
      } else {
        // If the item doesn't exist, add it to the cart with count 1
        handleAddToCart({ ...termek, count: 1 });
      }

      if (!disabled) {
        setCartOpen();
      }
      console.log(cartItems)
    }
  };

  return (
    <>
    <button 
    className={cursorClassName} onClick={handleClick}>
        {icon}
        {title}
    </button>
    
    </>
  )
}
