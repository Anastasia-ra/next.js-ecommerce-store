import Head from 'next/head';
import Layout from '../components/Layout';
import { css } from '@emotion/react';
// import backgroundImage from '../public/background-homepage2.jpg';

const layoutStyle = css`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-image: url(/christopher-burns--jbsw_GUK74-unsplash.jpg);
  background-size: cover;
  background-position: center;
`;

const headingStyle = css`
  font-family: 'Candara', 'Arial';
  font-size: 4rem;
  color: white;
  position: relative;
  top: 50vh;
`;

export default function Home() {
  return (
    <div css={layoutStyle}>
      <Layout>
        <Head>
          <title>Homepage</title>
        </Head>
        <div>
          <h1 css={headingStyle}>Find your next adventure</h1>
        </div>
      </Layout>
    </div>
  );
}