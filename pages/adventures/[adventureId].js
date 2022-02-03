import Head from 'next/head';
import Layout from '../../components/Layout';
import adventuresDatabase from '../../util/database';

export default function SingleAnimal(props) {
  return (
    <Layout>
      <Head>
        <title>{`${props.adventure.name} - ${props.adventure.duration} days`}</title>
      </Head>
      <h1>{`${props.adventure.duration} days ${props.adventure.name}`}</h1>
    </Layout>
  );
}

export function getServerSideProps(context) {
  const adventureId = context.query.adventureId;

  const matchingAdventure = adventuresDatabase.find((adventure) => {
    return adventure.id === adventureId;
  });

  return {
    props: {
      adventure: matchingAdventure,
    },
  };
}
