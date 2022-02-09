import Link from 'next/link';
import Image from 'next/image';
import { css } from '@emotion/react';
import { getParsedCookie } from '../util/cookies.js';

const headerStyle = css`
  display: flex;
  align-content: center;
  justify-content: center;
  background-color: #6497bb;
`;

export default function Header() {
  const cookieValue = getParsedCookie('cart') || [];
  console.log('CookieValue', cookieValue);
  const totalQuantity = cookieValue.reduce((previousValue, currentValue) => {
    return previousValue + currentValue.items;
  }, 0);
  console.log('totalQuantity', totalQuantity);
  return (
    <header css={headerStyle}>
      <Image src="/logo.png" width="150" height="56" />
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/adventures">
        <a>Adventures</a>
      </Link>
      <Link href="/shoppingcart">
        <a>Shopping Cart ({totalQuantity})</a>
      </Link>
    </header>
  );
}

export function getServerSideProps(context) {
  const cartOnCookies = context.req.cookies.cart || '[]';
  const cart = JSON.parse(cartOnCookies);

  return {
    props: {
      cart,
    },
  };
}
