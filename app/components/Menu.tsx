"use client"

import Image from "next/image"
import Smartprice from "./UI/Smartprice"

import { gql, useQuery } from "@apollo/client"
import { useState } from 'react'

const GET_CATEGORIES = gql`
query getCategories {
  categories(
    last: 100
    where: {exclude: "dGVybTox", order: DESC, orderby: TERM_ORDER}
  ) {
    nodes {
      slug
      name
      description
    }
  }
}`

const GET_ELOETELEK = gql`
query getEloetelek {
  tlap(where: {categoryName: "Előételek"}, last: 1000) {
    edges {
      node {
        id
        link
        title
        etlap {
          ar
          ar30cm
          ar45cm
          mennyiseg
          allergenek {
            allergen1
            allergen2
            allergen3
            allergen4
            allergen5
            allergen6
            allergen7
          }
        }
      }
    }
  }
}`

const GET_LEVESEK = gql`
query getLevesek {
  tlap(where: {categoryName: "Levesek"}, last: 1000) {
    edges {
      node {
        id
        link
        title
        etlap {
          ar
          ar30cm
          ar45cm
          mennyiseg
          allergenek {
            allergen1
            allergen2
            allergen3
            allergen4
            allergen5
            allergen6
            allergen7
          }
        }
      }
    }
  }
}`

const GET_TESZTAK = gql`
query getTesztak {
  tlap(where: {categoryName: "Tészták"}, last: 1000) {
    edges {
      node {
        id
        link
        title
        etlap {
          ar
          ar30cm
          ar45cm
          mennyiseg
          allergenek {
            allergen1
            allergen2
            allergen3
            allergen4
            allergen5
            allergen6
            allergen7
          }
        }
      }
    }
  }
}`

const GET_SERTES = gql`
query getSertes {
  tlap(where: {categoryName: "Sertés"}, last: 1000) {
    edges {
      node {
        id
        link
        title
        etlap {
          ar
          ar30cm
          ar45cm
          mennyiseg
          allergenek {
            allergen1
            allergen2
            allergen3
            allergen4
            allergen5
            allergen6
            allergen7
          }
        }
      }
    }
  }
}`

const GET_SZARNYAS = gql`
query getSzarnyas {
  tlap(where: {categoryName: "Szárnyas"}, last: 1000) {
    edges {
      node {
        id
        link
        title
        etlap {
          ar
          ar30cm
          ar45cm
          mennyiseg
          allergenek {
            allergen1
            allergen2
            allergen3
            allergen4
            allergen5
            allergen6
            allergen7
          }
        }
      }
    }
  }
}`

const GET_KORETEK = gql`
query getKoretek {
  tlap(where: {categoryName: "Köretek"}, last: 1000) {
    edges {
      node {
        id
        link
        title
        etlap {
          ar
          ar30cm
          ar45cm
          mennyiseg
          allergenek {
            allergen1
            allergen2
            allergen3
            allergen4
            allergen5
            allergen6
            allergen7
          }
        }
      }
    }
  }
}`

const GET_SAVANYUSAG = gql`
query getSavanyusag {
  tlap(where: {categoryName: "Savanyúság"}, last: 1000) {
    edges {
      node {
        id
        link
        title
        etlap {
          ar
          ar30cm
          ar45cm
          mennyiseg
          allergenek {
            allergen1
            allergen2
            allergen3
            allergen4
            allergen5
            allergen6
            allergen7
          }
        }
      }
    }
  }
}`

const GET_DESSZERTEK = gql`
query getDesszertek {
  tlap(where: {categoryName: "Desszertek"}, last: 1000) {
    edges {
      node {
        id
        link
        title
        etlap {
          ar
          ar30cm
          ar45cm
          mennyiseg
          allergenek {
            allergen1
            allergen2
            allergen3
            allergen4
            allergen5
            allergen6
            allergen7
          }
        }
      }
    }
  }
}`

