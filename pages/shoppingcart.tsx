import Head from 'next/head';
import Layout from '../components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { css } from '@emotion/react';
import {
  Cart,
  CartItem,
  getParsedCookie,
  setParsedCookie,
} from '../util/cookies';
// import adventuresDatabase from '../util/database';
import { Adventure, getAdventures } from '../util/database';
import { GetServerSidePropsContext } from 'next';

const layoutStyle = css`
  background-image: url(/stacked-peaks-haikei.png);
`;

const cartContentStyle = css``;

const cartItemStyle = css`
  margin: 0.5rem;
`;

type Props = {
  adventures: Adventure[];
  cart: Cart;
};

export default function ShoppingCart(props: Props) {
  const [cartList, setCartList] = useState(props.cart);

  const cookieValue = getParsedCookie('cart') || [];
  const newCookie = cookieValue.map((cookieObject: CartItem) => {
    function getName() {
      for (const singleAdventure of props.adventures) {
        if (singleAdventure.id === cookieObject.id) {
          return {
            ...cookieObject,
            name: singleAdventure.name,
          };
        }
      }
    }
    return getName();
  });
  setParsedCookie('cart', newCookie);

  function getPrice(id: number) {
    for (const adventure of props.adventures) {
      if (id === adventure.id) {
        return adventure.price;
      }
      //  else {
      //   return 0;
      // }
    }
  }

  function getTotalPrice(cookie: Cart) {
    const priceList = cookie.map((singleItem) => {
      const singleItemPrice = getPrice(singleItem.id);
      if (singleItemPrice) {
        return singleItemPrice * singleItem.quantity;
      } else {
        return 0;
      }
    });
    return priceList.reduce((previous, current) => previous + current, 0);
  }

  // Remove Adventure
  function removeAdventureCart(id: number) {
    const cartValue = getParsedCookie('cart') || [];

    const updatedCookie = cartValue.filter(
      (cookieObject: CartItem) => cookieObject.id !== id,
    );

    setParsedCookie('cart', updatedCookie);
    setCartList(updatedCookie);
  }

  // Change quantity in cart

  function quantityCountUp(id: number) {
    const cartValue = getParsedCookie('cart') || [];
    const updatedCookie = cartValue.map((cookieObject: CartItem) => {
      if (cookieObject.id === id) {
        return { ...cookieObject, quantity: cookieObject.quantity + 1 };
      } else {
        return cookieObject;
      }
    });
    setCartList(updatedCookie);
    setParsedCookie('cart', updatedCookie);
  }

  function quantityCountDown(id: number) {
    const cartValue = getParsedCookie('cart') || [];
    const updatedCookie = cartValue.map((cookieObject: CartItem) => {
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
    <div css={layoutStyle}>
      <Layout>
        <Head>
          <title>Shopping Cart</title>
        </Head>
        <h1>Your next adventures </h1>
        <div css={cartContentStyle}>
          <table>
            <tr>
              <th> </th>
              <th>Adventure</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total Price</th>
            </tr>
            {newCookie.map((singleItem: CartItem) => {
              const itemPrice = getPrice(singleItem.id);
              console.log('price', itemPrice);
              let totalItemPrice;
              itemPrice
                ? (totalItemPrice = itemPrice * singleItem.quantity)
                : (totalItemPrice = 0);
              console.log('total price', totalItemPrice);
              console.log('typeof', typeof totalItemPrice);
              return (
                <tr
                  css={cartItemStyle}
                  key={singleItem.id}
                  data-test-id="cart-product-<product id>"
                >
                  <th>
                    <Image
                      src={`/adventures-img/${singleItem.id}.jpg`}
                      width="80"
                      height="80"
                    />
                  </th>
                  <th>{singleItem.name}</th>
                  <th> {itemPrice}</th>
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
        <div data-test-id="cart-total">
          Total Price: {getTotalPrice(newCookie)}
        </div>
        <Link href="checkout">
          <a>
            <button data-test-id="cart-checkout">Buy</button>
          </a>
        </Link>
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
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
