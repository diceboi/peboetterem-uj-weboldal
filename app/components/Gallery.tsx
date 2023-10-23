import LightboxGallery from '../components/UI/LightboxGallery'

export default function Gallery() {
  return (
    <section id='galeria' className="bg-[--grey] w-full min-h-[100vh] py-40">
      <div className='container flex flex-col m-auto gap-20 lg:p-0 p-4'>
        <h1 className='text-center text-[--navy]'>Galéria</h1>
        <LightboxGallery />
      </div>
    </section>
  )
}
