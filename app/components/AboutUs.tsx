import Image from 'next/image';

export default async function AboutUs() {

  return (
    <section id="rolunk" className="relative flex flex-col w-full bg-[--grey] overflow-hidden" >
      <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-b bg-[#dadadad7] z-10'></div>
      <Image 
          src="/rolunk-bg.webp"
          alt="rolunk"
          width={1280}
          height={853}
          style={{ objectFit: "cover", objectPosition: "50% 50%" }}
          className='absolute w-full h-full'
        />
      <div className="container m-auto flex flex-col justify-center lg:gap-20 gap-4 lg:flex-row py-40">
        <h1 className='text-[--navy] z-20'>Rólunk</h1>
        <div className='flex flex-col lg:w-3/5 z-20'>
          <div className='flex flex-col text-[--navy] gap-8'>
            <p>
            Több éves vendéglátós tapasztalattal a hátunk mögött úgy döntöttünk <b>2023-ban megvalósítjuk álmainkat és nyitunk egy saját éttermet Kaposváron.</b>
            </p>
            <p>
            Nálunk az olaszos ízek mellett a klasszikus ételeket is megtalálod. <b>À La Carte</b> választékunk mellett <b>napi menüvel</b> is várunk minden nap, melyet rendelésre is kérhetsz.
            </p>
            <p>
            Ha csak egy kávéra vágysz, akkor is jó helyen jársz - <b>éttermünk egyben kávézó is</b>! Tölts el hangulatos pillanatokat nálunk!
            </p>
            <p>
            Otthonról szeretnél rendelni, vagy esetleg munkahelyedre? Nálunk ezt is megteheted, <b>rendelésedet kiszállítjuk!</b> Nekünk fontos a pontosság - ha tőlünk rendelsz, nem kell órákat várnod hogy kézhez kapd megrendelésedet!
            </p>
            <p>
            <b>Rendezvényeket 40 főig vállalunk.</b> Legyen az <b>szülinap, egy összejövetel, netán egy céges buli,</b> ránk számíthatsz! Keress minket bátran üzenetben, vagy az alábbi telefonszámok egyikén: <a href="tel:06 82 310 633" className='underline'>06 82 310 633</a>, <a href="tel:06 30 494 0959" className='underline'>06 30 494 0959</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
