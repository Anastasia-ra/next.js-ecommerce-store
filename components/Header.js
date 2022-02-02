import Link from 'next/link';

export default function Header() {
  return (
    <header>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/products">
        <a>Products</a>
      </Link>
      <Link href="/shoppingcart">
        <a>Shopping Cart</a>
      </Link>
    </header>
  );
}
