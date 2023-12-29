import Image from "next/image"
import Link from "next/link"
import { PiPhone } from "react-icons/pi"
import { TbPhone } from "react-icons/tb"

export default function CurrentTile() {
  return (
    <div className="relative flex flex-col p-4 bg-[--lightnavy] rounded-md border border-[--lightnavyborder] shadow-2xl">
        <Image 
            src='/szilveszteri-talak.png'
            alt="egyketto"
            style={{objectFit: "cover"}}
            fill={true}
            className="opacity-50"
        />
        <h2 className='leading-[.75em] z-10'>Szilveszteri tálak</h2>
        <div className="flex flex-col py-8 text-white z-10">
            <div className="py-2">
                <p className="font-bebas text-[--okker] text-2xl">Party tál: 7900 Ft (+ csomagolás)</p>
                <p className="text-sm">Franciasaláta, majonézes burgonyasaláta, fasírtgolyó, rakott csirkecomb filé, cordon bleu, sonkatekercs, kaszinótojás</p>
            </div>
            <div className="py-2">
                <p className="font-bebas text-[--okker] text-2xl">Újévi tál: 7900 Ft (+ csomagolás)</p>
                <p className="text-sm">Franciasaláta, majonézes burgonyasaláta, mexikói vagdalt, kolbásszal töltött karaj, szezámos csirkemell csíkok, sonkatekercs, kaszinótojás</p>
            </div>
            <div className="py-2">
                <p className="font-bebas text-[--okker] text-2xl">Lencsefőzelék + Virsli: 1590 Ft (+ csomagolás)</p>
            </div>
        </div>
        <div className="flex flex-nowrap justify-center items-center gap-1 self-end z-10 smallprice">Előrendelés 2023.12.28-ig</div>
    </div>
  )
}
