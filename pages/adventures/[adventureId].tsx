import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import Layout from '../../components/Layout';
import Link from 'next/link';
import { css } from '@emotion/react';
// import adventuresDatabase from '../../util/database';
import {
  Cart,
  CartItem,
  // getParsedCookie,
  // setParsedCookie,
} from '../../util/cookies';
import { Adventure, getAdventureById } from '../../util/database';
import { GetServerSidePropsContext } from 'next';
import updateCount from '../../util/quantityHandler.js';
import toggleCart from '../../util/toggleCart.js';

const gridStyle = css`
  display: grid;
  margin-right: 4rem;
  margin-left: 4rem;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
`;

const textStyle = css`
  grid-column: 2 / 3;
  grid-row: 1 / 2;
`;

const buttonCartStyle = css`
  /* grid-column: 2 / 3;
  grid-row: 2 / 3;
  justify-self: center;
  align-self: center; */
  height: 30px;
  width: 130px;
  border-style: solid;
  border-width: thin;
  border-radius: 5%;
  background: none;
  cursor: pointer;
  :hover {
    background: #f0ede4;
  }
`;

const buttonGridStyle = css`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  justify-self: start;
  align-self: center;
  display: flex;
  align-items: center;
`;

const imageStyle = css`
  margin-top: 1rem;
  grid-column: 1 / 2;
  grid-row: 1 / 3;
`;

const backLinkStyle = css`
  // display: block;
`;

const buttonsWrapperStyle = css`
  border: grey;
  border-style: solid;
  border-width: thin;
  display: inline-block;
  margin: 10px;
  height: 30px;
  border-radius: 15%;
`;

const buttonMinusStyle = css`
  background: none;
  border: none;
  font-size: 1rem;
  height: 28px;
  border-radius: 25% 0 0 25%;
  cursor: pointer;

  :hover {
    background: #f0ede4;
  }
`;

const buttonPlusStyle = css`
  background: none;
  border: none;
  font-size: 1rem;
  height: 28px;
  border-radius: 0 25% 25% 0;
  cursor: pointer;

  :hover {
    background: #f0ede4;
  }
`;

const currentQuantityStyle = css`
  padding: 0 4px;
`;

type Props = {
  adventure: Adventure;
  cart: Cart;
};

export default function SingleAdventure(props: Props) {
  const [cartList, setCartList] = useState(props.cart);

  const cookieCart: string = 'cart';

  // Add item to cart and toggle button
  function toggleAdventureCart(id: number, cookie: string) {
    const newCookie = toggleCart(id, cookie);
    setCartList(newCookie);
  }
  // Check if adventure already in cart
  const adventureIsAdded = cartList.some((addedObject: CartItem) => {
    return addedObject.id === props.adventure.id;
  });

  const currentAdventure = cartList.find(
    (cookieObject: CartItem) => cookieObject.id === props.adventure.id,
  );

  console.log('currentAdventureObject', currentAdventure);

  function quantityHandler(cookieKey: string, increment: boolean) {
    const newCookie = updateCount(cookieKey, props.adventure.id, increment);
    setCartList(newCookie);
  }

  return (
    <Layout>
      <Head>
        <title>{`${props.adventure.name} - ${props.adventure.duration} days`}</title>
      </Head>
      <h1>{`${props.adventure.name}`}</h1>
      <div css={backLinkStyle}>
        <Link href="/adventures">
          <a>Back to all adventures</a>
        </Link>
      </div>
      <div css={gridStyle}>
        <div css={imageStyle}>
          <Image
            data-test-id="product-image"
            src={`/adventures-img/${props.adventure.id}.jpg`}
            width="380"
            height="380"
            css={imageStyle}
          />{' '}
        </div>
        <div css={textStyle}>
          <div data-test-id="product-price">
            {' '}
            Price: {props.adventure.price}
            <br />
            {props.adventure.description}
          </div>
        </div>
        <div css={buttonGridStyle}>
          <button
            css={buttonCartStyle}
            data-test-id="product-add-to-cart"
            onClick={() => toggleAdventureCart(props.adventure.id, cookieCart)}
          >
            {adventureIsAdded ? 'Remove from cart' : 'Add to cart'}
          </button>
          <div>
            {currentAdventure && (
              <div data-test-id="product-quantity" css={buttonsWrapperStyle}>
                <button
                  css={buttonMinusStyle}
                  onClick={() => {
                    quantityHandler(cookieCart, false);
                  }}
                >
                  -{' '}
                </button>
                <span css={currentQuantityStyle}>
                  {currentAdventure.quantity}
                </span>
                <button
                  css={buttonPlusStyle}
                  onClick={() => quantityHandler(cookieCart, true)}
                >
                  +{' '}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const adventureId = context.query.adventureId;

  console.log('adventureId', adventureId);
  console.log('typeOf adventureId', typeof adventureId);

  // const matchingAdventure = adventuresDatabase.find((adventure) => {
  //   return adventure.id === adventureId;
  // });

  const cartOnCookies = context.req.cookies.cart || '[]';
  const cart = JSON.parse(cartOnCookies);

  // if (typeof adventureId === 'number') {
  //   const adventure = await getAdventureById(adventureId);
  // } else {
  //   const adventure = undefined;
  // }

  let adventure;
  typeof adventureId === 'string'
    ? (adventure = await getAdventureById(parseInt(adventureId)))
    : (adventure = undefined);

  return {
    props: {
      // adventure: matchingAdventure,
      cart,
      adventure,
    },
  };
}
