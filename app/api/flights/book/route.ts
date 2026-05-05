import { Duffel } from "@duffel/api";

const duffel = new Duffel({
  token: process.env.DUFFEL_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { offerId, passenger } = await req.json();

    const order = await duffel.orders.create({
      type: "instant",
      selected_offers: [offerId],
      passengers: [
        {
          id: passenger.id,
          given_name: passenger.firstName,
          family_name: passenger.lastName,
          gender: passenger.gender,
          born_on: passenger.birthDate,
          email: passenger.email,
          phone_number: passenger.phone,
          title: passenger.title,
        },
      ],
      payments: [
        {
          type: "balance",
          amount: passenger.totalAmount,
          currency: passenger.totalCurrency,
        },
      ],
    });

    return Response.json({ order: order.data });
  } catch (error) {
    console.error("Booking error:", error);
    return Response.json({ error: "Booking failed" }, { status: 500 });
  }
}