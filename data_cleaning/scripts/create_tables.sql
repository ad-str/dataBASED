USE dataBASED;

CREATE TABLE Artist (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    birth_year INT,
    death_year INT,
    biography TEXT
);

CREATE TABLE Artwork
(
    id              INT PRIMARY KEY,
    title           TEXT,
    start_year      INT,
    end_year        INT,
    place_of_origin VARCHAR(255),
    image_id        VARCHAR(36),
    color           VARCHAR(100),
    colorfulness    DECIMAL(8, 4),
    not_viewed_much BOOLEAN,
    country         VARCHAR(255),
);

CREATE TABLE Descriptor (
    artwork_id INT,
    FOREIGN KEY (artwork_id) REFERENCES Artwork(id),
    aspect ENUM('artwork_type', 'category', 'classification', 'material', 'style', 'technique') NOT NULL,
    title TEXT
);

CREATE TABLE Made (
    artist_id INT,
    artwork_id INT,
    PRIMARY KEY (artist_id, artwork_id),
    FOREIGN KEY (artist_id) REFERENCES Artist(id),
    FOREIGN KEY (artwork_id) REFERENCES Artwork(id)
);

