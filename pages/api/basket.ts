// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { basketGroq } from "@/utils/groqs";
import configuredSanityClient from "@/utils/sanity";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  products?: any;
  status?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const method = req.method;
  if (method === "POST") {
    const { body } = req.body;
    const basket = body.map((product: any) => `"${product._id}"`);
    const { basketQuery } = basketGroq(basket);
    const { products } = await configuredSanityClient.fetch(basketQuery);
    res.status(200).json({ products });
  } else {
    res.status(200).json({ status: "Method error." });
  }
}