const GET_KETSZEMELYES = gql`
query getKetszemelyes {
  tlap(where: {categoryName: "2 személyes tálak"}, last: 1000) {
    edges {
      node {
        id
        link
        title
        etlap {
          ar
          ar30cm
          ar45cm
          mennyiseg
          allergenek {
            allergen1
            allergen2
            allergen3
            allergen4
            allergen5
            allergen6
            allergen7
          }
        }
      }
    }
  }
}`

const GET_NEGYSZEMELYES = gql`
query getNegyszemelyes {
  tlap(where: {categoryName: "4 személyes tálak"}, last: 1000) {
    edges {
      node {
        id
        link
        title
        etlap {
          ar
          ar30cm
          ar45cm
          mennyiseg
          allergenek {
            allergen1
            allergen2
            allergen3
            allergen4
            allergen5
            allergen6
            allergen7
          }
        }
      }
    }
  }
}`

const GET_PIZZAK = gql`
query getPizzak {
  tlap(where: {categoryName: "Pizzák"}, last: 1000) {
    edges {
      node {
        id
        link
        title
        etlap {
          ar
          ar30cm
          ar45cm
          mennyiseg
          allergenek {
            allergen1
            allergen2
            allergen3
            allergen4
            allergen5
            allergen6
            allergen7
          }
        }
      }
    }
  }
}`

