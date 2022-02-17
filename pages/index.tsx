import Head from 'next/head';
import Layout from '../components/Layout';
import { css } from '@emotion/react';
// import backgroundImage from '../public/background-homepage2.jpg';

const layoutStyle = css`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-image: url(/toomas-tartes-Yizrl9N_eDA-unsplash.jpg);
  background-size: cover;
  background-position: center;
`;

const description = css`
  font-family: 'Candara', 'Arial';
  color: white;
  position: relative;
  top: 30vh;
  h1 {
    font-size: 4rem;
  }
  p {
    font-size: 2rem;
  }
`;

export default function Home() {
  return (
    <div css={layoutStyle}>
      <Layout>
        <Head>
          <title>Homepage</title>
        </Head>
        <div css={description}>
          <h1>Find your next adventure</h1>
          <p>
            From hold-your-breath experiences, to unscripted moments of joy;{' '}
            <br /> our adventures create stories to tell for a lifetime.
          </p>
        </div>
      </Layout>
    </div>
  );
}
