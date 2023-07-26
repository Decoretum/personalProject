CREATE DATABASE PORTFOLIO;
USE PORTFOLIO;

CREATE TABLE Achievements (
id int NOT NULL AUTO_INCREMENT,
title VARCHAR(80) NOT NULL,
description VARCHAR(255) NOT NULL,
PRIMARY KEY (id)
);

INSERT INTO Achievements (title, description)
VALUES ('Software Engineering Internship', 'I was able to perform multiple software engineering tasks and operations');
