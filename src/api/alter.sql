USE PORTFOLIO;
ALTER TABLE Achievements
ADD Duration varchar(50);

ALTER TABLE AchSkills
ADD Insight varchar(50);

ALTER TABLE Skills
DROP FOREIGN KEY `skills_ibfk_1`;

ALTER TABLE Skills
DROP COLUMN aID;

desc Skills;
desc AchSkills;
