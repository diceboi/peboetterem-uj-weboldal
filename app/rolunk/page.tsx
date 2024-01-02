import React from 'react'
import AboutUs from '../components/AboutUs'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Rólunk - PEBo Étterem és Kávézó',
  }

export default function Rolunk() {
  return (
    <AboutUs />
  )
}
