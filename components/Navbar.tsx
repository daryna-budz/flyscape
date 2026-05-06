import Image from "next/image";
import Link from "next/link"

export default function Navbar(){
    return (
        <header className="sticky top-0 z-50 bg-[#f1f1f1] print:hidden">
            <nav className="flex items-center justify-between px-8 md:px-12 max-w-8xl mx-auto" >
                 <Link href="/">
                    <Image
                            src="/images/logo-new.png"
                            alt="logo image"
                            className="w-30 md:w-40 block"
                            width={300}
                            height={300}
                    />
                 </Link>
                    <div className="flex items-center gap-4 md:gap-8">
                        <Link href="/trips"><p className="relative text-md md:text-lg text-gray-500 uppercase cursor-pointer after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-gray-600 after:transition-all after:duration-300 hover:after:w-full hover:text-gray-600">Find Trips</p></Link>
                        <Link href="/about"><p className="relative text-md md:text-lg text-gray-500 uppercase cursor-pointer after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-gray-600 after:transition-all after:duration-300 hover:after:w-full hover:text-gray-600">About</p></Link>
                    </div>
            </nav>
        </header>
    )
}
