import destinations from "@/data/destinations";
import Image from "next/image";
import Link from "next/link";
import FlightSearch from "@/components/FlightSearch";


export default async function TripTicketPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const destination = destinations.find((d) => d.slug === slug);

    if (!destination) return <div className="p-10">Destination not found</div>;

    return (
        <section className="px-10 py-12 gap-15 mx-auto max-w-8xl">
              <div className="flex flex-col gap-5">
                  <Link href="/trips">
                      <button className='border-2 border-black px-3 py-2 cursor-pointer print:hidden'>&larr; Back to trips</button>
                  </Link>
                  <div className="px-5">
                     <h1 className="text-2xl font-bold mt-5">{destination.city}</h1>
                     <p className="text-lg text-gray-600 mt-3">{destination.description}</p>
                  </div>
              </div>

              <div className="flex flex-col gap-15 mx-auto md:flex-row max-w-8xl items-center justify-between px-5 mt-8 md:items-start">
                <div>
                  <Image src={destination.image} alt={destination.city} width={700} height={500} className="rounded-xl" />
                </div>

                <div className="rounded-xl p-6 shadow-md flex flex-col gap-4 bg-white w-sm md:w-lg">
                    <h2 className="text-2xl font-semibold mb-2">Find flights to {destination.city}</h2>
                    <FlightSearch 
                        destinationCity={destination.city} 
                        destinationAirport={destination.airport} 
                    />
                </div>
              </div>
        </section>
    );
}