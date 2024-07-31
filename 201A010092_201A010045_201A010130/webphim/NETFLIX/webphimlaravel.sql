-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 26, 2023 at 06:15 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `webphimlaravel`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` varchar(255) NOT NULL,
  `status` int(11) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `position` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `title`, `description`, `status`, `slug`, `position`) VALUES
(3, 'Phim thuyết minh', 'Phim thuyết minh đang được cập nhật', 1, 'phim-thuyet-minh', 4),
(4, 'Phim hoạt hình', 'Phim hoạt hình đang được cập nhật', 1, 'phim-hoat-hinh', 3),
(5, 'Phim mới', 'Phim mới đang được cập nhật', 1, 'phim-moi', 0),
(6, 'Phim bộ', 'Phim bộ đang được cập nhật', 1, 'phim-bo', 1),
(7, 'Phim Chiếu Rạp', 'Phim chiếu rạp cập nhật mới nhất', 1, 'phim-chieu-rap', 5),
(12, 'Phim Lẻ', 'Phim Lẻ', 1, 'Phim Lẻ', 2);

-- --------------------------------------------------------

--
-- Table structure for table `countries`
--

CREATE TABLE `countries` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` varchar(255) NOT NULL,
  `status` int(11) NOT NULL,
  `slug` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `countries`
--

INSERT INTO `countries` (`id`, `title`, `description`, `status`, `slug`) VALUES
(1, 'Việt Nam', 'Việt Nam', 1, 'Việt Nam'),
(2, 'Ấn Độ', 'Ấn Độ', 1, 'Ấn Độ'),
(3, 'Thái Lan', 'Thái Lan', 1, 'Thái Lan'),
(4, 'Trung Quốc', 'Trung Quốc', 1, 'Trung Quốc'),
(5, 'Nhật Bản', 'Nhật Bản', 1, 'Nhật Bản'),
(6, 'Hàn Quốc', 'Hàn Quốc', 1, 'Hàn Quốc'),
(7, 'Đài Loan', 'Đài Loan', 1, 'Đài Loan'),
(8, 'Hồng Kong', 'Hồng Kong', 1, 'Hồng Kong'),
(9, 'Mỹ', 'Mỹ', 1, 'Mỹ'),
(10, 'Âu Mỹ', 'Âu Mỹ', 1, 'Âu Mỹ');

-- --------------------------------------------------------

--
-- Table structure for table `episodes`
--

