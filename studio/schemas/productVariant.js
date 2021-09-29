/* eslint-disable import/no-anonymous-default-export */
export default {
  title: "Product variant",
  name: "productVariant",
  type: "object",
  fields: [
    {
      title: "Title",
      name: "title",
      type: "string",
    },
    {
      title: "QTY",
      name: "qty",
      type: "number",
    },
    {
      title: "Price",
      name: "price",
      type: "number",
    },
    {
      title: "Colors",
      name: "colors",
      type: "array",
      of: [
        {
          type: "string",
        },
      ],
      options: {
        layout: "tags",
      },
    },
    {
      title: "Sizes",
      name: "sizes",
      type: "array",
      of: [
        {
          type: "string",
        },
      ],
      options: {
        layout: "tags",
      },
    },
    {
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
        },
      ],
    },
  ],
};
