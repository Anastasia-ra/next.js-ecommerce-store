const adventures = [
  {
    name: 'Antarctic Expedition',
    type: 'Cruise',
    duration: 20,
    price: 50,
    description:
      'Take a voyage to the frozen south on a polar expedition. Sail across the renowned Drake Passage to reach the Great White Continent. Cruise amongst immense icebergs in search of wildlife like penguin, seal and whale.',
  },
  {
    name: 'Himalaya Trek',
    type: 'Hike',
    duration: 14,
    price: 20,
    description:
      ' These snow-capped mountains have pulled explorers under their spell for centuries, promising an ever-changing landscape of remote villages, thick alpine forests, and rushing rivers set against the otherworldly backdrop of peaks that scrape the belly of heaven itself. Prepare to be astounded.',
  },
  {
    name: 'Ultimate Moon Hike',
    type: 'Hike',
    duration: 50,
    price: 400,
    description:
      'Discover the magnificent landscapes of the moon, its exceptional biodiversity and the warm welcome of its inhabitants.',
  },
  {
    name: 'In the jungles of Brazil',
    type: 'Hike',
    duration: 10,
    price: 30,
    description:
      'Enjoy exploring the uninhabited wilderness, hiking through the flood plains and immerse yourself in the rainforest as you explore on foot and by canoe. This is a true expedition that goes deep into the forest.',
  },
  {
    name: 'Submarine tour of the earth',
    type: 'Cruise',
    duration: 70,
    price: 250,
    description: `Tour the Earth's oceans on board our submarine. It is so quiet down there. You'll want to stay forever.`,
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
