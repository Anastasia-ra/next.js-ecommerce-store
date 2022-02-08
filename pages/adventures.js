import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Layout from '../components/Layout';
import { getParsedCookie, setParsedCookie } from '../util/cookies';
import adventuresDatabase from '../util/database';

export default function Adventures(props) {
  const [cartList, setCartList] = useState(props.cart);

  function toggleAdventureCart(id) {
    const cookieValue = getParsedCookie('cart') || [];
    const existIdOnArray = cookieValue.some((cookieObject) => {
      return cookieObject.id === id;
    });

    let newCookie;
    if (existIdOnArray) {
      newCookie = cookieValue.filter((cookieObject) => cookieObject.id !== id);
    } else {
      newCookie = [...cookieValue, { id: id, items: 1 }];
    }
    console.log(newCookie);
    setCartList(newCookie);
    setParsedCookie('cart', newCookie);
  }

  return (
    <Layout>
      <Head>
        <title>Adventures</title>
      </Head>
      <h1>Choose your adventure</h1>

      {props.adventures.map((adventure) => {
        const adventureIsAdded = cartList.some((addedObject) => {
          return addedObject.id === adventure.id;
        });
        return (
          <div key={`adventure-${adventure.id}`}>
            <Link href={`/adventures/${adventure.id}`}>
              <a>
                {' '}
                <Image
                  src={`/adventures/resized-mainPage/${adventure.id}.jpg`}
                  width="300"
                  height="200"
                />
                {adventure.name}
              </a>
            </Link>
            <button onClick={() => toggleAdventureCart(adventure.id)}>
              {adventureIsAdded ? 'Remove from cart' : 'Add to cart'}
            </button>
          </div>
        );
      })}
    </Layout>
  );
}

export function getServerSideProps(context) {
  const cartOnCookies = context.req.cookies.cart || '[]';
  const cart = JSON.parse(cartOnCookies);

  console.log(cart);
  return {
    props: {
      adventures: adventuresDatabase,
      cart,
    },
  };
}
