import Head from 'next/head';
import Layout from '../components/Layout';
import Link from 'next/link';
import { useState } from 'react';
import { css } from '@emotion/react';
import { getParsedCookie, setParsedCookie } from '../util/cookies.js';
// import adventuresDatabase from '../util/database';
import { getAdventures } from '../util/database';

const cartContentStyle = css``;

const cartItemStyle = css`
  margin: 0.5rem;
`;

export default function ShoppingCart(props) {
  const [cartList, setCartList] = useState(props.cart);

  const cookieValue = getParsedCookie('cart') || [];
  const newCookie = cookieValue.map((cookieObject) => {
    function findName() {
      for (const singleAdventure of props.adventures) {
        if (singleAdventure.id === cookieObject.id) {
          return {
            ...cookieObject,
            name: singleAdventure.name,
            price: singleAdventure.price,
          };
        }
      }
    }
    return findName();
  });
  setParsedCookie('cart', newCookie);

  const totalPrice = newCookie.reduce((previousValue, currentValue) => {
    return previousValue + currentValue.price * currentValue.quantity;
  }, 0);

  // Remove Adventure
  function removeAdventureCart(id) {
    const cartValue = getParsedCookie('cart') || [];

    const updatedCookie = cartValue.filter(
      (cookieObject) => cookieObject.id !== id,
    );

    setParsedCookie('cart', updatedCookie);
    setCartList(updatedCookie);
  }

  // Change quantity in cart

  function quantityCountUp(id) {
    const cartValue = getParsedCookie('cart') || [];
    const updatedCookie = cartValue.map((cookieObject) => {
      if (cookieObject.id === id) {
        return { ...cookieObject, quantity: cookieObject.quantity + 1 };
      } else {
        return cookieObject;
      }
    });
    setCartList(updatedCookie);
    setParsedCookie('cart', updatedCookie);
  }

  function quantityCountDown(id) {
    const cartValue = getParsedCookie('cart') || [];
    const updatedCookie = cartValue.map((cookieObject) => {
      if (cookieObject.id === id) {
        if (cookieObject.quantity === 1) {
          return cookieObject;
        }
        return { ...cookieObject, quantity: cookieObject.quantity - 1 };
      } else {
        return cookieObject;
      }
    });
    setCartList(updatedCookie);
    setParsedCookie('cart', updatedCookie);
  }

  return (
    <Layout>
      <Head>
        <title>Shopping Cart</title>
      </Head>
      <h1>Your next adventures </h1>
      <div css={cartContentStyle}>
        <table>
          <tr>
            <th>Adventure</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total Price</th>
          </tr>
          {newCookie.map((singleItem) => {
            const totalItemPrice = singleItem.price * singleItem.quantity;
            return (
              <tr
                css={cartItemStyle}
                key={singleItem.id}
                data-test-id="cart-product-<product id>"
              >
                <th>{singleItem.name}</th>
                <th> {singleItem.price}</th>
                <th>
                  {' '}
                  <button onClick={() => quantityCountUp(singleItem.id)}>
                    +{' '}
                  </button>
                  {singleItem.quantity}
                  <button onClick={() => quantityCountDown(singleItem.id)}>
                    -{' '}
                  </button>
                </th>
                <th> {totalItemPrice} </th>
                <button
                  data-test-id="cart-product-remove-<product id>"
                  onClick={() => removeAdventureCart(singleItem.id)}
                >
                  {' '}
                  Remove from cart{' '}
                </button>
              </tr>
            );
          })}
        </table>
      </div>
      <div data-test-id="cart-total">Total Price: {totalPrice}</div>
      <Link href="checkout">
        <a>
          <button data-test-id="cart-checkout">Buy</button>
        </a>
      </Link>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const cartOnCookies = context.req.cookies.cart || '[]';
  const cart = JSON.parse(cartOnCookies);

  const adventures = await getAdventures();

  return {
    props: {
      // adventures: adventuresDatabase,
      addedAdventures: cart,
      adventures: adventures,
    },
  };
}
