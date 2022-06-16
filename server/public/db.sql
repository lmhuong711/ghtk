CREATE TABLE `student` (
  `idstudent` int NOT NULL AUTO_INCREMENT,
  `school` varchar(45) DEFAULT NULL,
  `district` varchar(45) DEFAULT NULL,
  `studentCode` varchar(45) DEFAULT NULL,
  `class` varchar(45) DEFAULT NULL,
  `fullname` varchar(45) DEFAULT NULL,
  `dob` varchar(45) DEFAULT NULL,
  `gender` varchar(45) DEFAULT NULL,
  `birthplace` varchar(45) DEFAULT NULL,
  `ethnic` varchar(45) DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `marks` varchar(45) DEFAULT NULL,
  `note` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idstudent`),
  UNIQUE KEY `idstudent_UNIQUE` (`idstudent`),
  UNIQUE KEY `studentCode_UNIQUE` (`studentCode`)
) ENGINE=InnoDB AUTO_INCREMENT=1256 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;