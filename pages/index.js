import Head from 'next/head';
import Layout from '../components/Layout';
import { css } from '@emotion/react';
// import backgroundImage from '../public/background-homepage2.jpg';

const layoutStyle = css`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-image: url(/joshua-earle--87JyMb9ZfU-unsplash.jpg);
  background-size: cover;
  background-position: center;
`;

const headingStyle = css`
  font-family: 'Lucida console', 'Arial';
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

        <h1 css={headingStyle}>Find your next adventure</h1>
      </Layout>
    </div>
  );
}
