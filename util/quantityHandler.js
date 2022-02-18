import { getParsedCookie, setParsedCookie } from './cookies.ts';

export default function updateCount(cookieKey, id, increment) {
  const cookieValue = getParsedCookie(cookieKey) || [];
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
  setParsedCookie(cookieKey, newCookie);
  return newCookie;
}
