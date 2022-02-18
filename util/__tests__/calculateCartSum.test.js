import getTotalPrice from '../calculateCartSum';

test('calculate cart sum', () => {
  const cookie = {
    key: 'cart',
    value: [
      {
        id: 4,
        quantity: 2,
      },
      {
        id: 2,
        quantity: 4,
      },
    ],
  };

  const emptyCookie = {
    key: 'emptyCart',
    value: [],
  };

  const obj = [
    {
      id: 2,
      price: 10,
    },
    {
      id: 4,
      price: 20,
    },
  ];

  expect(getTotalPrice(cookie.value, obj)).toBe(80);
  expect(getTotalPrice(emptyCookie.value, obj)).toBe(0);
});
