
export type Destination = {
    id: number;
    slug: string;
    city: string;
    country: string;
    image: string;
    description: string;
    tags: string[];
    type: string;
  };

export type FlightOffer = {
  id: string;
    owner: {
        name: string;
    };
    total_amount: string;
    total_currency: string;
    passengers: any[];
}