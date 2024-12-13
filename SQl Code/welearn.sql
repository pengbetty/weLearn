
CREATE DATABASE IF NOT EXISTS `WeLearn` CHARACTER SET utf8mb4 DEFAULT COLLATE utf8mb4_bin;
USE `WeLearn`;

Drop procedure CalculateTotalAmount;

DROP TABLE IF EXISTS `Stu_School`;
DROP TABLE IF EXISTS `Stu_Relationship`;
DROP TABLE IF EXISTS `Stu_Exam`;
DROP TABLE IF EXISTS `Stu_Major`;

DROP TABLE IF EXISTS `Prog_Req`;
DROP TABLE IF EXISTS `Application`;
DROP TABLE IF EXISTS `Program`;
DROP TABLE IF EXISTS `Contract`;
DROP VIEW IF EXISTS `StudentView`;
DROP TABLE IF EXISTS `Student`;

DROP TABLE IF EXISTS `Requirement`;
DROP TABLE IF EXISTS `Relationship`;
DROP TABLE IF EXISTS `Exam`;
DROP TABLE IF EXISTS `College`;
DROP TABLE IF EXISTS `School`;
DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` smallint NOT NULL AUTO_INCREMENT,
  `username` varchar(10) NOT NULL,
  `displayname` varchar(50) NOT NULL,
  `password` varchar(32) NOT NULL,
  `email` varchar(32) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1000 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

INSERT INTO `users` (`username`, `displayname`, `password`, `email`)
VALUES ('betty', 'Betty Peng', '12345678', 'betty@hotmail.com');

CREATE TABLE `School` (
  `SchID` smallint NOT NULL AUTO_INCREMENT,
  `SchName` varchar(100) NOT NULL,
  `SchCity` varchar(50) NOT NULL,
  `SchState` varchar(50) NOT NULL,
  `SchCountry` varchar(50) NOT NULL,
  `SchPostcode` varchar(10) NOT NULL,
  PRIMARY KEY (`SchID`)
) ENGINE=InnoDB AUTO_INCREMENT=1000 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

INSERT INTO `School` (`SchName`, `SchCity`, `SchState`, `SchCountry`, `SchPostcode`)
VALUES
   ('Yali High School', 'Changsha', 'Hunan', 'China', '410007'),
   ('Changjun Middle School', 'Changsha', 'Hunan', 'China', '410023'),
   ('Changjun Bilingual Experimental Middle School', 'Changsha', 'Hunan', 'China', '410023'),
   ('The Experimental High School Attached To Beijing Normal University', 'Xicheng', 'Beijing', 'China', '100032');


CREATE TABLE `College` (
  `ID` smallint NOT NULL AUTO_INCREMENT,
  `USRanking` smallint DEFAULT NULL,
  `Name` varchar(100) NOT NULL,
  `City` varchar(50) DEFAULT NULL,
  `State` varchar(50) DEFAULT NULL,
  `Country` varchar(50) DEFAULT NULL,
  `UGNumber` smallint DEFAULT NULL,
  `PGNUmber` smallint DEFAULT NULL,
  `RMK` text,
  `Environment` enum('Rural','Urban','Suburb') DEFAULT NULL,
  `QSRanking` smallint DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=1000 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

CREATE TABLE `Exam` (
  `ExamID` smallint NOT NULL AUTO_INCREMENT,
  `ExamDate` date DEFAULT NULL,
  `ExamVenue` varchar(10) DEFAULT NULL,
  `ExamName` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`ExamID`)
) ENGINE=InnoDB AUTO_INCREMENT=1000 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

CREATE TABLE `Requirement` (
  `ReqCode` smallint NOT NULL AUTO_INCREMENT,
  `Requirement` varchar(100) NOT NULL,
  PRIMARY KEY (`ReqCode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

