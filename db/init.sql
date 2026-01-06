CREATE TABLE Grape (
    GrapeId SERIAL PRIMARY KEY,
    GrapeName TEXT NOT NULL
);

CREATE TABLE GrapeRow (
    GrapeRowId SERIAL PRIMARY KEY,
    GrapeId INT REFERENCES Grape(GrapeId),
    GrapeRowName TEXT,
    NoOfVines INT,
    LengthOfRow INT,
    DistanceBetweenVines INT,
    DistanceToNextRow INT
);

CREATE TABLE Harvest (
    HarvestId SERIAL PRIMARY KEY,
    GrapeId INT REFERENCES Grape(GrapeId),
    GrapeRowId INT REFERENCES GrapeRow(GrapeRowId),
    HarvestWeight INT,
    HarvestDate DATE
);


CREATE TYPE JuicePressType AS ENUM('pressed','unpressed');

CREATE TABLE JuiceType(
    JuiceTypeId SERIAL PRIMARY KEY,
    JuiceTypeName JuicePressType NOT NULL
);

CREATE TABLE Juice (
    JuiceId SERIAL PRIMARY KEY,
    Volume NUMERIC NOT NULL,
    PressedDate DATE,
    GrapeId INT REFERENCES Grape(GrapeId),
    JuiceTypeId INT REFERENCES JuiceType(JuiceTypeId)
);

CREATE TABLE Wine (
    WineId SERIAL PRIMARY KEY,
    WineName TEXT NOT NULL,
    VintageYear INT NOT NULL
);

CREATE TABLE WineJuice (
    WineId INT REFERENCES Wine(WineId) ON DELETE CASCADE,
    JuiceId INT REFERENCES Juice(JuiceId),
    WineJuicePercentage INT NOT NULL,
    PRIMARY KEY (WineId, JuiceId)
);


CREATE TABLE TasteProfile (
    TasteProfileId SERIAL PRIMARY KEY,
    Sweetness INT,
    Acidity INT,
    Aroma INT,
    Dryness INT,
    Color INT,
    TasteProfileDescription TEXT,
    Rating INT,
    TasteProfileDate DATE,
    JuiceId INT REFERENCES Juice(JuiceId) ON DELETE CASCADE
);

CREATE TABLE Additive (
    AdditiveId SERIAL PRIMARY KEY,
    AdditiveName TEXT NOT NULL,
    AdditiveAmount NUMERIC,
    AdditiveDescription TEXT,
    AdditiveDate DATE,
    JuiceId INT REFERENCES Juice(JuiceId) ON DELETE CASCADE
);



INSERT INTO Grape (GrapeName) VALUES ('Rondo'), ('Solaris'), ('Cabernet Noir');

INSERT INTO GrapeRow
(GrapeId, GrapeRowName, NoOfVines, LengthOfRow, DistanceBetweenVines, DistanceToNextRow) VALUES(1, 'Række 1', 50, 50, 2, 2), (1, 'Række 2', 51, 50, 2, 2),(1, 'Række 3', 52, 50, 2, 2), 
(2, 'Række 4', 50, 50, 2, 2), (2, 'Række 5', 51, 50, 2, 2), (3, 'Række 6', 50, 50, 2, 2), (3, 'Række 7', 51, 50, 2, 2), (3, 'Række 8', 52, 50, 2, 2);


INSERT INTO Harvest
(GrapeId, GrapeRowId, HarvestWeight, HarvestDate) 
VALUES(1, 1, 110, '2023-06-10'),(1, 2, 120, '2023-06-10'),(1, 3, 130, '2023-06-10'),(1, 4, 140, '2023-06-10'),(1, 5, 150, '2023-06-10'),(1, 6, 160, '2023-06-10'),
(1, 7, 170, '2023-06-10'),(1, 8, 180, '2023-06-10'),(1, 1, 110, '2024-05-10'),(1, 2, 120, '2024-05-10'),(1, 3, 130, '2024-05-10'),(1, 4, 140, '2024-05-10'),
(1, 5, 150, '2024-05-10'),(1, 6, 160, '2024-05-10'),(1, 7, 170, '2024-05-10'),(1, 8, 180, '2024-05-10'),(1, 1, 110, '2025-06-07'),(1, 2, 120, '2025-06-07'),
(1, 3, 130, '2025-06-07'),(1, 4, 140, '2025-06-07'),(1, 5, 150, '2025-06-07'),(1, 6, 160, '2025-06-07'),(1, 7, 170, '2025-06-07'),(1, 8, 180, '2025-06-07');


INSERT INTO JuiceType (JuiceTypeName) VALUES ('pressed'), ('unpressed');

INSERT INTO Juice (
    Volume,
    PressedDate,    
    GrapeId,
    JuiceTypeId
) VALUES (2.1, '2025-12-10', 1, 1), 
         (5.0, '2025-12-09', 1, 2),
         (6.1, '2025-07-10', 2, 1),
         (1.5, '2025-07-11', 2, 2), 
         (4.0, '2024-03-03', 3, 1),
         (3.0, '2024-03-02', 3, 2);


INSERT INTO TasteProfile (Sweetness, Acidity, Aroma, Dryness, Color, TasteProfileDescription, Rating, TasteProfileDate, JuiceId) 
VALUES (1, 1, 1, 1, 1, 'test smagsprofil1', 1,'2025-01-01', 1),
         (2, 2, 2, 2, 2, 'test smagsprofil2', 2, '2025-02-02', 2),
         (3, 3, 3, 3, 3, 'test smagsprofil3', 3, '2025-04-04', 3),
         (2, 2, 2, 2, 2, 'test smagsprofil4', 2, '2025-05-05', 1);

INSERT INTO Additive (AdditiveName, AdditiveAmount, AdditiveDescription, AdditiveDate, JuiceId) 
VALUES ('Sugar', 1.5, 'testUsed as sweetenertest', '2025-12-15', 1),
       ('Acid', 0.5, 'testUsed to increase aciditytest', '2026-01-02', 1);



CREATE VIEW HarvestView AS
SELECT 
    h.HarvestId,
    h.HarvestDate,
    h.HarvestWeight,
    gr.GrapeRowName,
    gr.NoOfVines,
    g.GrapeId,
    g.GrapeName
FROM Harvest h
JOIN GrapeRow gr ON h.GrapeRowId = gr.GrapeRowId
JOIN Grape g ON gr.GrapeId = g.GrapeId;

CREATE VIEW WineView AS
SELECT 
    w.WineId,
    w.WineName,
    w.VintageYear,
    wj.WineJuicePercentage AS Percentage,
    j.JuiceId,
    j.Volume,
    j.PressedDate,
    g.GrapeId,
    g.GrapeName
FROM Wine w
JOIN WineJuice wj ON w.WineId = wj.WineId
JOIN Juice j ON wj.JuiceId = j.JuiceId
JOIN Grape g ON j.GrapeId = g.GrapeId;