import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { css } from '@emotion/react';
import { useState } from 'react';
import Layout from '../components/Layout';
import {
  Cart,
  CartItem,
  getParsedCookie,
  setParsedCookie,
} from '../util/cookies';
// import adventuresDatabase from '../util/database';
import { Adventure, getAdventures } from '../util/database';
import { GetServerSidePropsContext } from 'next';
// import { ReactComponent as Background } from '/stacked-peaks-haikei.svg';

const layoutStyle = css`
  background-image: url(/stacked-peaks-haikei.png);
`;

const headerStyle = css`
  font-family: 'Candara', 'Arial';
`;

const flexStyle = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  font-family: 'Candara', 'Arial';
`;

const singleAdventureStyle = css`
  // display: flex;
  margin: 0.5rem 0.3rem;
  cursor: pointer;
`;

const imageTextStyle = css`
  display: flex;
  flex-direction: column;
`;

const imageStyle = css`
  margin-bottom: 1.5rem;
`;

const adventureNameStyle = css`
  margin: 0.5rem auto;

  /* margin-left: auto;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem; */
`;

const adventureButtonStyle = css`
  margin: 0.5rem auto;
  border-radius: 7%;
  background: rgba(88, 125, 184, 0.3);
  border: none;
  padding: 5px 8px;
  cursor: pointer;
  font-family: 'Candara', 'Arial';
`;

type Props = {
  adventures: Adventure[];
  cart: Cart;
};

export default function Adventures(props: Props) {
  const [cartList, setCartList] = useState(props.cart);

  function toggleAdventureCart(id: string | number) {
    const cookieValue = getParsedCookie('cart') || [];
    const existIdOnArray = cookieValue.some((cookieObject: CartItem) => {
      return cookieObject.id === id;
    });

    let newCookie;
    if (existIdOnArray) {
      newCookie = cookieValue.filter(
        (cookieObject: CartItem) => cookieObject.id !== id,
      );
    } else {
      newCookie = [...cookieValue, { id: id, quantity: 1 }];
    }
    console.log(newCookie);
    setCartList(newCookie);
    setParsedCookie('cart', newCookie);
  }

  return (
    <div css={layoutStyle}>
      <Layout css={layoutStyle}>
        <Head>
          <title>Adventures</title>
        </Head>

        <h1 css={headerStyle}>Choose your adventure</h1>
        <div css={flexStyle}>
          {props.adventures.map((adventure) => {
            const adventureIsAdded = cartList.some((addedObject) => {
              return addedObject.id === adventure.id;
            });

            return (
              <div css={singleAdventureStyle} key={`adventure-${adventure.id}`}>
                <Link href={`/adventures/${adventure.id}`}>
                  <a
                    css={imageTextStyle}
                    data-test-id={`product-${adventure.id}`}
                  >
                    {' '}
                    <Image
                      css={imageStyle}
                      src={`/adventures-img/${adventure.id}.jpg`}
                      width="280"
                      height="280"
                    />
                    <span css={adventureNameStyle}> {adventure.name} </span>
                  </a>
                </Link>
                <button
                  css={adventureButtonStyle}
                  onClick={() => toggleAdventureCart(adventure.id)}
                >
                  {adventureIsAdded ? 'Remove' : 'Add to cart ✈'}
                </button>
              </div>
            );
          })}
        </div>
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const cartOnCookies = context.req.cookies.cart || '[]';
  const cart = JSON.parse(cartOnCookies);

  const adventures = await getAdventures();
  console.log('adventures', adventures);

  console.log('cart', cart);
  console.log('cartoncookies', cartOnCookies);

  return {
    props: {
      // adventures: adventuresDatabase,
      cart,
      adventures,
    },
  };
}
