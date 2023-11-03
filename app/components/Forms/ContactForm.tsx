"use client"

import Link from "next/link";
import { useState } from "react";
import { PiPaperPlaneTiltLight } from 'react-icons/pi'
import { usePathname } from 'next/navigation';
import { BsCheckLg } from 'react-icons/bs';

function isInputNamedElement(e: Element): e is HTMLInputElement & { name: string } {
    return 'value' in e && 'name' in e
  }
  
  export default function ContactForm({ classname }:any) {

    const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'submitted' | 'error'>('idle');
  
    async function handleOnSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
      e.preventDefault();

      setFormStatus('submitting');
  
      try {
        const formData: Record<string, string> = {};
  
        Array.from(e.currentTarget.elements).filter(isInputNamedElement).forEach((field) => {
          if (!field.name) return;
          // Handle checkboxes to set 'yes' or 'no' values
          if (field.type === 'checkbox') {
            formData[field.name] = field.checked ? 'Igen' : 'Nem';
          } else {
            formData[field.name] = field.value;
          }
        });
  
      await fetch('/api/email', {
        method: 'POST',
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          policy: formData.policy,
        })
      });

      setFormStatus('submitted');
    } catch (error) {
      setFormStatus('error');
    }
  }

  return (
    <form onSubmit={handleOnSubmit} className="flex flex-col gap-8 items-start w-full lg:w-1/2 p-4 lg:p-0 m-auto ">
          <input id="name" type="name" name="name" placeholder="Név" required className="w-full p-4 bg-transparent text-[--navy] border-b-4 border-[--okker] active:border-transparent focus:outline-none "/>
          <input id="email" type="email" name="email"placeholder="E-mail" required className="w-full p-4 bg-transparent text-[--navy] border-b-4 border-[--okker] active:border-transparent focus:outline-none "/>
          <input id="tel" type="tel" name="phone" placeholder="Telefonszám" required className="w-full p-4 bg-transparent text-[--navy] border-b-4 border-[--okker] active:border-transparent focus:outline-none "/>
          <textarea id="message" name="message" rows={10} placeholder="Üzenet" required className="w-full p-4 bg-transparent text-[--navy] border-b-4 border-[--okker] active:border-transparent focus:outline-none "/>
          <div className='flex gap-2'>
                    <input required id='friendaccept' name='policy' type='checkbox'></input>
                    <label htmlFor='friendaccept' className=" text-[--navy]"><p className="text-xs">A küldés gombra kattintva kijelentem, hogy elolvastam, megértettem, és elfogadom az <Link href="/adatkezelesi-tajekoztato" className="underline">Adatkezelési tájékoztatóban</Link> foglaltakat</p></label>
            </div>
          <button 
          type='submit' 
          className='flex items-center gap-2 bg-[--okker] py-2 px-4 hover:bg-[--okkerdark] transition-all text-[--navy] text-lg cursor-pointer relative'
          disabled={formStatus === 'submitting' || formStatus === 'submitted'}
          >
            {formStatus === 'submitting' ? (
            <>
            Küldés...
            <div
              className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status">
            </div>
            
            </>
          ) : formStatus === 'submitted' ? (
            <>
              Elküldve
              <BsCheckLg />
            </>
          ) : (
            <>
              Küldés
              <PiPaperPlaneTiltLight className='right-4 recruitment-icon w-6 h-6 group-hover:right-6 ease-out duration-200' />
            </>
          )}
          </button>
        </form>
  )
}
