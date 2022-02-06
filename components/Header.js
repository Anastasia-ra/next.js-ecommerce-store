import Link from 'next/link';
import Image from 'next/image';
import { css } from '@emotion/react';

const headerStyle = css`
  display: flex;
  align-content: center;
  justify-content: center;
  background-color: #6497bb;
`;

export default function Header() {
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
        <a>Shopping Cart</a>
      </Link>
    </header>
  );
}
