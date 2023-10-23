"use client"

import React, { useState } from "react";
import { AiOutlineExpandAlt } from "react-icons/ai";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

import { gql } from "@apollo/client";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";

const GET_CATEGORIES = gql`
  query getCategories {
    page(id: "328", idType: DATABASE_ID) {
      fooldalGaleria {
        galeria {
          kep1 {
            sourceUrl
          }
          kep2 {
            sourceUrl
          }
          kep3 {
            sourceUrl
          }
          kep4 {
            sourceUrl
          }
          kep5 {
            sourceUrl
          }
          kep6 {
            sourceUrl
          }
          kep7 {
            sourceUrl
          }
          kep8 {
            sourceUrl
          }
          kep9 {
            sourceUrl
          }
          kep10 {
            sourceUrl
          }
          kep11 {
            sourceUrl
          }
          kep12 {
            sourceUrl
          }
          kep13 {
            sourceUrl
          }
          kep14 {
            sourceUrl
          }
          kep15 {
            sourceUrl
          }
          kep16 {
            sourceUrl
          }
          kep17 {
            sourceUrl
          }
          kep18 {
            sourceUrl
          }
          kep19 {
            sourceUrl
          }
          kep20 {
            sourceUrl
          }
          kep21 {
            sourceUrl
          }
          kep22 {
            sourceUrl
          }
          kep23 {
            sourceUrl
          }
          kep24 {
            sourceUrl
          }
          kep25 {
            sourceUrl
          }
          kep26 {
            sourceUrl
          }
          kep27 {
            sourceUrl
          }
          kep28 {
            sourceUrl
          }
          kep29 {
            sourceUrl
          }
          kep30 {
            sourceUrl
          }
        }
      }
    }
  }
`;

const Gallery = () => {
    const { data }:any = useSuspenseQuery(GET_CATEGORIES);

    const [open, setOpen] = useState(false);
    const [image, setImage] = useState(0);

    const sourceUrls = Object.keys(data.page.fooldalGaleria.galeria)
    .filter((key) => key.startsWith("kep"))
    .map((key) => data.page.fooldalGaleria.galeria[key]?.sourceUrl) // Use the optional chaining operator
    .filter((url) => url !== null && url !== undefined);

    const galleryTab = sourceUrls.map((sourceUrl) => ({
    imageUrl: sourceUrl,
    }));



  const slides = galleryTab.map((item) => ({
    src: item.imageUrl,
    width: 3840,
    height: 2560,
    srcSet: [
      { src: item.imageUrl, width: 320, height: 213 },
      { src: item.imageUrl, width: 640, height: 426 },
      { src: item.imageUrl, width: 1200, height: 800 },
      { src: item.imageUrl, width: 2048, height: 1365 },
      { src: item.imageUrl, width: 3840, height: 2560 },
    ],
  }));

  return (
    <div className="w-full">
      <div className=" ">
        <div className="flex flex-col md:grid md:grid-cols-3 h-full gap-8 flex-wrap mx-2 md:mx-0">
            {galleryTab.map((x, index) => {
                return (
                    <div key={index} className="h-[300px] relative">
                    <div className="group h-[300px]">
                        <div
                        className="bg-cover bg-center h-[300px] w-full bg-no-repeat"
                        style={{ backgroundImage: `url("${x.imageUrl}")` }}
                        >
                        </div>
                        <div
                        className="bg-black opacity-0 group-hover:opacity-75 absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out"
                        onClick={() => {
                            setOpen(true);
                            setImage(index);
                        }}
                        >
                        <p className="text-white">
                            <AiOutlineExpandAlt className="text-5xl border w-16 h-16 bg-neutral-500 hover.bg-white hover.text-black p-3 cursor-pointer rounded-full" />
                        </p>
                        </div>
                    </div>
                    </div>
                );
            })}
        </div>
      </div>
      <Lightbox
        open={open}
        index={image}
        close={() => setOpen(false)}
        plugins={[Zoom]}
        slides={slides}
      />
    </div>
  );
};

export default Gallery;