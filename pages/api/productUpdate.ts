// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { writeSanityClient } from "@/utils/sanity"

type Data = {
  errors?: any;
  status?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const method = req.method;
  if (method === "POST") {
    const { body } = req.body;
    const content: string[] = []
    await Promise.all(
      Object.keys(body).map(async(_id) => {
        await writeSanityClient.patch(_id)
          .dec({'[_type == "productVariant"].qty': body[_id]})
          .commit()
          .then(updateQty => updateQty)
          .catch(err => content.push(err))
      })
      );
    res.status(200).json({ errors: content });
  } else {
    res.status(200).json({ status: "Method error." });
  }
}
