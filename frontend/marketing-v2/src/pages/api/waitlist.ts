import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  const { email } = JSON.parse(req.body);

  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    const response = await fetch("https://api.clerk.dev/v1/waitlist_entries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.CLERK_SECRET_KEY}`, // Secure this in .env
      },
      body: JSON.stringify({ email_address: email }),
    });

    if (!response.ok) {
      const error = await response.json();
      return res.status(400).json({ message: "Failed to add to waitlist", error });
    }

    return res.status(200).json({ message: "Successfully added to waitlist" });
  } catch (error) {
    console.error("Waitlist error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
