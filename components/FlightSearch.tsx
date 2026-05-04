"use client"

import { useState, useEffect } from "react"

export default function FlightSearch({ destinationCity, destinationAirport }: { destinationCity: string, destinationAirport: string }) {
    const [date, setDate] = useState('')
    const [flights, setFlights] = useState([])
    const [loading, setLoading] = useState(false)
    const [inputValue, setInputValue] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [selectedIata, setSelectedIata] = useState("");

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
                    className="bg-black text-white py-2 rounded-md hover:opacity-80 transition disabled:bg-gray-400"
                >
                    {loading ? "Searching..." : "Search flights"}
            </button>

            <div className="flex flex-col gap-4 mt-4">
                {flights.length > 0 ? (
                    flights.map((flight: any) => (
                        <div key={flight.id} className="border p-4 rounded-lg flex justify-between items-center shadow-sm hover:shadow-md transition">
                            <div>
                                <p className="font-bold text-lg">{flight.owner.name}</p>
                                <p className="text-sm text-gray-500">Direct flight to {destinationCity}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xl font-bold">{flight.total_amount} {flight.total_currency}</p>
                                <button className="text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full mt-2 font-medium">Select</button>
                            </div>
                        </div>
                    ))
                ) : !loading && <p className="text-gray-400 text-center">No flights found yet</p>}
            </div>
        </div>
    )
}