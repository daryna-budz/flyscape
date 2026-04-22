import './globals.css'
import Image from "next/image";



export default function Page() {
  return (
    <main>
      <section className='flex flex-col-reverse justify-between items-center gap-8 px-6 py-12 mx-auto md:flex-row max-w-7xl'>
        <div className='flex flex-col items-left gap-6'>
          <p className='hidden text-lg text-gray-600 uppercase md:block'>From inspiration to destination</p>
          <h1 className='text-5xl font-bold max-w-lg md:text-6xl'>Unlock unforgettable destinations at the best prices</h1>
          <p className='text-lg text-gray-600'>Explore the world through curated travel experiences and enjoy your next trip without stress</p>
          <button className='text-md uppercase border-2 border-black px-2 py-2 w-fit hover:text-white hover:bg-black hover:border-black transition duration-300 cursor-pointer'>Explore Trips</button>
        </div>
        <Image
          src="/images/hero-img.svg"
          alt="hero travel image"
          width={550}
          height={550}
        />
      </section>
    </main>
  )
}
