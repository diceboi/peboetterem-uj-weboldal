"use client"

export const dynamic = "force-dynamic";

import Image from "next/image"
import Smartprice from "./UI/Smartprice"

import { gql } from "@apollo/client"
import { useState } from 'react'
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TbEye } from "react-icons/tb";
import Modal from "./UI/AllergenekModal";

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

  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('eloetelek');

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const { data: dataCategories }:any = useSuspenseQuery(GET_CATEGORIES);
  const { data: dataEloetelek }:any = useSuspenseQuery(GET_ELOETELEK);
  const { data: dataLevesek }:any = useSuspenseQuery(GET_LEVESEK);
  const { data: dataTesztak }:any = useSuspenseQuery(GET_TESZTAK);
  const { data: dataSertes }:any = useSuspenseQuery(GET_SERTES);
  const { data: dataSzarnyas }:any = useSuspenseQuery(GET_SZARNYAS);
  const { data: dataKoretek }:any = useSuspenseQuery(GET_KORETEK);
  const { data: dataSavanyusag }:any = useSuspenseQuery(GET_SAVANYUSAG);
  const { data: dataDesszertek }:any = useSuspenseQuery(GET_DESSZERTEK);
  const { data: dataKetszemelyes }:any = useSuspenseQuery(GET_KETSZEMELYES);
  const { data: dataNegyszemelyes }:any = useSuspenseQuery(GET_NEGYSZEMELYES);
  const { data: dataPizzak }:any = useSuspenseQuery(GET_PIZZAK);

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
    <section id="etlap" className="flex flex-col w-full min-h-[100vh] bg-[--navy] py-40">
    <Modal isOpen={isModalOpen} closeModal={closeModal} />
      <div className="container m-auto flex flex-nowrap justify-center items-center py-8 gap-8">
        <h1>Étlap</h1>
      </div>
      <div className="container flex flex-nowrap m-auto">
      
        <ul className="sticky lg:relative lg:top-0 top-[64px] flex flex-col justify-start h-full w-[75px] lg:w-[300px]">

        {etlapCategories.map((category:any, index:any) => (
          <li
            key={index}
            className={`relative flex flex-col lg:flex-row lg:flex-nowrap items-center p-1 lg:p-6 gap-2 lg:gap-4 hover:bg-[--grey] transition-all duration-200 cursor-pointer ${
              activeCategory === category.slug ? ' bg-[--grey] z-20 shadow-xl after:content-[""] after:absolute after:h-full after:bg-[--grey] after:w-5 after:-right-5' : ' bg-[#dadadacc]'
            }`}
            onClick={() => { router.push('#etlap'); setActiveCategory(category.slug); }}
          >
            <Image src={category.description} width={50} height={50} alt={"Étel ikon"} className="max-h-[30px] lg:max-h-[50px] max-w-[30px] lg:max-w-[50px]"/>
            <h2 className="lg:categorynames tracking-normal lg:tracking-widest text-xs lg:text-lg lg:text-left text-center">{category.name}</h2>
          </li>
        ))}         

        </ul>

        <div id="eloetelek" className={`flex-col w-full min-h-max bg-[--grey] shadow-2xl z-10 ${activeCategory === 'eloetelek' ? ' flex' : ' hidden'}`}>
          <div className="flex items-center justify-between gap-1 lg:gap-4 mx-4 lg:mx-16 h-[50px] lg:h-[100px] overflow-hidden">
            <h2 className="categorytitle">{dataCategories.categories.nodes[0].name}</h2>
            <button className="transparent-btn" onClick={openModal}>Allergének<TbEye /></button>
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

        <div id="levesek" className={`flex-col w-full min-h-max bg-[--grey] shadow-2xl z-10 ${activeCategory === 'levesek' ? ' flex' : ' hidden'}`}>
          <div className="flex items-center justify-between gap-1 lg:gap-4 mx-4 lg:mx-16 h-[50px] lg:h-[100px] overflow-hidden">
            <h2 className="categorytitle">{dataCategories.categories.nodes[1].name}</h2>
            <button className="transparent-btn" onClick={openModal}>Allergének<TbEye /></button>
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

        <div id="tesztak" className={`flex-col w-full min-h-max bg-[--grey] shadow-2xl z-10 ${activeCategory === 'tesztak' ? ' flex' : ' hidden'}`}>
          <div className="flex items-center justify-between gap-1 lg:gap-4 mx-4 lg:mx-16 h-[50px] lg:h-[100px] overflow-hidden">
            <h2 className="categorytitle">{dataCategories.categories.nodes[2].name}</h2>
            <button className="transparent-btn" onClick={openModal}>Allergének<TbEye /></button>
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

        <div id="sertes" className={`flex-col w-full min-h-max bg-[--grey] shadow-2xl z-10 ${activeCategory === 'sertes' ? ' flex' : ' hidden'}`}>
          <div className="flex items-center justify-between gap-1 lg:gap-4 mx-4 lg:mx-16 h-[50px] lg:h-[100px] overflow-hidden">
            <h2 className="categorytitle">{dataCategories.categories.nodes[3].name}</h2>
            <button className="transparent-btn" onClick={openModal}>Allergének<TbEye /></button>
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

        <div id="szarnyas" className={`flex-col w-full min-h-max bg-[--grey] shadow-2xl z-10 ${activeCategory === 'szarnyas' ? ' flex' : ' hidden'}`}>
          <div className="flex items-center justify-between gap-1 lg:gap-4 mx-4 lg:mx-16 h-[50px] lg:h-[100px] overflow-hidden">
            <h2 className="categorytitle">{dataCategories.categories.nodes[4].name}</h2>
            <button className="transparent-btn" onClick={openModal}>Allergének<TbEye /></button>
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

        <div id="koretek" className={`flex-col w-full min-h-max bg-[--grey] shadow-2xl z-10 ${activeCategory === 'koretek' ? ' flex' : ' hidden'}`}>
          <div className="flex items-center justify-between gap-1 lg:gap-4 mx-4 lg:mx-16 h-[50px] lg:h-[100px] overflow-hidden">
            <h2 className="categorytitle">{dataCategories.categories.nodes[5].name}</h2>
            <button className="transparent-btn" onClick={openModal}>Allergének<TbEye /></button>
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

        <div id="savanyusag" className={`flex-col w-full min-h-max bg-[--grey] shadow-2xl z-10 ${activeCategory === 'savanyusag' ? ' flex' : ' hidden'}`}>
          <div className="flex items-center justify-between gap-1 lg:gap-4 mx-4 lg:mx-16 h-[50px] lg:h-[100px] overflow-hidden">
            <h2 className="categorytitle">{dataCategories.categories.nodes[6].name}</h2>
            <button className="transparent-btn" onClick={openModal}>Allergének<TbEye /></button>
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

        <div id="desszertek" className={`flex-col w-full min-h-max bg-[--grey] shadow-2xl z-10 ${activeCategory === 'desszertek' ? ' flex' : ' hidden'}`}>
          <div className="flex items-center justify-between gap-1 lg:gap-4 mx-4 lg:mx-16 h-[50px] lg:h-[100px] overflow-hidden">
            <h2 className="categorytitle">{dataCategories.categories.nodes[7].name}</h2>
            <button className="transparent-btn" onClick={openModal}>Allergének<TbEye /></button>
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

        <div id="ketszemelyes" className={`flex-col w-full min-h-max bg-[--grey] shadow-2xl z-10 ${activeCategory === '2-szemelyes-talak' ? ' flex' : ' hidden'}`}>
          <div className="flex items-center justify-between gap-1 lg:gap-4 mx-4 lg:mx-16 h-[50px] lg:h-[100px] overflow-hidden">
            <h2 className="categorytitle">{dataCategories.categories.nodes[8].name}</h2>
            <button className="transparent-btn" onClick={openModal}>Allergének<TbEye /></button>
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

        <div id="negyszemelyes" className={`flex-col w-full min-h-max bg-[--grey] shadow-2xl z-10 ${activeCategory === '4-szemelyes-talak' ? ' flex' : ' hidden'}`}>
          <div className="flex items-center justify-between gap-1 lg:gap-4 mx-4 lg:mx-16 h-[50px] lg:h-[100px] overflow-hidden">
            <h2 className="categorytitle">{dataCategories.categories.nodes[9].name}</h2>
            <button className="transparent-btn" onClick={openModal}>Allergének<TbEye /></button>
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

        <div id="pizzak" className={`flex-col w-full min-h-max bg-[--grey] shadow-2xl z-10 ${activeCategory === 'pizzak' ? ' flex' : ' hidden'}`}>
          <div className="flex items-center justify-between gap-1 lg:gap-4 mx-4 lg:mx-16 h-[50px] lg:h-[100px] overflow-hidden">
            <h2 className="categorytitle">{dataCategories.categories.nodes[10].name}</h2>
            <button className="transparent-btn" onClick={openModal}>Allergének<TbEye /></button>
          </div>
          
          {pizzakData.map((pizzak:any, index:any) => (
            <div key={index} className="flex flex-col gap-2 lg:flex-row justify-between py-4 mx-4 lg:mx-16 border-b border-[--navy]">
              <div className="flex flex-col gap-2">
                <p className="text-[--navy] font-bold text-sm lg:text-lg">{pizzak.node.title}</p>
                {generateAllergenText(pizzak.node.etlap.allergenek)}
              </div>
              <div className="lex flex-col lg:flex-row gap-4 justify-start lg:justify-end items-start lg:items-center w-max lg:min-w-[200px]">
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
      <div className="container flex flex-col lg:flex-row justify-center px-4 py-1 my-4 w-fit bg-[--okker] text-center lg:gap-8 gap-2 m-auto">
        <p className="font-bold text-[--navy]">Rendelj telefonon, és mi Kaposvár 15km-es körzetében bárhova kivisszük!</p>
        <Link href="tel:0682310633" ><p className="font-black text-[--navy]">06 82 310 633</p></Link>
        <Link href="tel:06304940959" ><p className="font-black text-[--navy]">06 30 494 0959</p></Link>
      </div>
    </section>
  )
}
