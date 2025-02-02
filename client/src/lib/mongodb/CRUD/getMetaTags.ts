import connectToDb from "../connectToDb";

export default async function getMetaTags() {
  const { db } = await connectToDb();

  const metaTagsArray = await db
    .collection("MetaTags")
    .find({})
    .sort({ title: 1 })
    .toArray();

  return metaTagsArray.map((metaTag) => ({
    id: metaTag._id.toString(),
    title: metaTag.title,
  }));
}
