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
        <h2 className="price lg:w-fit w-full">Hamarosan!</h2>
      </div>
    </section>
    </>
  )
}
