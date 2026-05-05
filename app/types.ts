
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

export type FlightOrder = {
  booking_reference: string;
  passengers: Array<{
    given_name: string;
    family_name: string;
  }>;
}