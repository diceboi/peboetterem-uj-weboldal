"use client"

import { gql } from "@apollo/client"
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";

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
          homeBanner {
            sourceUrl
          }
        }
        id
      }
    }
  }
}`

export default function HomeBanner({ classname }:any) {

    const { data }:any = useSuspenseQuery(GET_FOOLDAL);

    const pages = data.pages.edges[0].node;

  return (
    <div className={classname} style={{backgroundImage: `url("${pages.fooldal.homeBanner.sourceUrl}")`}}>
    </div>
  )
}
