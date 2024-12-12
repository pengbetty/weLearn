DROP DATABASE weLearn;
CREATE DATABASE IF NOT EXISTS weLearn CHARACTER SET utf8mb4 DEFAULT COLLATE utf8mb4_bin;
USE weLearn;

CREATE TABLE `user` (
  `userId` smallint NOT NULL AUTO_INCREMENT,
  `userName` varchar(10) NOT NULL,
  `displayName` varchar(50),
  `password` varchar(100) NOT NULL,
  `email` varchar(32) DEFAULT NULL,
  `role` varchar(10) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=1000 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;




CREATE TABLE `contract` (
  `contractID` smallint NOT NULL AUTO_INCREMENT,
  `userID` smallint DEFAULT NULL,
  `startDate` date DEFAULT NULL,
  `finishDate` date DEFAULT NULL,
  `agent` varchar(20) DEFAULT NULL,
  `contractName` varchar(100) DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`contractID`),
  KEY `userID` (`userID`),
  CONSTRAINT `contract_users_1` FOREIGN KEY (`UserID`) REFERENCES `user` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

CREATE TABLE `school` (
  `schID` smallint NOT NULL AUTO_INCREMENT,
  `schName` varchar(100) NOT NULL,
  `schCity` varchar(50) NOT NULL,
  `schState` varchar(50) NOT NULL,
  `schCountry` varchar(50) NOT NULL,
  `schPostcode` varchar(10) NOT NULL,
  PRIMARY KEY (`SchID`)
) ENGINE=InnoDB AUTO_INCREMENT=1000 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

INSERT INTO `school` (`schName`, `schCity`, `schState`, `schCountry`, `schPostcode`)
VALUES
   ('Yali High School', 'Changsha', 'Hunan', 'China', '410007'),
   ('Changjun Middle School', 'Changsha', 'Hunan', 'China', '410023'),
   ('Changjun Bilingual Experimental Middle School', 'Changsha', 'Hunan', 'China', '410023'),
   ('The Experimental High School Attached To Beijing Normal University', 'Xicheng', 'Beijing', 'China', '100032');

/* Student Table has 21 fields */

CREATE TABLE `student` (
  `stuID` smallint NOT NULL AUTO_INCREMENT,
  `contractID` smallint NOT NULL,
  `stu1stName` varchar(10),
  `stuMidName` varchar(20),
  `stuLastName` varchar(20),
  `stuPrefName` varchar(15),
  `stuCategory` enum('A','B','C','NA') DEFAULT NULL,
  `stuCurrentSchID` smallint DEFAULT NULL,
  `stuComments` text DEFAULT NULL,
  `stuDOB` date DEFAULT NULL,
  `stuGender` varchar(5) DEFAULT NULL,
  `stuPhone` varchar(15) DEFAULT NULL,
  `stuEmail` varchar(50) NOT NULL,
  `appLevel` enum('UG','PG','PhD','HS','Diploma','Certificate','Other') DEFAULT NULL,
  `appCountry` enum('US','GB','CA','AU') DEFAULT NULL,
  `stuGPA` decimal(3,2) DEFAULT NULL,
  `stuStreet` varchar(100) DEFAULT NULL,
  `stuCity` varchar(50) DEFAULT NULL,
  `stuState` varchar(10) DEFAULT NULL,
  `stuPostcode` varchar(10) DEFAULT NULL,
  `stuGradSchID` smallint DEFAULT NULL,
  PRIMARY KEY (`stuID`),
  UNIQUE KEY `stuEmail` (`stuEmail`),
  UNIQUE KEY `stuPhone` (`stuPhone`),
  CONSTRAINT `student_school_1` FOREIGN KEY (`stuCurrentSchID`) REFERENCES `school` (`schID`),
  CONSTRAINT `student_school_2` FOREIGN KEY (`stuGradSchID`) REFERENCES `school` (`schID`),
  CONSTRAINT `student_contract_1` FOREIGN KEY (`contractID`) REFERENCES `contract` (`contractID`)
) ENGINE=InnoDB AUTO_INCREMENT=1000 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

CREATE TABLE `college` (
  `collegeID` smallint NOT NULL AUTO_INCREMENT,
  `collegeName` varchar(100) NOT NULL,
  `city` varchar(50) DEFAULT NULL,
  `state` varchar(50) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  `ugNumber` smallint DEFAULT NULL,
  `pgNUmber` smallint DEFAULT NULL,
  `collegeLink` varchar(100) DEFAULT NULL,
  `environment` enum('Rural','Urban','Suburb') DEFAULT NULL,
  `usRanking` smallint DEFAULT NULL,
  `qsRanking` smallint DEFAULT NULL,
  PRIMARY KEY (`collegeID`)
) ENGINE=InnoDB AUTO_INCREMENT=1000 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;


CREATE TABLE `program` (
  `programID` smallint NOT NULL AUTO_INCREMENT,
  `collegeID` smallint DEFAULT NULL,
  `programName` varchar(100) DEFAULT NULL,
  `programLength` varchar(50) DEFAULT NULL,
  `programLevel` enum('UG','PG','PhD','HS','Diploma','Certificate','Other')  DEFAULT NULL,
  `programlink` varchar(200) DEFAULT NULL,
  `appDeadline` date DEFAULT NULL,
  `programRanking` int DEFAULT NULL,
  PRIMARY KEY (`programID`),
  KEY `CollegeID` (`CollegeID`),
  CONSTRAINT `program_college_1` FOREIGN KEY (`collegeID`) REFERENCES `college` (`collegeID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;


CREATE TABLE `application` (
  `appID` smallint NOT NULL AUTO_INCREMENT,
  `contractID` smallint DEFAULT NULL,
  `stuID` smallint DEFAULT NULL,
  `programID` smallint DEFAULT NULL,
  `appDate` date DEFAULT NULL,
  `status` enum('In Progress', 'Submitted','Assessing','Further Action', 'Ok', 'Declined') DEFAULT NULL,
  `appType` enum('Visa', 'Offer', 'Other') DEFAULT NULL,
  `appComments` text,
  `outcomeDate` date DEFAULT NULL,
  PRIMARY KEY (`appID`),
  KEY `contractID` (`contractID`),
  KEY `stuID` (`stuID`),
  KEY `programID` (`programID`),
  CONSTRAINT `application_contract_1` FOREIGN KEY (`contractID`) REFERENCES `contract` (`contractID`),
  CONSTRAINT `application_student_2` FOREIGN KEY (`stuID`) REFERENCES `student` (`stuID`),
  CONSTRAINT `application_program_3` FOREIGN KEY (`programID`) REFERENCES `program` (`programID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
