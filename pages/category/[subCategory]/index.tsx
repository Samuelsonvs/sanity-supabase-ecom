import { GetStaticPropsContext, GetStaticProps, GetStaticPaths } from "next";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import configuredSanityClient from "@/utils/sanity";
import { productsSubCategoryFromKey, productsTopCategory, productsTopCategoryId } from "@/utils/groqs";
import { subCategorySolver } from "@/utils/groqResolver";
import Container from "@/container/Container";
import Breadcrumb from "@/components/Breadcrumb";

const subCategoryImages = {
  "Bedroom Sets":"/static/images/categories/sub/Bedroom/Bedroom_sets.jpg",
  "Bedroom Benches":"/static/images/categories/sub/Bedroom/Bedroom_benches.jpg",
  "Nightstands":"/static/images/categories/sub/Bedroom/Nightstands.jpg",
  "Makeup Table and Vanities":"/static/images/categories/sub/Bedroom/Makeup_vanities.jpg",
  "Kitchen & Dining Room Sets":"/static/images/categories/sub/Dining/Dining_room_sets.jpg",
  "Kitchen & Dining Tables":"/static/images/categories/sub/Dining/Dining_tables.jpg",
  "Recliners":"/static/images/categories/sub/Chairs/Recliners.jpg",
  "Accent Chairs":"/static/images/categories/sub/Chairs/Accent_chairs.jpg",
  "TV Stands & Entertainment Centers":"/static/images/categories/sub/TvStand/Tv_stands.jpg",
  "TV Trays":"/static/images/categories/sub/TvStand/Tv_trays.jpg"
}

const defImage = [
  "/static/images/categories/sub/Bedroom/Bedroom_sets.jpg"
]

export const Index = ({ subCategories }: any) => {
  const router = useRouter();
  return (
    <Container>
      <div className="mt-4 sm:mt-20 px-3 prose max-w-6xl mx-auto">
        <Breadcrumb asPath={router.asPath} />
      <h1>Furniture -2 </h1>
      <ul className="sm:flex sm:flex-wrap sm:justify-evenly carousel gap-3 py-4 sm:py-8 sm:overflow-visible">
        {subCategories.map((category: any, idx: number) => {
          const { title, slug } = subCategorySolver(category)
            return (
              <li key={idx} className="cursor-pointer w-72 carousel-item rounded-md shadow-xl hover:shadow-2xl">
              <Link passHref href={`${router.asPath}/${slug}`}>
              <a className="flex px-1 space-x-5 items-center">
                <Image
                 src={subCategoryImages[title as keyof typeof subCategoryImages] ?? defImage[0]}
                 alt={"chairs"}
                 width={65}
                 height={65}
                 />
                 <div>{title}</div>
              </a>
              </Link>
            </li>
            );
        })}
        </ul>
      </div>
    </Container>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const { topCategoryQuery } = productsTopCategory()
    const { categories } = await configuredSanityClient.fetch(topCategoryQuery);
    return {
      paths: categories.map((category: any) => ({
        params: {
            subCategory: category.slug.current
        },
      })),
      fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
    const slug = params?.subCategory;
    const { topCategoryIdQuery } = productsTopCategoryId(slug?.toString() ?? '')
    const { categories } = await configuredSanityClient.fetch(topCategoryIdQuery);
    const { subCategoryQuery } = productsSubCategoryFromKey(categories[0]._id)
    const { subCategories } = await configuredSanityClient.fetch(
      subCategoryQuery
  );
    return {
        props: {
          subCategories
        },
    }
}

export default Index;
