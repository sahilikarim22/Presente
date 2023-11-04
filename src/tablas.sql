-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 04-11-2023 a las 15:07:16
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
  `idEstudiante` int NOT NULL,
  `idCurso` int NOT NULL,
  `idClase` int NOT NULL,
  `asistio` tinyint(1) NOT NULL,
  PRIMARY KEY (`idAsistencia`),
  KEY `fk_asistencias_estudiante` (`idEstudiante`),
  KEY `fk_asistencias_curso` (`idCurso`),
  KEY `fk_asistencias_clases` (`idClase`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clases`
--

DROP TABLE IF EXISTS `clases`;
CREATE TABLE IF NOT EXISTS `clases` (
  `idClase` int NOT NULL AUTO_INCREMENT,
  `nombreClase` varchar(50) COLLATE utf8mb4_spanish_ci NOT NULL,
  `descripcion` text COLLATE utf8mb4_spanish_ci,
  `idCurso` int NOT NULL,
  `fechaClase` date NOT NULL,
  `idPeriodo` int NOT NULL,
  PRIMARY KEY (`idClase`),
  KEY `fk_clases_curso` (`idCurso`),
  KEY `fk_clases_periodo` (`idPeriodo`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cursos`
--

DROP TABLE IF EXISTS `cursos`;
CREATE TABLE IF NOT EXISTS `cursos` (
  `idCurso` int NOT NULL AUTO_INCREMENT,
  `nombreCurso` varchar(255) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `cantDiasSemanas` int DEFAULT NULL,
  `seccion` int DEFAULT NULL,
  `idProfesor` int DEFAULT NULL,
  `nrc` int DEFAULT NULL,
  `idPeriodo` int DEFAULT NULL,
  PRIMARY KEY (`idCurso`),
  KEY `idProfesor` (`idProfesor`),
  KEY `idPeriodo` (`idPeriodo`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `cursos`
--

INSERT INTO `cursos` (`idCurso`, `nombreCurso`, `cantDiasSemanas`, `seccion`, `idProfesor`, `nrc`, `idPeriodo`) VALUES
(1, 'matematicas', 2, 401, 11, 3243, 2),
(2, 'calculo 3', 3, 401, 11, 324, 2),
(10, 'Calculo 4', 2, 401, 11, 123123, 2),
(13, 'Comprension Lectora', 3, 401, 11, 1234, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `curso_estudiante`
--

DROP TABLE IF EXISTS `curso_estudiante`;
CREATE TABLE IF NOT EXISTS `curso_estudiante` (
  `idCursoEstudiante` int NOT NULL AUTO_INCREMENT,
  `idCurso` int NOT NULL,
  `idUsuario` int NOT NULL,
  PRIMARY KEY (`idCursoEstudiante`),
  KEY `idCurso` (`idCurso`),
  KEY `idUsuario` (`idUsuario`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `curso_estudiante`
--

INSERT INTO `curso_estudiante` (`idCursoEstudiante`, `idCurso`, `idUsuario`) VALUES
(1, 1, 7),
(2, 2, 7),
(3, 10, 7),
(4, 13, 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `periodos`
--

DROP TABLE IF EXISTS `periodos`;
CREATE TABLE IF NOT EXISTS `periodos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombrePeriodo` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `cantidadSemanas` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `periodos`
--

INSERT INTO `periodos` (`id`, `nombrePeriodo`, `cantidadSemanas`) VALUES
(2, '2023-25', 16),
(10, '23423', 2342);

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
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `nombre`) VALUES
(1, 'administrador'),
(2, 'profesor'),
(3, 'estudiante');

-- --------------------------------------------------------

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
  `token` varchar(255) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `correoUcab`, `clave`, `apellidos`, `nombres`, `cedula`, `estatus`, `tipoUsuario`, `token`) VALUES
(11, 'profesor@gmail.com', '1234', 'Inojosa mendez', 'jesus miguel', '214243', 1, 'docente', '234433234'),
(10, 'sahilikarim22@gmail.com', '1234', 'Sahili Helbawi', 'Karim Ali', '28161244', 1, 'administrador', '39498342'),
(9, 'kasahili.20@est.ucab.edu.ve', '1234', 'Helbawi Sahili', 'Karim Ali', '28161244', 1, 'estudiante', '2877bcf1ee2aac5239d0964b652c6e02514d8051'),
(7, 'karimsh2001@gmail.com', '1234', 'Sahili Helbawi', 'Karim Ali', '28161244', 1, 'estudiante', '9eafff32a2db00e700e29879c97e6296f0b57347');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
