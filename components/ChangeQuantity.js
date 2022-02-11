import { useState } from 'react';
import { getParsedCookie, setParsedCookie } from '../util/cookies.js';

export default function ChangeQuantity(props) {
  const [cartList, setCartList] = useState(props.cart);
  console.log(props.cart);
  function quantityCountUp() {
    const cookieValue = getParsedCookie('cart') || [];
    const newCookie = cookieValue.map((cookieObject) => {
      if (cookieObject.id === props.adventure.id) {
        return { ...cookieObject, quantity: cookieObject.quantity + 1 };
      } else {
        return cookieObject;
      }
    });
    setCartList(newCookie);
    setParsedCookie('cart', newCookie);
  }

  function quantityCountDown() {
    const cookieValue = getParsedCookie('cart') || [];
    const newCookie = cookieValue.map((cookieObject) => {
      if (cookieObject.id === props.adventure.id) {
        if (cookieObject.quantity === 1) {
          return cookieObject;
        }
        return { ...cookieObject, quantity: cookieObject.quantity - 1 };
      } else {
        return cookieObject;
      }
    });
    setCartList(newCookie);
    setParsedCookie('cart', newCookie);
  }
  const currentAdventure = cartList.find(
    (cookieObject) => cookieObject.id === props.id,
  );

  return (
    <div data-test-id="product-quantity">
      <button onClick={() => quantityCountUp()}>+ </button>
      {currentAdventure.quantity}
      <button onClick={() => quantityCountDown()}>- </button>
    </div>
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
