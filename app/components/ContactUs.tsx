"use client"

import Link from "next/link";
import { useState } from "react";
import ContactForm from "./Forms/ContactForm";

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
        <ContactForm />
      </div>
    </section>
  )
}
