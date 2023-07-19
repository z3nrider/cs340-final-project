-- Portfolio Project MySQL Database File
-- Team TD Memetrade
-- Members: Kevin Riemer and Brandon Koehler

-- phpMyAdmin SQL Dump
-- version 5.2.0-1.el7.remi
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 09, 2023 at 10:42 AM
-- Server version: 10.6.11-MariaDB-log
-- PHP Version: 8.2.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";
SET FOREIGN_KEY_CHECKS = 0;
SET AUTOCOMMIT = 0;

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cs340_riemerk`
--

-- --------------------------------------------------------

--
-- Table structure for table `Analysts`
--

CREATE OR REPLACE TABLE `Analysts` (
  `analystID` int(11) NOT NULL,
  `analystName` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `Analysts`
--

INSERT INTO `Analysts` (`analystID`, `analystName`) VALUES
(1, 'Jimmy Buffet'),
(2, 'Warren Cramer'),
(3, 'Leter Pynch'),
(36, 'Jim Smith'),
(37, 'Bill Gates'),
(48, 'Betty White'),
(52, 'Sam Bankman-Fried'),
(55, 'Jimmy Neutron'),
(56, 'Billy Bob'),
(57, 'Spongebob'),
(58, 'Patrick Mahomes'),
(59, 'Arnold Schwarzennegger');

-- --------------------------------------------------------

--
-- Table structure for table `MarketIndexes`
--

CREATE OR REPLACE TABLE `MarketIndexes` (
  `indexID` int(11) NOT NULL,
  `indexName` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `MarketIndexes`
--

INSERT INTO `MarketIndexes` (`indexID`, `indexName`) VALUES
(1, 'S&P 500'),
(2, 'NASDAQ'),
(3, 'DJIA'),
(4, 'Other'),
(5, 'Poors'),
(8, 'Riches'),
(16, 'Fake'),
(17, 'Faker');

-- --------------------------------------------------------

--
-- Table structure for table `MarketSectors`
--

CREATE OR REPLACE TABLE `MarketSectors` (
  `sectorID` int(11) NOT NULL,
  `sectorName` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `MarketSectors`
--

INSERT INTO `MarketSectors` (`sectorID`, `sectorName`) VALUES
(1, 'Energy'),
(2, 'Industrial'),
(3, 'Consumer Discretionary'),
(4, 'Technology'),
(5, 'Memesphere');

-- --------------------------------------------------------

--
-- Table structure for table `Stocks`
--

CREATE OR REPLACE TABLE `Stocks` (
  `stockID` int(11) NOT NULL,
  `stockName` varchar(145) NOT NULL,
  `stockSymbol` varchar(10) NOT NULL,
  `currentPrice` decimal(19,2) NOT NULL,
  `highPrice` decimal(19,2) NOT NULL,
  `lowPrice` decimal(19,2) NOT NULL,
  `sectorID` int(11) DEFAULT NULL,
  `MarketIndexes_indexID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `Stocks`
--

INSERT INTO `Stocks` (`stockID`, `stockName`, `stockSymbol`, `currentPrice`, `highPrice`, `lowPrice`, `sectorID`, `MarketIndexes_indexID`) VALUES
(59, 'Bed, Bath, and Beyond', 'BBBY', '3.06', '30.06', '1.27', 5, 2),
(62, 'Exxon Mobile Co.', 'XOM', '114.50', '117.78', '74.03', 1, 1),
(65, 'Apple', 'AAPL', '130.00', '179.61', '124.17', 4, 1),
(74, 'Tesla', 'TSLA', '193.00', '412.00', '109.00', 2, 1),
(75, 'Microsoft', 'MSFT', '253.88', '315.43', '202.31', 4, 1),
(85, 'test', 'test', '11.00', '16.00', '6.00', 3, 5);

-- --------------------------------------------------------

--
-- Table structure for table `Stocks_has_Analysts`
--

