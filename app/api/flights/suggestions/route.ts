import { Duffel } from "@duffel/api";

const duffel = new Duffel({
  token: process.env.DUFFEL_API_KEY!,
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query || query.length < 2) return Response.json([]);

  try {
    const response = await duffel.suggestions.list({
      query: query,
    });

    return Response.json(response.data);
  } catch (error) {
    return Response.json({ error: "Failed to fetch suggestions" }, { status: 500 });
  }
}