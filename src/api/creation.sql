CREATE DATABASE PORTFOLIO;
USE PORTFOLIO;

CREATE TABLE Achievements (
id int NOT NULL AUTO_INCREMENT,
title VARCHAR(80) NOT NULL,
description VARCHAR(255) NOT NULL,
PRIMARY KEY (id)
);

DESC AchSkills;

INSERT INTO Achievements (title, description)
VALUES ('Software Engineering Internship', 'I was able to perform multiple software engineering tasks and operations');

CREATE TABLE AchSkills (
id int NOT NULL AUTO_INCREMENT,
aID int,
sID int,
PRIMARY KEY (id),
FOREIGN KEY (aID) REFERENCES Achievements(id),
FOREIGN KEY (sID) REFERENCES Skills(id)
);

CREATE TABLE Skills (
id int NOT NULL AUTO_INCREMENT,
name VARCHAR(80) NOT NULL,
aID int,
PRIMARY KEY (id),
FOREIGN KEY (aID) REFERENCES Achievements(id)
);