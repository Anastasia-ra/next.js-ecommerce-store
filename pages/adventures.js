import Head from 'next/head';
import Layout from '../components/Layout';
import Link from 'next/link';
import adventuresDatabase from '../util/database';

export default function Adventures(props) {
  return (
    <Layout>
      <Head>
        <title>Adventures</title>
      </Head>
      <h1>Choose your adventure</h1>

      {props.adventures.map((adventure) => {
        return (
          <Link
            key={`adventure-${adventure.id}`}
            href={`/adventures/${adventure.id}`}
          >
            <a>{adventure.name}</a>
          </Link>
        );
      })}
    </Layout>
  );
}

export function getServerSideProps() {
  return {
    props: {
      adventures: adventuresDatabase,
    },
  };
}
