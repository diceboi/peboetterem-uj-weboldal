import { TbSoup } from 'react-icons/tb'
import { GiHotMeal } from 'react-icons/gi'

import { getClient } from '../lib/client'
import { gql } from '@apollo/client'

const query = gql`
query getNapimenu {
  allNapiMen(last: 2, where: {orderby: {field: DATE, order: ASC}}) {
    edges {
      node {
        napiMenu {
          elsoEloetel
          allergenekElsoEloetel {
            allergen1
            allergen2
            allergen3
            allergen4
            allergen5
            allergen6
            allergen7
          }
          elsoFoetel
          allergenekElsoFoetel {
            allergen1
            allergen2
            allergen3
            allergen4
            allergen5
            allergen6
            allergen7
          }
          masodikEloetel
          allergenekMasodikEloetel {
            allergen1
            allergen2
            allergen3
            allergen4
            allergen5
            allergen6
            allergen7
            fieldGroupName
          }
          masodikFoetel
          allergenekMasodikFoetel {
            allergen1
            allergen2
            allergen3
            allergen4
            allergen5
            allergen6
            allergen7
            fieldGroupName
          }
        }
        title
      }
    }
  }
}`

export default async function DailyMenu() {

  const { data } = await getClient().query({ 
    query, 
    context: {
      fetchOptions: {
        next: { revalidate: 5 },
      },
    },
  });

  //allergének listázása

  function generateAllergenText(allergen:any) {
    const allergenValues = [
      allergen.allergen1,
      allergen.allergen2,
      allergen.allergen3,
      allergen.allergen4,
      allergen.allergen5,
      allergen.allergen6,
      allergen.allergen7,
    ];
  
    const filteredAllergens = allergenValues.filter((value) => value !== null && value !== "");
    
    if (filteredAllergens.length > 0) {
      return (
        <p className="flex flex-row flex-nowrap text-[--grey] lg:text-sm text-xs opacity-30">{`${filteredAllergens.join(", ")}`}</p>
      );
    }
    
    return null;
  }
  

  return (
    <>
    <div className="absolute w-full h-[15vh] bg-gradient-to-t from-[--navy] to-transparent -mt-[15vh]"></div>
    <section id="napimenu" className="flex flex-col w-full min-h-[40vh] bg-[--navy] px-4 gap-8">
      <div className="container m-auto flex  lg:flex-nowrap justify-center items-center gap-8">
        <h1 className='leading-[.75em]'>Napi menü</h1>
        <h2 className="price lg:w-fit w-full">{`1850 Ft/nap`}</h2>
      </div>
      <div className="container m-auto grid grid-cols-1 lg:grid-cols-2 gap-4">
        
      {data.allNapiMen.edges.map((edge: any, index: any) => (
        <div key={index} className="flex flex-col lg:flex-row bg-[--lightnavy]">
          <div className="flex flex-col justify-start items-start lg:items-center border-b lg:border-r border-[--navy] m-4 lg:pb-0 pb-4 pr-4 gap-2">
            <h1 className='-mt-4'>{edge.node.title}</h1>
            <p className="day -mt-4">Csütörtök</p>
          </div>
          <div className="flex flex-col w-full px-4">
            <div className="flex flex-col gap-4 lg:gap-1 border-b border-[--navy] lg:mt-4 lg:pb-4 pb-2">
              <div className="flex flex-nowrap gap-2">
                <TbSoup className="w-6 h-6 text-[--okker]" />
                <div className='flex flex-col lg:flex-row gap-0 lg:gap-2 text-[--grey]'>
                  <p className='lg:text-md text-sm'>{edge.node.napiMenu.elsoEloetel}</p>
                  {generateAllergenText(edge.node.napiMenu.allergenekElsoEloetel)}
                </div>
              </div>
              <div className="flex flex-nowrap gap-2">
                <GiHotMeal className="w-6 h-6 text-[--okker]" />
                <div className='flex flex-col lg:flex-row gap-0 lg:gap-2 text-[--grey]'>
                  <p className='lg:text-md text-sm'>{edge.node.napiMenu.elsoFoetel}</p>
                  {generateAllergenText(edge.node.napiMenu.allergenekElsoFoetel)}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 lg:gap-1 border-b border-[--navy] mt-4 lg:pb-4 pb-2">
              <div className="flex flex-nowrap gap-2">
                <TbSoup className="w-6 h-6 text-[--okker]" />
                <div className='flex flex-col lg:flex-row gap-0 lg:gap-2 text-[--grey]'>
                  <p className='lg:text-md text-sm'>{edge.node.napiMenu.masodikEloetel}</p>
                  {generateAllergenText(edge.node.napiMenu.allergenekMasodikEloetel)}
                </div>
              </div>
              <div className="flex flex-nowrap gap-2">
                <GiHotMeal className="w-6 h-6 text-[--okker]" />
                <div className='flex flex-col lg:flex-row gap-0 lg:gap-2 text-[--grey]'>
                  <p className='lg:text-md text-sm'>{edge.node.napiMenu.masodikFoetel}</p>
                  {generateAllergenText(edge.node.napiMenu.allergenekMasodikFoetel)}
                </div>
              </div>
            </div>
          </div>
        </div>
        ))}

      </div>
      <p className='container m-auto text-center text-[--grey]'>A napi ajánlatot aznap 8:00 - ig lehet megrendelni!</p>
    </section>
    </>
  )
}
