import React from 'react';
import { Disclosure } from '@headlessui/react';
import ChevronUpIcon from "@/public/static/svg/chevronUp.svg";
import Badge from './Badge';

interface P {
    date: string;
    price: string;
    content: string;
    status: string;
}

const Collapse = ({date, content, price, status}: P) => {
    return (
        <Disclosure>
            {({ open }) => (
            <>
                <Disclosure.Button className="flex justify-between items-center w-full px-4 py-2 text-sm font-medium text-left text-yellow-900 bg-yellow-100 rounded-lg hover:bg-yellow-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <div className="flex flex-col sm:flex-row justify-between max-w-xs w-full">
                    <span>{date}</span>
                    <span>{price}</span>
                </div>
                <div className='pr-4'>
                    <Badge
                    status={status}
                    />
                </div>
                <ChevronUpIcon
                    className={`${
                    open ? 'transform rotate-180' : ''
                    } w-5 h-5 text-yellow-500 transition duration-75 ease-in-out`}
                />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                    {content}
                </Disclosure.Panel>
            </>
            )}
      </Disclosure>
    )
}

export default Collapse
