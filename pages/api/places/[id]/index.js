import dbConnect from "@/db/dbConnect";
import Place from "@/db/models/Place";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (!id) {
    return;
  }

  if (request.method === "GET") {
    const place = await Place.findById(id);
    response.status(200).json(place);

    if (!place) {
      return response.status(404).json({ status: "Not found" });
    }
  }

  if (request.method === "PUT") {
    const updatedPlace = request.body;
    await Place.findByIdAndUpdate(id, updatedPlace);
    response.status(200).json({ status: "Place updated." });
  }

  if (request.method === "DELETE") {
    await Place.findByIdAndDelete(id);
    response.status(200).json({ status: "Place deleted." });
  }
}
