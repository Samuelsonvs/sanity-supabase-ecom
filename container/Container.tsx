import Head from "next/head";
import { useRouter } from "next/router";

import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import { ContainerProps } from "@/interfaces/interface";

export const Container = ({
  children,
  customTitle,
}: ContainerProps): JSX.Element => {
  const router = useRouter();
  const meta = {
    title: customTitle ? customTitle : "Mert Samet Atalı – Developer.",
    description: `Front-end developer, JavaScript enthusiast.`,
    image: "",
    type: "website",
    date: "02.02.02",
  };
  return (
    <div className="bg-white font-sans min-h-screen flex flex-col">
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta
          property="og:url"
          content={`http://localhost:3000${router.asPath}`}
        />
        <link rel="canonical" href={`http://localhost:3000${router.asPath}`} />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Mert Samet" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        {meta.date && (
          <meta property="article:published_time" content={meta.date} />
        )}
      </Head>
      <Navbar />

      <main>{children}</main>
      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
};

export default Container;
