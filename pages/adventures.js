import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { css } from '@emotion/react';
import { useState } from 'react';
import Layout from '../components/Layout';
import { getParsedCookie, setParsedCookie } from '../util/cookies';
// import adventuresDatabase from '../util/database';
import { getAdventures } from '../util/database';

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
`;

export default function Adventures(props) {
  const [cartList, setCartList] = useState(props.cart);

  // console.log('props.adventures', props.adventures);

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

  return (
    <Layout>
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
                <a css={imageTextStyle}>
                  {' '}
                  <Image
                    css={imageStyle}
                    src={`/adventures/resized-mainPage/${adventure.id}.jpg`}
                    width="300"
                    height="200"
                  />
                  <span css={adventureNameStyle}> {adventure.name} </span>
                </a>
              </Link>
              <button
                css={adventureButtonStyle}
                onClick={() => toggleAdventureCart(adventure.id)}
              >
                {adventureIsAdded
                  ? 'Remove this adventure'
                  : 'Add this adventure ✈'}
              </button>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const cartOnCookies = context.req.cookies.cart || '[]';
  const cart = JSON.parse(cartOnCookies);

  const adventures = await getAdventures();
  console.log('adventures', adventures);

  console.log('cart', cart);
  console.log('cartoncookies', cartOnCookies);
  // console.log('typeOf id', typeof adventures[0].id);

  // const toString = adventures.map((adventure) => {
  //   return {
  //     id: adventure.id.toString(),
  //     name: adventure.name,
  //     type: adventure.type,
  //     duration: adventure.duration,
  //     price: adventure.price,
  //     description: adventure.description,
  //   };
  // });

  // console.log('toString', toString);
  // console.log('typeOf to string', typeof toString[0].id);

  return {
    props: {
      // adventures: adventuresDatabase,
      cart,
      adventures,
    },
  };
}
