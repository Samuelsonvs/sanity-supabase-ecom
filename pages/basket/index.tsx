import React from 'react'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'

import Container from '@/container/Container'
import { useUser } from '@/contexts/AuthContext';
import { basketGroq } from '@/utils/groqs';
import configuredSanityClient from '@/utils/sanity';

export const Index = ({products}: any) => {
    console.log(products)
    const { user, basket, setBasket } = useUser();
    return (
        <Container>
            <div className="mt-20">
                {basket?.map((product, idx) => {
                    return (
                        <div key={idx}>
                            {product._id}
                        </div>
                    )
                })}
            </div>
        </Container>
    )
}

export const getServerSideProps: GetServerSideProps = async (
    context: GetServerSidePropsContext
  ) => {
    const { basketQuery } = basketGroq(['0727f5c6-cae2-40f6-9d81-707b333b8e4e', '022e317e-c093-49a1-93ee-b357b502217f']);
    const { products } = await configuredSanityClient.fetch(basketQuery);
    return {
      props: {
        products,
      },
    };
  };

export default Index