import { deleteCookie, getParsedCookie, setParsedCookie } from '../cookies';

test('sets, gets and deletes a cookie', () => {
  const cookie = {
    key: 'cart',
    value: { 1: 0, 2: 0 },
  };

  expect(getParsedCookie(cookie.key)).toBe(undefined);

  expect(setParsedCookie(cookie.key, cookie.value)).toBeUndefined();
  expect(getParsedCookie(cookie.key)).toStrictEqual(cookie.value);

  expect(deleteCookie(cookie.key)).toBe(undefined);
  expect(getParsedCookie(cookie.key)).toBe(undefined);
});
