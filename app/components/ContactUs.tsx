"use client"

import Link from "next/link";
import { useState } from "react";

export default function ContactUs() {

  const [loading, setLoading] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState('');

  async function handleSubmit(event:any) {
      event.preventDefault();

      setLoading(true); // Töltési állapot beállítása
  
      const data = {
        name: String(event.target.name.value),
          email: String(event.target.email.value),
          tel: String(event.target.tel.value),
          message: String(event.target.message.value),
      }
      
      const response = await fetch("/api/email", {
          method: "POST",
          headers: {
          "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
      })

      setLoading(false); // Töltési állapot visszaállítása
      
      if (response.ok) {
          setSubmissionMessage('Az üzenetet sikeresen elküldtük'); // Sikeres küldés üzenetének beállítása
      }
      if (!response.ok) {
          setSubmissionMessage('Az üzenet küldése sikertelen volt'); // Sikertelen küldés üzenetének beállítása
      }
  }

  return (
    <section id="kapcsolat" className="w-full min-h-[50vh] bg-[--grey] py-40">
      <div className='container flex flex-col m-auto gap-20 lg:p-0 p-4'>
        <h1 className='text-center text-[--navy]'>Írj nekünk</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-8 items-start w-full lg:w-1/2 p-4 lg:p-0 m-auto ">
          <input id="name" type="name" placeholder="Név" required className="w-full p-4 bg-transparent text-[--navy] border-b-4 border-[--okker] active:border-transparent focus:outline-none "/>
          <input id="email" type="email" placeholder="E-mail" required className="w-full p-4 bg-transparent text-[--navy] border-b-4 border-[--okker] active:border-transparent focus:outline-none "/>
          <input id="tel" type="tel" placeholder="Telefonszám" required className="w-full p-4 bg-transparent text-[--navy] border-b-4 border-[--okker] active:border-transparent focus:outline-none "/>
          <textarea id="message" rows={10} placeholder="Üzenet" required className="w-full p-4 bg-transparent text-[--navy] border-b-4 border-[--okker] active:border-transparent focus:outline-none "/>
          <div className='flex gap-2'>
                    <input required id='friendaccept' type='checkbox'></input>
                    <label htmlFor='friendaccept' className=" text-[--navy]"><p className="text-xs">A küldés gombra kattintva kijelentem, hogy elolvastam, megértettem, és elfogadom az <Link href="/adatkezelesi-tajekoztato" className="underline">Adatkezelési tájékoztatóban</Link> foglaltakat</p></label>
        </div>
          <button type='submit' className='bg-[--okker] py-2 px-4 hover:bg-[--okkerdark] transition-all text-[--navy] text-lg cursor-pointer relative'>
                    {loading ? (
                        <span className="absolute inset-0 flex items-center justify-center px-6 py-3">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-[--navy]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Küldés...
                        </span>
                    ) : (
                                               <span>
                            {submissionMessage ? submissionMessage : "Küldés"}
                        </span>
                    )}
                </button>
        </form>
      </div>
    </section>
  )
}
