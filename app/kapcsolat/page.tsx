import { Metadata } from "next";
import ContactUs from "../components/ContactUs";

export const metadata: Metadata = {
    title: 'Kapcsolat - PEBo Étterem és Kávézó',
    description: 'Rendezvényt tartanál? Asztalt foglalnál? Vagy csak egy egyszerű kérdésed lenne? Írj nekünk.',
  }

export default function Kapcsolat() {
  return (
    <ContactUs />
  )
}
