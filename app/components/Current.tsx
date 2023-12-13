import Link from "next/link";
import CurrentTile from "./UI/CurrentTile";
import CurrentTile2 from "./UI/CurrentTile2";


export default function Current() {
  return (
    <div id="aktualis" className="flex flex-col items-center w-full container m-auto z-10 px-4 py-8">
      <h1 className='leading-[.75em] py-8'>Aktuális Ajánlatok</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-4 min-h-[30vh]">
      <CurrentTile />
      <CurrentTile2 />
      </div>
      <div className="flex flex-col gap-4 py-8">
        <h3 className='leading-[.75em] font-bebas text-[--okker] text-xl lg:text-3xl'>Előrendelés: <Link className="underline" href="tel:0682310633">06 82 310 633</Link> | <Link className="underline" href="tel:06304940959">0630 494 0959</Link></h3>
      </div>
    </div>
  )
}
