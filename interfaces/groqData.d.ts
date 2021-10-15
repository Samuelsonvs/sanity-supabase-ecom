export namespace GroqData {
  interface Variant {
    colors: [[string]];
    Color: {
      hex: string
    };
    images: {
      [key: string]: {
        asset: {
          _ref: string;
        };
        _key: string;
      };
    };
    price: number;
    qty: number;
    title: string;
    sizes: [[string]];
  }

  interface Body {
    en: {
      [key: string]: {
        children: {
          [key: string]: {
            text: string;
          };
        };
      };
    };
  }

  interface Categories {
    [key: string]: {
      _key: string;
      _ref: string;
    };
  }

  interface Products {
    products: {
      [key: number]: {
        blurb: {
          en: string | null;
        };
        body: Body;
        categories: Categories;
        defaultProductVariant: Variant;
        slug: {
          current: string;
        };
        tags: [[string]] | null;
        category: string | null;
        variants: Variant | null;
      };
      length: number;
    };
  }

  interface Product {
    [key: string]: {
      [key: number]: {
        blurb: {
          en: string | null;
        };
        body: Body;
        category: string | null;
        defaultProductVariant: Variant;
        slug: {
          current: string;
        };
        variants?: Variant;
      };
    };
  }

  interface VariantItems {
    body: Body | null,
    Color: string | null,
    images: {
      [key: string]: {
        asset: {
          _ref: string;
        };
        _key: string;
      };
    } | null,
    price: number | null,
    qty: number | null,
    title: string | null
  }

  interface TopCategory {
    [key: string]: {
      _id: string;
      slug: {
        current: string
      };
      title: string
    }
  }
}
