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

const headingStyle = css`
  font-family: 'Candara', 'Arial';
  width: 50vw;
  margin: 3vh auto;
  text-align: center;
`;

const flexStyle = css`
  display: flex;
  margin-right: auto;
  margin-left: auto;
  height: 60vh;
  width: 70vw;
  justify-content: space-around;
  font-family: 'Candara', 'Arial';
  /* grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr; */
`;

const textStyle = css`
  /* grid-column: 2 / 3;
  grid-row: 1 / 2; */
  overflow-wrap: break-word;
  margin-bottom: 10vh;
`;

const priceStyle = css`
  font-weight: bolder;
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

const buttonFlexStyle = css`
  /* grid-column: 2 / 3;
  grid-row: 2 / 3; */
  justify-self: start;
  align-self: center;
  display: flex;
  align-items: center;
  font-family: 'Candara', 'Arial';
`;

const imageStyle = css`
  /* margin-top: 1rem; */
  /* grid-column: 1 / 2;
  grid-row: 1 / 3; */
`;

const descriptionStyle = css`
  display: flex;
  flex-direction: column;
  width: 30vw;
`;

const backLinkStyle = css`
  // display: block;
  margin-bottom: 1rem;
  font-family: 'Candara', 'Arial';
  margin-left: 3vw;
`;

const buttonsWrapperStyle = css`
  border: grey;
  border-style: solid;
  border-width: thin;
  display: inline-block;
  margin: 10px;
  height: 30px;
  border-radius: 15%;
  font-family: 'Candara', 'Arial';
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
      <h1 css={headingStyle}>{`${props.adventure.name}`}</h1>
      <div css={backLinkStyle}>
        <Link href="/adventures">
          <a>← Back to all adventures</a>
        </Link>
      </div>
      <div css={flexStyle}>
        <div css={imageStyle}>
          <Image
            data-test-id="product-image"
            src={`/adventures-img/${props.adventure.id}.jpg`}
            width="380"
            height="380"
            css={imageStyle}
          />{' '}
        </div>
        <div css={descriptionStyle}>
          <div css={textStyle}>
            <div data-test-id="product-price">
              {' '}
              {props.adventure.description}
              <br />
              <br />
              All inclusive package for only{' '}
              <span css={priceStyle}>{props.adventure.price}€</span>
              {}
            </div>
          </div>
          <div css={buttonFlexStyle}>
            <button
              css={buttonCartStyle}
              data-test-id="product-add-to-cart"
              // adventureIsAdded ? data-test-id="product-add-to-cart" : data-test-id="product-remove-from-cart"
              onClick={() =>
                toggleAdventureCart(props.adventure.id, cookieCart)
              }
            >
              {adventureIsAdded ? 'Remove from cart' : 'Add to cart'}
            </button>
            <div>
              {currentAdventure && (
                <div data-test-id="product-quantity" css={buttonsWrapperStyle}>
                  <button
                    css={buttonMinusStyle}
                    data-test-id="increase-quantity"
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
                    data-test-id="decrease-quantity"
                    onClick={() => quantityHandler(cookieCart, true)}
                  >
                    +{' '}
                  </button>
                </div>
              )}
            </div>
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
