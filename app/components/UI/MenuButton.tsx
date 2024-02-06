import { AddToCartContext } from "@/app/addToCart";
import { useContext } from "react";
import { Toaster, toast } from "sonner";

export default function MenuButton({
  title,
  icon,
  disabled,
  rendelesfelvetel,
  termek,
  tipus,
}: any) {
  const { cartItems, handleAddToCart, setCartPopup }: any =
    useContext(AddToCartContext);

  const cursorClassName = disabled
    ? "flex flex-nowrap items-center gap-1 py-1 lg:py-2 px-2 lg:px-4 bg-[--okker] text-[--navy] font-bebas h-min text-lg rounded-md shadow-md cursor-not-allowed opacity-50 z-10"
    : "flex flex-nowrap items-center gap-1 hover:gap-3 py-1 lg:py-2 px-2 lg:px-4 bg-[--okker] text-[--navy] font-bebas h-min text-lg hover:bg-[--okkerdark] rounded-md shadow-md hover:shadow-lg transition-all ease-in-out z-10";

  const handleClick = () => {
    if (disabled) {
      // Display toast when the button is disabled
      toast.error(
        `Rendeléseket nyitvatartási időben ${rendelesfelvetel}-ig veszünk fel.`,
        {
          className: "warningtoaster",
          duration: 5000,
        }
      );
    } else {
      const itemIndex = cartItems.findIndex(
        (item: any) => item._id === termek._id
      );

      const modifiedId = tipus === 1 ? `${termek._id}masodlagos` : termek._id;

      if (itemIndex !== -1) {
        // If item exists, increase its count by 1
        handleAddToCart({
          ...termek,
          count: cartItems[itemIndex].count + 1,
          tipus: tipus,
          _id: modifiedId,
        });
      } else {
        // If the item doesn't exist, add it to the cart with count 1
        handleAddToCart({ ...termek, count: 1, tipus: tipus, _id: modifiedId });
      }

      if (!disabled) {
        setCartPopup();
        toast.success(
          `Az étel a kosárba került!`,
          {
            className: "warningtoaster",
            duration: 5000,
          }
        );
      }
      console.log(cartItems);
    }
  };

  return (
    <>
      <Toaster richColors position="bottom-center"/>
      <button className={cursorClassName} onClick={handleClick}>
        {icon}
        {title}
      </button>
    </>
  );
}
