import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { css } from '@emotion/react';
import { useState } from 'react';
import Layout from '../components/Layout';
import { Cart } from '../util/cookies';
import { Adventure, getAdventures } from '../util/database';
import { GetServerSidePropsContext } from 'next';
import toggleCart from '../util/toggleCart';

const headerStyle = css`
  font-family: 'Candara', 'Arial';
`;

const textDescription = css`
  width: 80vw;
  margin: 0 auto;
`;

const flexStyle = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  font-family: 'Candara', 'Arial';
  margin: 5vh 10vw;
`;

const singleAdventureStyle = css`
  margin: 0.5rem 0.3rem;
  cursor: pointer;
`;

const imageTextStyle = css`
  display: flex;
  flex-direction: column;
`;

const imageStyle = css`
  margin-bottom: 1.5rem;
  border-radius: 2%;
`;

const adventureNameStyle = css`
  margin: 0.5rem auto;
`;

const adventureButtonStyle = css`
  margin: 0.5rem auto;
  border-radius: 7%;
  background: rgba(52 48 46 / 0.55);
  border: none;
  padding: 5px 8px;
  cursor: pointer;
  font-family: 'Candara', 'Arial';
  color: white;
  font-weight: bolder;
  font-size: 0.9rem;
`;

type Props = {
  adventures: Adventure[];
  cart: Cart;
};

export default function Adventures(props: Props) {
  const [cartList, setCartList] = useState(props.cart);

  const cookieCart: string = 'cart';

  function toggleAdventureCart(id: number, cookieKey: string) {
    const newCookie = toggleCart(id, cookieKey);
    setCartList(newCookie);
  }

  return (
    <div>
      <Layout>
        <Head>
          <title>Adventures</title>
        </Head>
        <div css={textDescription}>
          <h1 css={headerStyle}>Choose your adventure</h1>
          <p>
            With more than 400 years of worldwide experience, Unique Adventures
            is the most respected of adventure tour operators. Our range of
            trekking, climbing, discovery, polar cruises and other adventures
            spans the continents, the moon and the oceans, with more than 5
            adventures to choose from. With an amazing variety of guided and
            self-guided adventures on offer; from easy hiking trips on the Moon
            to 3-week Himalayan treks, Antarctic expeditions and ocean tours.
            Whatever your interests or aspirations, we’re sure to have an
            adventure to suit you - the hardest part will be choosing one!
          </p>
        </div>

        <div css={flexStyle}>
          {props.adventures.map((adventure) => {
            const adventureIsAdded = cartList.some((addedObject) => {
              return addedObject.id === adventure.id;
            });

            return (
              <div css={singleAdventureStyle} key={`adventure-${adventure.id}`}>
                <Link href={`/adventures/${adventure.id}`}>
                  <a
                    css={imageTextStyle}
                    data-test-id={`product-${adventure.id}`}
                  >
                    {' '}
                    <Image
                      css={imageStyle}
                      src={`/adventures-img/${adventure.id}.jpg`}
                      width="280"
                      height="280"
                    />
                    <span css={adventureNameStyle}> {adventure.name} </span>
                  </a>
                </Link>
                <button
                  css={adventureButtonStyle}
                  onClick={() => toggleAdventureCart(adventure.id, cookieCart)}
                >
                  {adventureIsAdded ? 'Remove' : 'Add to cart ✈'}
                </button>
              </div>
            );
          })}
        </div>
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const cartOnCookies = context.req.cookies.cart || '[]';
  const cart = JSON.parse(cartOnCookies);

  const adventures = await getAdventures();
  console.log('adventures', adventures);

  console.log('cart', cart);
  console.log('cartoncookies', cartOnCookies);

  return {
    props: {
      cart,
      adventures,
    },
  };
}
