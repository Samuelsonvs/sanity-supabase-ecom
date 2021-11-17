import React from "react";
import Link from "next/link";
import { BreadcrumbSVG } from "@/lib/svg";

interface Props {
  asPath: string;
}

export const Breadcrumb = ({ asPath }: Props) => {
  const pathArray = asPath.split("/");
  const pathRefactor = pathArray.map((path) => path.replace(/-/g, " "));
  const pathLength = pathArray.length - 1;
  return (
    <div className="text-base breadcrumbs">
      <ul>
        {pathArray.map((path: string, idx: number) => {
          if (path !== "") {
            if (pathLength !== idx) {
              const newPath = pathArray.slice(1, idx + 1);
              return (
                <li key={idx}>
                  <Link href={`/${newPath.join("/")}`}>
                    <a className="capitalize">{pathRefactor[idx]}</a>
                  </Link>
                  <BreadcrumbSVG />
                </li>
              );
            } else {
              return (
                <li key={idx} className="capitalize">
                  {pathRefactor[idx]}
                </li>
              );
            }
          }
        })}
      </ul>
    </div>
  );
};

export default Breadcrumb;
