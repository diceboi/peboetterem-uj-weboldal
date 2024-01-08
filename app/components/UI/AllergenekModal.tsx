"use client"

import { IoMdClose } from "react-icons/io";

export default function AllergenekModal({ isOpen, closeModal }:any) {
    return (
        isOpen && (
          <div className="fixed flex justify-center items-center top-0 left-0 w-full h-full backdrop-blur-md z-50">
            <div className="relative w-11/12 lg:w-6/12 h-[85vh] m-auto bg-[--navy] p-8 z-50 lg: overflow-y-auto rounded-md">
                <button className="absolute top-4 right-4" onClick={closeModal}>
                    <IoMdClose className=" w-6 h-6 text-[--grey]"/>
                </button>
              <h1>Allergének</h1>
              <p className="text-sm lg:text-md py-1 border-b text-[--grey] border-neutral-400">1. Glutént tartalmazó gabonafélék</p>
              <p className="text-sm lg:text-md py-1 border-b text-[--grey] border-neutral-400">2. Rákfélék és a belőlük készült termékek</p>
              <p className="text-sm lg:text-md py-1 border-b text-[--grey] border-neutral-400">3. Tojás és a belőle készült termékek</p>
              <p className="text-sm lg:text-md py-1 border-b text-[--grey] border-neutral-400">4. Hal és a belőle készült termékek</p>
              <p className="text-sm lg:text-md py-1 border-b text-[--grey] border-neutral-400">5. Földimogyoró és a belőle készült termékek</p>
              <p className="text-sm lg:text-md py-1 border-b text-[--grey] border-neutral-400">6. Szójabab és a belőle készült termékek</p>
              <p className="text-sm lg:text-md py-1 border-b text-[--grey] border-neutral-400">7. Tej és az abból készült termékek</p>
              <p className="text-sm lg:text-md py-1 border-b text-[--grey] border-neutral-400">8. Diófélék, azaz mandula, mogyoró, dió, kesudió, pekándió, brazil dió, pisztácia, makadámia vagy queenslandi dió és a belőle készült termékek</p>
              <p className="text-sm lg:text-md py-1 border-b text-[--grey] border-neutral-400">9. Zeller és a belőle készült termékekk</p>
              <p className="text-sm lg:text-md py-1 border-b text-[--grey] border-neutral-400">10. Mustár és a belőle készült termékek</p>
              <p className="text-sm lg:text-md py-1 border-b text-[--grey] border-neutral-400">11. Szezámmag és a belőle készült termékek</p>
              <p className="text-sm lg:text-md py-1 border-b text-[--grey] border-neutral-400">12. Kén-dioxid és az SO2-ben kifejezett szulfitok 10 mg/kg, illetve 10 mg/liter összkoncentrációt meghaladó mennyiségben;k</p>
              <p  className="text-sm lg:text-md py-1 border-b text-[--grey] border-neutral-400">13. Csillagfürt és a belőle készült termékek</p>
              <p  className="text-sm lg:text-md py-1 text-[--grey]">14. Puhatestűek és a belőlük készült termékek</p>
            </div>
          </div>
        )
      );
    };
								
								