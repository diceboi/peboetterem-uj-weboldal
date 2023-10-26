import Link from 'next/link';
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
    <section id="rolunk" className="flex flex-col w-full bg-[--grey] lg:px-0" >
      <div className="container flex flex-col lg:gap-20 gap-4 lg:flex-row">
        <div className='relative flex justify-center lg:justify-end lg:items-start lg:w-2/5 bg-cover bg-center bg-no-repeat ' style={{backgroundImage: `url("${data.page.fooldalRolunk.hatter.sourceUrl}")`}}>
        <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-b lg:bg-gradient-to-r from-[#dadada7c] to-[--grey] lg:py-40'></div>
          <h1 className='text-[--navy] z-20 mt-36'>{data.page.fooldalRolunk.cim}</h1>
        </div>
        <div className='flex flex-col lg:w-3/5 lg:py-40 px-4'>
          <div className='text-[--navy] gap-4' dangerouslySetInnerHTML={htmlContent} />
          <div className="flex flex-col px-4 py-1 my-8 w-fit bg-[--okker] lg:gap-8 gap-2">
          <p className="font-bold text-[--navy]">Rendelj telefonon, és mi Kaposvár 15km-es körzetében bárhova kivisszük!</p>
          <div className='flex flex-col lg:flex-row gap-8'>
            <Link href="tel:+3682310663" ><p className="font-black text-[--navy]">+36 82 310 663</p></Link>
            <Link href="tel:+36304940959" ><p className="font-black text-[--navy]">+36 30 494 0959</p></Link>
          </div>
          </div>
        </div>
        
      </div>
    </section>
  )
}
