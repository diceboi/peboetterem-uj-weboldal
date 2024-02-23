import AboutUs from "./components/AboutUs"
import ContactUs from "./components/ContactUs"
import Current from "./components/Current"
import DailyMenu from "./components/DailyMenu"
import Hero from "./components/Hero"
import Menu from "./components/Menu"

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
