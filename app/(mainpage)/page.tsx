import AboutUs from "../components/AboutUs"
import ContactUs from "../components/ContactUs"
import DailyMenu from "../components/DailyMenu"
import Gallery from "../components/Gallery"
import Hero from "../components/Hero"
import Menu from "../components/Menu"

export default function HomaPage() {
  return (
    <>
      <Hero />
      <DailyMenu />
      <Menu />
      <AboutUs />
      <ContactUs />
    </>
  )
}
