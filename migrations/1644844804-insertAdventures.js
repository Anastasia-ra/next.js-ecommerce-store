const adventures = [
  {
    name: 'Antarctic Expedition',
    type: 'Cruise',
    duration: 20,
    price: 50,
    description: 'Meet at least six penguin species',
  },
  {
    name: 'Himalaya Trek',
    type: 'Hike',
    duration: 14,
    price: 20,
    description: 'Cross the Himalayas in two weeks',
  },
  {
    name: 'Ultimate Moon Hike',
    type: 'Hike',
    duration: 50,
    price: 400,
    description: 'Nice view. Amazing wildlife',
  },
  {
    name: 'In the jungles of Brazil',
    type: 'Hike',
    duration: 10,
    price: 30,
    description: 'Meeting the crocodiles',
  },
  {
    name: 'Submarine tour of the earth',
    type: 'Cruise',
    duration: 70,
    price: 250,
    description: `It is so quiet down here. You'll want to stay forever.`,
  },
];

exports.up = async (sql) => {
  await sql`
	INSERT INTO adventures ${sql(
    adventures,
    'name',
    'type',
    'duration',
    'price',
    'description',
  )}
	`;
};

exports.down = async (sql) => {
  for (const adventure of adventures) {
    await sql`
			DELETE FROM
				adventures
			WHERE
				name = ${adventure.name} AND
				type = ${adventure.type} AND
				duration = ${adventure.duration} AND
				price = ${adventure.price} AND
				description = ${adventure.description}
		`;
  }
};
