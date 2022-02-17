import { getParsedCookie, setParsedCookie } from './cookies.ts';

export default function updateCount(cookie, id, increment) {
  const cookieValue = getParsedCookie(cookie) || [];
  const newCookie = cookieValue.map((cookieObject) => {
    if (cookieObject.id === id) {
      // Case: quantity incrementation
      if (increment) {
        return { ...cookieObject, quantity: cookieObject.quantity + 1 };
      }
      // Case: quantity decrementation but quantity = 1
      else if (cookieObject.quantity === 1) {
        return cookieObject;
      }
      // Case: quantity decrementation
      else {
        return { ...cookieObject, quantity: cookieObject.quantity - 1 };
      }
    } else {
      return cookieObject;
    }
  });
  setParsedCookie(cookie, newCookie);
  return newCookie;
}
