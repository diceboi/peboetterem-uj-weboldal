"use client"

import React, { useContext, useState } from 'react'
import { AddToCartContext } from '../addToCart'
import Link from 'next/link'
import MegrendelesButton from './UI/MegrendelesButton'
import { TbArrowNarrowRight } from 'react-icons/tb'

export default function Penztar() {

  const { cartItems, getTotalPrice }:any = useContext(AddToCartContext)

  const [formData, setFormData] = useState({
    nev: '',
    email: '',
    tel: '',
    irszam: '',
    telepules: '',
    utca: '',
    emelet: '',
    megjegyzes: '',
    adatkezelesi: false,
  });

  const handleInputChange = (e:any) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <section className='w-full py-20 bg-[--navy]'>
      <div className='container m-auto'>
        <div className='flex flex-col justify-center w-full lg:w-8/12 gap-8 m-auto'>
          <h1 className='py-8 text-center border-b border-[--navy]'>Pénztár</h1>
          <div className='flex flex-col w-full h-full bg-[--lightnavy] rounded-md p-4'>
            <h2 className='pb-4'>Rendelésed:</h2>
  
            {cartItems.map((item:any, index:any) => (

              <div className='flex flex-col lg:flex-row justify-between items-end border-b border-[--navy] py-2'>
                <p key={index} className='text-[--grey] w-full lg:w-3/4'>{item.count + ' x ' + item.nev}</p>
                <p className="smartprice text-[--okker]">{item.elsodlegesar * item.count} Ft</p>
              </div>

            ))}

            <div className='flex flex-col lg:flex-row justify-between items-end pt-4'>
                <p className='text-[--okker] font-bebas text-3xl'>Összesen:</p>
                <p className="text-[--grey] font-bebas text-3xl ">{getTotalPrice()} Ft</p>
            </div>

          </div>

          <div className='flex flex-col w-full h-full bg-[--lightnavy] rounded-md p-4'>
            
            <h2 className=''>Szállítási adatok:</h2>
            <p className='text-sm text-[--grey] pb-8'>a csillaggal (*) jelölt mezők kitöltése kötelező</p>

            <form className='flex flex-col justify-start items-start gap-4'>
              <div className='flex flex-col w-full lg:flex-row gap-4'>
                <label htmlFor="nev" className='min-w-[200px] text-[--grey]'>Név:*</label>
                <input required type="fname" name="nev" className='w-full bg-[--navy] rounded-md p-2 text-[--grey]' value={formData.nev}
            onChange={handleInputChange}/>
              </div>

              <div className='flex flex-col w-full lg:flex-row gap-4'>
                <label htmlFor="email" className='min-w-[200px] text-[--grey]'>E-mail&#10240;cím:*</label>
                <input required type="email" name="email" className='w-full bg-[--navy] rounded-md p-2 text-[--grey]' value={formData.email}
            onChange={handleInputChange}/>
              </div>

              <div className='flex flex-col w-full lg:flex-row gap-4'>
                <label htmlFor="tel" className='min-w-[200px] text-[--grey]'>Telefonszám:*</label>
                <input required type="tel" name="tel" className='w-full bg-[--navy] rounded-md p-2 text-[--grey]' value={formData.tel}
            onChange={handleInputChange}/>
              </div>

              <div className='flex flex-col w-full lg:flex-row gap-4'>
                <label htmlFor="number" className='min-w-[200px] text-[--grey]'>Irányítószám:*</label>
                <input required type="number" name="irszam" className='w-full bg-[--navy] rounded-md p-2 text-[--grey]' value={formData.irszam}
            onChange={handleInputChange}/>
              </div>

              <div className='flex flex-col w-full lg:flex-row gap-4'>
                <label htmlFor="text" className='min-w-[200px] text-[--grey]'>Település:*</label>
                <input required type="text" name="telepules" className='w-full bg-[--navy] rounded-md p-2 text-[--grey]' value={formData.telepules}
            onChange={handleInputChange}/>
              </div>

              <div className='flex flex-col w-full lg:flex-row gap-4'>
                <label htmlFor="text" className='min-w-[200px] text-[--grey]'>Utca, házszám:*</label>
                <input required type="text" name="utca" className='w-full bg-[--navy] rounded-md p-2 text-[--grey]' value={formData.utca}
            onChange={handleInputChange}/>
              </div>

              <div className='flex flex-col w-full lg:flex-row gap-4'>
                <label htmlFor="text" className='min-w-[200px] text-[--grey]'>Emelet, ajtó (ha van):</label>
                <input type="text" name="emelet" className='w-full bg-[--navy] rounded-md p-2 text-[--grey]' value={formData.emelet}
            onChange={handleInputChange}/>
              </div>

              <div className='flex flex-col w-full lg:flex-row gap-4'>
                <label htmlFor="text" className='min-w-[200px] text-[--grey]'>Egyéb megjegyzés:</label>
                <textarea rows={6} name="megjegyzes" className='w-full bg-[--navy] p-2 rounded-md text-[--grey]' value={formData.megjegyzes}
            onChange={handleInputChange}/>
              </div>

              <div className='flex flex-row gap-4'>
                <input required id='adatkezelesi' name='adatkezelesi' type='checkbox' checked={formData.adatkezelesi}
            onChange={handleInputChange}></input>
                <label className='text-xs text-[--grey]' htmlFor='adatkezelesi'>Elolvastam, megértettem, és elfogadom az <Link href="/adatkezelesi-tajekoztato" className='text-[--okker] underline'>adatkezelési tájékoztatóban</Link> foglaltakat. Elfogadom továbbá, hogy a megrendelés elküldésével fizetési kötelezettségem van a futár felé.</label>
              </div>

              <div className='pt-4'>
                <MegrendelesButton icon={<TbArrowNarrowRight />} title={'Megrendelés'} formData={formData} elkeszult={false} kiszallitva={false}/>
              </div>
              
            </form>

          </div>

        </div>
      </div>
    </section>
  )
}
