-- MySQL dump 10.13  Distrib 8.0.34, for macos13 (arm64)
--
-- Host: 127.0.0.1    Database: datn_nguyen
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` tinytext,
  `user_id` tinytext,
  `size_color` tinytext,
  `quantity` tinytext,
  `price` tinytext,
  `created_date` datetime DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  `deleted_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` tinytext,
  `image` tinytext,
  `slug` tinytext,
  `created_date` datetime DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  `deleted_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Dành cho Cter','https://theme.hstatic.net/1000288298/1001020793/14/collection_banner.jpg?v=299','danh-cho-cter-4398',NULL,NULL,NULL),(2,'PC - Máy tính chơi game, Làm việc','','pc-may-tinh-chi-game-lam-vic-1802',NULL,NULL,NULL),(3,'Linh kiện máy tính','','linh-kin-may-tinh-3748',NULL,NULL,NULL),(4,'Balo - Túi xách','https://file.hstatic.net/1000288298/collection/laptop-bag-banner-for-blog_1200x630_ecd263975a1a4580a4fb3e6f62f19b3e.jpg','balo-tui-xach-9041',NULL,'2024-02-27 07:12:14',NULL),(5,'Smarthome','','smarthome-9481',NULL,NULL,NULL),(6,'Onebot (Xiaomi)','https://file.hstatic.net/1000288298/collection/xiaomi-onebot-zavodne-auto-cover_1cbad06fef974fa6b5c3425f58ab19fe.jpg','onebot-xiaomi-6760',NULL,'2024-02-27 07:12:23',NULL),(8,'test',NULL,'test-5469','2024-02-27 07:12:32',NULL,NULL);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `color_size`
--

DROP TABLE IF EXISTS `color_size`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `color_size` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` tinytext,
  `type` tinytext,
  `created_date` datetime DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  `deleted_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `color_size`
--

