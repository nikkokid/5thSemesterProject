CREATE TABLE grapes (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TYPE juice_press_type AS ENUM('pressed','unpressed');

CREATE TABLE juice_type(
    id SERIAL PRIMARY KEY,
    name juice_press_type NOT NULL
);

CREATE TABLE juice (
    id SERIAL PRIMARY KEY,
    volume NUMERIC NOT NULL,
    pressed_date TEXT NOT NULL,
    grape_id INT REFERENCES grapes(id),
    juice_type_id INT REFERENCES juice_type(id)
);


CREATE TABLE taste_profiles (
    id SERIAL PRIMARY KEY,
    sweetness NUMERIC,
    acidity NUMERIC,
    aroma NUMERIC,
    dryness NUMERIC,
    color NUMERIC,
    description TEXT,
    rating NUMERIC,
    date TEXT,
    juice_id INT REFERENCES juice(id)
);



INSERT INTO grapes (name) VALUES ('Rondo'), ('Solaris'), ('Cabernet Noir');

INSERT INTO juice_type (name) VALUES ('pressed'), ('unpressed');


INSERT INTO juice (
    volume,
    pressed_date,
    grape_id,
    juice_type_id
) VALUES (2.1, '2025-12-10', 1, 1), 
         (5.0, '2025-12-09', 1, 2),
         (6.1, '2025-07-10', 2, 1),
         (1.5, '2025-07-11', 2, 2), 
         (4.0, '2025-03-03', 3, 1),
         (3.0, '2025-03-02', 3, 2);

INSERT INTO taste_profiles (sweetness, acidity, aroma, dryness, color, description, rating, date, juice_id) 
VALUES (1, 1, 1, 1, 1, 'test smagsprofil1', 1,'2025-01-01', 1),
         (2, 2, 2, 2, 2, 'test smagsprofil2', 2, '2025-02-02', 2),
         (3, 3, 3, 3, 3, 'test smagsprofil3', 3, '2025-04-04', 3),
         (2, 2, 2, 2, 2, 'test smagsprofil4', 2, '2025-05-05', 1);