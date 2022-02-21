import Head from 'next/head';
import Layout from '../components/Layout';
import Image from 'next/image';
import { css } from '@emotion/react';

const contentStyle = css`
  width: 50vw;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Candara', 'Arial'; ;
`;

// const headingStyle = css`
//   text-align: center;
// `;

export default function Thankyou() {
  return (
    <Layout>
      <Head>
        <title>Thank you</title>
      </Head>
      <div css={contentStyle}>
        {' '}
        <h1>Thank you for your order 🎈</h1>
        <div>
          <Image src="/thankyou-adventure.jpg" width="400" height="400" />
        </div>
      </div>
    </Layout>
  );
}
