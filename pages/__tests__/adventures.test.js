import { updateCount } from '../../util/quantityHandler.js';
import { setParsedCookie } from '../../util/cookies';

test('update quantity', () => {
  const cookie = {
    key: 'cart',
    value: [
      { id: 1, quantity: 4 },
      { id: 2, quantity: 1 },
    ],
  };
  expect(setParsedCookie(cookie.key, cookie.value)).toBeUndefined();
  expect(updateCount(cookie.key, 1, true)).toStrictEqual({
    key: 'cart',
    value: [
      { id: 1, quantity: 5 },
      { id: 2, quantity: 1 },
    ],
  });
});
