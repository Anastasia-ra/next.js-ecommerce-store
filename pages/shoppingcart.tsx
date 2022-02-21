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
import updateCount from '../util/quantityHandler.js';
import getTotalPrice from '../util/calculateCartSum.js';

const layoutStyle = css`
  /* background-image: url(/stacked-peaks-haikei.png); */
`;

const cartContentStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Candara', 'Arial';
`;

const cartItemStyle = css`
  th {
    padding: 0 20px;
  }
  margin: 0.5rem;
`;

const tableStyle = css`
  tr:nth-child(even) {
    /* background-color: #faf9f5; */
  }
`;

const tableHeading = css`
  /* margin: 10px 0; */
  height: 50px;
`;

const orderSection = css`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
`;

const changeQuantityButton = css`
  margin: 5px;
  border: none;
  font-size: 1em;
  border-radius: 10%;
  cursor: pointer;
  width: 20px;
`;

const itemQuantity = css`
  padding: 0 10px;
`;

const removeButton = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #f38f8f;
  border: none;
  transition: background-color 0.3s ease-in 0s;
  color: rgb(255, 255, 255);
  font-weight: 600;
  text-align: center;
  vertical-align: middle;
  border-radius: 50%;
  cursor: pointer;
  padding: 4px 6px;
  // width: auto;
  height: 20px;
  font-size: 1rem;
  letter-spacing: 0.018rem;
  line-height: 1.269rem;
  // opacity: 0.2;
  margin-left: 10px;
  margin-top: auto;
  margin-bottom: auto;
  :hover {
    background-color: rgb(225, 121, 121);
  }
`;

const removeButtonCell = css`
  background: none;
`;

const orderButton = css`
  height: 30px;
  width: 150px;
  margin: 0 100px;
  border-style: solid;
  border-width: thin;
  /* border-radius: 5%; */
  background: none;
  cursor: pointer;
  :hover {
    background: #f1f1f1;
  }
`;

const totalPriceText = css`
  margin: 0 100px;
`;

const image = css`
  border-radius: 10%;
`;

type Props = {
  adventures: Adventure[];
  cart: Cart;
};

export default function ShoppingCart(props: Props) {
  const [cartList, setCartList] = useState(props.cart);

  const cookieCart: string = 'cart';

  const cookieValue = getParsedCookie(cookieCart) || [];
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
  setParsedCookie(cookieCart, newCookie);

  function getPrice(id: number) {
    for (const adventure of props.adventures) {
      if (id === adventure.id) {
        return adventure.price;
      }
    }
  }
  // Remove Adventure
  function removeAdventureCart(id: number) {
    const cartValue = getParsedCookie(cookieCart) || [];

    const updatedCookie = cartValue.filter(
      (cookieObject: CartItem) => cookieObject.id !== id,
    );

    setParsedCookie(cookieCart, updatedCookie);
    setCartList(updatedCookie);
  }

  // Change quantity in cart

  function quantityHandler(cookieKey: string, id: number, increment: boolean) {
    const updatedCookie = updateCount(cookieKey, id, increment);
    setCartList(updatedCookie);
  }

  // Checks if cart is empty
  const isCardEmpty: boolean = newCookie.length === 0;
  console.log('isCardEmpty', isCardEmpty);

  return (
    <div css={layoutStyle}>
      <Layout>
        <Head>
          <title>Shopping Cart</title>
        </Head>
        <div css={cartContentStyle}>
          <h1>Your next adventures </h1>

          <table>
            <tbody css={tableStyle}>
              <tr>
                <th css={tableHeading}> </th>
                <th css={tableHeading}>Adventure</th>
                <th css={tableHeading}>Price</th>
                <th css={tableHeading}>Quantity</th>
                <th css={tableHeading}>Total Price</th>
                <th css={tableHeading}> </th>
              </tr>
              {newCookie.map((singleItem: CartItem) => {
                const itemPrice = getPrice(singleItem.id);
                let totalItemPrice;
                itemPrice
                  ? (totalItemPrice = itemPrice * singleItem.quantity)
                  : (totalItemPrice = 0);
                return (
                  <tr
                    css={cartItemStyle}
                    key={singleItem.id}
                    data-test-id="cart-product-<product id>"
                  >
                    <th>
                      <Image
                        css={image}
                        src={`/adventures-img/${singleItem.id}.jpg`}
                        width="100"
                        height="100"
                      />
                    </th>
                    <th>{singleItem.name}</th>
                    <th> {itemPrice}</th>
                    <th>
                      {' '}
                      <button
                        css={changeQuantityButton}
                        onClick={() =>
                          quantityHandler(cookieCart, singleItem.id, false)
                        }
                      >
                        -{' '}
                      </button>
                      <span css={itemQuantity}>{singleItem.quantity}</span>
                      <button
                        css={changeQuantityButton}
                        onClick={() =>
                          quantityHandler(cookieCart, singleItem.id, true)
                        }
                      >
                        +{' '}
                      </button>
                    </th>
                    <th> {totalItemPrice} </th>
                    <th css={removeButtonCell}>
                      <button
                        css={removeButton}
                        data-test-id="cart-product-remove-<product id>"
                        onClick={() => removeAdventureCart(singleItem.id)}
                      >
                        {' '}
                        ×
                      </button>
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div css={orderSection}>
            <div css={totalPriceText} data-test-id="cart-total">
              Total Price: {getTotalPrice(newCookie, props.adventures)}
            </div>

            <Link href="checkout">
              <a>
                <button
                  css={orderButton}
                  data-test-id="cart-checkout"
                  disabled={isCardEmpty}
                >
                  Order your adventures
                </button>
              </a>
            </Link>
          </div>
        </div>
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
