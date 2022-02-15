exports.up = async (sql) => {
  await sql`
	CREATE TABLE adventures (
		id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
		name varchar(50) NOT NULL,
		type varchar(20) NOT NULL,
		duration integer NOT NULL,
		price integer NOT NULL,
		description varchar(300) NOT NULL
		);
	`;
};

exports.down = async (sql) => {
  await sql`
	DROP TABLE adventures
	`;
};
