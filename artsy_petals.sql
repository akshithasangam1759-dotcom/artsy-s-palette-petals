-- MySQL dump 10.13  Distrib 8.4.8, for Win64 (x86_64)
--
-- Host: localhost    Database: artsy_petals
-- ------------------------------------------------------
-- Server version	8.4.8

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bouquets`
--

DROP TABLE IF EXISTS `bouquets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bouquets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `emoji` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT '????',
  `flowers` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `price` decimal(10,2) NOT NULL,
  `tag` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bouquets`
--

LOCK TABLES `bouquets` WRITE;
/*!40000 ALTER TABLE `bouquets` DISABLE KEYS */;
INSERT INTO `bouquets` VALUES (1,'Romantic Roses','????','Red Roses, Baby\'s Breath, Eucalyptus','Classic romance in every petal',1299.00,'Bestseller',NULL,1,'2026-03-26 15:41:18'),(2,'Lavender Dream','????','Lavender, White Peonies, Lilac','A dreamy blend of calm and beauty',1099.00,'Popular',NULL,1,'2026-03-26 15:41:18'),(3,'Spring Garden Mix','????','Tulips, Daisies, Iris, Greenery','A burst of spring freshness',999.00,'Seasonal',NULL,1,'2026-03-26 15:41:18'),(4,'Sunflower Joy','????','Sunflowers, Orange Roses, Marigold','Bright and cheerful arrangement',899.00,'Happy Pick',NULL,1,'2026-03-26 15:41:18'),(5,'Peony Paradise','????','Pink Peonies, Blush Roses, Ranunculus','Luxuriously soft and romantic',1499.00,'Premium',NULL,1,'2026-03-26 15:41:18'),(6,'Orchid Elegance','????','Purple Orchids, Anthuriums, Palms','Exotic sophistication in a vase',1799.00,'Luxury',NULL,1,'2026-03-26 15:41:18'),(7,'Wildflower Whisper','????','Daisies, Cosmos, Cornflowers, Herbs','Free-spirited meadow charm',799.00,'Whimsical',NULL,1,'2026-03-26 15:41:18'),(8,'Blush & Bloom','????','Blush Roses, Peonies, Sweet Peas','The perfect soft romantic gift',1199.00,'Gift Pick',NULL,1,'2026-03-26 15:41:18'),(9,'Romantic Roses','­ƒî╣','Red Roses, Baby\'s Breath, Eucalyptus','Classic romance in every petal',1299.00,'Bestseller',NULL,1,'2026-03-27 08:06:37'),(10,'Lavender Dream','­ƒÆ£','Lavender, White Peonies, Lilac','A dreamy blend of calm and beauty',1099.00,'Popular',NULL,1,'2026-03-27 08:06:37'),(11,'Spring Garden Mix','­ƒîÀ','Tulips, Daisies, Iris, Greenery','A burst of spring freshness',999.00,'Seasonal',NULL,1,'2026-03-27 08:06:37'),(12,'Sunflower Joy','­ƒî╗','Sunflowers, Orange Roses, Marigold','Bright and cheerful arrangement',899.00,'Happy Pick',NULL,1,'2026-03-27 08:06:37'),(13,'Peony Paradise','­ƒî©','Pink Peonies, Blush Roses, Ranunculus','Luxuriously soft and romantic',1499.00,'Premium',NULL,1,'2026-03-27 08:06:37'),(14,'Orchid Elegance','­ƒ¬À','Purple Orchids, Anthuriums, Palms','Exotic sophistication in a vase',1799.00,'Luxury',NULL,1,'2026-03-27 08:06:37'),(15,'Wildflower Whisper','­ƒî╝','Daisies, Cosmos, Cornflowers, Herbs','Free-spirited meadow charm',799.00,'Whimsical',NULL,1,'2026-03-27 08:06:37'),(16,'Blush & Bloom','­ƒî║','Blush Roses, Peonies, Sweet Peas','The perfect soft romantic gift',1199.00,'Gift Pick',NULL,1,'2026-03-27 08:06:37');
/*!40000 ALTER TABLE `bouquets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact_messages`
--

DROP TABLE IF EXISTS `contact_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact_messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `message` text COLLATE utf8mb4_unicode_ci,
  `replied` tinyint(1) DEFAULT '0',
  `sent_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact_messages`
--

LOCK TABLES `contact_messages` WRITE;
/*!40000 ALTER TABLE `contact_messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `contact_messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `type` enum('preset','custom') COLLATE utf8mb4_unicode_ci DEFAULT 'preset',
  `bouquet_id` int DEFAULT NULL,
  `custom_details` json DEFAULT NULL,
  `delivery_date` date DEFAULT NULL,
  `delivery_message` text COLLATE utf8mb4_unicode_ci,
  `total_price` decimal(10,2) NOT NULL,
  `payment_method` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT 'UPI',
  `status` enum('pending','confirmed','processing','delivered','cancelled') COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `bouquet_id` (`bouquet_id`),
  KEY `idx_user_orders` (`user_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`bouquet_id`) REFERENCES `bouquets` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `saved_bouquets`
--

DROP TABLE IF EXISTS `saved_bouquets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `saved_bouquets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `name` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT 'My Custom Bouquet',
  `custom_details` json NOT NULL,
  `price_estimate` decimal(10,2) DEFAULT NULL,
  `saved_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `saved_bouquets_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `saved_bouquets`
--

LOCK TABLES `saved_bouquets` WRITE;
/*!40000 ALTER TABLE `saved_bouquets` DISABLE KEYS */;
/*!40000 ALTER TABLE `saved_bouquets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password_hash` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `avatar_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `idx_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wishlist`
--

DROP TABLE IF EXISTS `wishlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wishlist` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `bouquet_id` int NOT NULL,
  `added_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_wish` (`user_id`,`bouquet_id`),
  KEY `bouquet_id` (`bouquet_id`),
  CONSTRAINT `wishlist_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `wishlist_ibfk_2` FOREIGN KEY (`bouquet_id`) REFERENCES `bouquets` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wishlist`
--

LOCK TABLES `wishlist` WRITE;
/*!40000 ALTER TABLE `wishlist` DISABLE KEYS */;
/*!40000 ALTER TABLE `wishlist` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-27 14:11:15
