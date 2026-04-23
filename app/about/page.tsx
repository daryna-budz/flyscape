
import Image from "next/image";
import { Plane, Globe, Cat } from "lucide-react";



export default function AboutPage() {
  return (
    <main>
        <section className='flex flex-col px-6 py-12 gap-10 mx-auto md:block max-w-8xl'>
            <div className='flex flex-col justify-center items-center gap-8'>
                <div className='flex flex-col gap-6 md:flex-row md:gap-20'>
                    <Image
                    src="/images/about-img.jpg"
                    alt="about travel image"
                    className="rounded-md"
                    width={700}
                    height={700}
                    />
                    <div className='flex flex-col items-left gap-6'>
                        <p className='text-lg text-gray-600 uppercase md:block'>About Flyscape</p>
                        <h1 className='text-5xl font-bold max-w-lg md:text-6xl'>Global community of travelers</h1>
                        <p className='text-lg text-gray-600 md: max-w-lg'>Launched in 2026, Flyscape is built for people who don’t just dream about traveling — they actually go. It’s a space where discovering new places and booking your next trip feels simple, fast, and exciting.<br /><br /> We believe travel should be effortless and inspiring, not overwhelming. That’s why we’re creating a platform where finding the right destination, the right price, and the right experience all come together — so you can focus on what really matters: the journey.</p>
                    </div>
                </div>
            </div>

            <div className="border-t border-b border-gray-300 py-10 flex flex-col gap-10 md:flex-row md:justify-around md:items-center md:mt-20 md:px-20 md:divide-x md:divide-gray-300">
                <div className="flex flex-col gap-4 md:px-10">
                    <div className="flex items-center gap-2">
                        <Plane className="w-10 h-10 text-black md:w-8" />
                        <p className="text-3xl font-semibold md:text-xl">1M+ Miles Explored </p>
                    </div>
                    <p className='text-lg text-gray-600 max-w-md md:max-w-xs'>
                    Dive into a rich collection of unique travel experiences, from practical weekend trips to unforgettable explorations
                    </p>
                </div>

                <div className="flex flex-col gap-4 md:px-10">
                    <div className="flex items-center gap-2">
                        <Globe className="w-10 h-10 text-black md:w-8" />
                        <p className="text-3xl font-semibold md:text-xl">Global Travel Network</p>
                    </div>
                    <p className='text-lg text-gray-600  max-w-md md:max-w-xs'>
                    Connect with travelers all around the world to share experiences, find inspiration, and plan your next escape with us
                    </p>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <Cat className="w-10 h-10 text-black md:w-8" />
                        <p className="text-3xl font-semibold md:text-xl">Pet Friendly</p>
                    </div>
                    <p className='text-lg text-gray-600  max-w-md md:max-w-xs'>
                    Wherever you decide to go - travel freely with your pet by your side, because every destination is better together:)
                    </p>
                </div>
            </div>

            <div className="flex flex-col gap-5 md:mt-20 md:items-center">
                <div className="text-left flex flex-col gap-10">
                    <h2 className='text-4xl font-bold max-w-lg md:text-6xl'>Our Vision</h2>
                    <div className="flex flex-col gap-10">
                        <p className='text-xl text-gray-600 md:max-w-xl'>At Flyscape, we see travel as a way to explore, connect, and experience the world in a deeper way — not just as a destination. Our platform brings travelers together, helping them exchange ideas, discover new places, and create journeys that inspire and go beyond the usual path</p>
                        <hr className="border-gray-400 w-2xs mx-auto"/>
                        <p className='text-xl text-gray-600 md:max-w-xl'>Travel looks different for everyone — for some it’s a quick getaway, for others it’s a lifestyle. Flyscape is here for all of it, helping you discover new places, plan with ease, and connect with a community that shares your passion for exploring the world</p>
                    </div>
                </div>
                <Image
                    src="/images/logo-new.png"
                    alt="logo image"
                    className="hidden md:block"
                    width={300}
                    height={300}
                />
            </div>

        </section>
    </main>
  )
}