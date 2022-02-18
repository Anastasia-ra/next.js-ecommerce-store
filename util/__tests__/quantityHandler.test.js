import updateCount from '../quantityHandler';
import { setParsedCookie, deleteCookie, getParsedCookie } from '../cookies';

test('update quantity', () => {
  const cookie = {
    key: 'cart',
    value: [
      { id: 1, quantity: 4 },
      { id: 2, quantity: 1 },
    ],
  };
  expect(setParsedCookie(cookie.key, cookie.value)).toBeUndefined();

  expect(updateCount(cookie.key, 1, true)).toStrictEqual([
    { id: 1, quantity: 5 },
    { id: 2, quantity: 1 },
  ]);
  expect(updateCount(cookie.key, 1, false)).toStrictEqual([
    { id: 1, quantity: 4 },
    { id: 2, quantity: 1 },
  ]);
  expect(updateCount(cookie.key, 2, false)).toStrictEqual([
    { id: 1, quantity: 4 },
    { id: 2, quantity: 1 },
  ]);
  expect(updateCount(cookie.key, 7, true)).toStrictEqual([
    { id: 1, quantity: 4 },
    { id: 2, quantity: 1 },
  ]);

  expect(deleteCookie(cookie.key)).toBe(undefined);
  expect(getParsedCookie(cookie.key)).toBe(undefined);
});
