-- Active: 1656365304886@@35.226.146.116@3306@silveira-21814356-andresa-ribeiro

CREATE TABLE Wirecard_Client (
    id VARCHAR(255) PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    cpf VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE Wirecard_Card (
    card_holder_id VARCHAR(255) NOT NULL,
    card_holder_name VARCHAR(255) NOT NULL,
    number VARCHAR(255) UNIQUE NOT NULL,
    expiration_date VARCHAR(255) NOT NULL,
    cvv VARCHAR(255) NOT NULL,    
    FOREIGN KEY (card_holder_id) REFERENCES Wirecard_Client(id)
);

CREATE TABLE Wirecard_Card_Management (
    card_holder_id VARCHAR(255) NOT NULL,
    card_holder_name VARCHAR(255) NOT NULL,
    number VARCHAR(255) UNIQUE NOT NULL,
    expiration_date VARCHAR(255) NOT NULL,
    cvv VARCHAR(255) NOT NULL,    
    FOREIGN KEY (card_holder_id) REFERENCES Wirecard_Client(id)
);

CREATE TABLE Wirecard_Payment (
    client_id VARCHAR(255) NOT NULL,
    amount INT NOT NULL,
    type VARCHAR(255) NOT NULL DEFAULT "BOLETO",
    card VARCHAR(255),
    FOREIGN KEY (client_id) REFERENCES Wirecard_Client(id),
    FOREIGN KEY (card) REFERENCES Wirecard_Card(number)
);