-- MySQL dump 10.17  Distrib 10.3.14-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: voitura
-- ------------------------------------------------------
-- Server version	10.3.14-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ads`
--

DROP TABLE IF EXISTS `ads`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ads` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `start_date` datetime NOT NULL DEFAULT current_timestamp(),
  `end_date` datetime NOT NULL,
  `status` int(11) NOT NULL DEFAULT 0,
  `price` double(8,2) NOT NULL,
  `car_id` int(10) unsigned NOT NULL,
  `city_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `user_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ads_car_id_foreign` (`car_id`),
  KEY `ads_city_id_foreign` (`city_id`),
  KEY `ads_user_id_foreign` (`user_id`),
  CONSTRAINT `ads_car_id_foreign` FOREIGN KEY (`car_id`) REFERENCES `cars` (`id`),
  CONSTRAINT `ads_city_id_foreign` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`),
  CONSTRAINT `ads_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ads`
--

LOCK TABLES `ads` WRITE;
/*!40000 ALTER TABLE `ads` DISABLE KEYS */;
INSERT INTO `ads` VALUES (1,'Mon annonce super !','2019-05-12 15:30:15','2019-05-16 01:00:15',3,400.00,1,3,'2019-05-02 07:53:57','2019-05-12 16:15:03',1),(2,'Annonce spéciale fete du travail !','2019-05-12 15:30:15','2019-05-12 01:00:15',2,1070.00,2,1,'2019-05-02 07:55:26','2019-05-10 20:20:38',1),(3,'Description de notre annonce speciale !','2019-05-12 01:00:15','2019-04-11 11:00:15',2,1000.00,2,2,'2019-05-02 07:59:54','2019-05-12 01:36:05',1),(4,'Description de notre annonce speciale !','2019-05-12 15:30:15','2019-05-16 15:30:15',3,1500.00,1,1,'2019-05-02 08:02:25','2019-05-12 16:15:12',1),(5,'Une super description d\'annonce','2019-05-12 15:30:15','2019-05-16 15:30:15',3,700.00,1,1,'2019-05-09 03:48:35','2019-05-12 17:15:13',1),(6,'Une super description d\'annonce','2019-05-12 15:30:15','2019-05-16 15:30:15',3,1500.00,2,3,'2019-05-09 03:49:08','2019-05-11 04:59:18',1),(7,'Une super description d\'annonce. Une super description d\'annonce','2019-05-07 10:55:05','2019-05-09 05:20:05',3,1200.00,1,3,'2019-05-09 03:55:39','2019-05-11 17:15:02',1),(8,'Super annonce boom','2019-05-11 13:50:15','2019-05-12 10:00:00',3,1500.00,2,3,'2019-05-10 20:24:18','2019-05-11 15:35:09',1),(9,'Une super annonce juste pour les clients sérieux','2019-05-11 15:30:15','2019-05-11 18:30:15',3,150.00,1,1,'2019-05-10 20:37:08','2019-05-11 15:35:09',1),(10,'gfdjhfghjfhg','2019-05-13 11:00:00','2019-05-15 10:00:00',3,1000.00,1,9,'2019-05-12 01:07:50','2019-05-13 11:15:08',1),(11,'Annonce reservée aux client serieux !','2019-05-13 11:00:00','2019-05-14 09:00:00',3,100.00,5,4,'2019-05-12 23:18:56','2019-05-13 15:15:11',11),(12,'Une annonce pour les professionnels','2019-05-14 11:15:00','2019-05-16 10:00:00',1,500.00,4,8,'2019-05-12 23:19:51','2019-05-13 10:20:40',11),(13,'Chez moi tout marche visiblement !','2019-05-17 11:00:00','2019-05-19 11:00:00',1,600.00,6,8,'2019-05-12 23:24:41','2019-05-13 10:21:24',11),(14,'Chez moi tout marche visiblement ! Chez moi tout marche visiblement ! Chez moi tout marche visiblement !','2019-05-13 22:00:00','2019-05-15 23:00:00',3,1000.00,4,9,'2019-05-12 23:27:28','2019-05-13 22:15:13',11),(15,'Une annonce juste pour les professionnels ! Une annonce juste pour les professionnels! Une annonce juste pour les professionnels ! Une annonce juste pour les professionnels !','2019-05-14 08:00:00','2019-05-14 19:00:00',0,500.00,7,6,'2019-05-13 10:33:39','2019-05-13 13:15:02',13),(16,'Une annonce pour les PRO !','2019-05-14 21:00:00','2019-05-15 08:00:00',1,1000.00,7,5,'2019-05-13 10:36:30','2019-05-13 10:54:50',13),(17,'Une annonce professionnelle exclusive','2019-05-15 23:20:00','2019-05-16 10:15:00',0,1500.00,7,10,'2019-05-13 10:37:39','2019-05-13 10:37:39',13),(18,'Une annonce professionnelle exclusive ! Une annonce professionnelle exclusive','2019-05-15 22:00:00','2019-05-15 23:00:00',0,600.00,2,7,'2019-05-13 10:41:36','2019-05-13 10:41:36',1),(19,'Une annonce professionnelle exclusive ! Une annonce professionnelle exclusive','2019-05-15 11:20:00','2019-05-16 15:00:00',0,1000.00,1,13,'2019-05-13 10:43:20','2019-05-13 10:43:20',1),(20,'Une annonce professionnelle exclusive ! Une annonce professionnelle exclusive','2019-05-16 09:20:00','2019-05-16 11:30:00',0,750.00,1,2,'2019-05-13 10:44:35','2019-05-13 10:44:35',1),(21,'Une annonce professionnelle exclusive ! Une annonce professionnelle exclusive','2019-05-14 11:00:00','2019-05-14 16:21:00',0,100.00,8,6,'2019-05-13 10:47:32','2019-05-13 10:47:32',9),(22,'Une annonce professionnelle exclusive .... Une annonce professionnelle exclusive','2019-05-15 19:00:00','2019-05-16 11:55:00',0,1200.00,8,4,'2019-05-13 10:48:18','2019-05-13 14:15:02',9),(23,'Une annonce professionnelle exclusive !','2019-05-18 23:00:00','2019-05-21 23:00:00',0,1200.00,7,11,'2019-05-13 10:49:32','2019-05-13 10:49:32',13),(24,'Une annonce professionnelle exclusive ! Une annonce professionnelle exclusive !','2019-05-23 23:00:00','2019-05-25 11:00:00',1,1200.00,7,6,'2019-05-13 10:51:31','2019-05-13 10:55:35',13),(25,'Une annonce professionnelle exclusive .','2019-05-31 00:19:00','2019-06-02 11:00:00',0,3500.00,7,9,'2019-05-13 10:59:21','2019-05-13 10:59:21',13),(26,'Une annonce professionnelle exclusive ! Une annonce professionnelle exclusive !','2019-06-12 11:00:00','2019-06-14 11:00:00',0,1000.00,1,8,'2019-05-13 11:01:05','2019-05-13 11:01:05',1),(27,'Une annonce professionnelle exclusive !','2019-06-05 11:00:00','2019-06-08 00:00:00',0,4500.00,7,3,'2019-05-13 11:01:35','2019-05-13 11:01:35',13),(28,'Une annonce professionnelle exclusive','2019-07-16 11:00:00','2019-07-20 11:00:00',0,3500.00,7,5,'2019-05-13 11:02:35','2019-05-13 11:02:35',13),(29,'$$$ Une annonce professionnelle exclusive ! Une annonce professionnelle exclusive  $$$','2019-07-03 11:00:00','2019-07-05 11:00:00',0,700.00,2,9,'2019-05-13 11:04:10','2019-05-13 11:04:10',1),(30,'$$$ PRO : PRO ---- Une annonce professionnelle exclusive ! ---- $$','2019-05-18 00:00:00','2019-05-20 00:00:00',0,1550.00,5,11,'2019-05-13 11:07:39','2019-05-13 11:07:39',11),(31,'$$$ PRO : PRO ---- Une annonce professionnelle exclusive ! ---- $$','2019-09-18 11:20:00','2019-09-20 11:15:00',0,800.00,2,1,'2019-05-13 11:08:28','2019-05-13 11:08:28',1),(32,'$$$ PRO : PRO ---- Une annonce professionnelle exclusive ! ---- $$','2019-09-17 23:00:00','2019-09-20 11:00:00',0,5500.00,1,13,'2019-05-13 11:10:59','2019-05-13 11:10:59',1);
/*!40000 ALTER TABLE `ads` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cars`
--

DROP TABLE IF EXISTS `cars`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cars` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `brand` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `production_year` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mileage` int(11) DEFAULT NULL,
  `color` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `category` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `matricule` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `transmission` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `motor` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `airbag` tinyint(1) NOT NULL DEFAULT 0,
  `centralized` tinyint(1) NOT NULL DEFAULT 0,
  `abs` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cars_user_id_foreign` (`user_id`),
  CONSTRAINT `cars_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cars`
--

LOCK TABLES `cars` WRITE;
/*!40000 ALTER TABLE `cars` DISABLE KEYS */;
INSERT INTO `cars` VALUES (1,1,'Acura','CL_MODELS','2019',1000,'olive','BERLINE','61598DSA','TRANSMISSION ARRIÈRE','GASOIL',1,1,0,'2019-04-19 16:45:24','2019-04-19 16:45:24'),(2,1,'Ford','ALFA8C','2016',220,'olive','4X4/ SUV','DE1598DSA','TRANSMISSION ARRIÈRE','GASOIL',0,1,1,'2019-04-19 16:47:18','2019-04-19 16:47:18'),(3,4,'Alfa Romeo','2.2CL','2017',3441,'green','BERLINE','DE1598DSA','TRANSMISSION ARRIÈRE','GASOIL',1,1,1,'2019-04-22 08:00:29','2019-04-22 08:00:29'),(4,11,'Dodge','DEFAULT','2017',1,'green','BERLINE','DE1598DSA','TRANSMISSION AVANT','GASOIL',0,1,1,'2019-05-12 22:48:33','2019-05-12 22:48:33'),(5,11,'Citroen','DEFAULT','2019',1000,'yellow','BERLINE','615SESAA','TRANSMISSION AVANT','GASOIL',0,1,1,'2019-05-12 23:16:59','2019-05-12 23:16:59'),(6,11,'Alfa Romeo','ALFAOTH','2015',1000,'green','MONOSPACE','DE1598DSA','TRANSMISSION INTÉGRALE','BIOCARBURANT',1,1,1,'2019-05-12 23:23:48','2019-05-12 23:23:48'),(7,13,'Hyundai','DEFAULT','2013',150,'olive','4X4/ SUV','GEDDSAA','TRANSMISSION AVANT','HYBRIDE',1,0,1,'2019-05-13 10:31:47','2019-05-13 10:31:47'),(8,9,'Renault','DEFAULT','2016',1500,'yellow','4X4/ SUV','61598DSA','TRANSMISSION INTÉGRALE','GASOIL',0,1,1,'2019-05-13 10:46:48','2019-05-13 10:46:48');
/*!40000 ALTER TABLE `cars` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cities`
--

DROP TABLE IF EXISTS `cities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cities` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cities`
--

LOCK TABLES `cities` WRITE;
/*!40000 ALTER TABLE `cities` DISABLE KEYS */;
INSERT INTO `cities` VALUES (1,'Tetouan','Une ville tres belle','2019-04-19 17:30:23','2019-04-19 17:30:23'),(2,'Tanger','Une ville tres belle','2019-04-19 17:30:33','2019-04-19 17:30:33'),(3,'Marrakesh','Une ville tres belle','2019-04-19 17:30:48','2019-04-19 17:30:48'),(4,'Emersonbury','Sapiente mollitia ut deleniti dolorem voluptas. Quidem soluta ducimus labore dolorum autem veritatis doloribus et.','2019-05-11 12:07:17','2019-05-11 12:07:17'),(5,'Vestaburgh','Ut omnis non accusantium. Fuga placeat illum dolorem.','2019-05-11 12:07:17','2019-05-11 12:07:17'),(6,'Huelberg','Quaerat quasi laboriosam molestiae ducimus porro. Asperiores quo accusamus alias enim. Et consequatur vel tenetur et ipsa. Maxime deleniti ea et vitae.','2019-05-11 12:09:35','2019-05-11 12:09:35'),(7,'New Armandside','Inventore aut perferendis non quis consequatur qui molestiae laudantium. Ut modi aut quia aliquid debitis ullam officia ea.','2019-05-11 12:09:35','2019-05-11 12:09:35'),(8,'South Verdie','Blanditiis beatae doloremque omnis ipsam omnis. Quia facilis et quia ex dolores eveniet reprehenderit. Repudiandae quae eum quia fugit enim.','2019-05-11 12:10:13','2019-05-11 12:10:13'),(9,'Rennerhaven','Natus placeat voluptas cum et. Accusamus qui maiores repudiandae cupiditate asperiores sit eveniet impedit. Nam ut qui nobis ex. Praesentium laboriosam vel assumenda sit corporis.','2019-05-11 12:10:13','2019-05-11 12:10:13'),(10,'Moriahhaven','Porro blanditiis et ut dolorem. Quibusdam quia ipsum quia corrupti in. Eveniet excepturi omnis aliquid numquam.','2019-05-11 12:10:29','2019-05-11 12:10:29'),(11,'Ernserville','Recusandae facere quae ut assumenda quibusdam suscipit dicta in. Fuga vel facere tempore pariatur nemo cupiditate quia. Pariatur eaque rem quasi ut quod dolorum.','2019-05-11 12:10:29','2019-05-11 12:10:29'),(12,'Lake Keaganside','Occaecati eos repellendus amet cum dolor dolorem. Et maxime provident nisi aut quae consectetur exercitationem. Est rerum rerum nihil qui qui autem. Rerum sint commodi sed voluptas est.','2019-05-11 12:10:56','2019-05-11 12:10:56'),(13,'Jaycefort','Accusantium enim est quam eligendi deleniti ut. Officia reprehenderit optio praesentium est aut impedit rem. Inventore soluta a neque eos deserunt.','2019-05-11 12:10:56','2019-05-11 12:10:56'),(14,'North Donnafort','At impedit sunt explicabo similique possimus natus. Voluptate aut deserunt qui cumque maxime iusto quia sed. Hic dolorem ex dolores quae soluta.','2019-05-13 13:01:03','2019-05-13 13:01:03'),(15,'West Orphafurt','Eaque ex iste fuga esse. Dolores consequatur repudiandae nulla praesentium ullam. Nisi hic sed esse nesciunt. Quia qui debitis temporibus facere et.','2019-05-13 13:01:15','2019-05-13 13:01:15'),(16,'North Ocie','Animi id corporis doloribus itaque ut in error unde. Repellat id voluptates ratione optio. Iusto impedit aliquam molestiae aut. Similique ut ad et non id quidem facilis.','2019-05-13 13:01:15','2019-05-13 13:01:15'),(17,'Stephanmouth','Josue Wiegand','2019-05-13 14:29:23','2019-05-13 14:29:23'),(18,'West Lawsonshire','Dr. Tierra Konopelski','2019-05-13 14:29:23','2019-05-13 14:29:23');
/*!40000 ALTER TABLE `cities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `images` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `url` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` int(10) unsigned DEFAULT NULL,
  `car_id` int(10) unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `images_user_id_foreign` (`user_id`),
  KEY `images_car_id_foreign` (`car_id`),
  CONSTRAINT `images_car_id_foreign` FOREIGN KEY (`car_id`) REFERENCES `cars` (`id`),
  CONSTRAINT `images_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (1,'car-images/BsLZ6FIwDPPwQIvgBEqoF6rrcL9dUWYCADsgt5Cx.png','Ford ALFA8C',NULL,2,'2019-04-19 16:47:18','2019-04-19 16:47:18'),(2,'car-images/mtjxJjRbcXJytDppwZVmzSVdfITOSo3ps64Yh5n3.png','Une description',NULL,1,NULL,NULL),(3,'car-images/jY0oqxBPQKlEpNZRd5DNkxGHqIjOhbvfmgqHzlHp.jpeg','Dodge DEFAULT',NULL,4,'2019-05-12 22:48:35','2019-05-12 22:48:35'),(4,'car-images/NcEzL2L0RzE2hLpNMeVgHwlD8TTAt3zPgTUWqDCV.jpeg','Citroen DEFAULT',NULL,5,'2019-05-12 23:16:59','2019-05-12 23:16:59'),(5,'car-images/HuO4Q31XDwkyq9WIEMV7fcteNshPVSoXWzdSgmXe.jpeg','Alfa Romeo ALFAOTH',NULL,6,'2019-05-12 23:23:48','2019-05-12 23:23:48'),(6,'car-images/R6ZjfcqfvsDXiePz4eWQwbZPxnzgibMMT97aFtXq.jpeg','Hyundai DEFAULT',NULL,7,'2019-05-13 10:31:47','2019-05-13 10:31:47'),(7,'car-images/gN8UL7zqmqUjeVID3HX8cDbhgFkJ1RJD3ehcnfSM.jpeg','Hyundai DEFAULT',NULL,7,'2019-05-13 10:31:47','2019-05-13 10:31:47'),(8,'car-images/mWvOOq1OFPsDINwKGJhZI4aNf8O9Tz6lwAS8mGsd.jpeg','Renault DEFAULT',NULL,8,'2019-05-13 10:46:48','2019-05-13 10:46:48');
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'2014_10_12_100000_create_password_resets_table',1),(2,'2018_04_05_004402_create_cities_table',1),(3,'2018_04_07_000000_create_users_table',1),(4,'2018_04_07_154813_create_cars_table',1),(5,'2019_04_07_154545_create_images_table',1),(6,'2019_04_07_155459_create_ads_table',1),(7,'2019_04_07_155904_create_reservations_table',1),(8,'2019_04_07_160054_create_scores_table',1),(9,'2019_04_19_150210_add_user_id_column_to_ad',1),(10,'2019_04_20_163942_drop_comment_column_from_reservations',2),(11,'2019_04_20_170735_add_default_value_to_status_in_reservations',3),(12,'2019_04_20_172155_add_reservator_id_to_reservations',3),(13,'2019_05_07_134725_update-reservation-status',4),(16,'2019_05_10_173335_alter_scores_table',5),(17,'2019_05_10_165145_update_ads_table',6),(18,'2019_05_11_025141_update_scores_table',7),(19,'2019_05_11_051332_alter_score_table_delete_type_column',8);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `password_resets` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_resets`
--

LOCK TABLES `password_resets` WRITE;
/*!40000 ALTER TABLE `password_resets` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_resets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservations`
--

DROP TABLE IF EXISTS `reservations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reservations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `status` int(11) NOT NULL DEFAULT 0,
  `ad_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `reservator_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `reservations_ad_id_foreign` (`ad_id`),
  KEY `reservations_reservator_id_foreign` (`reservator_id`),
  CONSTRAINT `reservations_ad_id_foreign` FOREIGN KEY (`ad_id`) REFERENCES `ads` (`id`),
  CONSTRAINT `reservations_reservator_id_foreign` FOREIGN KEY (`reservator_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservations`
--

LOCK TABLES `reservations` WRITE;
/*!40000 ALTER TABLE `reservations` DISABLE KEYS */;
INSERT INTO `reservations` VALUES (8,1,2,'2019-05-09 04:25:26','2019-05-09 04:26:12',2),(9,2,8,'2019-05-10 20:25:13','2019-05-11 15:15:02',2),(10,2,4,'2019-05-12 00:52:13','2019-05-12 00:57:04',2),(11,1,3,'2019-05-12 00:58:12','2019-05-12 01:01:07',2),(12,2,5,'2019-05-12 10:34:55','2019-05-12 13:15:02',2),(13,1,12,'2019-05-13 10:20:39','2019-05-13 10:24:27',12),(14,2,11,'2019-05-13 10:20:49','2019-05-13 11:15:08',12),(15,2,14,'2019-05-13 10:21:07','2019-05-13 22:15:02',12),(16,2,10,'2019-05-13 10:21:16','2019-05-13 11:15:02',12),(17,1,13,'2019-05-13 10:21:24','2019-05-13 10:25:37',12),(18,1,16,'2019-05-13 10:54:50','2019-05-13 10:56:25',2),(19,1,24,'2019-05-13 10:55:35','2019-05-13 10:56:54',2),(20,2,15,'2019-05-13 11:14:31','2019-05-13 13:15:02',14),(21,2,22,'2019-05-13 11:14:47','2019-05-13 14:15:03',14);
/*!40000 ALTER TABLE `reservations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `scores`
--

DROP TABLE IF EXISTS `scores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `scores` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `amount` int(11) DEFAULT NULL,
  `positive_comment` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `negative_comment` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `to_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` int(10) unsigned DEFAULT NULL,
  `car_id` int(10) unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `reservation_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `scores_user_id_foreign` (`user_id`),
  KEY `scores_car_id_foreign` (`car_id`),
  KEY `scores_reservation_id_foreign` (`reservation_id`),
  CONSTRAINT `scores_car_id_foreign` FOREIGN KEY (`car_id`) REFERENCES `cars` (`id`),
  CONSTRAINT `scores_reservation_id_foreign` FOREIGN KEY (`reservation_id`) REFERENCES `reservations` (`id`),
  CONSTRAINT `scores_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scores`
--

LOCK TABLES `scores` WRITE;
/*!40000 ALTER TABLE `scores` DISABLE KEYS */;
INSERT INTO `scores` VALUES (6,4,'Toujours à l’écoute des plaintes et déja 2 ans de fidélité','Très bavard','2',1,NULL,'2019-05-11 05:34:47','2019-05-11 05:34:47',8),(9,4,'tres patient et ponctuel','Pneux vieux',NULL,2,2,'2019-05-11 14:51:52','2019-05-11 14:51:52',8),(10,4,'patient','collant','1',2,NULL,'2019-05-11 14:52:16','2019-05-11 14:52:16',8),(11,4,'UserResource','UserResource','1',2,NULL,'2019-05-12 01:45:07','2019-05-12 01:45:07',11),(12,4,'UserResource','UserResource',NULL,2,2,'2019-05-12 01:45:23','2019-05-12 01:45:23',11);
/*!40000 ALTER TABLE `scores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `cin` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `driving_license_number` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telephone` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'CLIENT',
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `city_id` int(10) unsigned NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`),
  KEY `users_city_id_foreign` (`city_id`),
  CONSTRAINT `users_city_id_foreign` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'152556','Partner Valdes','AGDEFBABA','SOME ADDRESS B1','+212 0637851284','PARTNER',1,3,'valdesche03@gmail.com','$2y$10$Lu6qfg9W2MWP4293JueBGOYinCSFoth.HeSoR2pj5ePl4jg3yX52O',NULL,'2019-04-19 16:31:33','2019-04-19 16:31:33'),(2,NULL,'Client Valdor',NULL,'Avenue Default1 51 N45, Casabalnca',NULL,'CLIENT',1,3,'valdosclient@gmail.com','$2y$10$Lu6qfg9W2MWP4293JueBGOYinCSFoth.HeSoR2pj5ePl4jg3yX52O',NULL,'2019-04-19 17:45:41','2019-04-19 17:45:41'),(3,NULL,'Test Signup',NULL,'Avenue Default1 51 N45, Casabalnca',NULL,'CLIENT',1,1,'testsignup@gmail.com','$2y$10$Lu6qfg9W2MWP4293JueBGOYinCSFoth.HeSoR2pj5ePl4jg3yX52O',NULL,'2019-04-19 17:50:18','2019-04-19 17:50:18'),(4,NULL,'Valdor Cfre',NULL,NULL,NULL,'PARTNER',0,3,'valdescfre@gmail.com','$2y$10$Lu6qfg9W2MWP4293JueBGOYinCSFoth.HeSoR2pj5ePl4jg3yX52O',NULL,'2019-04-22 07:42:35','2019-04-22 07:42:35'),(8,'Quod quia consequatur dolorem ut.','Pascale Wisozk','9350795981','7000 Kiehn Point Apt. 423','542.442.0594 x6359','ADMIN',1,13,'yasmin21@example.net','$2y$10$Lu6qfg9W2MWP4293JueBGOYinCSFoth.HeSoR2pj5ePl4jg3yX52O',NULL,'2019-05-11 12:10:56','2019-05-11 12:10:56'),(9,NULL,'Abdel Oussama',NULL,'Av Franceville 24 Appt 6 , Hulberg','+212 0627851679','PARTNER',1,6,'partenaire@rentech.com','$2y$10$pLsXBnj/bGGamBwO5gLMteDTXtZ8/MT9RMYSnF0nvSMbvtcITVdt6',NULL,'2019-05-12 13:27:43','2019-05-12 14:17:21'),(10,NULL,'Federic OsValdo',NULL,'Avenue Bridge 25 Apt 45','+212 0627661689','CLIENT',1,10,'c_fredeericosvaldo@rentech.com','$2y$10$DcI5UVjlOAJLlA38vmFYfucdvKXSEChWxPeKdxO0953VW4TFO2A/O',NULL,'2019-05-12 14:20:27','2019-05-12 14:34:30'),(11,NULL,'UnParteneaire',NULL,'Avenue Bagdad Boom15','+212 0627851679','PARTNER',1,8,'p_unpartenaire@rentech.ma','$2y$10$12CY9thb/nXqRXCePanHnO5wW3KJmB6tYj4AHyAJVWFB9TU2PeBWS',NULL,'2019-05-12 14:37:51','2019-05-12 14:43:16'),(12,NULL,'Mohamed Ajjari',NULL,'Av Parst5 APpt 52 N 3','+212 0627851679','CLIENT',1,11,'c_mo.ajjari@rentech.ma','$2y$10$g7Wvs1gfOm86pKUdd5UD/.e7JS2mFrOh4wtOxG0c8j79uf8bjAJyq',NULL,'2019-05-13 10:13:51','2019-05-13 10:19:57'),(13,NULL,'AutrePartenaire',NULL,'Avenue 15 Avril App 14 , Casablanca','+212 0627871679','PARTNER',1,13,'p_autrepartenaire@rentech.ma','$2y$10$WhIEnHJ0Haudx5wfezRuyess8F6d0IPVOEGtcI07Eh8vDGP7QMtZa',NULL,'2019-05-13 10:28:57','2019-05-13 10:52:25'),(14,NULL,'Tahor Client',NULL,'Avenue 45 N^5 Appt 12','+212 0627851679','CLIENT',1,6,'tahor_client@rentech.com','$2y$10$GMdlKMbyBCC0LwuT7s8mpus5MBRQmyFe2wxmmAQaYDy73wTIJBJcO',NULL,'2019-05-13 11:13:15','2019-05-13 11:14:11'),(15,'Non suscipit placeat eveniet itaque.','Asha Rohan','2958666786','47521 Jenkins Prairie Suite 116','206.584.4036','ADMIN',1,16,'ibeahan@example.org','$2y$10$d59CWXwKYhFRERSggfmJI.LQy/lyALgOH7bQXJ1azLllaBcrlrXeq',NULL,'2019-05-13 13:01:15','2019-05-13 13:01:15'),(16,'Rerum libero voluptas molestiae repudiandae accusantium.','Dr. Kevon McGlynn Jr.','6611473157','116 Dickinson Key','238.627.7108','ADMIN',1,18,'armstrong.cornelius@example.net','$2y$10$.uojDlzkVSJ2Xyitg59ERuoEVCn72XIoHUhW8SQ2pUf3NPBsWI3/6',NULL,'2019-05-13 14:29:24','2019-05-13 14:29:24');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-13 23:16:34
