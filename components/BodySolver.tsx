/* eslint-disable react/display-name */
import React from 'react'
import Image from "next/image"
import { urlFor } from '@/utils/sanity'

interface Props {
    element: {
        children?: {
            [key: string]: {
                text: string
            }
        };
        asset?: {
            _ref: string
        }
        style?: string;
        _type: string
    }
}

const elements = {
    'h1': 'h1',
    'h2': 'h2',
    'h3': 'h3',
    'normal': 'p',
}

const elementor = (text: string, element: string) => {
    const bool = elements[element as keyof typeof elements]
    if (bool) {
        return (
            React.createElement(bool, null, text)
        )
    } else {
        return (
            <div>Element error</div>
        )
    }
}



export const BodySolver = ({ element }: Props) => {
    const key = element.style as keyof typeof elements
    const imageDimensions = element.asset?._ref.split('-')[2].split('x') || [500,300]
    const width = Number(imageDimensions[0])
    const height = Number(imageDimensions[1])
    const text = element?.children ? element.children[0].text : ''
    return (
        <div>
            {
                element._type === 'image' 
                ? 
                (
                    <Image
                    alt="ss"
                    src={
                        urlFor(element.asset?._ref as string)
                        .width(width)
                        .height(height)
                        .url() || ""
                    }
                    loading="lazy"
                    title={"ss"}
                    className="rounded-xl"
                    height={height}
                    width={width}
                    />
                )
                :
                elementor(text, key)
            }
        </div>
    )
}
