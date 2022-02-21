import Head from 'next/head';
import Layout from '../components/Layout';
import Link from 'next/link';
import { css } from '@emotion/react';
import { useState } from 'react';

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

const emailStyle = css`
  margin: 0 10px;
  input {
    display: block;
    width: 380px;
  }
`;
const addressStyle = css`
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

const cityStyle = css`
  margin-left: 10px !important;
  input {
    width: 130px;
  }
`;

const postalCodeStyle = css`
  input {
    width: 100px;
  }
`;
const countryStyle = css`
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
  background: none;
  cursor: pointer;
  :hover {
    background: #f1f1f1;
  }
`;

export default function Checkout() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [creditCardN, setcreditCardN] = useState('');
  const [expDate, setExpDate] = useState('');
  const [secCode, setSecCode] = useState('');

  // Checks if input in fields
  // const requiredFieldsEmpty =
  //   !(firstName.length === 0) &&
  //   !(lastName.length === 0) &&
  //   !(email.length === 0) &&
  //   !(address.length === 0) &&
  //   !(city.length === 0) &&
  //   !(postalCode.length === 0) &&
  //   !(country.length === 0) &&
  //   !(creditCardN.length === 0) &&
  //   !(expDate.length === 0) &&
  //   !(secCode.length === 0);
  // console.log('requiredFieldsEmpty', requiredFieldsEmpty);

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
                <input
                  required
                  value={firstName}
                  onChange={(event) => setFirstName(event.currentTarget.value)}
                />
              </label>
            </div>
            <div>
              <label data-test-id="checkout-last-name">
                Last name
                <input
                  required
                  value={lastName}
                  onChange={(event) => setLastName(event.currentTarget.value)}
                />
              </label>
            </div>
          </div>
          <div css={emailStyle}>
            <label data-test-id="checkout-email">
              Email
              <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.currentTarget.value)}
              />
            </label>
          </div>
          <div css={addressStyle}>
            <label data-test-id="checkout-address">
              Address
              <input
                required
                value={address}
                onChange={(event) => setAddress(event.currentTarget.value)}
              />
            </label>
          </div>
          <div css={cityPCodeCountry}>
            <div css={cityStyle}>
              <label data-test-id="checkout-city">
                City
                <input
                  required
                  value={city}
                  onChange={(event) => setCity(event.currentTarget.value)}
                />
              </label>
            </div>
            <div css={postalCodeStyle}>
              <label data-test-id="checkout-postal-code">
                Postal code
                <input
                  type="number"
                  required
                  value={postalCode}
                  onChange={(event) => setPostalCode(event.currentTarget.value)}
                />
              </label>
            </div>
            <div css={countryStyle}>
              <label data-test-id="checkout-country">
                Country
                <input
                  required
                  value={country}
                  onChange={(event) => setCountry(event.currentTarget.value)}
                />
              </label>
            </div>
          </div>
          <div css={payementInfo}>
            <div css={cardNumber}>
              <label data-test-id="checkout-credit-card">
                Credit card N°
                <input
                  type="tel"
                  required
                  value={creditCardN}
                  onChange={(event) =>
                    setcreditCardN(event.currentTarget.value)
                  }
                />
              </label>
            </div>
            <div css={dateSecurityCode}>
              <div>
                <label data-test-id="checkout-expiration-date">
                  Expiration date
                  <input
                    required
                    value={expDate}
                    onChange={(event) => setExpDate(event.currentTarget.value)}
                  />
                </label>
              </div>
              <div>
                <label data-test-id="checkout-security-code">
                  Security code
                  <input
                    type="number"
                    required
                    value={secCode}
                    onChange={(event) => setSecCode(event.currentTarget.value)}
                  />
                </label>
              </div>
            </div>
          </div>

          <p>Please, fill in all fields before submitting</p>

          {/* {!requiredFieldsEmpty && (
            <p>Please, fill all fields before submitting</p>
          )} */}
          <Link href="thankyou">
            <a>
              <button
                css={submitButton}
                data-test-id="checkout-confirm-order"
                // disabled={!requiredFieldsEmpty}
              >
                Submit
              </button>
            </a>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
