-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-08-2023 a las 00:49:10
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `app_emym`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `addresses`
--

CREATE TABLE `addresses` (
  `id` int(11) NOT NULL,
  `line1` varchar(255) DEFAULT NULL,
  `line2` varchar(255) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `state` varchar(45) DEFAULT NULL,
  `street_name` varchar(45) DEFAULT NULL,
  `country` varchar(45) DEFAULT NULL,
  `phone` varchar(10) DEFAULT NULL,
  `pincode` int(6) DEFAULT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`id`, `title`) VALUES
(1, 'Pasteleria'),
(2, 'Panaderia');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orders`
--

CREATE TABLE `orders` (
  `id` int(10) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `orders`
--

INSERT INTO `orders` (`id`, `user_id`) VALUES
(121, 22);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orders_details`
--

CREATE TABLE `orders_details` (
  `id` int(10) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(10) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `orders_details`
--

INSERT INTO `orders_details` (`id`, `order_id`, `product_id`, `quantity`) VALUES
(199, 121, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` int(10) NOT NULL,
  `title` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `images` text DEFAULT NULL,
  `description` text NOT NULL,
  `price` float NOT NULL,
  `quantity` int(10) NOT NULL,
  `short_desc` varchar(255) NOT NULL,
  `cat_id` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `title`, `image`, `images`, `description`, `price`, `quantity`, `short_desc`, `cat_id`) VALUES
(1, 'Pan amasado', 'https://comidaschilenas.com/wp-content/uploads/2019/07/Receta-de-pan-amasado.jpg', 'https://comidaschilenas.com/wp-content/uploads/2019/07/Receta-de-pan-amasado.jpg;https://cdn0.recetasgratis.net/es/posts/8/2/6/pan_amasado_de_campo_22628_orig.jpg', '1 Kg de pan amasado', 3000, 19, 'Kg Pan amasado', 2),
(2, 'Brazo de reina', 'https://comidaschilenas.com/wp-content/uploads/2019/02/Receta-del-Brazo-de-Reina.jpg', 'https://comidaschilenas.com/wp-content/uploads/2019/02/Receta-del-Brazo-de-Reina.jpg;https://n9z4u8f2.rocketcdn.me/wp-content/uploads/2009/01/brazo-de-reina01.jpg', 'Brazo de reina', 4000, 5, 'Brazo de reina', 1),
(54, 'Torta selva negra', 'https://www.recetasnestle.cl/sites/default/files/srh_recipes/cea5c976006573f9c7f892f5fa3baec9.jpg', 'https://www.recetasnestle.cl/sites/default/files/srh_recipes/cea5c976006573f9c7f892f5fa3baec9.jpg', 'Torta selva negra 16 personas', 12000, 10, 'Torta selva negra', 1),
(55, 'Torta mil hojas manjar', 'https://cocinachilena.cl/wp-content/uploads/2018/06/Torta-de-mil-hojas-receta-chilena-scaled.jpg', 'https://cocinachilena.cl/wp-content/uploads/2018/06/Torta-de-mil-hojas-receta-chilena-scaled.jpg', 'Torta mil hojas manjar 16 personas', 12000, 10, 'Torta mil hojas manjar', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `fname` varchar(255) DEFAULT 'not set',
  `lname` varchar(255) DEFAULT 'not set',
  `age` int(10) DEFAULT 18,
  `role` int(10) DEFAULT 555,
  `photoUrl` text DEFAULT NULL,
  `type` varchar(255) NOT NULL DEFAULT 'local'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `fname`, `lname`, `age`, `role`, `photoUrl`, `type`) VALUES
(22, '', 'c893bad68927b457dbed39460e6afd62', 'deathcaller13@gmail.com', 'Christian', 'not set', 18, 777, NULL, 'local'),
(23, '', 'e10adc3949ba59abbe56e057f20f883e', 'user@user.cl', 'Usuario', 'not set', 18, 555, NULL, 'local');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `addresses`
--
ALTER TABLE `addresses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_addresses_users1_idx` (`user_id`);

--
-- Indices de la tabla `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_orders_users1_idx` (`user_id`);

--
-- Indices de la tabla `orders_details`
--
ALTER TABLE `orders_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_orders_has_products_products1_idx` (`product_id`),
  ADD KEY `fk_orders_has_products_orders1_idx` (`order_id`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `products_ibfk_1` (`cat_id`);
ALTER TABLE `products` ADD FULLTEXT KEY `description` (`description`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `addresses`
--
ALTER TABLE `addresses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=122;

--
-- AUTO_INCREMENT de la tabla `orders_details`
--
ALTER TABLE `orders_details`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=200;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `addresses`
--
ALTER TABLE `addresses`
  ADD CONSTRAINT `fk_addresses_users1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `orders_details`
--
ALTER TABLE `orders_details`
  ADD CONSTRAINT `fk_orders_has_products_orders1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_orders_has_products_products1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`cat_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
