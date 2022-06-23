-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Фев 05 2021 г., 15:16
-- Версия сервера: 5.7.25
-- Версия PHP: 7.3.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `cruise`
--

-- --------------------------------------------------------

--
-- Структура таблицы `bookings`
--

CREATE TABLE `bookings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `cruise_from` bigint(20) UNSIGNED NOT NULL,
  `cruise_back` bigint(20) UNSIGNED DEFAULT NULL,
  `date_from` date NOT NULL,
  `date_back` date DEFAULT NULL,
  `code` varchar(5) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `bookings`
--

INSERT INTO `bookings` (`id`, `cruise_from`, `cruise_back`, `date_from`, `date_back`, `code`, `created_at`, `updated_at`) VALUES
(1, 1, 2, '2020-05-01', '2020-05-01', 'TESTA', '2020-04-15 14:53:44', '2020-04-15 14:53:44'),
(2, 1, 2, '2021-10-10', '2020-10-10', 'GFTAH', '2021-01-29 10:21:16', '2021-01-29 10:21:16'),
(3, 1, 2, '2021-10-10', '2020-10-10', 'KBVYW', '2021-01-29 10:21:39', '2021-01-29 10:21:39'),
(4, 1, 2, '2021-10-10', '2020-10-10', 'IJEZF', '2021-01-29 10:21:41', '2021-01-29 10:21:41'),
(5, 1, 2, '2021-10-10', '2020-10-10', 'AJGNG', '2021-02-03 09:41:01', '2021-02-03 09:41:01'),
(6, 1, 2, '2020-10-01', '2020-10-10', 'ZOSHW', '2021-02-03 09:51:23', '2021-02-03 09:51:23'),
(7, 1, 2, '2020-10-01', '2020-10-10', 'UABOC', '2021-02-03 09:52:10', '2021-02-03 09:52:10');

-- --------------------------------------------------------

--
-- Структура таблицы `cruises`
--

CREATE TABLE `cruises` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `cruise_code` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `from_id` bigint(20) UNSIGNED NOT NULL,
  `to_id` bigint(20) UNSIGNED NOT NULL,
  `time_from` time NOT NULL,
  `time_to` time NOT NULL,
  `cost` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `cruises`
--

INSERT INTO `cruises` (`id`, `cruise_code`, `from_id`, `to_id`, `time_from`, `time_to`, `cost`, `created_at`, `updated_at`) VALUES
(1, 'FP2100', 2, 1, '05:30:00', '18:00:00', 3000, NULL, NULL),
(2, 'FP1200', 1, 2, '21:00:00', '08:00:00', 4000, NULL, NULL),
(3, 'FP2300', 2, 3, '07:05:00', '08:20:00', 3000, NULL, NULL),
(4, 'FP3200', 3, 2, '11:35:00', '12:50:00', 4000, NULL, NULL),
(5, 'FP2400', 2, 4, '10:00:00', '11:20:00', 3500, NULL, NULL),
(6, 'FP4200', 4, 2, '13:00:00', '14:20:00', 4500, NULL, NULL),
(7, 'FP3100', 3, 1, '15:00:00', '16:50:00', 7000, NULL, NULL),
(8, 'FP1300', 1, 3, '18:30:00', '20:10:00', 7500, NULL, NULL),
(9, 'FP3400', 3, 4, '18:00:00', '20:10:00', 10450, NULL, NULL),
(10, 'FP4300', 4, 3, '21:30:00', '23:10:00', 12050, NULL, NULL),
(11, 'FP1400', 1, 4, '14:30:00', '16:30:00', 15050, NULL, NULL),
(12, 'FP1400', 1, 4, '17:30:00', '19:30:00', 14050, NULL, NULL),
(13, 'FP2101', 2, 1, '21:00:00', '08:00:00', 3000, NULL, NULL),
(14, 'FP1201', 1, 2, '08:00:00', '20:30:00', 10500, NULL, NULL),
(15, 'FP2301', 2, 3, '11:45:00', '12:50:00', 5000, NULL, NULL),
(16, 'FP3201', 3, 2, '07:15:00', '08:20:00', 6000, NULL, NULL),
(17, 'FP2401', 2, 4, '13:10:00', '14:20:00', 2500, NULL, NULL),
(18, 'FP4201', 4, 2, '10:10:00', '11:20:00', 3500, NULL, NULL),
(19, 'FP3101', 3, 1, '18:40:00', '20:10:00', 7500, NULL, NULL),
(20, 'FP1301', 1, 3, '15:10:00', '16:50:00', 6500, NULL, NULL),
(21, 'FP3401', 3, 4, '21:40:00', '23:10:00', 9450, NULL, NULL),
(22, 'FP4301', 4, 3, '18:10:00', '20:10:00', 13050, NULL, NULL),
(23, 'FP1401', 1, 4, '17:40:00', '19:30:00', 13050, NULL, NULL),
(24, 'FP1401', 1, 4, '14:40:00', '16:30:00', 12050, NULL, NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `passengers`
--

CREATE TABLE `passengers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `booking_id` bigint(20) UNSIGNED NOT NULL,
  `first_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `birth_date` date NOT NULL,
  `document_number` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `place_from` varchar(3) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `place_back` varchar(3) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `passengers`
--

INSERT INTO `passengers` (`id`, `booking_id`, `first_name`, `last_name`, `birth_date`, `document_number`, `place_from`, `place_back`, `created_at`, `updated_at`) VALUES
(1, 1, 'TestCase1_first_name', 'TestCase1_last_name', '1990-02-20', '7788223311', '7A', '7C', '2020-04-15 14:53:44', '2021-02-03 09:05:56'),
(2, 1, 'TestCase2_first_name', 'TestCase2_last_name', '1992-09-22', '9922335577', '7B', '7B', '2020-04-15 14:53:44', '2021-02-03 09:05:46'),
(3, 2, 'TestCase1_first_name', 'TestCase1_last_name', '1990-02-20', '7788223311', NULL, NULL, '2021-01-29 10:21:16', '2021-01-29 10:21:16'),
(4, 2, 'TestCase2_first_name', 'TestCase2_last_name', '1992-09-22', '9922335577', NULL, NULL, '2021-01-29 10:21:16', '2021-01-29 10:21:16'),
(5, 3, 'TestCase1_first_name', 'TestCase1_last_name', '1990-02-20', '7788223311', NULL, NULL, '2021-01-29 10:21:39', '2021-01-29 10:21:39'),
(6, 3, 'TestCase2_first_name', 'TestCase2_last_name', '1992-09-22', '9922335577', NULL, NULL, '2021-01-29 10:21:39', '2021-01-29 10:21:39'),
(7, 4, 'TestCase1_first_name', 'TestCase1_last_name', '1990-02-20', '7788223311', NULL, NULL, '2021-01-29 10:21:41', '2021-01-29 10:21:41'),
(8, 4, 'TestCase2_first_name', 'TestCase2_last_name', '1992-09-22', '9922335577', NULL, NULL, '2021-01-29 10:21:41', '2021-01-29 10:21:41'),
(9, 5, 'TestCase1_first_name', 'TestCase1_last_name', '1990-02-20', '7788223311', NULL, NULL, '2021-02-03 09:41:01', '2021-02-03 09:41:01'),
(10, 5, 'TestCase2_first_name', 'TestCase2_last_name', '1992-09-22', '9922335577', NULL, NULL, '2021-02-03 09:41:01', '2021-02-03 09:41:01'),
(11, 6, 'TestCase1_first_name', 'TestCase1_last_name', '1990-02-20', '7788223311', NULL, NULL, '2021-02-03 09:51:23', '2021-02-03 09:51:23'),
(12, 6, 'TestCase2_first_name', 'TestCase2_last_name', '1992-09-22', '9922335577', NULL, NULL, '2021-02-03 09:51:23', '2021-02-03 09:51:23'),
(13, 7, 'TestCase1_first_name', 'TestCase1_last_name', '1990-02-20', '7788223311', NULL, NULL, '2021-02-03 09:52:10', '2021-02-03 09:52:10'),
(14, 7, 'TestCase2_first_name', 'TestCase2_last_name', '1992-09-22', '9922335577', NULL, NULL, '2021-02-03 09:52:10', '2021-02-03 09:52:10');

-- --------------------------------------------------------

--
-- Структура таблицы `ports`
--

CREATE TABLE `ports` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `iata` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `ports`
--

INSERT INTO `ports` (`id`, `city`, `name`, `iata`, `created_at`, `updated_at`) VALUES
(1, 'Cheboksary', 'Cheboksary river port', 'CHB', NULL, NULL),
(2, 'Kazan', 'Kazan', 'KZN', NULL, NULL),
(3, 'Samara', 'Samara river port', 'SMR', NULL, NULL),
(4, 'Astrahan', 'Astrahan river port', 'AST', NULL, NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `first_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `document_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `api_token` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `phone`, `password`, `document_number`, `api_token`, `created_at`, `updated_at`) VALUES
(1, 'TestCase1_first_name', 'TestCase1_last_name', '89001238833', 'password', '7788223311', 'Pl9MsJrXkgZDxFoo7mbcbhf8IXA62WrM', '2020-09-15 14:55:35', '2021-02-05 06:38:22'),
(2, 'TestCase2_first_name', 'TestCase2_last_name', '89001238834', 'password', '7788223311', NULL, '2021-01-25 05:28:39', '2021-01-25 05:28:39'),
(3, 'TestCase2_first_name', 'TestCase2_last_name', '234671', 'password', '7788223311', NULL, '2021-01-25 06:22:11', '2021-01-25 06:22:11'),
(4, 'TestCase3_first_name', 'TestCase3_last_name', '89036895678', 'password', '7788223311', 'tIuLtj5mrPypqj2k638gzGghuRRkwWov', '2021-01-25 06:27:03', '2021-02-03 09:19:01'),
(5, 'TestCase4_first_name', 'TestCase4_last_name', '89036895679', 'password', '7788223311', 'RBxQVRX7jhzYn1rmfgekIMcgyq8ady6u', '2021-01-25 06:27:43', '2021-01-25 08:20:50');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bookings_cruise_from_foreign` (`cruise_from`),
  ADD KEY `bookings_cruise_back_foreign` (`cruise_back`);

