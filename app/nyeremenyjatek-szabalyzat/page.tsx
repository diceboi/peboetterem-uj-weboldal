import { gql } from "@apollo/client"
import { getClient } from "@/app/lib/client";

const query = gql`
query getNyeremenyjatekPost {
  page(id: "381", idType: DATABASE_ID) {
    blocks {
      saveContent
    }
    title
  }
}`

export default async function NyeremenyjatekSzabalyzat() {

  const { data } = await getClient().query({ 
    query, 
    context: {
      fetchOptions: {
        next: { revalidate: 5 },
      },
    },
  });

    return (
      <section className='w-full py-40 bg-[--grey]'>
          <div className='container flex flex-col lg:flex-row gap-20 m-auto w-11/12 lg:w-8/12'>
              <h1 className='lg:w-1/3'>{data.page.title}</h1>
              <div className="flex flex-col gap-4 lg:w-2/3">
              {data.page.blocks.map((page:any, index:any) => (
                <p 
                  className='text-sm lg:text-md'
                  key={index}
                  dangerouslySetInnerHTML={{ __html: page.saveContent }}
                />
              ))}
              </div>
          </div>
      </section>
    )
  }
  