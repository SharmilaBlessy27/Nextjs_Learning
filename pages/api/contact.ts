import { NextApiRequest, NextApiResponse } from "next";
import connectDatabase from "../../utlis/blogUtlity";
import Contact from "../../models/Contact";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDatabase();

  if (req.method === "POST") {
    try {
      const { name, email, message } = req.body;

      const newContact = new Contact({
        name,
        email,
        message,
      });

      await newContact.save();
      res.status(201).json({ message: "Contact form submitted successfully!" });
    } catch (error) {
      console.error("Error saving contact:", error);
      res.status(500).json({ message: "Error saving contact." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