--
-- Индексы таблицы `cruises`
--
ALTER TABLE `cruises`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cruises_from_id_foreign` (`from_id`),
  ADD KEY `cruises_to_id_foreign` (`to_id`);

--
-- Индексы таблицы `passengers`
--
ALTER TABLE `passengers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `passengers_booking_id_foreign` (`booking_id`);

--
-- Индексы таблицы `ports`
--
ALTER TABLE `ports`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_phone_unique` (`phone`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT для таблицы `cruises`
--
ALTER TABLE `cruises`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT для таблицы `passengers`
--
ALTER TABLE `passengers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT для таблицы `ports`
--
ALTER TABLE `ports`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `bookings_cruise_back_foreign` FOREIGN KEY (`cruise_back`) REFERENCES `cruises` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `bookings_cruise_from_foreign` FOREIGN KEY (`cruise_from`) REFERENCES `cruises` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `cruises`
--
ALTER TABLE `cruises`
  ADD CONSTRAINT `cruises_from_id_foreign` FOREIGN KEY (`from_id`) REFERENCES `ports` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cruises_to_id_foreign` FOREIGN KEY (`to_id`) REFERENCES `ports` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `passengers`
--
ALTER TABLE `passengers`
  ADD CONSTRAINT `passengers_booking_id_foreign` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