CREATE OR REPLACE TABLE `Stocks_has_Analysts` (
  `Stocks_stockID` int(11) NOT NULL,
  `Stocks_MarketIndexes_indexID` int(11) NOT NULL,
  `Analysts_analystID` int(11) NOT NULL,
  `rocketRating` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `Stocks_has_Analysts`
--

INSERT INTO `Stocks_has_Analysts` (`Stocks_stockID`, `Stocks_MarketIndexes_indexID`, `Analysts_analystID`, `rocketRating`) VALUES
(59, 2, 1, 3),
(62, 1, 57, 4),
(65, 1, 1, 3),
(65, 1, 2, 2),
(75, 1, 58, 5);

-- --------------------------------------------------------

--
-- Table structure for table `Stocks_has_MarketSectors`
--

CREATE OR REPLACE TABLE `Stocks_has_MarketSectors` (
  `Stocks_stockID` int(11) NOT NULL,
  `MarketSectors_sectorID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `Stocks_has_MarketSectors`
--

INSERT INTO `Stocks_has_MarketSectors` (`Stocks_stockID`, `MarketSectors_sectorID`) VALUES
(59, 5),
(62, 1),
(65, 4),
(75, 4);

-- --------------------------------------------------------

--
-- Table structure for table `Subscribers`
--

CREATE OR REPLACE TABLE `Subscribers` (
  `subscriberID` int(11) NOT NULL,
  `firstName` varchar(145) NOT NULL,
  `lastName` varchar(145) NOT NULL,
  `subscribeDate` date NOT NULL,
  `Analysts_analystID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `Subscribers`
--

INSERT INTO `Subscribers` (`subscriberID`, `firstName`, `lastName`, `subscribeDate`, `Analysts_analystID`) VALUES
(1, 'Daniela', 'Nguyen', '2019-04-11', 1),
(2, 'Cruz', 'Hess', '2017-01-03', 2),
(3, 'Amaan', 'Carson', '2023-02-21', 2),
(4, 'Roberta', 'Lucas', '2020-12-05', 1),
(5, 'Dalton', 'Davis', '2020-11-19', 3),
(30, 'John', 'Smith', '2023-03-02', 3),
(31, 'Jack', 'Black', '2023-03-01', 37),
(32, 'John', 'Wick', '2023-03-01', 48),
(33, 'Mick', 'Jagger', '2023-03-04', 2),
(34, 'Tom', 'Cruise', '2023-03-06', 48),
(35, 'Tom', 'Hanks', '2023-03-08', 56),
(36, 'Arya', 'Ha', '2023-03-21', 56),
(37, 'Jim', 'Carrey', '2023-03-10', 48),
(38, 'Steve', 'Carrell', '2023-03-30', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Analysts`
--
ALTER TABLE `Analysts`
  ADD PRIMARY KEY (`analystID`),
  ADD UNIQUE KEY `analystID_UNIQUE` (`analystID`);

--
-- Indexes for table `MarketIndexes`
--
ALTER TABLE `MarketIndexes`
  ADD PRIMARY KEY (`indexID`),
  ADD UNIQUE KEY `indexID_UNIQUE` (`indexID`);

--
-- Indexes for table `MarketSectors`
--
ALTER TABLE `MarketSectors`
  ADD PRIMARY KEY (`sectorID`),
  ADD UNIQUE KEY `sectorID_UNIQUE` (`sectorID`);

--
-- Indexes for table `Stocks`
--
ALTER TABLE `Stocks`
  ADD PRIMARY KEY (`stockID`,`MarketIndexes_indexID`),
  ADD UNIQUE KEY `stockID_UNIQUE` (`stockID`),
  ADD KEY `fk_Stocks_MarketIndexes1_idx` (`MarketIndexes_indexID`);

--
-- Indexes for table `Stocks_has_Analysts`
--
ALTER TABLE `Stocks_has_Analysts`
  ADD PRIMARY KEY (`Stocks_stockID`,`Stocks_MarketIndexes_indexID`,`Analysts_analystID`),
  ADD KEY `fk_Stocks_has_Analysts_Analysts1_idx` (`Analysts_analystID`),
  ADD KEY `fk_Stocks_has_Analysts_Stocks1_idx` (`Stocks_stockID`,`Stocks_MarketIndexes_indexID`);

--
-- Indexes for table `Stocks_has_MarketSectors`
--
ALTER TABLE `Stocks_has_MarketSectors`
  ADD PRIMARY KEY (`Stocks_stockID`,`MarketSectors_sectorID`),
  ADD KEY `fk_Stocks_has_MarketSectors_MarketSectors1_idx` (`MarketSectors_sectorID`),
  ADD KEY `fk_Stocks_has_MarketSectors_Stocks1_idx` (`Stocks_stockID`);

--
-- Indexes for table `Subscribers`
--
ALTER TABLE `Subscribers`
  ADD PRIMARY KEY (`subscriberID`) USING BTREE,
  ADD UNIQUE KEY `subscriberID_UNIQUE` (`subscriberID`),
  ADD KEY `fk_Subscribers_Analysts` (`Analysts_analystID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Analysts`
--
ALTER TABLE `Analysts`
  MODIFY `analystID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT for table `MarketIndexes`
--
ALTER TABLE `MarketIndexes`
  MODIFY `indexID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `MarketSectors`
--
ALTER TABLE `MarketSectors`
  MODIFY `sectorID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `Stocks`
--
ALTER TABLE `Stocks`
  MODIFY `stockID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;

--
-- AUTO_INCREMENT for table `Subscribers`
--
ALTER TABLE `Subscribers`
  MODIFY `subscriberID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Stocks`
--
ALTER TABLE `Stocks`
  ADD CONSTRAINT `fk_Stocks_MarketIndexes1` FOREIGN KEY (`MarketIndexes_indexID`) REFERENCES `MarketIndexes` (`indexID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `Stocks_has_Analysts`
--
ALTER TABLE `Stocks_has_Analysts`
  ADD CONSTRAINT `fk_Stocks_has_Analysts_Analysts1` FOREIGN KEY (`Analysts_analystID`) REFERENCES `Analysts` (`analystID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_Stocks_has_Analysts_Stocks1` FOREIGN KEY (`Stocks_stockID`,`Stocks_MarketIndexes_indexID`) REFERENCES `Stocks` (`stockID`, `MarketIndexes_indexID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Stocks_has_MarketSectors`
--
ALTER TABLE `Stocks_has_MarketSectors`
  ADD CONSTRAINT `fk_Stocks_has_MarketSectors_MarketSectors1` FOREIGN KEY (`MarketSectors_sectorID`) REFERENCES `MarketSectors` (`sectorID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_Stocks_has_MarketSectors_Stocks1` FOREIGN KEY (`Stocks_stockID`) REFERENCES `Stocks` (`stockID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Subscribers`
--
ALTER TABLE `Subscribers`
  ADD CONSTRAINT `fk_Subscribers_Analysts` FOREIGN KEY (`Analysts_analystID`) REFERENCES `Analysts` (`analystID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_Subscribers_Analysts1` FOREIGN KEY (`Analysts_analystID`) REFERENCES `Analysts` (`analystID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Subscribers_Analysts2` FOREIGN KEY (`Analysts_analystID`) REFERENCES `Analysts` (`analystID`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
