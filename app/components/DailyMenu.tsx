import { TbSoup } from 'react-icons/tb'
import { GiHotMeal } from 'react-icons/gi'

import { getClient } from '../lib/client'
import { gql } from '@apollo/client'

import { format } from 'date-fns';
import { hu } from 'date-fns/locale';

const query = gql`
query getNapimenu {
  allNapiMen(last: 7, where: {orderby: {field: TITLE, order: ASC}}) {
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
          informacio
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
      <div className="container m-auto flex flex-col justify-center items-center gap-4">
        <h1 className='leading-[.75em] py-4'>Napi menü</h1>
        <div className='flex flex-col lg:flex-row gap-2 lg:gap-4'>
        <h2 className="price lg:w-fit w-full">A menü: <b>1500 Ft</b></h2>
        <h2 className="price lg:w-fit w-full">B menü: <b>1700 Ft</b></h2>
        </div>
        <div className='flex flex-col lg:flex-row gap-2 lg:gap-4'>
        <h2 className="smallprice lg:w-fit w-full">A menü csak főétel: <b>1200 Ft</b></h2>
        <h2 className="smallprice lg:w-fit w-full">B menü csak főétel: <b>1400 Ft</b></h2>
        </div>
        <h3 className='text-[--okker]'>A csomagolás díja: 100Ft</h3>
      </div>
      <div className="container m-auto grid grid-cols-1 lg:grid-cols-2 gap-4">
        
      {data.allNapiMen.edges.map((edge: any, index: any) => {

        const dateParts = edge.node.title.split('.');
        const year = new Date().getFullYear(); // You can set the year as needed
        const month = parseInt(dateParts[0]) - 1; // Months are zero-based
        const day = parseInt(dateParts[1]);
        const parsedDate = new Date(year, month, day);
        const dayName = format(parsedDate, 'EEEE', { locale: hu });
        const capitalizedDayName = dayName.charAt(0).toUpperCase() + dayName.slice(1);

        return (
        
        <div key={index} className="flex flex-col lg:flex-row bg-[--lightnavy]">
          <div className="flex flex-col justify-start items-start lg:w-1/4 lg:items-center border-b lg:border-r lg:border-b-0 border-[--navy] m-4 lg:pb-0 pb-4 pr-4 gap-2">
            <h1 className='-mt-4'>{edge.node.title}</h1>
            <p className="day -mt-4">{capitalizedDayName}</p>
          </div>
          <div className="flex flex-col w-full px-4">
            
          {(edge.node.napiMenu.elsoEloetel || edge.node.napiMenu.elsoFoetel) && (
            <div className="flex flex-col gap-4 lg:gap-1 border-b border-[--navy] lg:mt-4 lg:pb-4 pb-2">
            <h2 className='text-[--okker] font-black'>A menü:</h2>

              {edge.node.napiMenu.elsoEloetel === null ? null : (
                <div className="flex flex-nowrap items-center gap-2">
                  <div className='w-7 h-7'>
                  <TbSoup className="w-7 h-7 text-[--okker]" />
                  </div>
                  <div className='flex flex-col lg:flex-row gap-0 lg:gap-2 text-[--grey]'>
                    <p className='lg:text-md text-sm'>{edge.node.napiMenu.elsoEloetel}</p>
                    {generateAllergenText(edge.node.napiMenu.allergenekElsoEloetel)}
                  </div>
                </div>
              )}

              {edge.node.napiMenu.elsoFoetel === null ? null : (
              <div className="flex flex-nowrap items-center gap-2">
                <div className='w-7 h-7'>
                <GiHotMeal className="w-7 h-7 text-[--okker]" />
                </div>
                <div className='flex flex-col lg:flex-row gap-0 lg:gap-2 text-[--grey]'>
                  <p className='lg:text-md text-sm'>{edge.node.napiMenu.elsoFoetel}</p>
                  {generateAllergenText(edge.node.napiMenu.allergenekElsoFoetel)}
                </div>
              </div>
              )}

            </div>
            )}

            {(edge.node.napiMenu.masodikEloetel || edge.node.napiMenu.masodikFoetel) && (
            <div className="flex flex-col gap-4 lg:gap-1 mt-4 lg:pb-4 pb-2">
            <h2 className='text-[--okker] font-black'>B menü:</h2>

              {edge.node.napiMenu.masodikEloetel === null ? null : (
              <div className="flex flex-nowrap items-center gap-2">
                <div className='w-7 h-7'>
                <TbSoup className="w-7 h-7 text-[--okker]" />
                </div>
                <div className='flex flex-col lg:flex-row gap-0 lg:gap-2 text-[--grey]'>
                  <p className='lg:text-md text-sm'>{edge.node.napiMenu.masodikEloetel}</p>
                  {generateAllergenText(edge.node.napiMenu.allergenekMasodikEloetel)}
                </div>
              </div>
              )}

              {edge.node.napiMenu.masodikFoetel === null ? null : (
              <div className="flex flex-nowrap items-center gap-2">
                <div className='w-7 h-7'>
                <GiHotMeal className="w-7 h-7 text-[--okker]" />
                </div>
                <div className='flex flex-col lg:flex-row gap-0 lg:gap-2 text-[--grey]'>
                  <p className='lg:text-md text-sm'>{edge.node.napiMenu.masodikFoetel}</p>
                  {generateAllergenText(edge.node.napiMenu.allergenekMasodikFoetel)}
                </div>
              </div>
              )}

            </div>
            )}

            {edge.node.napiMenu.informacio === null ? null : (
            <div className='bg-[--alert] text-[--grey] p-4 my-4'>
              <p>{edge.node.napiMenu.informacio}</p>
            </div>
            )}
            
          </div>
        </div>
        );
        })}

      </div>
      <p className='container m-auto text-center text-[--okker] font-bold'>A napi ajánlatot aznap 10:30 - tól lehet megrendelni 14:00-ig vagy a készlet erejéig.</p>
      <p className='container m-auto text-center text-[--grey] text-sm'>A szállítás városon belül ingyenes! Szállítási díjak városon kívül:</p>
      <div className='flex flex-col gap-2'>
        <p className='container m-auto text-center text-[--grey] text-sm'>Kaposfüred: 500 Ft</p>
        <p className='container m-auto text-center text-[--grey] text-sm'>Toponár: 500 Ft</p>
        <p className='container m-auto text-center text-[--grey] text-sm'>Juta: 700 Ft</p>
        <p className='container m-auto text-center text-[--grey] text-sm'>Kaposújlak: 700 Ft</p>
        <p className='container m-auto text-center text-[--grey] text-sm'>Taszár: 1000 Ft</p>
      </div>
    </section>
    </>
  )
}
