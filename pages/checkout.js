import Head from 'next/head';
import Layout from '../components/Layout';
import Link from 'next/link';
import { css } from '@emotion/react';

const checkout = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Candara', 'Arial';
`;

const name = css`
  display: flex;
  div {
    margin: 0 10px;
  }
  input {
    display: block;
    width: 180px;
  }
`;

const singleInput = css``;

const email = css`
  margin: 0 10px;
  input {
    display: block;
    width: 380px;
  }
`;
const address = css`
  margin: 0 10px;
  input {
    display: block;
    width: 380px;
  }
`;
const cityPCodeCountry = css`
  display: flex;
  div {
    margin: 0 5px;
  }
  input {
    display: block;
  }
`;

const city = css`
  margin-left: 10px !important;
  input {
    width: 130px;
  }
`;

const postalCode = css`
  /* margin: 0 5px; */
  input {
    width: 100px;
  }
`;
const country = css`
  input {
    width: 130px;
  }
`;

const payementInfo = css`
  display: flex;
  flex-direction: column;
  input {
    display: block;
  }
`;

const cardNumber = css`
  margin: 0 10px;
  input {
    width: 380px;
  }
`;

const dateSecurityCode = css`
  display: flex;
  div {
    margin: 0 10px;
  }
  input {
    display: block;
    width: 180px;
  }
`;

const submitButton = css`
  height: 20px;
  width: 100px;
  margin: 20px 140px;
  border-style: solid;
  border-width: thin;
  /* border-radius: 5%; */
  background: none;
  cursor: pointer;
  :hover {
    background: #f1f1f1;
  }
`;

export default function Checkout() {
  return (
    <Layout>
      <div css={checkout}>
        <Head>
          <title>Checkout</title>
        </Head>
        <div>
          <h1>Checkout</h1>
          <p>Please, fill in your shipment information</p>
        </div>
        <div>
          <div css={name}>
            <div>
              <label data-test-id="checkout-first-name">
                First name
                <input required />
              </label>
            </div>
            <div>
              <label data-test-id="checkout-last-name">
                Last name
                <input required />
              </label>
            </div>
          </div>
          <div css={email}>
            <label data-test-id="checkout-email">
              Email
              <input type="email" required />
            </label>
          </div>
          <div css={address}>
            <label data-test-id="checkout-address">
              Address
              <input required />
            </label>
          </div>
          <div css={cityPCodeCountry}>
            <div css={city}>
              <label data-test-id="checkout-city">
                City
                <input required />
              </label>
            </div>
            <div css={postalCode}>
              <label data-test-id="checkout-postal-code">
                Postal code
                <input type="number" required />
              </label>
            </div>
            <div css={country}>
              <label data-test-id="checkout-country">
                Country
                <input required />
              </label>
            </div>
          </div>
          <div css={payementInfo}>
            <div css={cardNumber}>
              <label data-test-id="checkout-credit-card">
                Credit card N°
                <input type="tel" required />
              </label>
            </div>
            <div css={dateSecurityCode}>
              <div>
                <label data-test-id="checkout-expiration-date">
                  Expiration date
                  <input required />
                </label>
              </div>
              <div>
                <label data-test-id="checkout-security-code">
                  Security code
                  <input type="number" required />
                </label>
              </div>
            </div>
          </div>
          <Link href="thankyou">
            <a>
              <button css={submitButton} data-test-id="checkout-confirm-order">
                Submit
              </button>
            </a>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
