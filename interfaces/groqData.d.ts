export namespace GroqData {

    interface Variant {
        colors: [[string]];
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
    
    interface SanityProduct {
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
}