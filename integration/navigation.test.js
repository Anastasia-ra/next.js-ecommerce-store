import 'expect-puppeteer';

const baseUrl = 'http://localhost:3000';

test('add to cart, change quantity and remove from cart', async () => {
  await page.goto(`${baseUrl}/`);
  // Expect page URL to be correct
  expect(page.url()).toBe(`${baseUrl}/`);
  // Match page content
  await expect(page).toMatch('Find your next adventure');

  // Got to adventures page
  await expect(page).toClick('[data-test-id="header-adventures-link"]');
  await page.waitForNavigation();

  // Expect page URL to be correct
  expect(page.url()).toBe(`${baseUrl}/adventures`);

  // Go to first adventure page
  await expect(page).toClick('[data-test-id="product-1"]');
  await page.waitForNavigation();

  // Expect page URL to be correct
  expect(page.url()).toBe(`${baseUrl}/adventures/1`);
  await expect(page).toMatch('Antarctic Expedition');

  // Click on add to cart button
  await expect(page).toClick('[data-test-id="product-add-to-cart"]');
  await expect(page).toClick('[data-test-id="increase-quantity"]');
  await expect(page).toClick('[data-test-id="decrease-quantity"]');
  await expect(page).toClick('[data-test-id="product-add-to-cart"]');
});

test(' checkout flow, payment page, thank you page', async () => {
  await page.goto(`${baseUrl}/`);
  // Expect page URL to be correct
  expect(page.url()).toBe(`${baseUrl}/`);
  // Match page content
  await expect(page).toMatch('Find your next adventure');

  // Got to adventures page
  await expect(page).toClick('[data-test-id="header-adventures-link"]');
  await page.waitForNavigation();

  // Expect page URL to be correct
  expect(page.url()).toBe(`${baseUrl}/adventures`);

  // Go to first adventure page
  await expect(page).toClick('[data-test-id="product-1"]');
  await page.waitForNavigation();

  // Expect page URL to be correct
  expect(page.url()).toBe(`${baseUrl}/adventures/1`);
  await expect(page).toMatch('Antarctic Expedition');

  // Click on add to cart button
  await expect(page).toClick('[data-test-id="product-add-to-cart"]');

  // Go to shopping cart
  await expect(page).toClick('[data-test-id="cart-count"]');
  await page.waitForNavigation();

  // Expect page URL to be correct
  expect(page.url()).toBe(`${baseUrl}/shoppingcart`);
  await expect(page).toMatch('Your next adventures');

  // Go to checkout
  await expect(page).toClick('[data-test-id="cart-checkout"]');
  await page.waitForNavigation();

  // Expect page URL to be correct
  expect(page.url()).toBe(`${baseUrl}/checkout`);
  await expect(page).toMatch('Checkout');

  // Go to thank you page
  await expect(page).toClick('[data-test-id="checkout-confirm-order"]');
  await page.waitForNavigation();

  // Expect page URL to be correct
  expect(page.url()).toBe(`${baseUrl}/thankyou`);
  await expect(page).toMatch('Thank you for your order');
});
