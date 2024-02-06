import AboutUs from "./components/AboutUs"
import ContactUs from "./components/ContactUs"
import Current from "./components/Current"
import DailyMenu from "./components/DailyMenu"
import Gallery from "./components/Gallery"
import Hero from "./components/Hero"
import Menu from "./components/Menu"

export default function HomaPage() {
  return (
    <>
      <Hero />
      <Current />
      <DailyMenu />
      <Menu />
      <AboutUs />
      <ContactUs />
    </>
  )
}
