"use client"

import Link from "next/link";
import { useState } from "react";

function isInputNamedElement(e: Element): e is HTMLInputElement & { name: string } {
    return 'value' in e && 'name' in e
  }
  
  export default function ContactForm({ classname }:any) {
  
    async function handleOnSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
      e.preventDefault();
  
      const formData: Record<string, string> = {};
  
      Array.from(e.currentTarget.elements).filter(isInputNamedElement).forEach((field) => {
        if (!field.name) return;
        formData[field.name] = field.value;
      });
  
      await fetch('/api/email', {
        method: 'POST',
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        })
      })
    }

  return (
    <form onSubmit={handleOnSubmit} className="flex flex-col gap-8 items-start w-full lg:w-1/2 p-4 lg:p-0 m-auto ">
          <input id="name" type="name" name="name" placeholder="Név" required className="w-full p-4 bg-transparent text-[--navy] border-b-4 border-[--okker] active:border-transparent focus:outline-none "/>
          <input id="email" type="email" name="email"placeholder="E-mail" required className="w-full p-4 bg-transparent text-[--navy] border-b-4 border-[--okker] active:border-transparent focus:outline-none "/>
          <input id="tel" type="tel" name="phone" placeholder="Telefonszám" required className="w-full p-4 bg-transparent text-[--navy] border-b-4 border-[--okker] active:border-transparent focus:outline-none "/>
          <textarea id="message" name="message" rows={10} placeholder="Üzenet" required className="w-full p-4 bg-transparent text-[--navy] border-b-4 border-[--okker] active:border-transparent focus:outline-none "/>
          <div className='flex gap-2'>
                    <input required id='friendaccept' type='checkbox'></input>
                    <label htmlFor='friendaccept' className=" text-[--navy]"><p className="text-xs">A küldés gombra kattintva kijelentem, hogy elolvastam, megértettem, és elfogadom az <Link href="/adatkezelesi-tajekoztato" className="underline">Adatkezelési tájékoztatóban</Link> foglaltakat</p></label>
            </div>
          <button type='submit' className='bg-[--okker] py-2 px-4 hover:bg-[--okkerdark] transition-all text-[--navy] text-lg cursor-pointer relative'>Küldés</button>
        </form>
  )
}