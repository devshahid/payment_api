-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 28, 2022 at 03:02 PM
-- Server version: 10.4.19-MariaDB-log
-- PHP Version: 8.0.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `payment_api`
--

-- --------------------------------------------------------

--
-- Table structure for table `addressess`
--

CREATE TABLE `addressess` (
  `id` int(11) NOT NULL,
  `addressKey` varchar(255) NOT NULL,
  `privateKey` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `crypto_payments`
--

CREATE TABLE `crypto_payments` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `orderID` varchar(250) NOT NULL,
  `productID` varchar(250) DEFAULT NULL,
  `paymentID` varchar(250) DEFAULT NULL,
  `amount` varchar(250) DEFAULT NULL,
  `amountUSD` varchar(250) DEFAULT NULL,
  `boxType` varchar(250) DEFAULT NULL,
  `address` varchar(250) DEFAULT NULL,
  `txID` varchar(250) DEFAULT NULL,
  `coinLabel` varchar(250) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `processed` int(11) DEFAULT NULL,
  `paid` int(11) DEFAULT NULL,
  `expired` int(11) DEFAULT NULL,
  `invoice_time` int(11) UNSIGNED DEFAULT NULL,
  `payment_status` varchar(250) NOT NULL,
  `confirmationNumber` int(11) DEFAULT NULL,
  `callbackurl` varchar(255) DEFAULT NULL,
  `redirecturl` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `addressess`
--
ALTER TABLE `addressess`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `crypto_payments`
--
ALTER TABLE `crypto_payments`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `addressess`
--
ALTER TABLE `addressess`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `crypto_payments`
--
ALTER TABLE `crypto_payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