CREATE TABLE `Relationship` (
  `RelationshipID` smallint NOT NULL AUTO_INCREMENT,
  `RelationshipName` varchar(50) NOT NULL,
  PRIMARY KEY (`RelationshipID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

CREATE TABLE `Student` (
  `StuID` smallint NOT NULL AUTO_INCREMENT,
  `StuCategory` enum('A','B','C','NA') DEFAULT NULL,
  `StuCurrentSchID` smallint DEFAULT NULL,
  `Stu1stName` varchar(10) NOT NULL,
  `StuMidName` varchar(10) DEFAULT NULL,
  `StuLastName` varchar(10) NOT NULL,
  `StuPrefName` varchar(10) DEFAULT NULL,
  `StuComments` text DEFAULT NULL,
  `StuDOB` date DEFAULT NULL,
  `StuGender` varchar(5) DEFAULT NULL,
  `StuPhone` varchar(15) DEFAULT NULL,
  `StuEmail` varchar(50) NOT NULL,
  `AppLevel` enum('UG','G','PG','PhD','HS','S','AS','C','O') DEFAULT NULL,
  `AppCountry` enum('US','GB','CA','AU') DEFAULT NULL,
  `StuGPA` decimal(3,2) DEFAULT NULL,
  `StuStreet` varchar(100) DEFAULT NULL,
  `StuCity` varchar(50) DEFAULT NULL,
  `StuState` varchar(50) DEFAULT NULL,
  `StuPostcode` varchar(10) DEFAULT NULL,
  `StuGradSchID` smallint DEFAULT NULL,
  PRIMARY KEY (`StuID`),
  UNIQUE KEY `StuEmail` (`StuEmail`),
  UNIQUE KEY `StuPhone` (`StuPhone`),
  KEY `StuCurrentSchID` (`StuCurrentSchID`),
  KEY `StuGradSchID` (`StuGradSchID`),
  CONSTRAINT `student_ibfk_1` FOREIGN KEY (`StuCurrentSchID`) REFERENCES `School` (`SchID`),
  CONSTRAINT `student_ibfk_2` FOREIGN KEY (`StuGradSchID`) REFERENCES `School` (`SchID`)
) ENGINE=InnoDB AUTO_INCREMENT=1000 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

INSERT INTO `Student` (
  `StuCategory`, `StuCurrentSchID`, `Stu1stName`, `StuLastName`, `StuDOB`,
  `StuGradSchID`, `StuGPA`, `StuPhone`, `StuEmail`, `AppLevel`, `AppCountry`
)
VALUES
  ('A', '1001', 'Betty', 'Peng', '2007-08-13', '1001', 3.4, '+8613512345678', 'betty_peng@hotmail.com', 'UG', 'US'),
  ('B', '1002', 'Betty', 'Reng', '2005-01-13', '1003', 3.6, '+8613581234567', 'betty_reng@hotmail.com', 'PG', 'AU'),
  ('C', '1003', 'Betty', 'Teng', '2008-09-13', NULL, 3.8, '+8613578123456', 'betty_teng@hotmail.com', 'AS', 'GB');

CREATE VIEW `StudentView`
AS
  SELECT
    A.StuID,
    A.StuCategory,
    B.SchName AS StuCurrentSchName,
    A.Stu1stName,
    A.StuLastName,
    A.StuDOB,
    A.StuGender,
    A.StuGPA,
    A.StuPhone,
    A.StuEmail,
    A.AppLevel,
    A.AppCountry,
    A.StuCity,
    A.StuState,
    C.SchName AS StuGradSchName
  FROM Student AS A, School AS B, School AS C
  WHERE
    A.StuCurrentSchID = B.SchID
    AND (
      A.StuGradSchID IS NOT NULL
      AND A.StuGradSchID = C.SchID
    )
  UNION
  SELECT
    A.StuID,
    A.StuCategory,
    B.SchName AS StuCurrentSchName,
    A.Stu1stName,
    A.StuLastName,
    A.StuDOB,
    A.StuGender,
    A.StuGPA,
    A.StuPhone,
    A.StuEmail,
    A.AppLevel,
    A.AppCountry,
    A.StuCity,
    A.StuState,
    NULL AS StuGradSchName
  FROM Student AS A, School AS B
  WHERE
    A.StuCurrentSchID = B.SchID
    AND A.StuGradSchID IS NULL;

CREATE TABLE `Contract` (
  `ContractID` smallint NOT NULL AUTO_INCREMENT,
  `StuID` smallint DEFAULT NULL,
  `StartDate` date DEFAULT NULL,
  `FinishDate` date DEFAULT NULL,
  `Amount` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`ContractID`),
  KEY `StuID` (`StuID`),
  CONSTRAINT `contract_ibfk_1` FOREIGN KEY (`StuID`) REFERENCES `Student` (`StuID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

CREATE TABLE `Program` (
  `PID` smallint NOT NULL AUTO_INCREMENT,
  `ColID` smallint DEFAULT NULL,
  `PName` varchar(100) DEFAULT NULL,
  `PLength` varchar(50) DEFAULT NULL,
  `PLevel` varchar(50) DEFAULT NULL,
  `Link` varchar(100) DEFAULT NULL,
  `AppDeadline` date DEFAULT NULL,
  `PRanking` int DEFAULT NULL,
  PRIMARY KEY (`PID`),
  KEY `ColID` (`ColID`),
  CONSTRAINT `program_ibfk_1` FOREIGN KEY (`ColID`) REFERENCES `College` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

CREATE TABLE `Application` (
  `ID` smallint NOT NULL AUTO_INCREMENT,
  `ContractID` smallint DEFAULT NULL,
  `StuID` smallint DEFAULT NULL,
  `PID` smallint DEFAULT NULL,
  `ColAppDate` date DEFAULT NULL,
  `Status` enum('TBS', 'Submitted','S', 'WL', 'Offer', 'Declined') DEFAULT NULL,
  `RMK` text,
  `AppType` varchar(50) DEFAULT NULL,
  `AppComments` text,
  `VisaAppDate` date DEFAULT NULL,
  `VisaResult` enum('Granted', 'Declined') DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `ContractID` (`ContractID`),
  KEY `StuID` (`StuID`),
  KEY `PID` (`PID`),
  CONSTRAINT `application_ibfk_1` FOREIGN KEY (`ContractID`) REFERENCES `Contract` (`ContractID`),
  CONSTRAINT `application_ibfk_2` FOREIGN KEY (`StuID`) REFERENCES `Student` (`StuID`),
  CONSTRAINT `application_ibfk_3` FOREIGN KEY (`PID`) REFERENCES `Program` (`PID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

CREATE TABLE `Prog_Req` (
  `ID` smallint NOT NULL AUTO_INCREMENT,
  `PID` smallint DEFAULT NULL,
  `ReqCode` smallint DEFAULT NULL,
  `ReqVal` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `PID` (`PID`),
  KEY `ReqCode` (`ReqCode`),
  CONSTRAINT `prog_req_ibfk_1` FOREIGN KEY (`PID`) REFERENCES `Program` (`PID`),
  CONSTRAINT `prog_req_ibfk_2` FOREIGN KEY (`ReqCode`) REFERENCES `Requirement` (`ReqCode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

CREATE TABLE `Stu_Major` (
  `ID` smallint NOT NULL AUTO_INCREMENT,
  `StuID` smallint DEFAULT NULL,
  `Major` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `StuID` (`StuID`),
  CONSTRAINT `stu_major_ibfk_1` FOREIGN KEY (`StuID`) REFERENCES `Student` (`StuID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

CREATE TABLE `Stu_Exam` (
  `ID` smallint NOT NULL AUTO_INCREMENT,
  `ExamID` smallint DEFAULT NULL,
  `ExamScore` decimal(5,2) DEFAULT NULL,
  `ExamDate` date DEFAULT NULL,
  `SendScoreDate` date DEFAULT NULL,
  `StuID` smallint DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `ExamID` (`ExamID`),
  KEY `StuID` (`StuID`),
  CONSTRAINT `stu_exam_ibfk_1` FOREIGN KEY (`StuID`) REFERENCES `Student` (`StuID`),
  CONSTRAINT `stu_exam_ibfk_2` FOREIGN KEY (`ExamID`) REFERENCES `Exam` (`ExamID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

CREATE TABLE `Stu_Relationship` (
  `ID` smallint NOT NULL AUTO_INCREMENT,
  `RelationshipID` smallint DEFAULT NULL,
  `StuID` smallint DEFAULT NULL,
  `RFirstName` varchar(50) DEFAULT NULL,
  `RLastName` varchar(50) DEFAULT NULL,
  `REmail` varchar(50) DEFAULT NULL,
  `RPhone` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `RelationshipID` (`RelationshipID`),
  KEY `StuID` (`StuID`),
  CONSTRAINT `stu_relationship_ibfk_1` FOREIGN KEY (`StuID`) REFERENCES `Student` (`StuID`),
  CONSTRAINT `stu_relationship_ibfk_2` FOREIGN KEY (`RelationshipID`) REFERENCES `Relationship` (`RelationshipID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

CREATE TABLE `Stu_School` (
  `ID` smallint NOT NULL AUTO_INCREMENT,
  `StuID` smallint DEFAULT NULL,
  `SchID` smallint DEFAULT NULL,
  `STARTDATE` date DEFAULT NULL,
  `ENDDATE` date DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `StuID` (`StuID`),
  KEY `SchID` (`SchID`),
  CONSTRAINT `stu_school_ibfk_1` FOREIGN KEY (`StuID`) REFERENCES `Student` (`StuID`),
  CONSTRAINT `stu_school_ibfk_2` FOREIGN KEY (`SchID`) REFERENCES `School` (`SchID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- To ensure the StuCategory to be updated in one direction.

DELIMITER //

CREATE TRIGGER category_transition_restriction
BEFORE UPDATE ON student
FOR EACH ROW
BEGIN
    IF (OLD.StuCategory = 'A' AND NEW.StuCategory IN ('B', 'C', 'NA')) OR
       (OLD.StuCategory = 'B' AND NEW.StuCategory IN ('C', 'NA')) OR
       (OLD.StuCategory = 'C' AND NEW.StuCategory = 'NA') THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Invalid category transition: Cannot go downward';
    END IF;
END//

DELIMITER ;

--To Calculate the sum of the contract amount during a period

DELIMITER //

CREATE PROCEDURE CalculateTotalAmount(
    IN start_date DATE,
    IN finish_date DATE,
    OUT total_amount DECIMAL(10,2)
)
BEGIN
    SELECT SUM(Amount) INTO total_amount
    FROM `Contract`
    WHERE `StartDate` >= start_date AND `FinishDate` <= finish_date;
END //

DELIMITER ;


-- IMplementation of Procedure CalculateTotalAmount

SET @start_date = '2023-01-01';
SET @finish_date = '2023-12-31';
CALL CalculateTotalAmount(@start_date, @finish_date, @total_amount);
SELECT @total_amount AS TotalAmount;


-- Create an Application View
SELECT 
    s.StuID,
    s.Stu1stName,
    s.StuLastName,
    sch.SchName AS StuCurrentSchID,
    c.Amount AS ContractAmount,
    col.Name,
    p.PName,
    p.AppDeadline,
    a.Status
FROM 
    `Application` a
JOIN 
    `Student` s ON a.StuID = s.StuID
JOIN 
    `Contract` c ON a.ContractID = c.ContractID
JOIN 
    `Program` p ON a.PID = p.PID
JOIN 
    `College` col ON p.ColID = col.ID
LEFT JOIN 
    `School` sch ON s.StuCurrentSchID = sch.SchID;