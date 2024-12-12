
DROP database IF EXISTS `WeLearnB`;
CREATE DATABASE `WeLearnB` CHARACTER SET utf8mb4 DEFAULT COLLATE utf8mb4_bin;
USE `WeLearnB`;
--

CREATE TABLE `users` (
  `userID` smallint NOT NULL AUTO_INCREMENT,
  `userName` varchar(10) NOT NULL,
  `displayName` varchar(50) NOT NULL,
  `password` varchar(15) NOT NULL,
  `email` varchar(32) DEFAULT NULL,
  `role` enum ('Agent', 'Student', 'Administrator'),
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`userId`)
) AUTO_INCREMENT=1000 



