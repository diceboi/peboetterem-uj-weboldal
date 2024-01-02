import Image from 'next/image';
import { getClient } from '../lib/client'
import { gql } from '@apollo/client'

const query = gql`
query getCategories {
  page(id: "297", idType: DATABASE_ID) {
    fooldalRolunk {
      cim
      hatter {
        sourceUrl
      }
      rovidSzoveg
    }
  }
}`

export default async function AboutUs() {

  const { data } = await getClient().query({ 
    query, 
    context: {
      fetchOptions: {
        next: { revalidate: 5 },
      },
    },
  });

  const htmlContent = { __html: data.page.fooldalRolunk.rovidSzoveg };

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
          <div className='text-[--navy] gap-4'>
            <p>
            Több éves vendéglátós tapasztalattal a hátunk mögött úgy döntöttünk 2023-ban megvalósítjuk álmainkat és nyitunk egy saját éttermet Kaposváron.

            Nálunk az olaszos ízek mellett a klasszikus ételeket is megtalálod. À La Carte választékunk mellett napi menüvel is várunk minden nap, melyet rendelésre is kérhetsz.

            Ha csak egy kávéra vágysz, akkor is jó helyen jársz - éttermünk egyben kávézó is! Tölts el hangulatos pillanatokat nálunk!

            Otthonról szeretnél rendelni, vagy esetleg munkahelyedre? Nálunk ezt is megteheted, rendelésedet kiszállítjuk! Nekünk fontos a pontosság - ha tőlünk rendelsz, nem kell órákat várnod hogy kézhez kapd megrendelésedet!

            Rendezvényeket is vállalunk!

            Rendezvényeket 40 főig vállalunk. Legyen az szülinap, egy összejövetel, netán egy céges buli, ránk számíthatsz! Keress minket bátran üzenetben, vagy az alábbi telefonszámok egyikén: 06 82 310 633, 06 30 494 0959
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
