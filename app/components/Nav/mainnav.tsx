import { TbPhoneCall } from 'react-icons/tb'

export default function Mainnav() {
  return (
    <nav className='w-full sticky top-10 z-50 h-0'>
        <div className='w-full lg:w-10/12 flex gap-16 justify-between items-center m-auto bg-transparent backdrop-blur-xl py-2 px-8'>
            <ul className='flex justify-between w-6/12'>
              <li className='text-[--grey]'>Napi menü</li>
              <li className='text-[--grey]'>Étlap</li>
              <li className='text-[--grey]'>Rólunk</li>
              <li className='text-[--grey]'>Galéria</li>
              <li className='text-[--grey]'>Kapcsolat</li>
            </ul>
            <div className='flex justify-end gap-16 w-6/12'>
              <div className='flex flex-nowrap items-center gap-2'>
                <TbPhoneCall className='w-10 h-10 text-[--okker]'/>
                <ul className='flex flex-col'>
                  <p>+36 82 310 663</p>
                  <p>+36 30 494 0959</p>
                </ul>
              </div>
              <div className='flex flex-col'>
                <p className='opening flex flex-nowrap gap-2'>Jelenleg <p className='open'>Nyitva</p> vagyunk</p>
                <p>H - P: 10:30 - 22:30</p>
              </div>
            </div>
        </div>
    </nav>
  )
}
