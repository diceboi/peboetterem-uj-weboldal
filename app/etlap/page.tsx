import { Metadata } from "next";
import Menu from "../components/Menu";

export const metadata: Metadata = {
    title: 'Étlap - PEBo Étterem és Kávézó',
    description: 'Válogass Olaszos ételeink közül, és rendeld akár házhoz online. Ha elviletlre szeretnéd, rendeld meg online, és válaszd az elvitel opciót.',
  }

export default function Etlap() {
  return (
    <Menu />
  )
}
