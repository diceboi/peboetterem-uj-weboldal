import { Metadata } from "next";
import DailyMenu from "../components/DailyMenu";

export const metadata: Metadata = {
    title: 'Napi Menü - PEBo Étterem és Kávézó',
    description: 'Rendelj napi menüt akár már 1500Ft-tól Kaposváron és környékén.',
  }

export default function NapiMenu() {
  return (
    <DailyMenu />
  )
}
