import { toast } from 'sonner'

export default function CheckoutButton({title, icon, disabled, menurendeles}:any) {

  const cursorClassName = disabled ? 'flex flex-nowrap items-center gap-1 py-1 lg:py-2 px-2 lg:px-4 bg-[--okker] text-[--navy] font-bebas h-min text-sm lg:text-lg rounded-md shadow-md  cursor-not-allowed opacity-50' : 'flex flex-nowrap items-center gap-1 hover:gap-3 py-1 lg:py-2 px-2 lg:px-4 bg-[--okker] text-[--navy] font-bebas h-min text-sm lg:text-lg hover:bg-[--okkerdark] rounded-md shadow-md hover:shadow-lg transition-all ease-in-out';

  const handleClick = () => {
    if (disabled) {
      // Display toast when the button is disabled
      toast.error(`A menürendelés hétköznapokon ${menurendeles} óra között elérhető.`, {
        className: 'warningtoaster',
        duration: 5000,
      });
    } else {
      // Perform other action when the button is not disabled
      // For instance, you can put your regular onClick logic here
      // For example: handleButtonClick()
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
