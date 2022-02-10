import Head from 'next/head';
import Layout from '../components/Layout';
import { css } from '@emotion/react';
import { getParsedCookie, setParsedCookie } from '../util/cookies.js';
// import adventuresDatabase from '../util/database';
import { getAdventures } from '../util/database';

const cartContentStyle = css``;

const cartItemStyle = css`
  margin: 0.5rem;
`;

export default function ShoppingCart(props) {
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

  console.log('totalPrice', totalPrice);

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
              <tr css={cartItemStyle} key={singleItem.id}>
                <th>{singleItem.name}</th>
                <th> {singleItem.price}</th>
                <th> {singleItem.quantity}</th>
                <th> {totalItemPrice} </th>
              </tr>
            );
          })}
        </table>
      </div>
      <div>Total Price: {totalPrice}</div>
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
