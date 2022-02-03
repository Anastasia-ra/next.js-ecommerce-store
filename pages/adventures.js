import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/Layout';

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
          <div key={`adventure-${adventure.id}`}>
            <Link href={`/adventures/${adventure.id}`}>
              <a>
                {' '}
                <Image
                  src={`/adventures/resized-mainPage/${adventure.id}.jpg`}
                  width="300"
                  height="200"
                />
                {adventure.name}
              </a>
            </Link>
          </div>
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
