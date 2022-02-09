// import camelcaseKeys from 'camelcase-keys';
import { config } from 'dotenv-safe';
import postgres from 'postgres';

config();

function connectOneTimeToDatabase() {
  if (!globalThis.postgresSqlClient) {
    globalThis.postgresSqlClient = postgres();
  }
  const sql = globalThis.postgresSqlClient;

  return sql;
}

const sql = connectOneTimeToDatabase();

export async function getAdventures() {
  const adventures = await sql`
    SELECT * FROM adventures;
  `;

  const adventurestoString = adventures.map((adventure) => {
    return {
      id: adventure.id.toString(),
      name: adventure.name,
      type: adventure.type,
      duration: adventure.duration,
      price: adventure.price,
      description: adventure.description,
    };
  });

  return adventurestoString;
}

export async function getAdventureById(id) {
  const [adventure] = await sql`
    SELECT * FROM adventures WHERE id = ${id};
  `;
  adventure.id = adventure.id.toString();
  console.log('adventure async', adventure);
  console.log('adventure typeOf', typeof adventure.id);
  return adventure;
}

// const adventuresDatabase = [
//   {
//     id: '1',
//     name: 'Antarctic Expedition',
//     type: 'Cruise',
//     duration: '20',
//     price: 50,
//     description: `Let's see some penguins`,
//   },
//   {
//     id: '2',
//     name: 'Himalaya Trek',
//     type: 'Hike',
//     duration: '14',
//     price: 20,
//     description: `Let's see some yaks`,
//   },
//   {
//     id: '3',
//     name: 'Ultimate Moon Hike',
//     type: 'Hike',
//     duration: '50',
//     price: 400,
//     description: `The best view you've ever seen and amazing wildlife!`,
//   },
//   {
//     id: '4',
//     name: 'In the jungles of Brazil',
//     type: 'Hike',
//     duration: '10',
//     price: 30,
//     description: `I hope there are no crocodiles`,
//   },
//   {
//     id: '5',
//     name: 'Submarine tour of the earth',
//     type: 'Cruise',
//     duration: '70',
//     price: 250,
//     description: 'At least no one will bother you',
//   },
// ];

// export default adventuresDatabase;
