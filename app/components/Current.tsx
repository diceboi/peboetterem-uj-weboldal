import Link from "next/link";
import CurrentTile from "./UI/CurrentTile";
import CurrentTile2 from "./UI/CurrentTile2";


export default function Current() {
  return (
    <section id="aktualis" className="flex flex-col items-center justify-center m-auto bg-[--navy]">
      <CurrentTile />
    </section>
  )
}
