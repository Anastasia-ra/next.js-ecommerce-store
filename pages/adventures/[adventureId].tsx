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
  getParsedCookie,
  setParsedCookie,
} from '../../util/cookies';
import { Adventure, getAdventureById } from '../../util/database';
import { GetServerSidePropsContext } from 'next';
// import ChangeQuantity from '../../components/ChangeQuantity';

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
`;

const buttonStyle = css`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  justify-self: start;
  align-self: center;
`;

const imageStyle = css`
  margin-top: 1rem;
  grid-column: 1 / 2;
  grid-row: 1 / 3;
`;

const backLinkStyle = css`
  // display: block;
`;

const buttonQuantityStyle = css`
  border: grey;
  border-style: solid;
  display: inline-block;
  margin: 10px;
`;

const buttonPlusStyle = css``;

const buttonMinusStyle = css``;

type Props = {
  adventure: Adventure;
  cart: Cart;
};

export default function SingleAdventure(props: Props) {
  const [cartList, setCartList] = useState(props.cart);

  function toggleAdventureCart(id: number) {
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
  // Check if adventure already in cart
  const adventureIsAdded = cartList.some((addedObject: CartItem) => {
    return addedObject.id === props.adventure.id;
  });

  const currentAdventure = cartList.find(
    (cookieObject: CartItem) => cookieObject.id === props.adventure.id,
  );

  console.log('currentAdventureObject', currentAdventure);

  function quantityCountUp() {
    const cookieValue = getParsedCookie('cart') || [];
    const newCookie = cookieValue.map((cookieObject: CartItem) => {
      if (cookieObject.id === props.adventure.id) {
        return { ...cookieObject, quantity: cookieObject.quantity + 1 };
      } else {
        return cookieObject;
      }
    });
    console.log(newCookie);
    setCartList(newCookie);
    setParsedCookie('cart', newCookie);
  }

  function quantityCountDown() {
    const cookieValue = getParsedCookie('cart') || [];
    const newCookie = cookieValue.map((cookieObject: CartItem) => {
      if (cookieObject.id === props.adventure.id) {
        if (cookieObject.quantity === 1) {
          return cookieObject;
        }
        return { ...cookieObject, quantity: cookieObject.quantity - 1 };
      } else {
        return cookieObject;
      }
    });
    console.log(newCookie);
    setCartList(newCookie);
    setParsedCookie('cart', newCookie);
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
        <div css={buttonStyle}>
          <button
            css={buttonCartStyle}
            data-test-id="product-add-to-cart"
            onClick={() => toggleAdventureCart(props.adventure.id)}
          >
            {adventureIsAdded ? 'Remove from cart' : 'Add to cart'}
          </button>
          <div css={buttonQuantityStyle}>
            {currentAdventure && (
              <div data-test-id="product-quantity">
                <button css={buttonPlusStyle} onClick={() => quantityCountUp()}>
                  +{' '}
                </button>
                {currentAdventure.quantity}
                <button
                  css={buttonMinusStyle}
                  onClick={() => quantityCountDown()}
                >
                  -{' '}
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
