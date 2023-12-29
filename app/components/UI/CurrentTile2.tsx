import Image from "next/image"
import Link from "next/link"
import { PiPhone } from "react-icons/pi"
import { TbPhone } from "react-icons/tb"

export default function CurrentTile2() {
  return (
    <div className="relative flex flex-col p-4 bg-[--lightnavy] rounded-md border border-[--lightnavyborder] shadow-2xl">
        <Image 
            src='/karacsonyi-talak-bg.jpg'
            alt="egyketto"
            style={{objectFit: "cover"}}
            fill={true}
            className="opacity-25"
        />
        <h2 className='leading-[.75em] z-10'>Karácsonyi tálak</h2>
        <div className="flex flex-col py-8 text-white z-10">
            <div className="py-2">
                <p className="font-bebas text-[--okker] text-2xl">Krampusz tál: 13 000 Ft (+ csomagolás)</p>
                <p className="text-sm">Almával töltött kukoricapelyhes csirkemell rántva, mézes csípős szezámos csirkefalatok, lilahagymával és camemberttel töltött csirke, cigánypecsenye, stefánia szelet, rántott sajt, rántott karfiol, rizibizi, hasábburgonya, krokett</p>
            </div>
            <div className="py-2">
                <p className="font-bebas text-[--okker] text-2xl">Grinch tál: 13 000 Ft (+ csomagolás)</p>
                <p className="text-sm">Gesztenyével, sajttal töltött csirkemell rántva, mézes csípős szezámos csirkefalatok, aszalt szilvával és sajttal töltött baconbe tekert csirkemell, sertés cordon, dubarry karaj, rántott sajt, rántott karfiol, rizs, hasábburgonya, krokett</p>
            </div>
        </div>
        <div className="flex flex-nowrap justify-center items-center gap-1 self-end z-10 smallprice">Előrendelés 2023.12.21-ig</div>
    </div>
  )
}
