import toggleCart from '../toggleCart';
import { deleteCookie, getParsedCookie, setParsedCookie } from '../cookies';

test('add and remove info from cookie', () => {
  const cookie = {
    key: 'cart',
    value: [{ id: 2, quantity: 5 }],
  };

  expect(setParsedCookie(cookie.key, cookie.value)).toBeUndefined();

  expect(toggleCart(2, cookie.key)).toStrictEqual([]);

  expect(toggleCart(5, cookie.key)).toStrictEqual([{ id: 5, quantity: 1 }]);

  expect(toggleCart(3, cookie.key)).toStrictEqual([
    { id: 5, quantity: 1 },
    { id: 3, quantity: 1 },
  ]);

  expect(deleteCookie(cookie.key)).toBe(undefined);
});
