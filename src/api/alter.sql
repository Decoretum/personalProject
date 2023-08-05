USE PORTFOLIO;
ALTER TABLE Achievements
MODIFY description varchar(1000);

ALTER TABLE AchSkills
ADD Insight varchar(50);

ALTER TABLE Skills
DROP FOREIGN KEY `skills_ibfk_1`;

ALTER TABLE Skills
DROP COLUMN aID;

ALTER TABLE Skills
modify description varchar(1000) not null;

ALTER TABLE Skills
ADD category varchar(100);

DELETE FROM Skills
where category is null;

desc Skills;
desc AchSkills;
