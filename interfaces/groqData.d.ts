export namespace GroqData {
  interface Asset {
    _ref: string;
  }

  interface BodyChildren {
    [key: string]: {
      text: string;
    };
  }
  interface Variant {
    colors: [[string]];
    Color: {
      hex: string;
    };
    images: {
      [key: string]: {
        asset: Asset;
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
        children: BodyChildren;
      };
    };
  }

  interface Description {
    [key: string]: {
      children?: BodyChildren;
      asset?: Asset;
      style?: string;
      _type: string;
    };
  }

  interface BodySolver {
    element: {
      children?: BodyChildren;
      listItem: string;
      asset?: Asset;
      style?: string;
      _type: string;
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
        _id: string | null;
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
        _id: string | null;
      };
    };
  }

  interface VariantItems {
    body: Body | null;
    Color: string | null;
    images: {
      [key: string]: {
        asset: Asset;
        _key: string;
      };
    } | null;
    price: number | null;
    qty: number | null;
    title: string | null;
    _key: string | null;
  }

  interface TopCategory {
    [key: string]: {
      _id: string;
      slug: {
        current: string;
      };
      title: string;
    };
  }
}
