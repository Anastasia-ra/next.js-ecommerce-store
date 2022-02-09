CREATE TABLE adventures (
id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
name varchar(50) NOT NULL,
type varchar(20) NOT NULL,
duration integer NOT NULL,
price integer NOT NULL,
description varchar(300) NOT NULL
);

INSERT INTO adventures
(name, type, duration, price, description)
VALUES
('Himalaya Trek', 'Hike', 14, 20, 'Let''s see some yaks'),
('Ultimate Moon Hike', 'Hike', 50, 400, 'The best view you''ve ever seen and amazing wildlife!'),
('In the jungles of Brazil', 'Hike', 10, 30, 'I hope there are no crocodiles'),
('Submarine tour of the earth', 'Cruise', 70, 250, 'At least no one will bother you');
