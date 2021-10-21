import React from 'react';
import Link from "next/link"

interface Props {
    asPath: string
}

export const Breadcrumb = ({ asPath }: Props) => {
    const pathArray = asPath.split('/')
    const pathRefactor = pathArray.map((path) => path.replace(/-/g, ' '))
    const pathLength = pathArray.length - 1
    return (
        <div className="text-base breadcrumbs">
            <ul>
            {pathArray.map((path: string, idx: number) => {
                if (path !== "") {
                    if (pathLength !== idx) {
                        const newPath = pathArray.slice(1,idx +1)
                        return (
                            <li key={idx}>
                                <Link href={`/${newPath.join('/')}`}> 
                                    <a className="capitalize">{pathRefactor[idx]}</a>
                                </Link>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </li> 
                        )
                    } else {
                        return (
                            <li key={idx} className="capitalize">{pathRefactor[idx]}</li>
                        )
                    }
                }
            })}
            </ul>
        </div>
    )
}

export default Breadcrumb
