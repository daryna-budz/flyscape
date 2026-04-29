
import Image from "next/image";
import Link from "next/link";
import destinations from "@/data/destinations"
import categories from "@/data/categories";
import TripsLayout from "@/components/TripsLayout";


export default function TripsPage(){

    return (
        <>
           <TripsLayout trips={destinations}/>
        </>
    )
}