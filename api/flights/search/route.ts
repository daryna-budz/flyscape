import { Duffel } from "@duffel/api";

const duffel = new Duffel({
  token: process.env.DUFFEL_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { from, to, date } = await req.json();

    const offerRequest = await duffel.offerRequests.create({
      slices: [
        {
          origin: from,
          destination: to,
          departure_date: date,
          departure_time: {
            from: "08:00",
            to: "12:00",
          },
          arrival_time: {
            from: "12:00",
            to: "23:59",
          },
        },    
      ],
      passengers: [{ type: "adult" }],
      cabin_class: "economy",
    });

    return Response.json({
      offers: offerRequest.data.offers,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Failed to fetch flights" },
      { status: 500 }
    );
  }
}