import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import Layout from '../../components/Layout';
import Link from 'next/link';
// import adventuresDatabase from '../../util/database';
import { getParsedCookie, setParsedCookie } from '../../util/cookies.js';
import { getAdventureById } from '../../util/database';

export default function SingleAdventure(props) {
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
      newCookie = [...cookieValue, { id: id, quantity: 1 }];
    }
    console.log(newCookie);
    setCartList(newCookie);
    setParsedCookie('cart', newCookie);
  }
  // Check if adventure already in cart
  const adventureIsAdded = cartList.some((addedObject) => {
    return addedObject.id === props.adventure.id;
  });

  const currentAdventureObject = cartList.find(
    (cookieObject) => cookieObject.id === props.adventure.id,
  );

  console.log('currentAdventureObject', currentAdventureObject);

  function quantityCountUp() {
    const cookieValue = getParsedCookie('cart') || [];
    const newCookie = cookieValue.map((cookieObject) => {
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
    const newCookie = cookieValue.map((cookieObject) => {
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
      <h1>{`${props.adventure.duration} days ${props.adventure.name}`}</h1>
      <Link href="/adventures">
        <a>Back to all adventures</a>
      </Link>
      <Image
        src={`/adventures/resized-singlePage/${props.adventure.id}.jpg`}
        width="500"
        height="333"
      />
      <div data-test-id="product-price"> Price: {props.adventure.price}</div>
      <button onClick={() => toggleAdventureCart(props.adventure.id)}>
        {adventureIsAdded ? 'Remove from cart' : 'Add to cart'}
      </button>
      {currentAdventureObject && (
        <div>
          <button onClick={() => quantityCountUp()}>+ </button>
          {currentAdventureObject.quantity}
          <button onClick={() => quantityCountDown()}>- </button>
        </div>
      )}
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const adventureId = context.query.adventureId;

  // const matchingAdventure = adventuresDatabase.find((adventure) => {
  //   return adventure.id === adventureId;
  // });

  const cartOnCookies = context.req.cookies.cart || '[]';
  const cart = JSON.parse(cartOnCookies);

  const adventure = await getAdventureById(adventureId);

  return {
    props: {
      // adventure: matchingAdventure,
      cart,
      adventure,
    },
  };
}
