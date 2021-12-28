// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { writeSanityClient } from "@/utils/sanity"

type Data = {
  errors?: any;
  status?: string;
};

interface Product {
  _id: string;
  defaultProductVariant: {
    qty: number
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const method = req.method;
  if (method === "POST") {
    const { body } = req.body;
    const decQuery = '[_type == "productVariant"].qty'
    const productKeys = Object.keys(body).filter(key => key !== "totalPrice")
    const countQuery = `*[_type == "product" && _id in ${JSON.stringify(productKeys)}] {_id,defaultProductVariant{qty}}`;
    const content: string[] = [];
    await writeSanityClient.fetch(countQuery).then(async(products) => {
      await Promise.all(
        products.map(async(product: Product) => {
          const stockNumber = product.defaultProductVariant.qty;
          const buyerNumber = body[product._id].count;
          if (stockNumber - buyerNumber >= 0) {
            await writeSanityClient.patch(product._id)
              .dec({[decQuery]: buyerNumber})
              .commit()
              .then(updateQty => updateQty)
              .catch(err => content.push(err))
          } else {
            content.push(`${product._id} product out of stock`)
          }
        })
      );
    });
    res.status(200).json({ errors: content });
  } else {
    res.status(200).json({ status: "Method error." });
  }
}
