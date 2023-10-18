import Image from "next/image";

interface HeroBg {
  herobg: string;
  herologo: string;
  herologoalt: string;
  shortdescription: string;
}

export default function Hero({ herobg, herologo, herologoalt, shortdescription }:HeroBg) {
  return (
    <section className="relative flex flex-col justify-center gap-10 w-full h-[90vh] bg-[--navy]">
      <div style={{backgroundImage: `url("${herobg}")`}} className="absolute w-full h-full opacity-50 mix-blend-overlay bg-cover bg-no-repeat bg-center"></div>
      <div className="container m-auto flex flex-col gap-10 justify-center items-center z-10">
        <Image src={herologo} alt={herologoalt} width={300} height={300} className=""/>
        <p className="w-11/12 lg:w-1/2 text-center">{shortdescription}</p>

      </div>

    </section>
  )
}
