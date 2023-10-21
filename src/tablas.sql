-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 21-10-2023 a las 02:08:30
-- Versión del servidor: 8.0.31
-- Versión de PHP: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `presentebd`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asistencias`
--

DROP TABLE IF EXISTS `asistencias`;
CREATE TABLE IF NOT EXISTS `asistencias` (
  `idAsistencia` int NOT NULL AUTO_INCREMENT,
  `tema` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `asistencia` int NOT NULL,
  `fecha` date NOT NULL,
  PRIMARY KEY (`idAsistencia`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cursos`
--

DROP TABLE IF EXISTS `cursos`;
CREATE TABLE IF NOT EXISTS `cursos` (
  `idCurso` int NOT NULL AUTO_INCREMENT,
  `nombreCurso` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `cantDiasSemanas` int NOT NULL,
  `facultad` varchar(255) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `escuela` varchar(255) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `seccion` varchar(10) COLLATE utf8mb4_spanish_ci NOT NULL,
  `idProfesor` int DEFAULT NULL,
  `idEstudiante` int DEFAULT NULL,
  `idAsistencias` int DEFAULT NULL,
  PRIMARY KEY (`idCurso`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `periodos`
--

DROP TABLE IF EXISTS `periodos`;
CREATE TABLE IF NOT EXISTS `periodos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombrePeriodo` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `cantidadSemanas` int NOT NULL,
  `idCurso` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idCurso` (`idCurso`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) COLLATE utf8mb4_spanish_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;


--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `correoUcab` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `clave` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `apellidos` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `nombres` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `cedula` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `estatus` int NOT NULL,
  `tipoUsuario` varchar(255) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;



/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;