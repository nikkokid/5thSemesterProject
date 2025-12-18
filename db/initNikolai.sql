CREATE TABLE grapes (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

INSERT INTO grapes (name) VALUES ('Rondo'), ('Solaris'), ('Cabernet Noir');

CREATE TABLE harvests (
    HarvestId SERIAL PRIMARY KEY,
    Weight INT,
    Date TEXT
);

INSERT INTO harvests (Weight, Date) VALUES
(
    110, '6/7-2025'
),
(
    120, '6/7-2025'
),
(
    130, '6/7-2025'
),
(
    140, '6/7-2025'
);
