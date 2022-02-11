import Head from 'next/head';
import Layout from '../components/Layout';

export default function Checkout() {
  return (
    <Layout>
      <Head>
        <title>Checkout</title>
      </Head>
      <div>
        <h1>Checkout</h1>
        <p>Please, fill in your shipment information</p>
      </div>
      <div>
        <label data-test-id="checkout-first-name">
          First name:
          <input required />
        </label>
        <label data-test-id="checkout-last-name">
          Last name:
          <input required />
        </label>
        <label data-test-id="checkout-email">
          Email
          <input type="email" required />
        </label>
        <label data-test-id="checkout-address">
          Address:
          <input required />
        </label>
        <label data-test-id="checkout-city">
          City:
          <input required />
        </label>
        <label data-test-id="checkout-postal-code">
          Postal code:
          <input type="number" required />
        </label>
        <label data-test-id="checkout-country">
          Country:
          <input required />
        </label>
        <label data-test-id="checkout-credit-card">
          Credit card N°:
          <input type="number" required />
        </label>
        <label data-test-id="checkout-expiration-date">
          Expiration date:
          <input required />
        </label>
        <label data-test-id="checkout-security-code">
          Security code:
          <input type="number" required />
        </label>
        {/* <input type="submit">Submit</input>
        <input type="reset">Reset</input> */}
      </div>
    </Layout>
  );
}
