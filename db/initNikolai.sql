CREATE TABLE Grape (
    GrapeId SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE GrapeRow (
    GrapeRowId SERIAL PRIMARY KEY,
    GrapeId INT,
    RowName TEXT,
    NoOfVines INT,
    LengthOfRow INT,
    DistanceBetweenPlants INT,
    FOREIGN KEY (GrapeId) REFERENCES Grape(GrapeId)
);

CREATE TABLE Harvest (
    HarvestId SERIAL PRIMARY KEY,
    GrapeRowId INT,
    Weight INT,
    HarvestDate DATE,
    FOREIGN KEY (GrapeRowId) REFERENCES GrapeRow(GrapeRowId)
);

INSERT INTO Grape 
(name) 
VALUES 
(
    'Rondo'
), 
(
    'Solaris'
), 
(
    'Cabernet Noir'
);

INSERT INTO GrapeRow
(GrapeId, RowName, NoOfVines, LengthOfRow, DistanceBetweenPlants)
VALUES
(
    1, 'Række 1', 50, 50, 2
),
(
    1, 'Række 2', 51, 50, 2
),
(
    1, 'Række 3', 52, 50, 2
),
(
    2, 'Række 4', 50, 50, 2
),
(
    2, 'Række 5', 51, 50, 2
),
(
    3, 'Række 6', 50, 50, 2
),
(
    3, 'Række 7', 51, 50, 2
),
(
    3, 'Række 8', 52, 50, 2
);


INSERT INTO Harvest
(GrapeRowId, Weight, HarvestDate) 
VALUES
(
    1, 110, '2023-06-10'
),
(
    2, 120, '2023-06-10'
),
(
    3, 130, '2023-06-10'
),
(
    4, 140, '2023-06-10'
),
(
    5, 150, '2023-06-10'
),
(
    6, 160, '2023-06-10'
),
(
    7, 170, '2023-06-10'
),
(
    8, 180, '2023-06-10'
),
(
    1, 110, '2024-05-10'
),
(
    2, 120, '2024-05-10'
),
(
    3, 130, '2024-05-10'
),
(
    4, 140, '2024-05-10'
),
(
    5, 150, '2024-05-10'
),
(
    6, 160, '2024-05-10'
),
(
    7, 170, '2024-05-10'
),
(
    8, 180, '2024-05-10'
),
(
    1, 110, '2025-06-07'
),
(
    2, 120, '2025-06-07'
),
(
    3, 130, '2025-06-07'
),
(
    4, 140, '2025-06-07'
),
(
    5, 150, '2025-06-07'
),
(
    6, 160, '2025-06-07'
),
(
    7, 170, '2025-06-07'
),
(
    8, 180, '2025-06-07'
);

CREATE VIEW HarvestView AS
SELECT 
    h.HarvestId,
    h.HarvestDate,
    h.Weight,
    gr.RowName,
    gr.NoOfVines,
    g.GrapeId,
    g.Name AS GrapeName
FROM Harvest h
JOIN GrapeRow gr ON h.GrapeRowId = gr.GrapeRowId
JOIN Grape g ON gr.GrapeId = g.GrapeId;