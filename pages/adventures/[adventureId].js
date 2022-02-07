import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import Layout from '../../components/Layout';
import adventuresDatabase from '../../util/database';
import { getParsedCookie, setParsedCookie } from '../../util/cookies.js';

export default function SingleAdventure(props) {
  const [cartList, setCartList] = useState(props.addedAdventures);

  function toggleAdventureCart(id) {
    const cookieValue = getParsedCookie('addedAdventures') || [];
    const existIdOnArray = cookieValue.some((cookieObject) => {
      return cookieObject.id === id;
    });

    let newCookie;
    if (existIdOnArray) {
      newCookie = cookieValue.filter((cookieObject) => cookieObject.id !== id);
    } else {
      newCookie = [...cookieValue, { id: id }];
    }

    setCartList(newCookie);
    setParsedCookie('addedAdventures', newCookie);
  }

  const adventureIsAdded = cartList.some((addedObject) => {
    return addedObject.id === props.adventure.id;
  });

  return (
    <Layout>
      <Head>
        <title>{`${props.adventure.name} - ${props.adventure.duration} days`}</title>
      </Head>
      <h1>{`${props.adventure.duration} days ${props.adventure.name}`}</h1>
      <Image
        src={`/adventures/resized-singlePage/${props.adventure.id}.jpg`}
        width="500"
        height="333"
      />
      <div data-test-id="product-price"> Price: {props.adventure.price}</div>
      <button onClick={() => toggleAdventureCart(props.adventure.id)}>
        {adventureIsAdded ? 'Remove from cart' : 'Add to cart'}
      </button>
    </Layout>
  );
}

export function getServerSideProps(context) {
  const adventureId = context.query.adventureId;

  const matchingAdventure = adventuresDatabase.find((adventure) => {
    return adventure.id === adventureId;
  });

  const addedAdventuresOnCookies = context.req.cookies.addedAdventures || '[]';
  const addedAdventures = JSON.parse(addedAdventuresOnCookies);

  return {
    props: {
      adventure: matchingAdventure,
      addedAdventures: addedAdventures,
    },
  };
}
