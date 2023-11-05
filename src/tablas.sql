-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 05-11-2023 a las 19:09:01
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
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `asistencias`
--

INSERT INTO `asistencias` (`idAsistencia`, `idEstudiante`, `idCurso`, `idClase`, `asistio`) VALUES
(1, 10, 10, 1, 1),
(2, 7, 11, 2, 1),
(3, 10, 10, 3, 0),
(4, 7, 11, 4, 1),
(5, 10, 10, 7, 0),
(6, 7, 10, 7, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clases`
--

DROP TABLE IF EXISTS `clases`;
CREATE TABLE IF NOT EXISTS `clases` (
  `idClase` int NOT NULL AUTO_INCREMENT,
  `nombreClase` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `descripcion` text CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci,
  `idCurso` int NOT NULL,
  `fechaClase` date NOT NULL,
  `idPeriodo` int NOT NULL,
  PRIMARY KEY (`idClase`),
  KEY `fk_clases_curso` (`idCurso`),
  KEY `fk_clases_periodo` (`idPeriodo`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `clases`
--

INSERT INTO `clases` (`idClase`, `nombreClase`, `descripcion`, `idCurso`, `fechaClase`, `idPeriodo`) VALUES
(1, '', '', 10, '0000-00-00', 1),
(2, 'cosas', '', 10, '2023-11-10', 1),
(3, 'asdas', '', 10, '2023-11-28', 1),
(4, 'cosas', '12', 10, '2023-11-17', 1),
(5, 'lokeras', 'asdasd', 10, '2023-11-04', 1),
(6, 'asdasd', '', 10, '2023-11-30', 1),
(7, 'aaaaaa', '', 10, '2023-11-08', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cursos`
--

DROP TABLE IF EXISTS `cursos`;
CREATE TABLE IF NOT EXISTS `cursos` (
  `idCurso` int NOT NULL AUTO_INCREMENT,
  `nombreCurso` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `cantDiasSemanas` int DEFAULT NULL,
  `seccion` int DEFAULT NULL,
  `idProfesor` int DEFAULT NULL,
  `nrc` int DEFAULT NULL,
  `idPeriodo` int DEFAULT NULL,
  PRIMARY KEY (`idCurso`),
  UNIQUE KEY `unique_nrc` (`nrc`),
  KEY `idProfesor` (`idProfesor`),
  KEY `idPeriodo` (`idPeriodo`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `cursos`
--

INSERT INTO `cursos` (`idCurso`, `nombreCurso`, `cantDiasSemanas`, `seccion`, `idProfesor`, `nrc`, `idPeriodo`) VALUES
(10, 'Matematicas', 12, 401, 9, 123, 1);

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
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `curso_estudiante`
--

INSERT INTO `curso_estudiante` (`idCursoEstudiante`, `idCurso`, `idUsuario`) VALUES
(1, 10, 7),
(2, 11, 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `periodos`
--

DROP TABLE IF EXISTS `periodos`;
CREATE TABLE IF NOT EXISTS `periodos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombrePeriodo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `cantidadSemanas` int NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

--
-- Volcado de datos para la tabla `periodos`
--

INSERT INTO `periodos` (`id`, `nombrePeriodo`, `cantidadSemanas`, `status`) VALUES
(1, 'SEM-2023-25', 15, 1);

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
  `correoUcab` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `clave` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `apellidos` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `nombres` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `cedula` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `estatus` int NOT NULL,
  `tipoUsuario` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `correoUcab`, `clave`, `apellidos`, `nombres`, `cedula`, `estatus`, `tipoUsuario`, `token`) VALUES
(7, 'estudiante@gmail.com', '1234', 'Sahili Helbawi', 'Carlos Gonzales', '28161244', 1, 'estudiante', '9eafff32a2db00e700e29879c97e6296f0b57347'),
(9, 'profesor@gmail.com', '1234', 'Helbawi Sahili', 'Karim Ali', '28161244', 1, 'docente', '2877bcf1ee2aac5239d0964b652c6e02514d8051'),
(10, 'admin@gmail.com', '1234', 'Sahili Helbawi', 'Karim Ali', '28161244', 1, 'administrador', '2877bcf1ee2aac5239d0964b652c6e02514d8051');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
