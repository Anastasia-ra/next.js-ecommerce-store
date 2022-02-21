import { config } from 'dotenv-safe';
import postgres from 'postgres';
import setPostgresDefaultsOnHeroku from './setPostgresDefaultsOnHeroku.js';

setPostgresDefaultsOnHeroku();
config();

declare module globalThis {
  let postgresSqlClient: ReturnType<typeof postgres> | undefined;
}

function connectOneTimeToDatabase() {
  let sql;

  if (process.env.NODE_ENV === 'production' && process.env.DATABASE_URL) {
    sql = postgres();

    // Heroku needs SSL connections but
    // has an "unauthorized" certificate
    // https://devcenter.heroku.com/changelog-items/852

    sql = postgres({ ssl: { rejectUnauthorized: false } });
  } else {
    if (!globalThis.postgresSqlClient) {
      globalThis.postgresSqlClient = postgres();
    }
    sql = globalThis.postgresSqlClient;
  }
  return sql;
}

const sql = connectOneTimeToDatabase();

export type Adventure = {
  id: number;
  name: string;
  type: string;
  duration: number;
  price: number;
  description: string;
};

export async function getAdventures() {
  const adventures = await sql<Adventure[]>`
    SELECT * FROM adventures;
  `;

  // adventures.forEach(
  //   (adventure: Adventure) => (adventure.id = adventure.id.toString()),
  // );

  return adventures;
}

export async function getAdventureById(id: number) {
  const [adventure] = await sql<[Adventure | undefined]>`
    SELECT * FROM adventures WHERE id = ${id};
  `;
  // if (adventure) {
  //   adventure.id = adventure.id.toString();
  // }
  return adventure;
}

// const adventuresDatabase = [
//   {
//     id: '1',
//     name: 'Antarctic Expedition',
//     type: 'Cruise',
//     duration: '20',
//     price: 50,
//     description: ` Meet at least six penguin species`,
//   },
//   {
//     id: '2',
//     name: 'Himalaya Trek',
//     type: 'Hike',
//     duration: '14',
//     price: 20,
//     description: `Cross the Himalayas in two weeks`,
//   },
//   {
//     id: '3',
//     name: 'Ultimate Moon Hike',
//     type: 'Hike',
//     duration: '50',
//     price: 400,
//     description: `Nice view. Amazing wildlife!`,
//   },
//   {
//     id: '4',
//     name: 'In the jungles of Brazil',
//     type: 'Hike',
//     duration: '10',
//     price: 30,
//     description: `Meeting the crocodiles`,
//   },
//   {
//     id: '5',
//     name: 'Submarine tour of the earth',
//     type: 'Cruise',
//     duration: '70',
//     price: 250,
//     description: 'It's so quiet down here. You'll want to stay forever. ',
//   },
// ];

// export default adventuresDatabase;
