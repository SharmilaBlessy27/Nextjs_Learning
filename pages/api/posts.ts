import { NextApiRequest, NextApiResponse } from "next";
import connectDatabase from "../../utlis/blogUtlity";
import Post from "../../models/Post";
import { ObjectId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(`Request Method: ${req.method}`);
  await connectDatabase();

  const { id } = req.query;

  if (req.method === "GET") {
    if (id) {
      if (!ObjectId.isValid(id as string)) {
        return res.status(400).json({ error: "Invalid post ID" });
      }

      try {
        const post = await Post.findById(id);
        if (!post) {
          return res.status(404).json({ error: "Post not found" });
        }
        res.status(200).json(post);
      } catch (error) {
        console.log(error);

        res.status(500).json({ error: "Failed to fetch post by ID" });
      }
    } else {
      try {
        const posts = await Post.find({});
        res.status(200).json(posts);
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to fetch posts" });
      }
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
