// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  body?: any;
  status?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const method = req.method;
  if (method === "POST") {
    const { body } = req.body;
    res.status(200).json({ body });
  } else {
    res.status(200).json({ status: "Method error." });
  }
}
