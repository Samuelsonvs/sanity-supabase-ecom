import React from 'react'
import { BodySolver } from '../BodySolver'

interface Props {
    [key: string]: {
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

export const Description = ({ body }: Props) => {
    
    return (
        <div className="prose py-10 mx-auto">
            {Array.isArray(body) && body.map((element, idx) => {
                return (
                    <BodySolver key={idx} element={element} />
                )
            })}
        </div>
    )
}


export default Description