import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header>
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
