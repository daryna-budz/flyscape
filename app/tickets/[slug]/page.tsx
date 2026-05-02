import destinations from "@/data/destinations";
import Image from "next/image";

export default async function TripTicketPage( { params, }: {params: { slug: string }}){

    const { slug } = await params;
    const destination = destinations.find(
      (d) => d.slug ===slug
    )
    
      if (!destination) {
        return <div className="p-10">Destination not found</div>;
    }

    return (
        <div className="p-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="flex flex-col gap-5">
            <Image
              src={destination.image}
              alt={destination.city}
              width={600}
              height={400}
              className="rounded-xl"
            />
    
            <h1 className="text-3xl font-bold">
              {destination.city}, {destination.country}
            </h1>
    
            <p className="text-gray-600">{destination.description}</p>
    
            <div className="flex gap-2 flex-wrap">
              {destination.tags.map((tag) => (
                <span
                  key={tag}
                  className="border px-3 py-1 rounded-full text-sm text-gray-500"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
    
          <div className="border rounded-xl p-6 shadow-md flex flex-col gap-4">
            <h2 className="text-2xl font-semibold">
              Find flights to {destination.city}
            </h2>
    
            <form className="flex flex-col gap-4">
              <div className="flex flex-col">
                <label className="text-sm text-gray-500">From</label>
                <input
                  type="text"
                  placeholder="YUL"
                  className="border p-2 rounded-md"
                />
              </div>
    
              <div className="flex flex-col">
                <label className="text-sm text-gray-500">To</label>
                <input
                  type="text"
                  value={destination.airport}
                  disabled
                  className="border p-2 rounded-md bg-gray-100"
                />
              </div>
    
              <div className="flex flex-col">
                <label className="text-sm text-gray-500">Date</label>
                <input type="date" className="border p-2 rounded-md" />
              </div>
    
              <button
                type="button"
                className="bg-black text-white py-2 rounded-md hover:opacity-80 transition"
              >
                Search flights
              </button>
            </form>
          </div>
        </div>
      );
    }