export default function Menu() {

  const [activeCategory, setActiveCategory] = useState('eloetelek');

  const { loading: loadingCategories, error: errorCategories, data: dataCategories } = useQuery(GET_CATEGORIES);
  const { loading: loadingEloetelek, error: errorEloetelek, data: dataEloetelek } = useQuery(GET_ELOETELEK);
  const { loading: loadingLevesek, error: errorLevesek, data: dataLevesek } = useQuery(GET_LEVESEK);
  const { loading: loadingTesztak, error: errorTesztak, data: dataTesztak } = useQuery(GET_TESZTAK);
  const { loading: loadingSertes, error: errorSertes, data: dataSertes } = useQuery(GET_SERTES);
  const { loading: loadingSzarnyas, error: errorSzarnyas, data: dataSzarnyas } = useQuery(GET_SZARNYAS);
  const { loading: loadingKoretek, error: errorKoretek, data: dataKoretek } = useQuery(GET_KORETEK);
  const { loading: loadingSavanyusag, error: errorSavanyusag, data: dataSavanyusag } = useQuery(GET_SAVANYUSAG);
  const { loading: loadingDesszertek, error: errorDesszertek, data: dataDesszertek } = useQuery(GET_DESSZERTEK);
  const { loading: loadingKetszemelyes, error: errorKetszemelyes, data: dataKetszemelyes } = useQuery(GET_KETSZEMELYES);
  const { loading: loadingNegyszemelyes, error: errorNegyszemelyes, data: dataNegyszemelyes } = useQuery(GET_NEGYSZEMELYES);
  const { loading: loadingPizzak, error: errorPizzak, data: dataPizzak } = useQuery(GET_PIZZAK);
  

  if (loadingCategories || loadingEloetelek || loadingLevesek || loadingTesztak || loadingSertes || loadingSzarnyas || loadingKoretek || loadingSavanyusag || loadingDesszertek || loadingKetszemelyes || loadingNegyszemelyes || loadingPizzak) {
    return <p>Loading...</p>;
  }

  if (errorCategories || errorEloetelek || errorLevesek || errorTesztak || errorSertes || errorSzarnyas || errorKoretek || errorSavanyusag || errorDesszertek || errorKetszemelyes || errorNegyszemelyes || errorPizzak) {
    return <p>Error: {errorCategories ? errorCategories.message : errorEloetelek?.message}</p>;
  }

  const etlapCategories = dataCategories.categories.nodes;
  const eloetelekData = dataEloetelek.tlap.edges;
  const levesekData = dataLevesek.tlap.edges;
  const tesztakData = dataTesztak.tlap.edges;
  const sertesData = dataSertes.tlap.edges;
  const szarnyasData = dataSzarnyas.tlap.edges;
  const koretekData = dataKoretek.tlap.edges;
  const savanyusagData = dataSavanyusag.tlap.edges;
  const desszertekData = dataDesszertek.tlap.edges;
  const ketszemelyesData = dataKetszemelyes.tlap.edges;
  const negyszemelyesData = dataNegyszemelyes.tlap.edges;
  const pizzakData = dataPizzak.tlap.edges;

  //allergének listázása

  function generateAllergenText(allergenek:any) {
    const allergens = [
      allergenek.allergen1,
      allergenek.allergen2,
      allergenek.allergen3,
      allergenek.allergen4,
      allergenek.allergen5,
      allergenek.allergen6,
      allergenek.allergen7,
    ];
  
    const filteredAllergens = allergens.filter((allergen) => allergen !== null && allergen !== "");
  
    if (filteredAllergens.length > 0) {
      return (
        <p className="text-[--navy] opacity-50 text-xs lg:text-lg">{`Allergének: ${filteredAllergens.join(", ")}`}</p>
      );
    }
  
    return null;
  }

  //mennyiségellenőrzés
  function displayMennyiseg(mennyiseg:any) {
    if (mennyiseg !== null && mennyiseg !== "null") {
      return mennyiseg;
    }
    return "";
  }

  return (
    <section id="dailymenu" className="flex flex-col w-full min-h-[100vh] bg-[--navy] py-40">
      <div className="container m-auto flex flex-nowrap justify-center items-center py-8 gap-8">
        <h1>Étlap</h1>
      </div>
      <div className="container flex flex-nowrap m-auto">
        <ul className="flex flex-col justify-start h-full w-[100px] lg:w-[300px]">

        {etlapCategories.map((category:any, index:any) => (
          <li
            key={index}
            className={`flex flex-col lg:flex-row lg:flex-nowrap items-center p-1 lg:p-6 gap-4 hover:bg-[--grey] transition-all duration-200 cursor-pointer ${
              activeCategory === category.slug ? ' bg-[--grey]' : ' bg-[#dadadacc]'
            }`}
            onClick={() => setActiveCategory(category.slug)}
          >
            <Image src={category.description} width={50} height={50} alt={"Étel ikon"} className="max-h-[50px] max-w-[50px]"/>
            <h2 className="lg:categorynames text-xs lg:text-lg lg:text-left text-center">{category.name}</h2>
          </li>
        ))}         

        </ul>

        <div id="eloetelek" className={`flex-col w-full min-h-max bg-[--grey] overflow-hidden ${activeCategory === 'eloetelek' ? ' flex' : ' hidden'}`}>
          <div className="flex items-center justify-between gap-1 lg:gap-4 shadow-lg px-2 lg:px-16 h-[50px] lg:h-[100px] my-8 overflow-hidden">
            <h2 className="categorytitle">{dataCategories.categories.nodes[0].name}</h2>
            <Image src={dataCategories.categories.nodes[0].description} width={150} height={150} alt={"Étel ikon"} className="hidden lg:block max-h-[200px] max-w-[200px] opacity-25 -mb-8"/>
          </div>
          
          {eloetelekData.map((eloetel:any, index:any) => (
            <div key={index} className="flex flex-col gap-2 lg:flex-row justify-between py-4 mx-4 lg:mx-16 border-b border-[--navy]">
              <div className="flex flex-col gap-2">
                <p className="text-[--navy] font-bold text-sm lg:text-lg">{eloetel.node.title}</p>
                {generateAllergenText(eloetel.node.etlap.allergenek)}
              </div>
              <div className="flex gap-4 justify-start lg:justify-end items-center">
                {eloetel.node.etlap.ar && (
                  <Smartprice price={`${displayMennyiseg(eloetel.node.etlap.mennyiseg)} ${eloetel.node.etlap.ar} Ft `} />
                )}
                {eloetel.node.etlap.ar30cm && (
                  <Smartprice price={`${displayMennyiseg(eloetel.node.etlap.mennyiseg)} 30cm: ${eloetel.node.etlap.ar30cm} Ft `} />
                )}
                {eloetel.node.etlap.ar45cm && (
                  <Smartprice price={`${displayMennyiseg(eloetel.node.etlap.mennyiseg)} 45cm: ${eloetel.node.etlap.ar45cm} Ft `} />
                )}
                
              </div>
            </div>
          ))}

        </div>

        <div id="levesek" className={`flex-col w-full min-h-max bg-[--grey] overflow-hidden ${activeCategory === 'levesek' ? ' flex' : ' hidden'}`}>
          <div className="flex items-center justify-between gap-1 lg:gap-4 shadow-lg px-2 lg:px-16 h-[50px] lg:h-[100px] my-8 overflow-hidden">
            <h2 className="categorytitle">{dataCategories.categories.nodes[1].name}</h2>
            <Image src={dataCategories.categories.nodes[1].description} width={150} height={150} alt={"Étel ikon"} className="hidden lg:block max-h-[200px] max-w-[200px] opacity-25 -mb-8"/>
          </div>
          
          {levesekData.map((leves:any, index:any) => (
            <div key={index} className="flex flex-col gap-2 lg:flex-row justify-between py-4 mx-4 lg:mx-16 border-b border-[--navy]">
              <div className="flex flex-col gap-2">
                <p className="text-[--navy] font-bold text-sm lg:text-lg">{leves.node.title}</p>
                {generateAllergenText(leves.node.etlap.allergenek)}
              </div>
              <div className="flex gap-4 justify-start lg:justify-end items-center">
                {leves.node.etlap.ar && (
                  <Smartprice price={`${displayMennyiseg(leves.node.etlap.mennyiseg)} ${leves.node.etlap.ar} Ft `} />
                )}
                {leves.node.etlap.ar30cm && (
                  <Smartprice price={`${displayMennyiseg(leves.node.etlap.mennyiseg)} 30cm: ${leves.node.etlap.ar30cm} Ft `} />
                )}
                {leves.node.etlap.ar45cm && (
                  <Smartprice price={`${displayMennyiseg(leves.node.etlap.mennyiseg)} 45cm: ${leves.node.etlap.ar45cm} Ft `} />
                )}
                
              </div>
            </div>
          ))}

        </div>

        <div id="tesztak" className={`flex-col w-full min-h-max bg-[--grey] overflow-hidden ${activeCategory === 'tesztak' ? ' flex' : ' hidden'}`}>
          <div className="flex items-center justify-between gap-1 lg:gap-4 shadow-lg px-2 lg:px-16 h-[50px] lg:h-[100px] my-8 overflow-hidden">
            <h2 className="categorytitle">{dataCategories.categories.nodes[2].name}</h2>
            <Image src={dataCategories.categories.nodes[2].description} width={150} height={150} alt={"Étel ikon"} className="hidden lg:block max-h-[200px] max-w-[200px] opacity-25 -mb-8"/>
          </div>
          
          {tesztakData.map((teszta:any, index:any) => (
            <div key={index} className="flex flex-col gap-2 lg:flex-row justify-between py-4 mx-4 lg:mx-16 border-b border-[--navy]">
              <div className="flex flex-col gap-2">
                <p className="text-[--navy] font-bold text-sm lg:text-lg">{teszta.node.title}</p>
                {generateAllergenText(teszta.node.etlap.allergenek)}
              </div>
              <div className="flex gap-4 justify-start lg:justify-end items-center">
                {teszta.node.etlap.ar && (
                  <Smartprice price={`${displayMennyiseg(teszta.node.etlap.mennyiseg)} ${teszta.node.etlap.ar} Ft `} />
                )}
                {teszta.node.etlap.ar30cm && (
                  <Smartprice price={`${displayMennyiseg(teszta.node.etlap.mennyiseg)} 30cm: ${teszta.node.etlap.ar30cm} Ft `} />
                )}
                {teszta.node.etlap.ar45cm && (
                  <Smartprice price={`${displayMennyiseg(teszta.node.etlap.mennyiseg)} 45cm: ${teszta.node.etlap.ar45cm} Ft `} />
                )}
                
              </div>
            </div>
          ))}

        </div>

        <div id="sertes" className={`flex-col w-full min-h-max bg-[--grey] overflow-hidden ${activeCategory === 'sertes' ? ' flex' : ' hidden'}`}>
          <div className="flex items-center justify-between gap-1 lg:gap-4 shadow-lg px-2 lg:px-16 h-[50px] lg:h-[100px] my-8 overflow-hidden">
            <h2 className="categorytitle">{dataCategories.categories.nodes[3].name}</h2>
            <Image src={dataCategories.categories.nodes[3].description} width={150} height={150} alt={"Étel ikon"} className="hidden lg:block max-h-[200px] max-w-[200px] opacity-25 -mb-8"/>
          </div>
          
          {sertesData.map((sertes:any, index:any) => (
            <div key={index} className="flex flex-col gap-2 lg:flex-row justify-between py-4 mx-4 lg:mx-16 border-b border-[--navy]">
              <div className="flex flex-col gap-2">
                <p className="text-[--navy] font-bold text-sm lg:text-lg">{sertes.node.title}</p>
                {generateAllergenText(sertes.node.etlap.allergenek)}
              </div>
              <div className="flex gap-4 justify-start lg:justify-end items-center">
                {sertes.node.etlap.ar && (
                  <Smartprice price={`${displayMennyiseg(sertes.node.etlap.mennyiseg)} ${sertes.node.etlap.ar} Ft `} />
                )}
                {sertes.node.etlap.ar30cm && (
                  <Smartprice price={`${displayMennyiseg(sertes.node.etlap.mennyiseg)} 30cm: ${sertes.node.etlap.ar30cm} Ft `} />
                )}
                {sertes.node.etlap.ar45cm && (
                  <Smartprice price={`${displayMennyiseg(sertes.node.etlap.mennyiseg)} 45cm: ${sertes.node.etlap.ar45cm} Ft `} />
                )}
                
              </div>
            </div>
          ))}

        </div>

        <div id="szarnyas" className={`flex-col w-full min-h-max bg-[--grey] overflow-hidden ${activeCategory === 'szarnyas' ? ' flex' : ' hidden'}`}>
          <div className="flex items-center justify-between gap-1 lg:gap-4 shadow-lg px-2 lg:px-16 h-[50px] lg:h-[100px] my-8 overflow-hidden">
            <h2 className="categorytitle">{dataCategories.categories.nodes[4].name}</h2>
            <Image src={dataCategories.categories.nodes[4].description} width={150} height={150} alt={"Étel ikon"} className="hidden lg:block max-h-[200px] max-w-[200px] opacity-25 -mb-8"/>
          </div>
          
          {szarnyasData.map((szarnyas:any, index:any) => (
            <div key={index} className="flex flex-col gap-2 lg:flex-row justify-between py-4 mx-4 lg:mx-16 border-b border-[--navy]">
              <div className="flex flex-col gap-2">
                <p className="text-[--navy] font-bold text-sm lg:text-lg">{szarnyas.node.title}</p>
                {generateAllergenText(szarnyas.node.etlap.allergenek)}
              </div>
              <div className="flex gap-4 justify-start lg:justify-end items-center">
                {szarnyas.node.etlap.ar && (
                  <Smartprice price={`${displayMennyiseg(szarnyas.node.etlap.mennyiseg)} ${szarnyas.node.etlap.ar} Ft `} />
                )}
                {szarnyas.node.etlap.ar30cm && (
                  <Smartprice price={`${displayMennyiseg(szarnyas.node.etlap.mennyiseg)} 30cm: ${szarnyas.node.etlap.ar30cm} Ft `} />
                )}
                {szarnyas.node.etlap.ar45cm && (
                  <Smartprice price={`${displayMennyiseg(szarnyas.node.etlap.mennyiseg)} 45cm: ${szarnyas.node.etlap.ar45cm} Ft `} />
                )}
                
              </div>
            </div>
          ))}

        </div>

        <div id="koretek" className={`flex-col w-full min-h-max bg-[--grey] overflow-hidden ${activeCategory === 'koretek' ? ' flex' : ' hidden'}`}>
          <div className="flex items-center justify-between gap-1 lg:gap-4 shadow-lg px-2 lg:px-16 h-[50px] lg:h-[100px] my-8 overflow-hidden">
            <h2 className="categorytitle">{dataCategories.categories.nodes[5].name}</h2>
            <Image src={dataCategories.categories.nodes[5].description} width={150} height={150} alt={"Étel ikon"} className="hidden lg:block max-h-[200px] max-w-[200px] opacity-25 -mb-8"/>
          </div>
          
          {koretekData.map((koretek:any, index:any) => (
            <div key={index} className="flex flex-col gap-2 lg:flex-row justify-between py-4 mx-4 lg:mx-16 border-b border-[--navy]">
              <div className="flex flex-col gap-2">
                <p className="text-[--navy] font-bold text-sm lg:text-lg">{koretek.node.title}</p>
                {generateAllergenText(koretek.node.etlap.allergenek)}
              </div>
              <div className="flex gap-4 justify-start lg:justify-end items-center">
                {koretek.node.etlap.ar && (
                  <Smartprice price={`${displayMennyiseg(koretek.node.etlap.mennyiseg)} ${koretek.node.etlap.ar} Ft `} />
                )}
                {koretek.node.etlap.ar30cm && (
                  <Smartprice price={`${displayMennyiseg(koretek.node.etlap.mennyiseg)} 30cm: ${koretek.node.etlap.ar30cm} Ft `} />
                )}
                {koretek.node.etlap.ar45cm && (
                  <Smartprice price={`${displayMennyiseg(koretek.node.etlap.mennyiseg)} 45cm: ${koretek.node.etlap.ar45cm} Ft `} />
                )}
                
              </div>
            </div>
          ))}

        </div>

        <div id="savanyusag" className={`flex-col w-full min-h-max bg-[--grey] overflow-hidden ${activeCategory === 'savanyusag' ? ' flex' : ' hidden'}`}>
          <div className="flex items-center justify-between gap-1 lg:gap-4 shadow-lg px-2 lg:px-16 h-[50px] lg:h-[100px] my-8 overflow-hidden">
            <h2 className="categorytitle">{dataCategories.categories.nodes[6].name}</h2>
            <Image src={dataCategories.categories.nodes[6].description} width={150} height={150} alt={"Étel ikon"} className="hidden lg:block max-h-[200px] max-w-[200px] opacity-25 -mb-8"/>
          </div>
          
          {savanyusagData.map((savanyusag:any, index:any) => (
            <div key={index} className="flex flex-col gap-2 lg:flex-row justify-between py-4 mx-4 lg:mx-16 border-b border-[--navy]">
              <div className="flex flex-col gap-2">
                <p className="text-[--navy] font-bold text-sm lg:text-lg">{savanyusag.node.title}</p>
                {generateAllergenText(savanyusag.node.etlap.allergenek)}
              </div>
              <div className="flex gap-4 justify-start lg:justify-end items-center">
                {savanyusag.node.etlap.ar && (
                  <Smartprice price={`${displayMennyiseg(savanyusag.node.etlap.mennyiseg)} ${savanyusag.node.etlap.ar} Ft `} />
                )}
                {savanyusag.node.etlap.ar30cm && (
                  <Smartprice price={`${displayMennyiseg(savanyusag.node.etlap.mennyiseg)} 30cm: ${savanyusag.node.etlap.ar30cm} Ft `} />
                )}
                {savanyusag.node.etlap.ar45cm && (
                  <Smartprice price={`${displayMennyiseg(savanyusag.node.etlap.mennyiseg)} 45cm: ${savanyusag.node.etlap.ar45cm} Ft `} />
                )}
                
              </div>
            </div>
          ))}

        </div>

        <div id="desszertek" className={`flex-col w-full min-h-max bg-[--grey] overflow-hidden ${activeCategory === 'desszertek' ? ' flex' : ' hidden'}`}>
          <div className="flex items-center justify-between gap-1 lg:gap-4 shadow-lg px-2 lg:px-16 h-[50px] lg:h-[100px] my-8 overflow-hidden">
            <h2 className="categorytitle">{dataCategories.categories.nodes[7].name}</h2>
            <Image src={dataCategories.categories.nodes[7].description} width={150} height={150} alt={"Étel ikon"} className="hidden lg:block max-h-[200px] max-w-[200px] opacity-25 -mb-8"/>
          </div>
          
          {desszertekData.map((desszertek:any, index:any) => (
            <div key={index} className="flex flex-col gap-2 lg:flex-row justify-between py-4 mx-4 lg:mx-16 border-b border-[--navy]">
              <div className="flex flex-col gap-2">
                <p className="text-[--navy] font-bold text-sm lg:text-lg">{desszertek.node.title}</p>
                {generateAllergenText(desszertek.node.etlap.allergenek)}
              </div>
              <div className="flex gap-4 justify-start lg:justify-end items-center">
                {desszertek.node.etlap.ar && (
                  <Smartprice price={`${displayMennyiseg(desszertek.node.etlap.mennyiseg)} ${desszertek.node.etlap.ar} Ft `} />
                )}
                {desszertek.node.etlap.ar30cm && (
                  <Smartprice price={`${displayMennyiseg(desszertek.node.etlap.mennyiseg)} 30cm: ${desszertek.node.etlap.ar30cm} Ft `} />
                )}
                {desszertek.node.etlap.ar45cm && (
                  <Smartprice price={`${displayMennyiseg(desszertek.node.etlap.mennyiseg)} 45cm: ${desszertek.node.etlap.ar45cm} Ft `} />
                )}
                
              </div>
            </div>
          ))}

        </div>

        <div id="ketszemelyes" className={`flex-col w-full min-h-max bg-[--grey] overflow-hidden ${activeCategory === '2-szemelyes-talak' ? ' flex' : ' hidden'}`}>
          <div className="flex items-center justify-between gap-1 lg:gap-4 shadow-lg px-2 lg:px-16 h-[50px] lg:h-[100px] my-8 overflow-hidden">
            <h2 className="categorytitle">{dataCategories.categories.nodes[8].name}</h2>
            <Image src={dataCategories.categories.nodes[8].description} width={150} height={150} alt={"Étel ikon"} className="hidden lg:block max-h-[200px] max-w-[200px] opacity-25 -mb-8"/>
          </div>
          
          {ketszemelyesData.map((ketszemelyes:any, index:any) => (
            <div key={index} className="flex flex-col gap-2 lg:flex-row justify-between py-4 mx-4 lg:mx-16 border-b border-[--navy]">
              <div className="flex flex-col gap-2">
                <p className="text-[--navy] font-bold text-sm lg:text-lg">{ketszemelyes.node.title}</p>
                {generateAllergenText(ketszemelyes.node.etlap.allergenek)}
              </div>
              <div className="flex gap-4 justify-start lg:justify-end items-center ">
                {ketszemelyes.node.etlap.ar && (
                  <Smartprice price={`${displayMennyiseg(ketszemelyes.node.etlap.mennyiseg)} ${ketszemelyes.node.etlap.ar} Ft `} />
                )}
                {ketszemelyes.node.etlap.ar30cm && (
                  <Smartprice price={`${displayMennyiseg(ketszemelyes.node.etlap.mennyiseg)} 30cm: ${ketszemelyes.node.etlap.ar30cm} Ft `} />
                )}
                {ketszemelyes.node.etlap.ar45cm && (
                  <Smartprice price={`${displayMennyiseg(ketszemelyes.node.etlap.mennyiseg)} 45cm: ${ketszemelyes.node.etlap.ar45cm} Ft `} />
                )}
                
              </div>
            </div>
          ))}

        </div>

        <div id="negyszemelyes" className={`flex-col w-full min-h-max bg-[--grey] overflow-hidden ${activeCategory === '4-szemelyes-talak' ? ' flex' : ' hidden'}`}>
          <div className="flex items-center justify-between gap-1 lg:gap-4 shadow-lg px-2 lg:px-16 h-[50px] lg:h-[100px] my-8 overflow-hidden">
            <h2 className="categorytitle">{dataCategories.categories.nodes[9].name}</h2>
            <Image src={dataCategories.categories.nodes[9].description} width={150} height={150} alt={"Étel ikon"} className="hidden lg:block max-h-[200px] max-w-[200px] opacity-25 -mb-8"/>
          </div>
          
          {negyszemelyesData.map((negyszemelyes:any, index:any) => (
            <div key={index} className="flex flex-col gap-2 lg:flex-row justify-between py-4 mx-4 lg:mx-16 border-b border-[--navy]">
              <div className="flex flex-col gap-2">
                <p className="text-[--navy] font-bold text-sm lg:text-lg">{negyszemelyes.node.title}</p>
                {generateAllergenText(negyszemelyes.node.etlap.allergenek)}
              </div>
              <div className="flex gap-4 justify-start lg:justify-end items-center lg:min-w-[200px]">
                {negyszemelyes.node.etlap.ar && (
                  <Smartprice price={`${displayMennyiseg(negyszemelyes.node.etlap.mennyiseg)} ${negyszemelyes.node.etlap.ar} Ft `} />
                )}
                {negyszemelyes.node.etlap.ar30cm && (
                  <Smartprice price={`${displayMennyiseg(negyszemelyes.node.etlap.mennyiseg)} 30cm: ${negyszemelyes.node.etlap.ar30cm} Ft `} />
                )}
                {negyszemelyes.node.etlap.ar45cm && (
                  <Smartprice price={`${displayMennyiseg(negyszemelyes.node.etlap.mennyiseg)} 45cm: ${negyszemelyes.node.etlap.ar45cm} Ft `} />
                )}
                
              </div>
            </div>
          ))}

        </div>

        <div id="pizzak" className={`flex-col w-full min-h-max bg-[--grey] overflow-hidden ${activeCategory === 'pizzak' ? ' flex' : ' hidden'}`}>
          <div className="flex items-center justify-between gap-1 lg:gap-4 shadow-lg px-2 lg:px-16 h-[50px] lg:h-[100px] my-8 overflow-hidden">
            <h2 className="categorytitle">{dataCategories.categories.nodes[10].name}</h2>
            <Image src={dataCategories.categories.nodes[10].description} width={150} height={150} alt={"Étel ikon"} className="hidden lg:block max-h-[200px] max-w-[200px] opacity-25 -mb-8"/>
          </div>
          
          {pizzakData.map((pizzak:any, index:any) => (
            <div key={index} className="flex flex-col gap-2 lg:flex-row justify-between py-4 mx-4 lg:mx-16 border-b border-[--navy]">
              <div className="flex flex-col gap-2">
                <p className="text-[--navy] font-bold text-sm lg:text-lg">{pizzak.node.title}</p>
                {generateAllergenText(pizzak.node.etlap.allergenek)}
              </div>
              <div className="flex flex-col lg:flex-row gap-4 justify-start lg:justify-end items-center w-max lg:min-w-[450px]">
                {pizzak.node.etlap.ar && (
                  <Smartprice price={`${displayMennyiseg(pizzak.node.etlap.mennyiseg)} ${pizzak.node.etlap.ar} Ft `} />
                )}
                {pizzak.node.etlap.ar30cm && (
                  <Smartprice price={`${displayMennyiseg(pizzak.node.etlap.mennyiseg)} 30cm: ${pizzak.node.etlap.ar30cm} Ft `} />
                )}
                {pizzak.node.etlap.ar45cm && (
                  <Smartprice price={`${displayMennyiseg(pizzak.node.etlap.mennyiseg)} 45cm: ${pizzak.node.etlap.ar45cm} Ft `} />
                )}
                
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  )
}
