import destinations from "@/data/destinations"
import TripsLayout from "@/components/TripsLayout"



export default async function Category({ params, }: { params: { category: string }}){
    const { category } = await params
    const sortedTrips = destinations.filter((destination) =>(
        destination.type === category
    ))

    return (
        <>
            <TripsLayout trips={sortedTrips}/>
        </>
    )
}