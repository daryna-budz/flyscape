"use client"

import { FlightOffer } from "@/app/types"
import { useState, useEffect } from "react"

export default function FlightSearch({ destinationCity, destinationAirport }: { destinationCity: string, destinationAirport: string }) {
    const [date, setDate] = useState('')
    const [flights, setFlights] = useState([])
    const [loading, setLoading] = useState(false)
    const [inputValue, setInputValue] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [selectedIata, setSelectedIata] = useState("");
    const [selectedOffer, setSelectedOffer] = useState<FlightOffer | null>(null);

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
        } catch (err) {
            console.error("Search failed", err)
        } finally {
            setLoading(false)
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
                {selectedOffer ? (
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
            
                            <form className="flex flex-col gap-3">
                                <div className="grid grid-cols-2 gap-3">
                                    <input type="text" placeholder="First Name" className="border p-2 rounded-md" required />
                                    <input type="text" placeholder="Last Name" className="border p-2 rounded-md" required />
                                </div>
                                <input type="email" placeholder="Email Address" className="border p-2 rounded-md" required />
                                <div className="flex flex-col">
                                    <label className="text-sm text-gray-500 mb-1"> Date of birth</label>
                                    <input type="date" className="border p-2 rounded-md" title="Date of Birth" required />
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