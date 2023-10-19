import { TbSoup } from 'react-icons/tb'
import { GiHotMeal } from 'react-icons/gi'

interface DailyMenu {
  dailymenuprice: string;
}

export default function DailyMenu({ dailymenuprice }:DailyMenu) {
  return (
    <>
    <div className="absolute w-full h-[15vh] bg-gradient-to-t from-[--navy] to-transparent -mt-[15vh]"></div>
    <section id="dailymenu" className="flex flex-col w-full min-h-[40vh] bg-[--navy] ">
      <div className="container m-auto flex flex-nowrap justify-center items-center gap-8">
        <h1>Napi menü</h1>
        <h2 className="price">{`1850 Ft/nap`}</h2>
      </div>
      <div className="container m-auto grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="flex flex-nowrap bg-[--lightnavy]">
          <div className="flex flex-col justify-start items-center border-r border-[--navy] m-4 pr-4 gap-2">
            <h1 className='-mt-4'>10.12</h1>
            <p className="day -mt-4">Csütörtök</p>
          </div>
          <div className="flex flex-col w-full pr-4">
            <div className="flex flex-col gap-1 border-b border-[--navy] mt-4 pb-4">
              <div className="flex flex-nowrap gap-2">
                <TbSoup className="w-6 h-6 text-[--okker]" />
                <p>Lencseleves</p>
              </div>
              <div className="flex flex-nowrap gap-2">
                <GiHotMeal className="w-6 h-6 text-[--okker]" />
                <p>Kolozsvári rakott káposzta</p>
              </div>
            </div>
            <div className="flex flex-col gap-1 py-4">
              <div className="flex flex-nowrap gap-2">
                <TbSoup className="w-6 h-6 text-[--okker]" />
                <p>Lencseleves</p>
              </div>
              <div className="flex flex-nowrap gap-2">
                <GiHotMeal className="w-6 h-6 text-[--okker]" />
                <p>Kolozsvári rakott káposzta</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-nowrap bg-[--lightnavy]">
          <div className="flex flex-col justify-start items-center border-r border-[--navy] m-4 pr-4 gap-2">
            <h1 className='-mt-4'>10.12</h1>
            <p className="day -mt-4">Csütörtök</p>
          </div>
          <div className="flex flex-col w-full pr-4">
            <div className="flex flex-col gap-1 border-b border-[--navy] mt-4 pb-4">
              <div className="flex flex-nowrap gap-2">
                <TbSoup className="w-6 h-6 text-[--okker]" />
                <p>Lencseleves</p>
              </div>
              <div className="flex flex-nowrap gap-2">
                <GiHotMeal className="w-6 h-6 text-[--okker]" />
                <p>Kolozsvári rakott káposzta</p>
              </div>
            </div>
            <div className="flex flex-col gap-1 py-4">
              <div className="flex flex-nowrap gap-2">
                <TbSoup className="w-6 h-6 text-[--okker]" />
                <p>Lencseleves</p>
              </div>
              <div className="flex flex-nowrap gap-2">
                <GiHotMeal className="w-6 h-6 text-[--okker]" />
                <p>Kolozsvári rakott káposzta</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className='container m-auto text-center'>A napi ajánlatot aznap 8:00 - ig lehet megrendelni!</p>
    </section>
    </>
  )
}
