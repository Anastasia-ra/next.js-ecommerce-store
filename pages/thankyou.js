import Head from 'next/head';
import Layout from '../components/Layout';
import Image from 'next/image';

export default function Thankyou() {
  return (
    <Layout>
      <Head>
        <title>Thank you</title>
      </Head>
      <h1>Thank you for your order 🎈</h1>
      <Image src="/thankyou-adventure.jpg" width="400" height="400" />
    </Layout>
  );
}