CREATE TABLE `episodes` (
  `id` int(11) NOT NULL,
  `movie_id` int(11) NOT NULL,
  `linkphim` text NOT NULL,
  `episode` varchar(11) NOT NULL,
  `updated_at` varchar(50) NOT NULL,
  `created_at` varchar(50) NOT NULL,
  `server` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `episodes`
--

INSERT INTO `episodes` (`id`, `movie_id`, `linkphim`, `episode`, `updated_at`, `created_at`, `server`) VALUES
(7, 23, '<p><iframe allowfullscreen src=\"https://short.ink/BxcY1IHfC\" frameborder=\"0\" height=\"360\" width=\"100%\" scrolling=\"0\"></iframe></p>', '1', '2023-01-31 16:41:17', '2023-01-31 16:41:17', 4),
(9, 23, '<p><iframe allowfullscreen src=\"https://short.ink/GyifY9CKs\" frameborder=\"0\" height=\"360\" width=\"100%\" scrolling=\"0\"></iframe></p>', '2', '2023-01-31 17:29:18', '2023-01-31 17:29:18', 4),
(10, 23, '<p><iframe allowfullscreen src=\"https://short.ink/k7zzG8_WL\" frameborder=\"0\" height=\"360\" width=\"100%\" scrolling=\"0\"></iframe></p>', '3', '2023-01-31 15:20:43', '2023-01-31 15:20:43', 4),
(11, 23, '<p><iframe allowfullscreen src=\"https://short.ink/ehZh6oXMh\" frameborder=\"0\" height=\"360\" width=\"100%\" scrolling=\"0\"></iframe></p>', '4', '2023-01-31 15:21:26', '2023-01-31 15:21:26', 4),
(12, 23, '<p><iframe allowfullscreen src=\"https://short.ink/MbdpJhr3R\" frameborder=\"0\" height=\"360\" width=\"100%\" scrolling=\"0\"></iframe></p>', '5', '2023-01-31 15:22:09', '2023-01-31 15:22:09', 4),
(13, 23, '<p><iframe allowfullscreen src=\"https://short.ink/H823sHy1e\" frameborder=\"0\" height=\"360\" width=\"100%\" scrolling=\"0\"></iframe></p>', '6', '2023-01-31 15:23:14', '2023-01-31 15:23:14', 4),
(14, 23, '<p><iframe allowfullscreen src=\"https://short.ink/OSLN1rsNx\" frameborder=\"0\" height=\"360\" width=\"100%\" scrolling=\"0\"></iframe></p>', '7', '2023-01-31 15:25:12', '2023-01-31 15:25:12', 4),
(15, 23, '<p><iframe allowfullscreen src=\"https://short.ink/LCi6bsv4F\" frameborder=\"0\" height=\"360\" width=\"100%\" scrolling=\"0\"></iframe></p>', '8', '2023-01-31 17:29:25', '2023-01-31 17:29:25', 2),
(16, 23, '<p><iframe allowfullscreen src=\"https://short.ink/BxcY1IHfC\" frameborder=\"0\" height=\"360\" width=\"100%\" scrolling=\"0\"></iframe></p>', '1', '2023-01-31 17:59:50', '2023-01-31 17:59:50', 7),
(17, 23, '<p><iframe allowfullscreen src=\"https://short.ink/GyifY9CKs\" frameborder=\"0\" height=\"360\" width=\"100%\" scrolling=\"0\"></iframe></p>', '2', '2023-01-31 18:00:50', '2023-01-31 18:00:50', 7),
(18, 22, '<p><iframe allowfullscreen src=\"https://short.ink/BxcY1IHfC\" frameborder=\"0\" height=\"360\" width=\"100%\" scrolling=\"0\"></iframe></p>', '1', '2023-02-01 12:31:56', '2023-02-01 12:31:56', 5),
(19, 23, '<p><iframe allowfullscreen src=\"https://short.ink/LCi6bsv4F\" frameborder=\"0\" height=\"360\" width=\"100%\" scrolling=\"0\"></iframe></p>', '8', '2023-02-02 19:57:09', '2023-02-02 19:57:09', 4),
(20, 25, '<p><iframe allowfullscreen src=\"https://short.ink/LCi6bsv4F\" frameborder=\"0\" height=\"360\" width=\"100%\" scrolling=\"0\"></iframe></p>', '1', '2023-02-04 18:57:26', '2023-02-04 18:57:26', 2),
(21, 25, '<p><iframe allowfullscreen src=\"https://short.ink/LCi6bsv4F\" frameborder=\"0\" height=\"360\" width=\"100%\" scrolling=\"0\"></iframe></p>', '2', '2023-02-13 13:05:58', '2023-02-13 13:05:58', 7),
(23, 25, '<p><iframe allowfullscreen src=\"https://short.ink/LCi6bsv4F\" frameborder=\"0\" height=\"360\" width=\"100%\" scrolling=\"0\"></iframe></p>', '3', '2023-02-15 17:50:13', '2023-02-15 17:50:13', 7),
(24, 38, '<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/dpPiGLNtqKQ\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" allowfullscreen></iframe>', '1', '2023-02-23 19:24:37', '2023-02-23 19:24:37', 7);

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `genres`
--

CREATE TABLE `genres` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` varchar(255) NOT NULL,
  `status` int(11) NOT NULL,
  `slug` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `genres`
--

INSERT INTO `genres` (`id`, `title`, `description`, `status`, `slug`) VALUES
(2, 'Tình cảm', 'Tình cảm cập nhật thường xuyên', 1, 'tinh-cam'),
(3, 'Hoạt hình', 'Hoạt hình cập nhật thường xuyên', 1, 'hoat-hinh'),
(4, 'Hành động', 'Hành động cập nhật thường xuyên', 1, 'hanh-dong'),
(5, 'Viễn tưởng', 'Viễn tưởng cập nhật thường xuyên', 1, 'vien-tuong'),
(6, 'Hài hước', 'Hài hước cập nhật thường xuyên', 1, 'hai-huoc'),
(8, 'Kinh dị', 'Kinh dị cập nhật thường xuyên', 1, 'kinh-di'),
(9, 'Võ thuật', 'Võ thuật cập nhật thường xuyên', 1, 'vo-thuat'),
(10, 'Gia đinh - Học đường', 'Gia đinh - Học đường cập nhật thường xuyên', 1, 'gia-dinh-hoc-duong'),
(11, 'Phim ma', 'Phim ma đang được cập nhật', 1, 'phim-ma'),
(12, 'Phim lẻ', 'Phim lẻ đang được cập nhật', 1, 'phim-le'),
(14, 'Phiêu lưu', 'Phiêu lưu', 1, 'Phiêu lưu');

-- --------------------------------------------------------

--
-- Table structure for table `info`
--

CREATE TABLE `info` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `logo` varchar(100) NOT NULL,
  `copyright` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `info`
--

INSERT INTO `info` (`id`, `title`, `description`, `logo`, `copyright`) VALUES
(1, '© Theme developed by HaLimThemes.Com', 'Xem Phim Mới HD, VietSub, Thuyết Minh Tốc Độ Cao – Rạp Phim Việt Nam', 'logo12825.png', 'Copyright © 2023 PhimMoiNe.Net – All Rights Reserved');

-- --------------------------------------------------------

--
-- Table structure for table `linkmovie`
--

CREATE TABLE `linkmovie` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` varchar(255) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `linkmovie`
--

INSERT INTO `linkmovie` (`id`, `title`, `description`, `status`) VALUES
(2, 'Server Vimeo', 'Server vimeo mượt và miễn phí trọn đời bên em', 1),
(3, 'Server Thường', 'Server Thường có quảng cáo có đôi lúc bị lag', 1),
(4, 'Server Hydrax', 'Server Hydrax link mượt nhưng quảng cáo hơi nhiều', 1),
(5, 'Server Vip Nhanh', 'Server Vip Nhanh nạp 80k/1 tháng xem phim nhanh và không quảng cáo', 1),
(6, 'Server OK.ru', 'Server OK.ru phim hay video mượt', 1),
(7, 'Server doodstream', 'Server doodstream video mượt và không tính phí', 1);

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `movies`
--

CREATE TABLE `movies` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `thoiluong` varchar(50) DEFAULT NULL,
  `slug` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `image` varchar(255) NOT NULL,
  `category_id` int(11) NOT NULL,
  `genre_id` int(11) NOT NULL,
  `country_id` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `phim_hot` int(11) NOT NULL,
  `resolution` int(11) NOT NULL DEFAULT 0,
  `name_eng` varchar(255) NOT NULL,
  `phude` int(11) NOT NULL DEFAULT 0,
  `ngaytao` varchar(50) DEFAULT NULL,
  `ngaycapnhat` varchar(50) DEFAULT NULL,
  `year` varchar(20) DEFAULT NULL,
  `tags` text DEFAULT NULL,
  `topview` int(11) DEFAULT NULL,
  `season` int(11) NOT NULL DEFAULT 0,
  `trailer` varchar(100) DEFAULT NULL,
  `sotap` int(11) NOT NULL DEFAULT 1,
  `thuocphim` varchar(50) NOT NULL,
  `count_views` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `movies`
--

INSERT INTO `movies` (`id`, `title`, `thoiluong`, `slug`, `description`, `image`, `category_id`, `genre_id`, `country_id`, `status`, `phim_hot`, `resolution`, `name_eng`, `phude`, `ngaytao`, `ngaycapnhat`, `year`, `tags`, `topview`, `season`, `trailer`, `sotap`, `thuocphim`, `count_views`) VALUES
(10, 'THẾ GIỚI KHỦNG LONG: LÃNH ĐỊA', '120 Phút', 'the-gioi-khung-long-lanh-dia', 'NỘI DUNG PHIM Thế Giới Khủng Long: Lãnh Địa kể về bốn năm sau kết thúc Jurassic World: Fallen Kingdom, những con khủng long đã thoát khỏi nơi giam cầm và tiến vào thế giới loài người. Giờ đây, chúng xuất hiện ở khắp mọi nơi. Sinh vật to lớn ấy không còn chỉ ở trên đảo như trước nữa mà gần ngay trước mắt, thậm chí còn có thể chạm tới. Owen Grady may mắn gặp lại cô khủng long mà anh và khán giả vô cùng yêu mến - Blue. Tuy nhiên, Blue không đi một mình mà còn đem theo một chú khủng long con khác. Điều này khiến Owen càng quyết tâm bảo vệ mẹ con cô được sinh sống an toàn. Thế nhưng, hai giống loài quá khác biệt. Liệu có thể tồn tại một kỷ nguyên mà khủng long và con người sống chung một cách hòa bình?', 'the-gioi-khung-long-3-lanh-dia-hd-jurassic-world-dominion91928870.jpg', 3, 2, 6, 1, 1, 4, 'Dog', 1, '', '2023-01-12 18:53:50', '2022', NULL, 2, 0, NULL, 1, 'phimbo', 12349),
(12, 'Huyền Thoại Vikings: Valhalla (Phần 2)', '8 Tập', 'huyen-thoai-vikings-valhalla-phan-2', 'Huyền Thoại Vikings: Valhalla (Phần 2) Vikings: Valhalla (Season 2) 2022 Full HD Vietsub Thuyết Minh Phần mới diễn ra ngay sau các sự kiện của Phần 1, với việc định cư Kattegat trong tay của Vua Sweyen Forkbeard ( Søren Pilmark ) sau cuộc vây hãm thành phố thất bại của Olaf ( Jóhannes Haukur Jóhannesson ). Tuy nhiên, việc thay đổi liên minh và lòng trung thành đồng nghĩa với việc thành trì của người Viking không còn là nơi trú ẩn an toàn cho Leif ( Sam Corlett ), Freydis ( Frida Gustavsson ) và Harald ( Leo Suter ), những người buộc phải tiếp tục chạy trốn. Bộ ba nhanh chóng tách ra, Freydis đi tìm vận mệnh của mình theo một hướng, trong khi Harald tìm kiếm định mệnh của mình ở một hướng khác. Anh ấy đi cùng với Leif, người vẫn chưa biết định mệnh sắp đặt cho mình điều gì, nhưng như lịch sử đã cho chúng ta biết, anh ấy có một thứ gì đó vĩ đại đang chờ đợi trong đôi cánh.\r\nMọi thứ tốt hơn, nhưng chỉ một chút, ở London, nơi Nữ hoàng Emma ( Laura Berlin ) và Bá tước Godwin ( David Oakes ) nắm giữ mọi thứ khi Vua Canute ( Bradley Freegard ) vắng mặt, mặc dù ngay cả trong thời bình tương đối, mọi thứ tại tòa án không bao giờ ở lại yên lặng lâu. Âm mưu cung đình đang diễn ra mang lại sự cân bằng cần thiết với câu chuyện theo định hướng phiêu lưu hành động hơn xảy ra ở nơi khác, với các cốt truyện kết hợp với nhau để thể hiện sức mạnh của một dàn diễn viên thực sự tài năng, bao gồm những người mới tham gia loạt phim Bradley James, Hayat Kamille, Sofya Lebedeva , và Tolga An toàn hơn .', 'huyen-thoai-vikings-valhalla-phan-22786.jpg', 3, 4, 4, 1, 1, 5, 'Vikings: Valhalla (Season 2) (2022)', 0, '2023-01-13 14:30:46', '2023-01-13 14:30:46', '1992', 'vikings valhalla season 2\r\nhuyen thoai viking valhalla phan 2', 1, 2, NULL, 1, 'phimbo', 8),
(13, 'VẾT NỨT: ÁM HỒN TRONG TRANH', '93 phút', 'vet-nut-am-hon-trong-tranh', 'NỘI DUNG PHIM Vết Nứt: Ám Hồn Trong Tranh kể về câu chuyện sau khi một họa sĩ nổi tiếng tự tử, những bí ẩn kinh hoàng dần được hé lộ.', 'vetnuc23961992.jfif', 7, 5, 3, 1, 1, 0, 'Cracked (2022)', 0, '2023-01-14 12:10:59', '2023-01-19 16:19:59', NULL, 'xem phim Vết Nứt: Ám Hồn Trong Tranh vietsub phim Cracked vietsub xem Vết Nứt: Ám Hồn Trong Tranh vietsub online tap 1 tap 2 tap 3 tap 4 phim Cracked ep 5 ep 6 ep 7 ep 8 ep 9 ep 10 xem Vết Nứt: Ám Hồn Trong Tranh tập 11 tập 12 tập 13 tập 14 tập 15 phim Vết Nứt: Ám Hồn Trong Tranh tap 16 tap 17 tap 18 tap 19 tap 20 xem phim Vết Nứt: Ám Hồn Trong Tranh tập 21 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 Vết Nứt: Ám Hồn Trong Tranh tap cuoi Cracked vietsub tron bo review Vết Nứt: Ám Hồn Trong Tranh netflix Vết Nứt: Ám Hồn Trong Tranh wetv Vết Nứt: Ám Hồn Trong Tranh phimmoi Vết Nứt: Ám Hồn Trong Tranh youtube Vết Nứt: Ám Hồn Trong Tranh dongphym Vết Nứt: Ám Hồn Trong Tranh vieon phim keeng bilutv biphim hdvip hayghe motphim tvhay zingtv fptplay phim1080 luotphim fimfast dongphim fullphim phephim vtvgiaitri Vết Nứt: Ám Hồn Trong Tranh full Cracked online Vết Nứt: Ám Hồn Trong Tranh Thuyết Minh Vết Nứt: Ám Hồn Trong Tranh Vietsub Vết Nứt: Ám Hồn Trong Tranh Lồng Tiếng', 1, 0, NULL, 1, 'phimle', 52),
(14, 'PHI CÔNG SIÊU ĐẲNG MAVERICK', '130 phút', 'phi-cong-sieu-dang-maverick', 'NỘI DUNG PHIM Phi Công Siêu Đẳng Maverick kể về sau hơn ba mươi năm phục vụ, Pete “Maverick” Mitchell từng nổi danh là một phi công thử nghiệm quả cảm hàng đầu của Hải quân, né tránh cơ hội thăng chức, điều khiến anh cảm thấy bị bó buộc, để trở về làm chính mình.', 'phi-cong-sieu-dang-maverick-1052785354817.jpg', 7, 4, 9, 1, 1, 4, 'Top Gun: Maverick (2022)', 0, '2023-01-14 12:12:36', '2023-01-14 13:29:19', NULL, 'xem phim Phi Công Siêu Đẳng Maverick, vietsub phim Top Gun: Maverick vietsub xem Phi Công Siêu Đẳng Maverick vietsub online tap 1 tap 2 tap 3 tap 4 phim Top Gun: Maverick ep 5 ep 6 ep 7 ep 8 ep 9 ep 10 xem Phi Công Siêu Đẳng Maverick tập 11 tập 12 tập 13 tập 14 tập 15 phim Phi Công Siêu Đẳng Maverick tap 16 tap 17 tap 18 tap 19 tap 20 xem phim Phi Công Siêu Đẳng Maverick tập 21 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 Phi Công Siêu Đẳng Maverick tap cuoi Top Gun: Maverick vietsub tron bo review Phi Công Siêu Đẳng Maverick netflix Phi Công Siêu Đẳng Maverick wetv Phi Công Siêu Đẳng Maverick phimmoi Phi Công Siêu Đẳng Maverick youtube Phi Công Siêu Đẳng Maverick dongphym Phi Công Siêu Đẳng Maverick vieon phim keeng bilutv biphim hdvip hayghe motphim tvhay zingtv fptplay phim1080 luotphim fimfast dongphim fullphim phephim vtvgiaitri Phi Công Siêu Đẳng Maverick full Top Gun: Maverick online Phi Công Siêu Đẳng Maverick Thuyết Minh Phi Công Siêu Đẳng Maverick Vietsub Phi Công Siêu Đẳng Maverick Lồng Tiếng', 2, 5, NULL, 2, 'phimle', 2),
(15, 'DORAEMON: NOBITA VÀ CUỘC CHIẾN VŨ TRỤ TÍ HON', '109 phút', 'doraemon-nobita-va-cuoc-chien-vu-tru-ti-hon', 'NỘI DUNG PHIM Doraemon: Nobita Và Cuộc Chiến Vũ Trụ Tí Hon kể về Nobita tình cờ gặp được người ngoài hành tinh tí hon Papi, vốn là Tổng thống của hành tinh Pirika, chạy trốn tới Trái Đất để thoát khỏi những kẻ nổi loạn nơi quê nhà. Doraemon, Nobita và hội bạn thân dùng bảo bối đèn pin thu nhỏ biến đổi theo kích cỡ giống Papi để chơi cùng cậu bé. Thế nhưng, một tàu chiến không gian tấn công cả nhóm. Cảm thấy có trách nhiệm vì liên lụy mọi người, Papi quyết định một mình đương đầu với quân phiến loạn tàn ác. Doraemon và các bạn lên đường đến hành tinh Pirika, sát cánh bên người bạn của mình.', 'doraemon-nobita-va-cuoc-chien-vu-tru-ti-hon-1054825306400.jpg', 6, 3, 5, 1, 1, 5, 'Doraemon The Movie: Nobita\'s Little Star Wars (2022)', 0, '2023-01-14 12:14:06', '2023-02-16 16:23:46', '1996', 'xem phim Doraemon: Nobita Và Cuộc Chiến Vũ Trụ Tí Hon vietsub phim Doraemon The Movie: Nobita\'s Little Star Wars vietsub xem Doraemon: Nobita Và Cuộc Chiến Vũ Trụ Tí Hon vietsub online tap 1 tap 2 tap 3 tap 4 phim Doraemon The Movie: Nobita\'s Little Star Wars ep 5 ep 6 ep 7 ep 8 ep 9 ep 10 xem Doraemon: Nobita Và Cuộc Chiến Vũ Trụ Tí Hon tập 11 tập 12 tập 13 tập 14 tập 15 phim Doraemon: Nobita Và Cuộc Chiến Vũ Trụ Tí Hon tap 16 tap 17 tap 18 tap 19 tap 20 xem phim Doraemon: Nobita Và Cuộc Chiến Vũ Trụ Tí Hon tập 21 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 Doraemon: Nobita Và Cuộc Chiến Vũ Trụ Tí Hon tap cuoi Doraemon The Movie: Nobita\'s Little Star Wars vietsub tron bo review Doraemon: Nobita Và Cuộc Chiến Vũ Trụ Tí Hon netflix Doraemon: Nobita Và Cuộc Chiến Vũ Trụ Tí Hon wetv Doraemon: Nobita Và Cuộc Chiến Vũ Trụ Tí Hon phimmoi Doraemon: Nobita Và Cuộc Chiến Vũ Trụ Tí Hon youtube Doraemon: Nobita Và Cuộc Chiến Vũ Trụ Tí Hon dongphym Doraemon: Nobita Và Cuộc Chiến Vũ Trụ Tí Hon vieon phim keeng bilutv biphim hdvip hayghe motphim tvhay zingtv fptplay phim1080 luotphim fimfast dongphim fullphim phephim vtvgiaitri Doraemon: Nobita Và Cuộc Chiến Vũ Trụ Tí Hon full Doraemon The Movie: Nobita\'s Little Star Wars online Doraemon: Nobita Và Cuộc Chiến Vũ Trụ Tí Hon Thuyết Minh Doraemon: Nobita Và Cuộc Chiến Vũ Trụ Tí Hon Vietsub Doraemon: Nobita Và Cuộc Chiến Vũ Trụ Tí Hon Lồng Tiếng', 0, 6, 'oO68gfo1TKk', 3, 'phimle', 67),
(16, 'ĐỐI TÁC HOÀN HẢO', '101 phút', 'doi-tac-hoan-hao', 'NỘI DUNG PHIM Đối Tác Hoàn Hảo là tác phẩm mới ra lò của vị đạo diễn người Hàn Quốc từng thành danh với siêu phẩm Vì Sao Đưa Anh Tới, cùng sự góp mặt của thiên vương Quách Phú Thành. Phim kể về câu chuyện khởi nghiệp tại chốn thương trường tàn khốc của những con người trẻ tuổi nhưng đầy nhiệt huyết.', 'doi-tac-hoan-hao69766452.jpg', 7, 4, 4, 1, 1, 4, 'Miss Partners (2016)', 1, '2023-01-14 12:15:31', '2023-01-14 12:15:31', NULL, 'xem phim Đối Tác Hoàn Hảo vietsub phim Miss Partners vietsub xem Đối Tác Hoàn Hảo vietsub online tap 1 tap 2 tap 3 tap 4 phim Miss Partners ep 5 ep 6 ep 7 ep 8 ep 9 ep 10 xem Đối Tác Hoàn Hảo tập 11 tập 12 tập 13 tập 14 tập 15 phim Đối Tác Hoàn Hảo tap 16 tap 17 tap 18 tap 19 tap 20 xem phim Đối Tác Hoàn Hảo tập 21 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 Đối Tác Hoàn Hảo tap cuoi Miss Partners vietsub tron bo review Đối Tác Hoàn Hảo netflix Đối Tác Hoàn Hảo wetv Đối Tác Hoàn Hảo phimmoi Đối Tác Hoàn Hảo youtube Đối Tác Hoàn Hảo dongphym Đối Tác Hoàn Hảo vieon phim keeng bilutv biphim hdvip hayghe motphim tvhay zingtv fptplay phim1080 luotphim fimfast dongphim fullphim phephim vtvgiaitri Đối Tác Hoàn Hảo full Miss Partners online Đối Tác Hoàn Hảo Thuyết Minh Đối Tác Hoàn Hảo Vietsub Đối Tác Hoàn Hảo Lồng Tiếng', 2, 1, NULL, 2, 'phimle', 8),
(17, 'THOR: TÌNH YÊU VÀ SẤM SÉT', '118 phút', 'thor-tinh-yeu-va-sam-set', 'NỘI DUNG PHIM Thor: Tình Yêu Và Sấm Sét kể về một chiến binh hùng mạnh của Asgard, trải qua vô số trận chiến lớn nhỏ nhưng sau sự kiện trong Avengers: Endgame (2019) cùng vô số mất mát, Thần Sấm không còn muốn theo đuổi con đường siêu anh hùng. Từ đây, anh lên đường tìm ra ý nghĩa của cuộc sống và nhìn nhận lại bản thân mình.', 'thorlove90652495.jfif', 7, 4, 9, 1, 1, 5, 'Thor: Love and Thunder (2022)', 0, '2023-01-14 12:16:54', '2023-02-16 16:22:58', NULL, 'xem phim Thor: Tình Yêu Và Sấm Sét vietsub phim Thor: Love and Thunder vietsub xem Thor: Tình Yêu Và Sấm Sét vietsub online tap 1 tap 2 tap 3 tap 4 phim Thor: Love and Thunder ep 5 ep 6 ep 7 ep 8 ep 9 ep 10 xem Thor: Tình Yêu Và Sấm Sét tập 11 tập 12 tập 13 tập 14 tập 15 phim Thor: Tình Yêu Và Sấm Sét tap 16 tap 17 tap 18 tap 19 tap 20 xem phim Thor: Tình Yêu Và Sấm Sét tập 21 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 Thor: Tình Yêu Và Sấm Sét tap cuoi Thor: Love and Thunder vietsub tron bo review Thor: Tình Yêu Và Sấm Sét netflix Thor: Tình Yêu Và Sấm Sét wetv Thor: Tình Yêu Và Sấm Sét phimmoi Thor: Tình Yêu Và Sấm Sét youtube Thor: Tình Yêu Và Sấm Sét dongphym Thor: Tình Yêu Và Sấm Sét vieon phim keeng bilutv biphim hdvip hayghe motphim tvhay zingtv fptplay phim1080 luotphim fimfast dongphim fullphim phephim vtvgiaitri Thor: Tình Yêu Và Sấm Sét full Thor: Love and Thunder online Thor: Tình Yêu Và Sấm Sét Thuyết Minh Thor: Tình Yêu Và Sấm Sét Vietsub Thor: Tình Yêu Và Sấm Sét Lồng Tiếng', 0, 2, 'Poo5lqoWSGw', 1, 'phimle', 13),
(18, 'XA NGOÀI KIA NƠI LOÀI TÔM HÁT', '125 phút', 'xa-ngoai-kia-noi-loai-tom-hat', 'NỘI DUNG PHIM Xa Ngoài Kia Nơi Loài Tôm Hát kể về Kya Clark - một cô gái bị gia đình bỏ rơi, lớn lên ở vùng đầm lầy phía nam thị trấn Barkley Cove vào những năm 50. Khi cảnh sát của thị trấn bị phát hiện đã qua đời, người ta bắt đầu dồn mọi mối nghi ngờ vào Kya', 'Where the Crawdads Sing (2022)13561463.jpg', 3, 8, 8, 1, 1, 0, 'Where the Crawdads Sing (2022)', 0, '2023-01-14 12:18:03', '2023-01-14 12:18:03', NULL, 'xem phim Xa Ngoài Kia Nơi Loài Tôm Hát vietsub phim Where the Crawdads Sing vietsub xem Xa Ngoài Kia Nơi Loài Tôm Hát vietsub online tap 1 tap 2 tap 3 tap 4 phim Where the Crawdads Sing ep 5 ep 6 ep 7 ep 8 ep 9 ep 10 xem Xa Ngoài Kia Nơi Loài Tôm Hát tập 11 tập 12 tập 13 tập 14 tập 15 phim Xa Ngoài Kia Nơi Loài Tôm Hát tap 16 tap 17 tap 18 tap 19 tap 20 xem phim Xa Ngoài Kia Nơi Loài Tôm Hát tập 21 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 Xa Ngoài Kia Nơi Loài Tôm Hát tap cuoi Where the Crawdads Sing vietsub tron bo review Xa Ngoài Kia Nơi Loài Tôm Hát netflix Xa Ngoài Kia Nơi Loài Tôm Hát wetv Xa Ngoài Kia Nơi Loài Tôm Hát phimmoi Xa Ngoài Kia Nơi Loài Tôm Hát youtube Xa Ngoài Kia Nơi Loài Tôm Hát dongphym Xa Ngoài Kia Nơi Loài Tôm Hát vieon phim keeng bilutv biphim hdvip hayghe motphim tvhay zingtv fptplay phim1080 luotphim fimfast dongphim fullphim phephim vtvgiaitri Xa Ngoài Kia Nơi Loài Tôm Hát full Where the Crawdads Sing online Xa Ngoài Kia Nơi Loài Tôm Hát Thuyết Minh Xa Ngoài Kia Nơi Loài Tôm Hát Vietsub Xa Ngoài Kia Nơi Loài Tôm Hát Lồng Tiếng', 2, 0, NULL, 1, 'phimbo', 3),
(19, 'CUỘC CHIẾN XUYÊN KHÔNG', '145 phút', 'cuoc-chien-xuyen-khong', 'NỘI DUNG PHIM Cuộc Chiến Xuyên Không kể về năm 2022, hai người ngoài hành tinh là Guard và Thunder sinh sống tại Trái Đất đang tìm kiếm những tù nhân vượt ngục, vốn bị họ giam giữ trong cơ thể con người. Cảnh sát Moon vô tình trở thành đối tượng bị truy đuổi mà không rõ lý do. Cùng lúc đó, ở triều đại Goryeo hơn 630 năm về trước, pháp sư xui xẻo Muruk và “cô gái bắn sấm sét” Ean đang cố gắng tranh giành một thanh gươm thần huyền thoại. Cuộc chiến khốc liệt ấy còn có sự tham gia của hai phù thủy hắc ám là Madam Black và Mr. Blue cùng kẻ đeo mặt nạ bí ẩn Một cánh cổng thời gian xuất hiện và mở ra sự kết nối giữa hai thời đại, tạo nên tình huống hỗn loạn chưa từng thấy.', 'alienoid_-_teaser_poster_1_89088198.jpg', 7, 5, 6, 1, 1, 0, 'Alienoid (2022)', 0, '2023-01-14 12:20:20', '2023-01-15 18:17:19', NULL, 'xem phim Cuộc Chiến Xuyên Không vietsub phim Alienoid vietsub xem Cuộc Chiến Xuyên Không vietsub online tap 1 tap 2 tap 3 tap 4 phim Alienoid ep 5 ep 6 ep 7 ep 8 ep 9 ep 10 xem Cuộc Chiến Xuyên Không tập 11 tập 12 tập 13 tập 14 tập 15 phim Cuộc Chiến Xuyên Không tap 16 tap 17 tap 18 tap 19 tap 20 xem phim Cuộc Chiến Xuyên Không tập 21 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 Cuộc Chiến Xuyên Không tap cuoi Alienoid vietsub tron bo review Cuộc Chiến Xuyên Không netflix Cuộc Chiến Xuyên Không wetv Cuộc Chiến Xuyên Không phimmoi Cuộc Chiến Xuyên Không youtube Cuộc Chiến Xuyên Không dongphym Cuộc Chiến Xuyên Không vieon phim keeng bilutv biphim hdvip hayghe motphim tvhay zingtv fptplay phim1080 luotphim fimfast dongphim fullphim phephim vtvgiaitri Cuộc Chiến Xuyên Không full Alienoid online Cuộc Chiến Xuyên Không Thuyết Minh Cuộc Chiến Xuyên Không Vietsub Cuộc Chiến Xuyên Không Lồng Tiếng', 1, 8, NULL, 1, 'phimbo', 10),
(20, 'CHÚ THUẬT HỒI CHIẾN 0 – JUJUTSU KAISEN', '120 phút', 'chu-thuat-hoi-chien-0-–-jujutsu-kaisen', 'Chú Thuật Hồi Chiến 0 - Jujutsu Kaisen 0 Movie (Gekijouban Jujutsu Kaisen 0), Jujutsu Kaisen 0 Movie (Gekijouban Jujutsu Kaisen 0) 2022 Full Yuta Okkotsu, một học sinh trung học giành được quyền kiểm soát một Linh hồn bị nguyền rủa cực kỳ mạnh mẽ và được các phù thủy Jujutsu đăng ký vào trường trung học Jujutsu tỉnh Tokyo để giúp anh ta kiểm soát sức mạnh của mình và để mắt đến anh ta.', '62809a84eb12563636586.jpg', 7, 8, 5, 1, 1, 0, 'Jujutsu Kaisen 0 Movie (Gekijouban Jujutsu Kaisen 0)', 0, '2023-01-14 12:21:19', '2023-01-15 18:02:05', '2023', 'Chú Thuật Hồi Chiến 0 - Jujutsu Kaisen 0 Movie (Gekijouban Jujutsu Kaisen 0) Jujutsu Kaisen 0 Movie (Gekijouban Jujutsu Kaisen 0) 2022', 1, 4, '-B9IXDN-zrA', 11, 'phimle', 6),
(21, 'NỮ LUẬT SƯ KỲ LẠ WOO YOUNG WOO', '60 phút/1 tập', 'nu-luat-su-ky-la-woo-young-woo', 'NỘI DUNG PHIM Nữ Luật Sư Kỳ Lạ Woo Young Woo kể về nữ luật sư mắc chứng tự kỷ và là lính mới tại công ty luật hàng đầu, luật sư tài ba Woo Young Woo đương đầu với những thử thách trong phòng xử án và nhiều nơi khác.', 'Extraordinary Attorney Woo (2022)317550.jpg', 3, 1, 6, 1, 1, 4, 'Extraordinary Attorney Woo (2022)', 0, '2023-01-15 07:10:42', '2023-01-15 17:54:34', '1999', 'xem phim Nữ Luật Sư Kỳ Lạ Woo Young Woo vietsub phim Extraordinary Attorney Woo vietsub xem Nữ Luật Sư Kỳ Lạ Woo Young Woo vietsub online tap 1 tap 2 tap 3 tap 4 phim Extraordinary Attorney Woo ep 5 ep 6 ep 7 ep 8 ep 9 ep 10 xem Nữ Luật Sư Kỳ Lạ Woo Young Woo tập 11 tập 12 tập 13 tập 14 tập 15 phim Nữ Luật Sư Kỳ Lạ Woo Young Woo tap 16 tap 17 tap 18 tap 19 tap 20 xem phim Nữ Luật Sư Kỳ Lạ Woo Young Woo tập 21 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 Nữ Luật Sư Kỳ Lạ Woo Young Woo tap cuoi Extraordinary Attorney Woo vietsub tron bo review Nữ Luật Sư Kỳ Lạ Woo Young Woo netflix Nữ Luật Sư Kỳ Lạ Woo Young Woo wetv Nữ Luật Sư Kỳ Lạ Woo Young Woo phimmoi Nữ Luật Sư Kỳ Lạ Woo Young Woo youtube Nữ Luật Sư Kỳ Lạ Woo Young Woo dongphym Nữ Luật Sư Kỳ Lạ Woo Young Woo vieon phim keeng bilutv biphim hdvip hayghe motphim tvhay zingtv fptplay phim1080 luotphim fimfast dongphim fullphim phephim vtvgiaitri Nữ Luật Sư Kỳ Lạ Woo Young Woo full Extraordinary Attorney Woo online Nữ Luật Sư Kỳ Lạ Woo Young Woo Thuyết Minh Nữ Luật Sư Kỳ Lạ Woo Young Woo Vietsub Nữ Luật Sư Kỳ Lạ Woo Young Woo Lồng Tiếng', NULL, 0, 'MxeXECe2t-c', 11, 'phimle', 3),
(22, 'BIG MOUTH', '60 phút/1 tập', 'big-mouth', 'NỘI DUNG PHIM Luật Sư Hắc Hóa kể về Park Chang Ho (Lee Jong Suk) là một luật sư hạng bét, không có năng lực nhưng phụ trách một vụ án giết người. Từ đó, anh bắt đầu nhận ra những sự thật bị che giấu từ bấy lâu nay và buộc phải trở nên ác độc để bảo vệ bản thân, gia đình và trừng phạt tội ác của phe đối địch.', 'big-mouth-104729907794.jpg', 6, 6, 6, 1, 1, 0, 'BIG MOUTH', 0, '2023-01-15 17:09:41', '2023-01-16 13:55:28', NULL, 'xem phim Big Mouth vietsub phim Big Mouth vietsub xem Big Mouth vietsub online tap 1 tap 2 tap 3 tap 4 phim Big Mouth ep 5 ep 6 ep 7 ep 8 ep 9 ep 10 xem Big Mouth tập 11 tập 12 tập 13 tập 14 tập 15 phim Big Mouth tap 16 tap 17 tap 18 tap 19 tap 20 xem phim Big Mouth tập 21 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 Big Mouth tap cuoi Big Mouth vietsub tron bo review Big Mouth netflix Big Mouth wetv Big Mouth phimmoi Big Mouth youtube Big Mouth dongphym Big Mouth vieon phim keeng bilutv biphim hdvip hayghe motphim tvhay zingtv fptplay phim1080 luotphim fimfast dongphim fullphim phephim vtvgiaitri Big Mouth full Big Mouth online Big Mouth Thuyết Minh Big Mouth Vietsub Big Mouth Lồng Tiếng', 2, 1, 'Z3OMssCwMjA', 2, 'phimle', 27),
(23, 'Thợ săn quái vật (Phần 2)', '50 Phút', 'tho-san-quai-vat-phan-2', 'Geralt đón nhận định mệnh của mình khi anh bảo vệ Ciri khỏi các thế lực đang đấu đá giành quyền kiểm soát Lục Địa – và cả sức mạnh bí ẩn mà cô sở hữu.', 'tho-san-quai-vat-phan-2-thumb1082.jpg', 3, 1, 9, 1, 1, 4, 'The Witcher (Season 2) (2021)', 0, '2023-01-15 18:54:17', '2023-02-09 20:23:58', '2021', 'Thợ săn quái vật (Phần 2), The Witcher (Season 2)', 2, 2, 'dpPiGLNtqKQ', 8, 'phimle', 31),
(25, 'ONE PUNCH MAN', '60 phút/1 tập', 'one-punch-man', 'one punch man c Gia, Superman/Batman: Public Enemies 2009 Tập HD Vietsub Superman/Batman: Public Enemies là bộ phim hoạt hình về Người Dơi và Siêu Nhân. Trong phần này, nói về cuộc chiến của họ khi Lex Luthor được bầu làm Tổng thống Mỹ, ông đ', 'thoi-dai-ma-phap63417910.jpg', 5, 3, 2, 1, 1, 0, 'Poo5lqoWSGw', 1, '2023-01-17 15:21:09', '2023-02-22 20:08:24', '2017', 'ONE PUNCH MAN', 0, 3, 'Poo5lqoWSGw', 3, 'phimle', 37990),
(26, 'TRÙNG TỬ', '93 phút', 'trung-tu', 'Vua quỷ Ni Lun đã bị tiêu diệt để lại gia tộc quỷ tan tành khi họ trốn thoát vào cõi phàm trần. Chong Zi trong sáng và tốt bụng, nhưng cô ấy lại là con gái của Ni Lun. Sau khi được cứu bởi Chu Bu Fu bất tử, cô quyết tâm tu luyện tại Nanhua nhưng bị từ chối vì người ta đã báo trước rằng cô sẽ trở thành yêu quái. Lúc này, Tôn giả Luo YinFan bất ngờ nhận Chong Zi làm đệ tử duy nhất của mình. Chong Zi rất tin tưởng vào Luo Yin Fan và không mong muốn gì hơn là được ở bên cạnh anh ấy. Đổi lại, Luo Yin Fan hứa sẽ bảo vệ cô. Một âm mưu dẫn đến việc Chong Zi bị bỏ tù và Luo Yin Fan không thể làm gì để giúp đỡ, dẫn đến cái chết của cô ấy vì hòa bình. Ở kiếp thứ hai, Chong Zi lại đến Nanhua. Luo Yin Fan nhận ra cô ấy trong nháy mắt. Để bảo vệ cô ấy, anh ấy đã phong ấn chướng khí độc ác bên trong cô ấy và giữ cô ấy ở bên cạnh, do đó họ tiếp tục mối quan hệ thầy trò của họ. Tuy nhiên, không ai thoát khỏi bánh xe của số phận. Chong Zi một lần nữa trở thành mục tiêu của vô số mũi tên. Trong cơn thịnh nộ, cô ấy ôm lấy mặt quỷ của mình và đạt đến điểm không thể quay lại. Số phận đã chơi một trò đùa nghiệt ngã với đôi tình nhân vượt qua các vì sao - một người là chủ nhân đáng kính gánh cả thế giới trên vai trong khi người còn lại mang trong mình dòng máu của quỷ tộc. Họ yêu nhau bất lực, bất lực quay lưng lại với nhau, nhưng họ vẫn không thể thoát khỏi tình cảm của mình. Liệu tình yêu của họ có thể lay chuyển quy luật của đất trời?', 'Poster-trung-tu-the-journey-of-chongzi-id_9241_1587079233FlcAm (1)7611.jpg', 6, 3, 4, 1, 1, 0, 'The Journey of Chongzi (2023)', 0, '2023-02-23 13:46:23', '2023-02-23 13:47:37', NULL, 'trùng tử  the journey of chongzi', NULL, 0, 'elTgqUW-NYE', 1, 'phimbo', 32561),
(27, 'ĐẠI MINH DƯỚI KÍNH HIỂN VI', '93 phút', 'dai-minh-duoi-kinh-hien-vi', 'Đại Minh Dưới Kính Hiển Vi kể về câu chuyện xoay quanh Soái Gia Mặc, là chàng trai bị ám ảnh bởi toán học, không chút hứng thú với tửu sắc bài bạc, thú vui của anh là chỉnh sửa lại những sai sót trong sổ sách. Chỉ cần có cơ hội, anh chàng sẽ nghĩ cách để vào kho tài liệu xem lại những sổ sách cũ để tính toán lại các con số. Tất cả các loại thuế của phủ Huy Châu do 6 huyện cùng gánh vác, Gia Mặc vô tình phát hiện mục “thuế tơ lụa” lại chỉ do một huyện Thiệp đảm đương nhiều năm qua. Sau đó, y tìm được bằng chứng giúp người dân huyện Thiệp đòi lại công đạo. Từ đây, Soái Gia Mặc bị cuốn vào “vụ án tơ lụa” mở ra một câu chuyện theo dòng lịch sử chính trị của triều Đại Minh. Bất luận phía có bao nhiêu trở ngại hay khó khăn, động chạm đến lợi ích của ai, \"phép tính\" có lỗi sai nhất định phải sửa đổi đó chính là hoài bão và ý chí kiên định của Soái Gia Mặc.', 'Poster-dai-minh-duoi-kinh-hien-vi-under-the-microscope-id_9229_99924178dErnp9852.jpg', 6, 6, 4, 1, 1, 0, 'Under the Microscope (2023)', 0, '2023-02-23 13:50:10', '2023-02-23 13:50:10', NULL, 'đại minh dưới kính hiển vi  under the microscope', NULL, 0, 'elTgqUW-NYE', 1, 'phimbo', 33117),
(28, 'THẾ THÂN', '133 Phút', 'the-than', 'Avatar là câu chuyện về người anh hùng “bất đắc dĩ” Jake Sully – một cựu sĩ quan thủy quân lục chiến bị liệt nửa thân. Người anh em sinh đôi của anh được chọn để tham gia vào chương trình cấy gien với người ngoài hành tinh Na’vi nhằm tạo ra một giống loài mới có thể hít thở không khí tại hành tinh Pandora. Giống người mới này được gọi là Avatar. Sau khi anh của Jake bị giết, Jake được chọn để thay thế anh mình và đã trở thành một Avatar, Jake có nhiệm vụ đi tìm hiểu và nghiên cứu hành tinh Pandora. Những thông tin mà anh thu thập được rất có giá trị cho chiến dịch xâm chiếm hành tinh xanh thứ hai này của loài người', 'Poster-the-than-avatar-id_2113_1096395713CgcB8387.jpg', 6, 1, 4, 1, 1, 0, 'Avatar (2009)', 0, '2023-02-23 13:53:49', '2023-02-23 13:53:49', NULL, 'thế thân  avatar', NULL, 0, 'elTgqUW-NYE', 1, 'phimle', 43749),
(29, 'SONIC PRIME', '93 phút', 'sonic-prime', 'Khi một trận chiến bùng nổ với tiến sĩ Eggman tàn phá vũ trụ, Sonic gấp rút băng qua nhiều chiều không gian song song để tìm lại bạn bè và cứu thế giới.', 'Poster-sonic-prime-sonic-prime-id_9110_2088007617QwD2Q5466.jpg', 6, 3, 1, 1, 1, 0, 'Sonic Prime (2022)', 0, '2023-02-23 13:55:57', '2023-02-23 13:55:57', NULL, 'sonic prime  sonic prime', NULL, 0, 'elTgqUW-NYE', 1, 'phimle', 73742),
(30, 'THÂM HẢI ĐẠI NGƯ', '93 phút', 'tham-hai-dai-ngu', 'Trương Dương, người đã dành nửa đời sống trên biển sau khi chứng kiến ​​cái chết của vợ mình trong một vụ đắm tàu, đã thề sẽ không bao giờ đặt chân ra biển nữa. Thế nhưng, vào dịp sinh nhật lần thứ 12 của con gái, để thực hiện tâm nguyện của con gái, Trương Dương đã bỏ qua lời khuyên ngăn của bạn bè, vi phạm lời thề và tham gia vào một vụ buôn lậu đường biển, bước chân lên con tàu vượt đại dương trông thoạt nhìn như một căn nhà tù làm bằng sắt. Cùng lúc đó, một tai nạn kinh hoàng đã xảy ra, một con quái vật biển sâu chưa ai từng thấy đã trốn thoát khỏi phòng thí nghiệm trên tàu, dựa vào gen thợ săn bẩm sinh, nó đã bắt đầu một cuộc săn lùng không thương tiếc với những người trên tàu, khiến tất cả mọi người rơi vào một bài kiểm tra sống còn.', 'Poster-tham-hai-dai-ngu-monster-of-the-deep-id_9245_16785512079MoMn3313.jpg', 3, 4, 4, 1, 1, 0, 'monster of the deep (2023)', 0, '2023-02-23 14:14:26', '2023-02-23 14:14:26', NULL, 'thâm hải đại ngư  monster of the deep', NULL, 0, 'elTgqUW-NYE', 1, 'phimle', 60057),
(31, 'CƯỚI EM ĐI', '93 phút', 'cuoi-em-di', 'Cưới Em Đi kể về một siêu sao ca nhạc nọ tên Kat (Lopez) cùng đồng nghiệp là Bastian (Maluma) – vốn cũng là một danh ca tiếng tăm không kém – tổ chức buổi lễ đính hôn trước sự chứng kiến của hàng triệu khán giả toàn cầu. Tuy nhiên, chỉ vài giây trước khi sự kiện diễn ra, cô phát hiện Bastian lăng nhăng sau lưng mình, không thể bỏ lại sân khấu, Kat quyết định… chọn cưới ngẫu nhiên một người lạ trong đám đông fan hâm mộ.', 'Poster-cuoi-em-di-marry-me-2022-id_8634_1830827885vHLA65455.jpg', 12, 1, 4, 1, 1, 0, 'Marry Me (2022)', 0, '2023-02-23 14:20:38', '2023-02-23 14:20:38', NULL, 'cưới em đi  marry me 2022', NULL, 0, NULL, 1, 'phimle', 27618),
(32, 'Chú Thuật Hồi Chiến', '93 phút', 'chu-thuat-hoi-chien', 'Thiếu niên Itadori Yuuji, mang năng lực thể chất phi thường, trải qua cuộc sống học sinh cấp 3 bình thường, nhưng đến một ngày vì cứu bạn bè bị đe doạ bởi “lời nguyền”, cậu đã nuốt chú vật đặc cấp - “Ngón tay của Ryomen Sukuna” và để cho lời nguyền trú ngụ trong linh hồn mình. Cùng chia sẻ thể xác với lời nguyền “Ryomen Sukuna”, Itadori dưới sự hướng dẫn của Chú thuật sư mạnh nhất - Gojo Satoru đã nhập học trường chuyên ngành chống lại lời nguyền - Trường công lập cao đẳng chuyên môn chú thuật Tokyo. Để thanh tẩy lời nguyền, chàng thiếu niên đã trở thành lời nguyền, câu chuyện bi tráng không còn đường lui của cậu thiếu niên ấy bắt đầu quay vòng.', '7706978d7ac2a73854af0a8960811bfe3639.jpg', 4, 3, 5, 1, 1, 0, 'Jujutsu Kaisen', 0, '2023-02-23 14:24:30', '2023-02-23 14:24:30', NULL, 'Jujutsu Kaisen', NULL, 0, NULL, 1, 'phimle', 23185),
(33, 'Gấu Trúc Kung Fu: Kỳ Nghỉ Lễ', '93 phút', 'gau-truc-kung-fu-ky-nghi-le', 'Po tổ chức tiệc cho kỳ nghỉ đông và gặp một chút khó khăn trong buổi tiệc này....', '70f50656a8e7474ecf1719a63d8fdb743.jpg', 4, 3, 5, 1, 1, 0, 'Kung Fu Panda Holiday', 0, '2023-02-23 14:30:15', '2023-02-23 14:30:15', NULL, 'Kung Fu Panda Holiday', NULL, 0, NULL, 1, 'phimle', 40972),
(34, 'tiết kiệm Băng Hoả Ma Trù', '133 Phút', 'tiet-kiem-bang-hoa-ma-tru', 'Dung Niệm Băng trời sinh có thể chết \"Băng hoả đồng nguyên\" từ nhỏ bị Băng Thần tháp đuổi giết, sau khi nhảy vực được \"Quỷ Trù\" Tra Cực cứu và nhận làm đồ đệ, ngộ được ý nghĩa sâu xa của câu \"Dĩ ma nhập trù\". Sau khi đến Băng Tuyết thành, vừa rèn luyện tay nghề nấu nướng vừa khổ tu ma pháp, thực lực kinh người của Niệm Băng bắt đầu lộ đầu mối. Nhưng nguy cơ cũng nối đuôi mà tới, liệu Niệm Băng có chuyển nguy thành an, trở thành ma pháp sư cấp cao của Ngưỡng Quang đại lục không?', '7bdc657861275f24bd5d73e9854b6ca81321.jpg', 4, 3, 5, 1, 1, 0, 'The Magic Chef Of Ice and Fire', 0, '2023-02-23 14:35:37', '2023-02-23 14:35:37', NULL, 'The Magic Chef Of Ice and Fire', NULL, 0, NULL, 1, 'phimle', 99119),
(35, 'Trạch Thiên Ký (Phần 2)', '93 phút', 'trach-thien-ky-phan-2', 'Thái Thủy nguyên niên, có thần thạch từ vũ trụ bay tới, phân tán lạc tại nhân gian, trong đó thần thạch rơi vào Đông Thổ đại lục, thượng diện tuyên khắc lấy kỳ quái đồ đằng, người bởi vì xem hắn đồ đằng mà ngộ đạo, sau lập quốc giáo. Mấy ngàn năm về sau, 14 tuổi thiếu niên cô nhi Trần Trường Sinh, vi chữa bệnh cải mệnh ly khai sư phụ của mình, mang theo một tờ hôn ước đi vào Thần Đô, do đó mở ra một cái nghịch thiên cường giả quật khởi hành trình.', '1532b736bc152f71dd1eb055b0e66425680.jpg', 4, 3, 5, 1, 1, 0, 'Ze Tian Ji (Season 2)', 0, '2023-02-23 14:39:53', '2023-02-23 14:39:53', NULL, 'Ze Tian Ji (Season 2)', NULL, 0, NULL, 1, 'phimle', 33469),
(36, 'Đấu Phá Thương Khung 3', '93 phút', 'dau-pha-thuong-khung-3', 'Vì bảo vệ Nữ Vương Tộc Xà Nhân mà Tiêu Viêm tạm thời trở thành Xà Vương đứng đầu Xà Tộc. Đồng thời anh chàng chính thức luyện công pháp Hồn Điện của tà đạo khiến mọi người đều lo lắng Tiêu Viêm nhập ma mà chết.', 'c3d8117a29a2579ec40a8e74b34eba947381.jpg', 4, 3, 5, 1, 1, 0, 'Fights Break Sphere 3', 0, '2023-02-23 14:44:22', '2023-02-23 14:44:22', NULL, 'Fights Break Sphere 3', NULL, 0, NULL, 1, 'phimle', 32694),
(37, 'Ma Đạo Tổ Sư', '93 phút', 'ma-dao-to-su', 'Ôn thị ngang ngược, tội ác tày trời khiến sinh linh đồ thán. Thế gia nghĩa sĩ trên giang hồ phát động “ Xạ Nhật Chi Chinh ”, vì trượng nghĩa mà hợp lực thảo phạt Ôn gia. “Di Lăng Lão Tổ” Nguỵ Vô Tiện mặc dù lập được công lớn, nhưng lại bị kẻ gian ghen ghét hãm hại, khiến hắn bị vạn người thóa mạ. Sau 30 năm, Nguỵ Vô Tiện lần nữa xuất hiện, cùng Cô Tô Lam Thị Lam Vong Cơ, Vân Mộng Giang Thị Giang Trừng tương ngộ. Từ đây bí ẩn trong Giang hồ cũng dần được hé lộ.', '738c2030923b59cca7e998b10560ff668179.jpg', 4, 3, 5, 1, 1, 0, 'The Founder of Diabolism Final Season', 0, '2023-02-23 14:51:06', '2023-02-23 14:51:06', NULL, 'The Founder of Diabolism Final Season', NULL, 0, NULL, 1, 'phimle', 33803),
(38, 'Thiên Long Bát Bộ Kiều Phong Truyện', '133 Phút', 'thien-long-bat-bo-kieu-phong-truyen', 'Chắc hẳn những bạn yêu mến dòng phim kiếm hiệp võ thuật thì đã hiểu phần nào nội dung từ tiêu đề phim rồi phải không ? Vào thời Bắc Tống, thủ lĩnh của băng nhóm ăn mày cái bang Kiều Phong là một anh hùng hào hiệp, được võ công cũng như võ lâm ủng hộ, nhưng anh ta bất ngờ bị buộc tội là người Khiết Đan và bị tất cả phản bội. Trên con đường tìm kiếm kinh nghiệm sống và tìm ra kẻ thù của mình, Kiều Phong (Chân Tử Đan thủ vai)) và A Châu (Trần Ngọc Kỳ thủ vai), cô hầu gái của gia đình Murong, đã quen nhau và yêu nhau. Cả hai cùng nhau trải qua những biến động tại làng Juxian, quan Yanmen và hồ Jinghu, cho đến khi bà Azhu Yinma bị Qiao Feng lên kế hoạch giết nhầm. Kiều Phong giết chết Mộ Dung Phục, sau đó, với tâm nguyện cuối cùng của A Châu, một mình đi ra ngoài Vạn Lý Trường Thành với tâm nguyện cuối cùng của A Châu. \"Thiên Long Bát Bộ\" là một tác phẩm kinh điển về võ thuật của Kim Dung.\", chủ yếu kể lại câu chuyện về anh hùng này trong tiểu thuyết. Vai chính do Chân Tử Đan thủ vai, thực sự là một người đàn ông thực sự bất khuất, nhưng phải chiến đấu khốc liệt trong gió tanh mưa máu.', '3c07c3082c564b1f1ae4a1a8ca5905834373.jpg', 5, 3, 5, 1, 1, 0, 'Thien Long Bat Bo Kieu Phong Tales', 0, '2023-02-23 14:53:54', '2023-02-23 14:53:54', NULL, 'Thien Long Bat Bo Kieu Phong Tales', NULL, 0, NULL, 1, 'phimle', 31912),
(39, 'Avatar 2: Dòng Chảy Của Nước', '120 Phút', 'avatar-2-dong-chay-cua-nuoc', 'Sau avatar 1 Hai nhân vật chính, Jake Sully và Neytiri, giờ đã thành đôi, nguyện sẽ ở bên nhau. Tuy nhiên, cả hai buộc phải rời khỏi nhà và khám phá những miền đất mới trên mặt trăng Pandora, cũng chính là lúc những mối nguy cũ trở lại với họ.', 'avatar-2-dong-chay-cua-nuoc-thumb60.jpg', 5, 5, 1, 1, 1, 0, 'Avatar 2: The Way of Water​', 0, '2023-02-23 15:00:30', '2023-02-23 15:00:30', NULL, 'Avatar 2: The Way of Water​', NULL, 0, NULL, 1, 'phimle', 24375),
(40, 'Troll: Quỷ Núi Khổng Lồ', '93 phút', 'troll-quy-nui-khong-lo', 'Sâu trong ngọn núi Dovre, một thứ gì đó khổng lồ thức dậy sau một nghìn năm bị giam cầm. Sinh vật này phá hủy mọi thứ trên đường đi của nó và nhanh chóng tiếp cận Oslo.', 'e041085e5fadeacbd43120abcd2bc93872.jpg', 5, 4, 1, 1, 1, 0, 'Troll: Giant Mountain Demon', 0, '2023-02-23 15:02:14', '2023-02-23 15:02:14', NULL, 'Troll: Giant Mountain Demon', NULL, 0, NULL, 1, 'phimle', 97240),
(41, 'Cậu Út Nhà Tài Phiệt', '93 phút', 'cau-ut-nha-tai-phiet', 'Được chuyển thể từ tiểu thuyết The Youngest Son of a Conglomerate, xoay quanh nhân vật Yoon Hyun Woo (Song Joong Ki), một thư ký của Tập đoàn Sunyang. Hyun Woo là một nhân viên trung thành, nhưng lại nhận kết cục thảm khốc bởi chính gia đình mà anh \"cúc cung tận tuỵ\". Sau khi chết thảm, Yoon Hyun Woo sống lại một lần nữa dưới thân xác Jin Do Joon, con trai út của gia đình Sunyang Group. Mang hình hài của Jin Do Joon, Yoon Hyun Woo làm việc tiếp quản công ty cũng như bắt đầu màn trả thù của mình.', 'c451635390ea81d38d0929f880accab35542.jpg', 5, 1, 6, 1, 1, 0, 'The youngest son of the tycoon', 0, '2023-02-23 15:04:54', '2023-02-23 15:04:54', NULL, 'The youngest son of the tycoon', NULL, 0, NULL, 1, 'phimle', 78611),
(42, 'Dây Dầu Gai', '93 phút', 'day-dau-gai', 'Bộ phim xoay quanh cặp đôi Win và Team. Team luôn gặp vấn đề về giấc ngủ trước giải đấu bơi lội khiến cậu ấy không thể có được thành tích tốt để tham gia đội tuyển bơi lội quốc gia. Win nhận ra vấn đề này và quyết định bước thêm một bước để giúp đỡ. Win biết rằng Team chỉ muốn ai đó ở bên cạnh nên cậu ấy cho phép Team ngủ trong phòng của mình. Nhờ điều đó mà Team cảm thấy thoải mái hơn trước khi thi đấu và vấn đề về giấc ngủ của cậu ấy không còn nghiêm trọng nữa. Chính vào lúc này, Win bắt đầu có cảm tình với người đàn em của mình, Team. Nhưng vì bối cảnh gia đình, Win là người chỉ biết cho đi tình yêu thương mà không bao giờ được nhận lại, chỉ biết đối xử bình đẳng với mọi người nên càng khó tiếp cận Team hơn. Chính điều đó làm cho Team biết rằng chính cậu ấy là người đặc biệt đối với Win', 'f10b31a018dc1f26617d390b1760ae156282.jpg', 5, 4, 6, 1, 1, 0, 'Between Us', 0, '2023-02-23 15:10:57', '2023-02-23 15:10:57', NULL, 'Between Us', NULL, 0, NULL, 1, 'phimle', 60769),
(43, 'Chiến Binh Báo Đen 2', '120 Phút', 'chien-binh-bao-den-2', 'Black Panther: Wakanda Forever của Marvel Studios sẽ tiếp tục khám phá thế giới có một không hai của Wakanda và tất cả các nhân vật phong phú và đa dạng đã được giới thiệu trong phần phim đầu tiên', '2ee15f0532537d75e34459a76b3dc5c42396.jpg', 12, 5, 10, 1, 1, 0, 'Wakanda Bất Diệt', 0, '2023-02-23 15:14:30', '2023-02-23 15:14:30', NULL, 'Wakanda Bất Diệt', NULL, 0, NULL, 1, 'phimle', 83408),
(44, 'Black Adam', '93 phút', 'black-adam', 'Phim kể về người đàn ông Black Adam đã bị giam cầm sau gần 5000 năm, giờ đây anh được các vị thần Ai Cập bang cho những sức mạnh đầy quyền năng, và từ đó anh đã thoát ra khỏi sự giam cầm. Từ đây, Black Adam đã tận dụng sức mạnh này để bắt đầu một cuộc sống công lý độc nhất trên thế giới hiện đại hóa này. Không những thế anh còn phải đối mặt với những kẻ thù hung ác mới.', 'd2a86637077e87cbb076e9a76942a1468535.jpg', 12, 5, 10, 1, 1, 0, 'Black Adam', 0, '2023-02-23 15:17:40', '2023-02-23 15:17:40', NULL, 'Black Adam', NULL, 0, NULL, 1, 'phimle', 75592),
(45, 'Giải Vây', '93 phút', 'giai-vay', 'Một cựu nhân viên đặc nhiệm Tom Steele (Seagal) và đồng nghiệp của ông Manning (Austin) được giao cho ngừng hoạt động một nhà tù cũ, họ phải giám sát sự xuất hiện của hai nữ tù nhân bí ẩn. Chẳng bao lâu, một lực lượng tinh nhuệ của lính đánh thuê tấn công nhà tù trong việc tìm kiếm những người mới đến. Khi được tiết lộ danh tính thực sự của những người phụ nữ, Steele nhận ra anh đang ở giữa một bí mật lớn mà ông không tưởng tượng được.', 'b50efb361b5b1bb4d46ae5dcf3932e331210.jpg', 12, 4, 4, 1, 1, 0, 'Relieve', 0, '2023-02-23 15:20:16', '2023-02-23 15:20:16', NULL, 'Relieve', NULL, 0, NULL, 1, 'phimle', 11977),
(46, 'Phi Vụ Cuối Cùng', '93 phút', 'phi-vu-cuoi-cung', 'Sau khi bị phản bội và rời đi đã chết ở Ý, Charlie Crower và đội ngũ của anh ta lên kế hoạch cho một kẻ thù vàng phức tạp với đồng minh cũ của họ.', 'd90248737099dd36b502edf7e9f8cec09044.jpg', 12, 4, 4, 1, 1, 0, 'The Last Mission', 0, '2023-02-23 15:23:20', '2023-02-23 15:23:20', NULL, 'The Last Mission', NULL, 1, NULL, 1, 'phimle', 96468),
(47, 'Siêu Điệp Viên', '93 phút', 'sieu-diep-vien', 'Jack Ryan là một chuyên gia phân tích mới toanh của CIA, người sắp bước vào một nhiệm vụ nguy hiểm lần đầu tiên trong đời. Từ những khám phá trong liên lạc giữa bọn khủng bố đã khiến anh chống lại một kiểu khủng bố mới đe dọa hủy diệt toàn cầu.', '09419747d2c5c41ff36f6881f1eeaac95958.jpg', 12, 5, 9, 1, 1, 0, 'Super spy', 0, '2023-02-23 15:27:23', '2023-02-23 15:27:23', NULL, 'Super spy', NULL, 1, NULL, 1, 'phimle', 36302);

-- --------------------------------------------------------

--
-- Table structure for table `movie_genre`
--

CREATE TABLE `movie_genre` (
  `id` int(11) NOT NULL,
  `movie_id` int(11) NOT NULL,
  `genre_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `movie_genre`
--

INSERT INTO `movie_genre` (`id`, `movie_id`, `genre_id`) VALUES
(2, 22, 4),
(9, 21, 6),
(10, 21, 10),
(11, 21, 4),
(12, 20, 3),
(13, 20, 6),
(14, 20, 8),
(15, 19, 4),
(16, 19, 5),
(17, 22, 5),
(18, 22, 6),
(19, 23, 2),
(20, 23, 3),
(21, 23, 4),
(22, 23, 5),
(23, 23, 6),
(24, 23, 8),
(25, 23, 9),
(26, 23, 10),
(27, 23, 11),
(31, 25, 3),
(32, 15, 3),
(33, 17, 4),
(34, 17, 5),
(35, 26, 3),
(36, 27, 6),
(37, 28, 11),
(38, 29, 3),
(39, 30, 4),
(40, 31, 10),
(41, 32, 3),
(42, 33, 3),
(43, 34, 3),
(44, 35, 3),
(45, 36, 3),
(46, 37, 3),
(47, 38, 3),
(48, 39, 5),
(49, 40, 4),
(50, 41, 10),
(51, 42, 4),
(52, 43, 4),
(53, 43, 5),
(54, 44, 4),
(55, 44, 5),
(56, 45, 4),
(57, 46, 4),
(58, 47, 4),
(59, 47, 5);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `rating`
--

CREATE TABLE `rating` (
  `id` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `movie_id` int(11) NOT NULL,
  `ip_address` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rating`
--

INSERT INTO `rating` (`id`, `rating`, `movie_id`, `ip_address`) VALUES
(1, 4, 25, '127.0.0.1'),
(2, 3, 13, '127.0.0.1'),
(3, 5, 23, '127.0.0.1'),
(4, 5, 22, '127.0.0.1'),
(5, 5, 19, '127.0.0.1'),
(6, 3, 15, '127.0.0.1'),
(7, 5, 18, '127.0.0.1'),
(8, 5, 12, '127.0.0.1'),
(9, 5, 14, '127.0.0.1'),
(10, 5, 17, '127.0.0.1'),
(11, 5, 16, '127.0.0.1'),
(12, 5, 37, '127.0.0.1'),
(13, 5, 32, '127.0.0.1');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Trần Công Linh', 'bibo@gmail.com', NULL, '$2y$10$xCE/kI.lCyOGwnRzgP/6pusMjUso9xTtJkxCpYENaFjm0aT61KW4O', 'tBSDc7xvFFXnZa67W6f0wQWFjUkGlclO4YJQSRDtZR2YlaKeD1wt4lfBMQz9', '2023-01-06 23:24:10', '2023-01-06 23:24:10');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `episodes`
--
ALTER TABLE `episodes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `movie_id` (`movie_id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `genres`
--
ALTER TABLE `genres`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `info`
--
ALTER TABLE `info`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `linkmovie`
--
ALTER TABLE `linkmovie`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `movie_genre`
--
ALTER TABLE `movie_genre`
  ADD PRIMARY KEY (`id`),
  ADD KEY `movie_id` (`movie_id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `rating`
--
ALTER TABLE `rating`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `countries`
--
ALTER TABLE `countries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `episodes`
--
ALTER TABLE `episodes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `genres`
--
ALTER TABLE `genres`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `info`
--
ALTER TABLE `info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `linkmovie`
--
ALTER TABLE `linkmovie`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `movies`
--
ALTER TABLE `movies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `movie_genre`
--
ALTER TABLE `movie_genre`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `rating`
--
ALTER TABLE `rating`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `movie_genre`
--
ALTER TABLE `movie_genre`
  ADD CONSTRAINT `movie_genre_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
