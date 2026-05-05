"use client"

import { FlightOffer, FlightOrder } from "@/app/types"
import { useState, useEffect, FormEvent } from "react"

export default function FlightSearch({ destinationCity, destinationAirport }: { destinationCity: string, destinationAirport: string }) {
    const [date, setDate] = useState('')
    const [flights, setFlights] = useState([])
    const [loading, setLoading] = useState(false)
    const [inputValue, setInputValue] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [selectedIata, setSelectedIata] = useState("");
    const [bookingResult, setBookingResult] = useState<FlightOrder | null>(null);
    const [selectedOffer, setSelectedOffer] = useState<FlightOffer | null>(null);
    const [passenger, setPassenger] = useState({
        id: "",
        title: "",
        firstName: "",
        lastName: "",
        email: "",
        birthDate: "",
        phoneNumber: "",
        gender: "",

    });

    useEffect(() => {
        const fetchSuggestions = async () => {
          if (inputValue.length < 2) {
            setSuggestions([]);
            return;
          }
          const res = await fetch(`/api/flights/suggestions?query=${inputValue}`);
          const data = await res.json();
          setSuggestions(data);
        };
    
        const timeoutId = setTimeout(fetchSuggestions, 300); 
        return () => clearTimeout(timeoutId);
      }, [inputValue]);

    const handleSearch = async () => {
        if (!selectedIata || !date) return alert("Please fill in all fields")
        setLoading(true)
        try {
            const res = await fetch('/api/flights/search', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ from: selectedIata, to: destinationAirport, date })
            })
            const data = await res.json()
            setFlights(data.offers || [])
            setLoading(false);
        } catch (err) {
            console.error("Search failed", err)
        } finally {
            setLoading(false)
        }
    }

    const handleBook = async (e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        if (!selectedOffer) return;
        setLoading(true);

        try {
            const res = await fetch('/api/flights/book', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    offerId: selectedOffer.id,
                    passenger: {
                        id: selectedOffer.passengers[0].id,
                        title: passenger.title,
                        given_name: passenger.firstName, 
                        family_name: passenger.lastName,
                        email: passenger.email,
                        phone_number: passenger.phoneNumber,
                        gender: passenger.gender,
                        born_on: passenger.birthDate,
                        totalAmount: selectedOffer.total_amount,
                        totalCurrency: selectedOffer.total_currency
                    }
                })
            });
    
            const data = await res.json();
            console.log(data);
            
            if (data.order) {
                setBookingResult(data.order);
            } else {
                alert("Booking failed: " + (data.error || "Unknown error"));
            }
        } catch (err) {
            console.error("Booking failed", err);
        } finally {
            setLoading(false);
        }
    }


    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 relative">
                <div className="flex flex-col">
                    <label className="text-sm text-gray-500 mb-1">From</label>
                    <input 
                        type="text" 
                        placeholder="From (e.g. London)" 
                        className="border p-2 rounded-md"
                        value={inputValue}
                        onChange={(e) => {
                            setInputValue(e.target.value)
                            setSelectedIata("")
                        }}
                    />
                </div>
                {suggestions.length > 0 && (
                        <ul className="absolute top-full left-0 w-full bg-white rounded-md shadow-xl z-50 mt-1 max-h-60 overflow-auto">
                            {suggestions.map((s: any) => (
                                <li 
                                    key={s.id}
                                    onClick={() => {
                                        setInputValue(`${s.name} (${s.iata_city_code})`);
                                        setSelectedIata(s.iata_code);
                                        setSuggestions([]);
                                    }}
                                    className="p-3 hover:bg-gray-100 cursor-pointer flex justify-between items-center border-b last:border-0"
                                >
                                    <span className="font-medium text-gray-800">{s.name}</span>
                                    <span className="text-xs font-mono bg-gray-200 px-2 py-1 rounded text-gray-600">{s.iata_code}</span>
                                </li>
                            ))}
                        </ul>
                )}
            </div>

            <div className="flex flex-col">
                <label className="text-sm text-gray-500 mb-1">Departure Date</label>
                <input 
                    type="date" 
                    className="border p-2 rounded-md" 
                    onChange={(e) => setDate(e.target.value)}
                />
            </div>
            <button
                    onClick={handleSearch}
                    disabled={loading}
                    className="bg-black text-white py-2 rounded-md hover:opacity-80 transition disabled:bg-gray-400 cursor-pointer"
                >
                    {loading ? "Searching..." : "Search flights"}
            </button>

            <div className="flex flex-col gap-4 mt-4">
            {bookingResult ? (
                    <div className="border-2 border-green-500 p-8 rounded-2xl bg-white shadow-2xl flex flex-col items-center text-center gap-4 animate-in zoom-in duration-500">
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl">
                            ✓
                        </div>
                        <h2 className="text-2xl font-black uppercase">Booking Confirmed!</h2>
                        <p className="text-gray-500">Thank you for trusting <strong>FLYSCAPE</strong>. Your adventure starts here.</p>
                        
                        <div className="w-full border-t border-b border-dashed border-gray-200 py-6 my-2 flex flex-col gap-3">
                            <div className="flex justify-between">
                                <span className="text-gray-400 uppercase text-xs font-bold">Booking Ref</span>
                                <span className="font-mono font-bold text-lg">{bookingResult.booking_reference}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400 uppercase text-xs font-bold">Passenger</span>
                                <span className="font-bold">{bookingResult.passengers[0].given_name} {bookingResult.passengers[0].family_name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400 uppercase text-xs font-bold">Status</span>
                                <span className="text-green-600 font-bold uppercase text-sm">● Confirmed</span>
                            </div>
                        </div>

                        <button 
                            onClick={() => window.print()} 
                            className="w-full border-2 border-black py-3 font-bold hover:bg-black hover:text-white transition cursor-pointer"
                        >
                            PRINT TICKET
                        </button>
                    </div>

                ) : selectedOffer ? (
                        <div className="border-2 border-black p-6 rounded-xl bg-white flex flex-col gap-4 animate-in fade-in duration-300">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-xl font-bold">Passenger Details</h3>
                                <button 
                                    onClick={() => setSelectedOffer(null)} 
                                    className="text-sm underline text-gray-500 hover:text-black cursor-pointer"
                                >
                                    Change flight
                                </button>
                            </div>
                        
                            <div className="bg-gray-50 p-3 rounded-md mb-2 text-sm">
                                <p><strong>Flight:</strong> {selectedOffer.owner.name}</p>
                                <p><strong>Total:</strong> {selectedOffer.total_amount} {selectedOffer.total_currency}</p>
                            </div>
            
                            <form className="flex flex-col gap-3" onSubmit={handleBook}>
                                <div className="grid grid-cols-2 gap-3">
                                    <input type="text" placeholder="First Name" className="border border-black rounded-md p-2 " value={passenger.firstName} onChange={(e) => setPassenger({...passenger, firstName: e.target.value})} required />
                                    <input type="text" placeholder="Last Name" className="border border-black rounded-md p-2 " value={passenger.lastName} onChange={(e) => setPassenger({...passenger, lastName: e.target.value})} required />
                                </div>
                                <input type="email" placeholder="Email Address" className="border border-black rounded-md p-2 " value={passenger.email} onChange={(e) => setPassenger({...passenger, email: e.target.value})} required />
                                <div className="flex flex-col">
                                    <label className="text-sm text-gray-500 mb-1" > Date of birth</label>
                                    <input type="date" className="border border-black rounded-md p-2 " title="Date of Birth" required value={passenger.birthDate} onChange={(e) => setPassenger({...passenger, birthDate: e.target.value})}/>
                                </div>
                                <div className="flex flex-col">
                                   <label className="text-sm text-gray-500 mb-1" > Your Title</label>
                                   <select className="border border-black rounded-md p-2 " value={passenger.title} onChange={(e) => setPassenger({...passenger, title: e.target.value})} required>
                                      <option value="mr">Mr</option>
                                      <option value="ms">Ms</option>
                                      <option value="mrs">Mrs</option>
                                   </select>
                                </div>
                                <div className="flex flex-col">
                                   <label className="text-sm text-gray-500 mb-1" > Your Gender</label>
                                   <select value={passenger.gender} onChange={(e) => setPassenger({...passenger, gender: e.target.value})} className="border border-black rounded-md p-2 " required>
                                      <option value="m">Male</option>
                                      <option value="f">Female</option>
                                   </select>
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-sm text-gray-500 mb-1" > Your Phone Number</label>
                                    <input
                                        type="tel"
                                        placeholder="+11234567890"
                                        value={passenger.phoneNumber}
                                        pattern="^\+[1-9]\d{1,14}$"
                                        onChange={(e) =>
                                            setPassenger({...passenger, phoneNumber: e.target.value})
                                        }
                                        className="border border-black rounded-md p-2 "
                                        required
                                    />
                                </div>
                                
                                <button 
                                    type="submit"
                                    className="bg-black text-white py-3 rounded-md font-bold mt-2 hover:bg-gray-800 transition cursor-pointer"
                                >
                                    Confirm & Book for {selectedOffer.total_amount} {selectedOffer.total_currency}
                                </button>
                            </form>
                        </div>
                ) : (
                    <>
                        {flights.length > 0 ? (
                            flights.map((flight: any) => (
                                <div key={flight.id} className="border p-4 rounded-lg flex justify-between items-center shadow-sm hover:shadow-md transition">
                                    <div>
                                        <p className="font-bold text-lg">{flight.owner.name}</p>
                                        <p className="text-sm text-gray-500">Direct flight to {destinationCity}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xl font-bold">{flight.total_amount} {flight.total_currency}</p>
                                        <button className="text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full mt-2 font-medium cursor-pointer" onClick={()=>setSelectedOffer(flight)}>Select</button>
                                    </div>
                                </div>
                            ))
                        ) : !loading && <p className="text-gray-400 text-center">No flights found yet</p>}
                    </>
                )
            }
            </div>
        </div>
    )
}