
import Image from "next/image";
import destinations from "@/data/destinations"

export default function TripsPage(){
    const tripsData = destinations.map((destination)=> (
        <div key={destination.id} className="flex flex-col h-full gap-5 shadow-md px-5 py-5 rounded-md grow">
            <div className="h-50 w-full overflow-hidden">
                <Image
                        src={destination.image}
                        alt={destination.city}
                        className="rounded-md"
                        width={400}
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

                <button className='mt-auto text-lg border-2 border-black px-3 py-2 w-fit hover:text-white hover:bg-black hover:border-black transition duration-300 cursor-pointer'>View tickets &rarr;</button>
            </div>
        </div>
    ))


    return (
        <>
           <div className="px-5 py-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tripsData}
           </div>
        </>
    )
}