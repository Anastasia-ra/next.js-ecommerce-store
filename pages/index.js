import Head from 'next/head';
import Layout from '../components/Layout';
import { css } from '@emotion/react';
// import backgroundImage from '../public/background-homepage2.jpg';

const layoutStyle = css`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-image: url(/background-homepage2.jpg);
  background-size: cover;
  background-position: top 20px;
`;

export default function Home() {
  return (
    <div css={layoutStyle}>
      <Layout>
        <Head>
          <title>Homepage</title>
        </Head>

        <h1>Find your next adventure</h1>
      </Layout>
    </div>
  );
}
