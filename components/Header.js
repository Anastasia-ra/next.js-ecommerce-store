import Link from 'next/link';
import Image from 'next/image';
import { css } from '@emotion/react';
import { getParsedCookie } from '../util/cookies.js';

const headerStyle = css`
  color: white;
  display: flex;
  justify-content: space-between;
  font-family: 'Candara', 'Arial';
  background-color: rgba(88, 125, 184, 0.3);
  /* opacity: 0.1; */
`;

const linksStyle = css`
  display: flex;
  align-content: stretch;
  justify-content: flex-end;
  cursor: pointer;
  a {
    margin-right: 20px;
    margin-top: auto;
    margin-bottom: auto;
    font-weight: bold;
    font-size: 1.2rem;
  }
  a:hover {
    /* font-size: 2rem;
    transition: 0.3s; */
  }
`;

const linkStyle = css`
  margin-right: 20px;
  margin-top: 20px;
`;

const logoStyle = css`
  display: flex;
  /* width: auto; */
  width: 180px;
  cursor: pointer;
`;

const textStyle = css`
  line-height: 30%;
  margin-left: 0.5rem;
  font-weight: bold;
  cursor: pointer;
`;

const imageStyle = css`
  max-width: 100%;
  height: auto;
`;

export default function Header() {
  const cookieValue = getParsedCookie('cart') || [];
  console.log('CookieValue', cookieValue);
  const totalQuantity = cookieValue.reduce((previousValue, currentValue) => {
    return previousValue + currentValue.quantity;
  }, 0);
  console.log('totalQuantity', totalQuantity);
  return (
    <header css={headerStyle}>
      <Link href="/">
        <a css={logoStyle}>
          <div>
            <Image
              src="/LogoMakr-8syYNt.png"
              width="50px"
              height="50px"
              css={imageStyle}
            />
          </div>
          <span css={textStyle}>
            <p>Unique</p>
            <p>Adventures</p>
          </span>
        </a>
      </Link>
      <div css={linksStyle} data-test-id="cart-link">
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/adventures">
          <a>Adventures</a>
        </Link>
        <Link href="/shoppingcart">
          <a data-test-id="cart-count">
            Shopping Cart ({isNaN(totalQuantity) ? '0' : totalQuantity})
          </a>
        </Link>
      </div>
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