LOCK TABLES `color_size` WRITE;
/*!40000 ALTER TABLE `color_size` DISABLE KEYS */;
INSERT INTO `color_size` VALUES (1,'Vàng','color','2024-02-08 23:43:44','2024-02-08 23:44:54',NULL),(2,'S','size','2024-02-18 19:43:33',NULL,NULL),(3,'M','size','2024-02-18 19:43:39',NULL,NULL),(4,'L','size','2024-02-18 19:43:43',NULL,NULL),(5,'XL','size','2024-02-18 19:43:46',NULL,NULL),(6,'Đỏ','color','2024-02-18 19:43:59',NULL,NULL),(7,'Cam','color','2024-02-18 19:44:03',NULL,NULL),(8,'Trắng','color','2024-02-18 19:44:06',NULL,NULL),(9,'Đen','color','2024-02-18 19:44:10',NULL,NULL),(10,'Hồng','color','2024-02-18 19:44:14',NULL,NULL);
/*!40000 ALTER TABLE `color_size` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int DEFAULT NULL,
  `name_cus` tinytext,
  `email` tinytext,
  `content` longtext,
  `display` tinytext,
  `rating` tinytext,
  `created_date` datetime DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  `deleted_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coupons`
--

DROP TABLE IF EXISTS `coupons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coupons` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` tinytext,
  `description` tinytext,
  `percent` int DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  `deleted_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coupons`
--

LOCK TABLES `coupons` WRITE;
/*!40000 ALTER TABLE `coupons` DISABLE KEYS */;
INSERT INTO `coupons` VALUES (2,'SPP30',NULL,30,'2024-02-07 21:48:20',NULL,NULL),(3,'SPP20','',20,'2024-02-17 17:00:15',NULL,NULL),(4,'SPP40','',40,'2024-02-17 17:00:23',NULL,NULL),(5,'SPP50','',50,'2024-02-17 17:00:31',NULL,NULL);
/*!40000 ALTER TABLE `coupons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `details_receipt`
--

DROP TABLE IF EXISTS `details_receipt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `details_receipt` (
  `id` int NOT NULL AUTO_INCREMENT,
  `receipt_id` tinytext,
  `product_id` tinytext,
  `quantity` tinytext,
  `price` tinytext,
  `total` tinytext,
  `created_date` datetime DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  `deleted_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `details_receipt`
--

LOCK TABLES `details_receipt` WRITE;
/*!40000 ALTER TABLE `details_receipt` DISABLE KEYS */;
INSERT INTO `details_receipt` VALUES (7,'HDMH1709767588073','Túi đeo chéo TTG chống xốc','1',NULL,NULL,'2024-03-07 06:26:28',NULL,NULL),(8,'HDMH1709767756629','Túi Xách Canvas Thời Trang Phong Cách Nhật Bản Nam Nữ Kích Thước Lớn In Logo Trực Tiếp Game','3',NULL,NULL,'2024-03-07 06:29:16',NULL,NULL),(9,'HDMH1709914809546','PC LÀM VIỆC ĐỒ HỌA HIỆU NĂNG CAO - BỀN BÌ I5 13500 - RTX 3060 TI (Toàn bộ linh kiện ALL NEW - Bảo hành 36 tháng)','1',NULL,NULL,'2024-03-08 23:20:09',NULL,NULL),(10,'HDMH1709991466519','Túi Xách Canvas Thời Trang Phong Cách Nhật Bản Nam Nữ Kích Thước Lớn In Logo Trực Tiếp Game','1',NULL,NULL,'2024-03-09 20:37:46',NULL,NULL),(11,'HDMH1710066969409','Túi Xách Canvas Thời Trang Phong Cách Nhật Bản Nam Nữ Kích Thước Lớn In Logo Trực Tiếp Game','1',NULL,NULL,'2024-03-10 17:36:09',NULL,NULL),(12,'HDMH1710067056905','PC LÀM VIỆC ĐỒ HỌA HIỆU NĂNG CAO - BỀN BÌ I5 13500 - RTX 3060 TI (Toàn bộ linh kiện ALL NEW - Bảo hành 36 tháng)','1',NULL,NULL,'2024-03-10 17:37:36',NULL,NULL),(13,'HDMH1710088224835','Túi đeo chéo TTG chống xốc','2','145000','290000','2024-03-10 23:30:24',NULL,NULL),(14,'HDMH1710088224835','Túi Xách Canvas Thời Trang Phong Cách Nhật Bản Nam Nữ Kích Thước Lớn In Logo Trực Tiếp Game','1','120000','120000','2024-03-10 23:30:24',NULL,NULL),(15,'HDMH1710113218555','PC LÀM VIỆC ĐỒ HỌA HIỆU NĂNG CAO - BỀN BÌ I5 13500 - RTX 3060 TI (Toàn bộ linh kiện ALL NEW - Bảo hành 36 tháng)','1',NULL,NULL,'2024-03-11 06:26:58',NULL,NULL),(16,'HDMH1710113218555','Túi đeo chéo TTG chống xốc','1','145000','145000','2024-03-11 06:26:58',NULL,NULL),(17,'HDMH1710197919068','PC LÀM VIỆC ĐỒ HỌA HIỆU NĂNG CAO - BỀN BÌ I5 13500 - RTX 3060 TI (Toàn bộ linh kiện ALL NEW - Bảo hành 36 tháng)','1','16704000','16704000','2024-03-12 05:58:39',NULL,NULL),(18,'HDMH1710197919068','Túi đeo chéo TTG chống xốc','1','145000','145000','2024-03-12 05:58:39',NULL,NULL);
/*!40000 ALTER TABLE `details_receipt` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pays` tinytext,
  `code` tinytext,
  `description` tinytext,
  `display` tinytext,
  `created_date` datetime DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  `deleted_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` VALUES (1,'momo','MOMO',NULL,'true','2024-02-08 23:30:34',NULL,NULL),(2,'Tiền mặt','CASH',NULL,'true','2024-02-08 23:31:29',NULL,NULL);
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_color_size`
--

DROP TABLE IF EXISTS `product_color_size`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_color_size` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_code` tinytext,
  `color_size_id` int DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  `deleted_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_color_size`
--

LOCK TABLES `product_color_size` WRITE;
/*!40000 ALTER TABLE `product_color_size` DISABLE KEYS */;
INSERT INTO `product_color_size` VALUES (1,'TNSP1015',1,NULL,NULL,NULL),(2,'TNSP1015',6,NULL,NULL,NULL),(3,'TNSP1015',7,NULL,NULL,NULL),(4,'TNSP1015',8,NULL,NULL,NULL),(5,'TNSP1015',9,NULL,NULL,NULL);
/*!40000 ALTER TABLE `product_color_size` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_type`
--

DROP TABLE IF EXISTS `product_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` tinytext,
  `image` tinytext,
  `slug` tinytext,
  `category_id` tinytext,
  `created_date` datetime DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  `deleted_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_type`
--

LOCK TABLES `product_type` WRITE;
/*!40000 ALTER TABLE `product_type` DISABLE KEYS */;
INSERT INTO `product_type` VALUES (1,'PC workstation','https://file.hstatic.net/1000288298/collection/work_web2_13a95e24c2144337bf42cd564b381c00.jpg','PC-WorkStation','2','2024-02-06 18:43:01','2024-02-06 18:46:31',NULL),(2,'PC chơi game','https://file.hstatic.net/1000288298/collection/best-pc-cases_copy_dcd36f7314434aae9c41ebfe31662933.jpg','PC-Station','2',NULL,NULL,NULL),(3,'CPU','https://file.hstatic.net/1000288298/collection/111113900_bcb63b211b50479e88c629f09cf0e6ea.jpg','cpu-1772','3','2024-02-17 16:07:18',NULL,NULL),(4,'VGA Cũ','https://file.hstatic.net/1000288298/collection/2222_35bbb00c047f4c8eb18898510c30ae94.png','vga-cu-4876','3','2024-02-17 16:08:11',NULL,NULL),(5,'VGA mới','https://file.hstatic.net/1000288298/collection/vga_11_59fa719ce91f4ba2a6833f76d2f685e1.png','vga-mi-3302','3','2024-02-17 16:08:27',NULL,NULL),(6,'SSD/HDD','https://theme.hstatic.net/1000288298/1001020793/14/collection_banner.jpg?v=299','ssdhdd-9707','3','2024-02-17 16:08:54',NULL,NULL),(7,'Màn hình','https://file.hstatic.net/1000288298/collection/ips_banner_1920x680_801fccb12fa947bfb0eda431877d620e.jpg','man-hinh-2384','3','2024-02-17 16:09:14',NULL,NULL),(8,'RAM','https://file.hstatic.net/1000288298/collection/lancer-series-7200_pr-banner_1600x900-1_f36e2e3cf1ef49e2a9b78a4275e8e815.jpg','ram-5999','3','2024-02-17 16:09:33',NULL,NULL),(9,'Vỏ Case','https://file.hstatic.net/1000288298/collection/lancer-series-7200_pr-banner_1600x900-1_f36e2e3cf1ef49e2a9b78a4275e8e815.jpg','vo-case-6798','3','2024-02-17 16:09:58',NULL,NULL),(11,'test type',NULL,'test-type-4993','1','2024-03-02 22:58:54','2024-03-02 23:03:57',NULL);
/*!40000 ALTER TABLE `product_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` tinytext CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci,
  `name` tinytext CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `description` longtext CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci,
  `price` tinytext CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `amount` tinytext CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci,
  `quantity` tinytext CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci,
  `image` longtext CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci,
  `status` tinytext CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci,
  `bestseller` tinytext CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci,
  `display` tinytext CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci,
  `slug` tinytext CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci,
  `product_type_id` tinytext COLLATE utf8mb3_unicode_ci,
  `coupon_id` tinytext COLLATE utf8mb3_unicode_ci,
  `category_id` tinytext COLLATE utf8mb3_unicode_ci,
  `provider_id` tinytext COLLATE utf8mb3_unicode_ci,
  `created_date` datetime DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  `deleted_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (4,'TNSP229','Túi đeo chéo TTG chống xốc','Một chiếc Túi Messenger tốt sẽ phản chiếu chính xác hình ảnh của bạn bạn ở hầu hết mọi tình huống thường ngày. Nhưng đối với túi chống sốc Trực Tiếp Game sẽ cho cả thế giới biết bạn chính là một Cter chính hiệu','290000','145000','100','https://product.hstatic.net/1000288298/product/vn-11134201-23020-b97f5yvz33nved_e6713cab822c4343af92290aceec0c0e_master.png','Còn hàng','1','1','ti-eo-cho-ttg-chng-xc-0416','0','5','4','0','2024-02-17 17:04:12','2024-03-04 06:12:04',NULL),(5,'TNSP8055','Túi Xách Canvas Thời Trang Phong Cách Nhật Bản Nam Nữ Kích Thước Lớn In Logo Trực Tiếp Game','Túi Xách Canvas Thời Trang Phong Cách Nhật Bản Nam Nữ Kích Thước Lớn In Logo Trực Tiếp Game - TTG Shop THÔNG TIN SẢN PHẨM - Túi in logo Trực Tiếp Game - Thương hiệu: TTG - Chất vải: canvas','150000','105000','100','https://product.hstatic.net/1000288298/product/321328573_3233505273565563_7615984465149624399_n_08b97385fff742788acc21b6f443e3ed_large.jpg','Còn hàng','1','1','ti-xch-canvas-thi-trang-phong-cch-nht-bn-nam-n-kch-thc-ln-in-logo-trc-tip-game-7059','0','2','4','0','2024-02-17 17:05:51','2024-03-12 06:02:58',NULL),(6,'TNSP9754','PC LÀM VIỆC ĐỒ HỌA HIỆU NĂNG CAO - BỀN BÌ I5 13500 - RTX 3060 TI (Toàn bộ linh kiện ALL NEW - Bảo hành 36 tháng)','Upgrade lên 32GB RAM Thêm 1 Triệu Upgrade lên SSD M2 NVME 1TB Thêm 500K Uprade lên I5 13600K + Main Z690 thêm 4,890K Upgrade lên Tản nhiệt nước AO 240 thêm 990K Upgrade HDD 1TB','20880000','16704000','100','https://product.hstatic.net/1000288298/product/dsc05828_895ba3bcd26243a294ffba31fbed4959_large.jpg','Còn hàng','1','1','pc-lm-vic-ha-hiu-nng-cao-bn-b-i5-13500-rtx-3060-ti-ton-b-linh-kin-all-new-bo-hnh-36-thng-1519','1','3','2','0','2024-02-17 17:09:29','2024-03-12 05:50:35',NULL),(7,'TNSP3515','PC Super Speed Rendering Worksation 3D Visualization I7 13700K - RTX 4080 Super 16Gb (Toàn bộ linh kiện ALL NEW - Bảo hành 36 tháng)','Upgrade lên 64GB RAM Thêm 1,800K DDR4 Upgrade thêm I7 14700K + Main DDR5 + RAM DDR5: 5,680K HDD 1TB : 1,150K HDD 2Tb: 1,600K HDD 4TB : 2500K','58888000','','100','https://product.hstatic.net/1000288298/product/dsc01756_bf0ec4beb86048aeaf591e93964ab7c7_large.jpg','Còn hàng','1','1','pc-super-speed-rendering-worksation-3d-visualization-i7-13700k-rtx-4080-super-16gb-ton-b-linh-kin-all-new-bo-hnh-36-thng-5230','1','2','2','0','2024-02-17 17:11:45',NULL,NULL),(8,'TNSP8899','CPU INTEL CORE I3 10105F (3.7GHZ TURBO UP TO 4.4GHZ, 4 NHÂN 8 LUỒNG, 6MB CACHE, 65W) - SOCKET INTEL LGA 1200','Sản phẩm bảo hành 36 Dòng CPU Core i thế hệ thứ 11 của Intel Socket: LGA 1200 Thế hệ: Rocket Lake Số nhân: 4 Số luồng: 8 ','1799000','','50','https://product.hstatic.net/1000288298/product/1_6b08f0a884704de3be5a10bd101dfafb_large.jpg','Còn hàng','1','1','cpu-intel-core-i3-10105f-37ghz-turbo-up-to-44ghz-4-nhn-8-lung-6mb-cache-65w-socket-intel-lga-1200-1910','3','2','3','0','2024-02-17 17:17:41',NULL,NULL),(9,'TNSP971','Ổ cứng HDD 2TB Western Digital WD Blue SATA III - Bảo hành chính hãng 36 tháng','Thương hiệu WD Thông tin chung Bảo hành 24 Kiểu ổ cứng HDD Màu sắc của ổ cứng Xanh Cấu hình chi tiết Dung lượng 2TB','1550000','','50','https://product.hstatic.net/1000288298/product/21047_wd20ezaz_ha1_a79ccfe45b5442d6bb6d67911bae206a_large.jpg','Còn hàng','1','1','cng-hdd-2tb-western-digital-wd-blue-sata-iii-bo-hnh-chnh-hng-36-thng-3954','6','3','3','0','2024-02-17 17:22:47',NULL,NULL),(10,'TNSP8070','Ram ADATA XPG SPECTRIX D50 16GB (1x16GB) DDR4 3200MHz (AX4U320016G16A-SW50)','Thương hiệu WD Thông tin chung Bảo hành 24 Kiểu ổ cứng HDD Màu sắc của ổ cứng Xanh Cấu hình chi tiết Dung lượng 2TB','1199000','','50','https://product.hstatic.net/1000288298/product/pectrix_d50_rgb_white_ax4u320016g16a_sw50_16gb_1x16gb_ddr4_3200mhz__3__b9859bf63ad04181ac297cacc82dc306_large.jpg','Còn hàng','','1','ram-adata-xpg-spectrix-d50-16gb-1x16gb-ddr4-3200mhz-ax4u320016g16a-sw50-3655','8','2','3','0','2024-02-17 17:24:00',NULL,NULL),(11,'TNSP3027','Bóng đèn LED thông minh Yeelight Smart LED Bulb 1SE (RGB)','Yeelight Smart LED Bulb 1SE là phiên bản bóng đèn LED RGB cho phép tùy chỉnh đến 16 triệu màu. Sở hữu mức công suất chỉ 6W, lượng điện tiêu thụ khi hoạt động là cực kỳ ít. Đèn có thể phục vụ nhu cầu chiếu sáng hoặc làm đèn ngủ - đèn trang trí cho góc làm việc. Hỗ trợ tương thích với hầu hết hệ thống như thông minh.','295000','','50','https://product.hstatic.net/1000288298/product/bong-den-yeelight-yldp001__3__8057128ad3c0488a9004f8216f69039c_master.jpg,https://product.hstatic.net/1000288298/product/bong-den-yeelight-yldp001__2__307b1884ad6b4dc5be67be332dfd336f_master.jpg,https://product.hstatic.net/1000288298/product/bong-den-yeelight-yldp001__4__d182f5552ccd4c1e8cfe230ecd24f835_master.jpg','Hết hàng','','1','bng-n-led-thng-minh-yeelight-smart-led-bulb-1se-rgb-0699','0','2','5','0','2024-02-22 19:33:47',NULL,NULL),(12,'TNSP5787','Đèn LED dây nối dài Yeelight Lightstrip Pro - Dài 1m','Yeelight Smart LED Bulb 1SE là phiên bản bóng đèn LED RGB cho phép tùy chỉnh đến 16 triệu màu. Sở hữu mức công suất chỉ 6W, lượng điện tiêu thụ khi hoạt động là cực kỳ ít. Đèn có thể phục vụ nhu cầu chiếu sáng hoặc làm đèn ngủ - đèn trang trí cho góc làm việc. Hỗ trợ tương thích với hầu hết hệ thống như thông minh.','300000','','50','https://product.hstatic.net/1000288298/product/69167_den_led_day_noi_dai_yeelight_lightstrip_pro_yldd007_dai_1m_175a38b822a646c4a4d5aecfb4de0428_master.jpg','Còn hàng','','1','n-led-dy-ni-di-yeelight-lightstrip-pro-di-1m-4340','0','2','5','0','2024-02-22 19:34:30',NULL,NULL),(13,'TNSP9939','Bộ lắp ghép mô hình xe quân sự thám hiểm CN171','Bộ phim khoa học viễn tưởng The Wandering Earth ra đời năm 2019 đã tạo tiếng vang lớn không chỉ bởi kịch bản, diễn xuất của diễn viên mà còn ở hệ thống trang thiết bị tối tân trong phim, và nổi tiếng nhất là hệ thống xe quân sự thám hiểm. Khơi nguồn cảm hứng từ đó, OneBot đã sáng tạo ra bộ lắp ghép mô hình xe quân sự thám hiểm đặc sắc CN171 với kích thước lớn từ hơn 2800 mảnh ghép nhỏ.','1616000','','50','https://product.hstatic.net/1000288298/product/untitled-4_b055c37b4d014afbbd291b48dc1ef7aa_master.png,https://product.hstatic.net/1000288298/product/untitled-1_ef373b492aca4d8bbe9b690c04093bef_master.png,https://product.hstatic.net/1000288298/product/untitled-2_f835021e03d447e9a1752ee385bea348_master.png','Còn hàng','','1','b-lp-ghp-m-hnh-xe-qun-s-thm-him-cn171-5919','0','2','5','0','2024-02-22 19:41:14',NULL,NULL),(14,'TNSP1474','PC AAA 2K GAMING RADEON RX 6800 - 12400F','Upgrade 32GB RAM thêm 1 triêu Upgrade 1TB SSD M2 NVME thêm 590K Upgrade I5 13400F thêm 1,390K Upgrade I5 13500 thêm 2,390K Upgrade Nguồn 750W 80plus Bronze thêm 790K Upgrade Case 2 mặt kính thêm 590K Upgrade Tản nhiệt nước AIO 240 thêm 990K Upgrade HDD 1TB thêm 1,100K','19680000','','50','https://product.hstatic.net/1000288298/product/dsc01847_b2a2916c87e14f52859371f984d44846_master.jpg','Còn hàng','1','1','pc-aaa-2k-gaming-radeon-rx-6800-12400f-0318','2','2','2','0','2024-02-22 19:45:33',NULL,NULL),(15,'TNSP620','PC SUPER COLOR WHITE GAMING 12400F - RTX 4070 Super 12GB','Upgrade 32GB RAM thêm 1 triêu Upgrade 1TB SSD M2 NVME thêm 590K Upgrade I5 13400F thêm 1,390K Upgrade I5 13500 thêm 2,390K Upgrade Nguồn 750W 80plus Bronze thêm 790K Upgrade Case 2 mặt kính thêm 590K Upgrade Tản nhiệt nước AIO 240 thêm 990K Upgrade HDD 1TB thêm 1,100K','31990000','','100','https://product.hstatic.net/1000288298/product/dsc00815__1__ded68acc5590455fa975c61276cde76d_1024x1024.jpg','Còn hàng','1','1','pc-super-color-white-gaming-12400f-rtx-4070-super-12gb-5373','2','2','2','0','2024-02-22 19:46:17',NULL,NULL),(16,'TNSP2777','Card Màn Hình ASUS Dual GeForce RTX 4060','Nhân đồ họa: GeForce RTX™ 4060 Nhân CUDA: 3072 Bộ nhớ: 8GB GDDR6 Nguồn khuyến nghị: 450W','8390000','','100','https://product.hstatic.net/1000288298/product/1_4a18f0ab887347948993eaf11f1bc09b_master.jpg','Còn hàng','1','1','card-mn-hnh-asus-dual-geforce-rtx-4060-6452','5','1','3','0','2024-02-22 19:49:16',NULL,NULL),(17,'TNSP717','test','weqweq','132000','92400','','https://res.cloudinary.com/dnhte9ayp/image/upload/v1708989065/ecommerce/nooonbe2bbmixqal3o7d.jpg','','bestseller','','test-4429','3','2','1','','2024-02-27 06:16:27',NULL,NULL);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `providers`
--

DROP TABLE IF EXISTS `providers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `providers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` tinytext,
  `phone` tinytext,
  `email` tinytext,
  `image` longtext,
  `quantity` tinytext,
  `slug` tinytext,
  `created_date` datetime DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  `deleted_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `providers`
--

LOCK TABLES `providers` WRITE;
/*!40000 ALTER TABLE `providers` DISABLE KEYS */;
INSERT INTO `providers` VALUES (2,'samsung pro','0123123432','samsung@gamil.com','','100','samsung-pro-8597','2024-02-07 21:05:33','2024-02-07 21:11:03',NULL),(3,'Apple','0123123432','apple@gamil.com','','100','apple-9754','2024-02-07 21:12:01',NULL,NULL);
/*!40000 ALTER TABLE `providers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `receipt`
--

DROP TABLE IF EXISTS `receipt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `receipt` (
  `id` varchar(45) NOT NULL,
  `user_id` tinytext,
  `payments_id` tinytext,
  `address` tinytext,
  `order_date` tinytext,
  `delivery_date` tinytext,
  `note` tinytext,
  `status` tinytext,
  `payments_status` tinytext,
  `amount` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  `deleted_Date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `receipt`
--

LOCK TABLES `receipt` WRITE;
/*!40000 ALTER TABLE `receipt` DISABLE KEYS */;
INSERT INTO `receipt` VALUES ('HDMH1710113218555','admin','CASH','Tan Phu','2024-03-14T23:26:58.555Z','1710458818555','','WAITING','WAITING','14791000','0854322789','thuantran347@gmail.com','2024-03-11 06:26:58',NULL,NULL),('HDMH1710197919068','tdt1401','CASH','Tan Phu','2024-03-15T22:58:39.068Z','1710543519068','','WAITING','WAITING','16879000','0854322789','thuantran347@gmail.com','2024-03-12 05:58:39',NULL,NULL);
/*!40000 ALTER TABLE `receipt` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` tinytext,
  `password` tinytext,
  `email` tinytext,
  `name` tinytext,
  `birth` tinytext,
  `gender` tinytext,
  `address` tinytext,
  `phone` tinytext,
  `role` tinytext,
  `image` longtext,
  `created_date` datetime DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  `deleted_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'adminit','$2b$10$SQsvOSJjGUIwVZlmt8EQ3u9atEb1hEtdjCQGiV8c.VWEmDCjeC01a','thuantran347@gmail.com','ADMIN IT','','Nam','','0123122312','ADMIN','','2024-01-28 16:00:07','2024-03-02 22:34:48',NULL),(10,'adminittt','$2b$10$5kTP5gKJ8l6kV63M75B5t.63faRm3DWn/cl1zhM20ki5TRsoTHBtO','thuan123@gmail.com','ADMIN ITT','2001-01-14','Nam','HCM','0123122312','USER',NULL,'2024-02-14 15:20:59','2024-02-14 15:41:22',NULL),(11,'tesstusername','$2b$10$O5WSb3mu5kWJP8lNzc/3nO3ssqs52zcidhhVJWvcEmIUloQYPepzu','thuantest@gmail.com','tesst user','2001-12-15','Nữ','HCM','012312218','USER',NULL,'2024-02-14 15:23:22',NULL,NULL),(12,'user1','$2b$10$G8KRX6bHtGNIxqP5SnLDtuh5Ys0pDqL6ObBFztoac1fIvCYF7PBmG','kahc@gmail.com','user 1','1999-12-05','Khác','adminit','0123212812','USER',NULL,'2024-02-14 15:24:40',NULL,NULL),(22,'user test123','$2b$10$GVKDNLUFD21RBdOXzVhC1eYIQbqlbByQJhaoTom3Bn1FysruRhNZa','usser@gmail.com',NULL,'2001-01-14','Nam','HCM','012312312','USER','https://res.cloudinary.com/dnhte9ayp/image/upload/v1709393972/ecommerce/ex7ysewjew1i6wagycpp.png','2024-03-02 22:39:40','2024-03-02 22:40:33',NULL),(23,'ThuanTran','$2b$10$l.kPtwXo2Rom2m.bb9MtQOJumWsIrrSIYXYTBihuz5/nNjsmznGeO','tthuan785@gmail.com',NULL,'2001-01-14','Nam','Tan Phu',NULL,'USER',NULL,'2024-03-02 23:18:32','2024-03-07 06:40:15',NULL);
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

-- Dump completed on 2024-03-12  6:23:54
