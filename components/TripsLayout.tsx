"use client";

import Image from "next/image";
import Link from "next/link";
import categories from "@/data/categories";
import { Destination } from "@/app/types";
import { usePathname } from "next/navigation";

export default function TripsLayout({ trips, }: {trips: Destination[]}){
    const pathname = usePathname();
    const isAllActive = pathname === "/trips";


    return (
        <>
             <h1 className='hidden md:block px-8 py-5 text-5xl font-bold max-w-lg md:text-6xl'>Our Trips</h1>
             <ul className="px-5 py-5 flex flex-wrap gap-8 md:gap-10 items-center justify-center" >
                <Link href="/trips">
                        <li className={`relative text-sm md:text-md md:text-lg uppercase cursor-pointer ${isAllActive ? "text-black font-bold" : "text-gray-600"}`}>All</li>
                </Link>
                {categories.map((category)=>{
                    const isActive = pathname === `/trips/${category.slug}`;
                    return (
                        <Link key={category.slug} href={`/trips/${category.slug}`}>
                            <li className={`relative text-md md:text-lg uppercase cursor-pointer  ${isActive ? "text-black font-bold" : "text-gray-600"}`}>{category.slug}</li>
                        </Link>
                    )
                })}
             </ul>


             <div className="px-5 py-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
               {trips.map((destination) => (
                    // <Link href={`/trips/${destination.id}`} key={destination.id}>
                        <div key={destination.id} className="flex flex-col h-full gap-5 shadow-md px-5 py-5 rounded-md grow bg-[#f5f5f5]">
                            <div className="h-50 w-full overflow-hidden">
                                <Image
                                        src={destination.image}
                                        alt={destination.city}
                                        className="rounded-md"
                                        width={500}
                                        height={400}
                                />
                            </div>
                            <div className="flex flex-col gap-3 px-5 grow">
                                <p className="text-xl font-bold text-black">{destination.city}, {destination.country}</p>
                                <div>
                                    {destination.tags.map((tag) =>(
                                        <span key={tag} className='text-md border-2 text-gray-400 rounded-4xl px-3 py-1 w-fit mr-1'>{tag} </span>
                                    ))}
                                </div>
                                <p className="text-lg text-gray-600">{destination.description}</p>

                                <Link href={`/tickets/${destination.slug}`} className="mt-auto"><button className=' text-lg border-2 border-black px-3 py-2 w-fit hover:text-white hover:bg-black hover:border-black transition duration-300 cursor-pointer'>View tickets &rarr;</button></Link>
                            </div>
                        </div>
                    // </Link>
               ))}
             </div>
        </>
    );
}