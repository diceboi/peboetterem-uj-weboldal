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
    </div>
  )
}
