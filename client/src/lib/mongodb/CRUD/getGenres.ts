import connectToDb from "../connectToDb";

export default async function getGenres() {
  const { db } = await connectToDb();

  const genresArray = await db
    .collection("Genres")
    .find({})
    .sort({ title: 1 })
    .toArray();

  return genresArray.map((genre) => ({
    id: genre._id.toString(),
    title: genre.title,
  }));
}
