import { getParsedCookie, setParsedCookie } from './cookies.ts';

export default function toggleCart(inputId, cookie) {
  const cookieValue = getParsedCookie(cookie) || [];
  const existIdOnArray = cookieValue.some((cookieObject) => {
    return cookieObject.id === inputId;
  });
  let newCookie;
  if (existIdOnArray) {
    newCookie = cookieValue.filter(
      (cookieObject) => cookieObject.id !== inputId,
    );
  } else {
    newCookie = [...cookieValue, { id: inputId, quantity: 1 }];
  }
  setParsedCookie(cookie, newCookie);
  return newCookie;
}
