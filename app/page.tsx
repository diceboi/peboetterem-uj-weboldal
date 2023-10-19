"use client"

import AboutUs from "./components/AboutUs"
import ContactUs from "./components/ContactUs"
import DailyMenu from "./components/DailyMenu"
import Gallery from "./components/Gallery"
import Hero from "./components/Hero"
import Menu from "./components/Menu"

import { gql, useQuery } from "@apollo/client"
import { getClient } from "./lib/client"

const GET_FOOLDAL = gql`
query getFooldal {
  pages(where: {id: 11}) {
    edges {
      node {
        fooldal {
          heroBackground {
            altText
            sourceUrl
          }
          heroLogo {
            altText
            sourceUrl
          }
          heroText
        }
        id
      }
    }
  }
}`

export default function HomaPage() {

  const { loading, error, data } = useQuery(GET_FOOLDAL);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const pages = data.pages.edges[0].node;
  return (
    <>
      <Hero herobg={pages.fooldal.heroBackground.sourceUrl} herologo={pages.fooldal.heroLogo.sourceUrl} herologoalt={pages.fooldal.heroLogo.altText} shortdescription={pages.fooldal.heroText} />
      <DailyMenu dailymenuprice={""}/>
      <Menu />
      <AboutUs />
      <Gallery />
      <ContactUs />
    </>
  )
}
