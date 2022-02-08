import Head from 'next/head';
import Layout from '../components/Layout';
import { getParsedCookie, setParsedCookie } from '../util/cookies.js';
import adventuresDatabase from '../util/database';

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
    return previousValue + currentValue.price * currentValue.items;
  }, 0);

  console.log('totalPrice', totalPrice);

  return (
    <Layout>
      <Head>
        <title>Shopping Cart</title>
      </Head>
      <h1>Your next adventures </h1>
      {newCookie.map((singleItem) => {
        const totalItemPrice = singleItem.price * singleItem.items;
        return (
          <div key={singleItem.id}>
            {' '}
            id: {singleItem.id} name:{singleItem.name} price: {singleItem.price}{' '}
            Quantity: {singleItem.items} total price item: {totalItemPrice}
          </div>
        );
      })}
      <div>Total Price: {totalPrice}</div>
    </Layout>
  );
}

export function getServerSideProps(context) {
  const cartOnCookies = context.req.cookies.cart || '[]';
  const cart = JSON.parse(cartOnCookies);

  return {
    props: {
      adventures: adventuresDatabase,
      addedAdventures: cart,
    },
  };
}
