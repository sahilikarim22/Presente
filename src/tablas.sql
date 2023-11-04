CREATE TABLE `clases` (
  `idClase` int NOT NULL AUTO_INCREMENT,
  `nombreClase` varchar(50) NOT NULL,
  `descripcion` text,
  `idCurso` int NOT NULL,
  `fechaClase` date NOT NULL,
  `idPeriodo` int NOT NULL,
  PRIMARY KEY (`idClase`),
  CONSTRAINT `fk_clases_curso` FOREIGN KEY (`idCurso`) REFERENCES `cursos` (`idCurso`),
  CONSTRAINT `fk_clases_periodo` FOREIGN KEY (`idPeriodo`) REFERENCES `cursos` (`idPeriodo`)
)


DROP TABLE IF EXISTS `asistencias`;

CREATE TABLE IF NOT EXISTS `asistencias` (
  `idAsistencia` int NOT NULL AUTO_INCREMENT,
  `idEstudiante` int NOT NULL,
  `idCurso` int NOT NULL,
  `idClase` int NOT NULL,
  `asistio` BOOLEAN NOT NULL,
  PRIMARY KEY (`idAsistencia`),
  CONSTRAINT `fk_asistencias_estudiante` FOREIGN KEY (`idEstudiante`) REFERENCES `usuarios` (`idUsuario`),
  CONSTRAINT `fk_asistencias_curso` FOREIGN KEY (`idCurso`) REFERENCES `cursos` (`idCurso`),
  CONSTRAINT `fk_asistencias_clases` FOREIGN KEY (`idClase`) REFERENCES `clases` (`idClase`) ON DELETE CASCADE ON UPDATE CASCADE
)


DROP TABLE IF EXISTS `cursos`;
CREATE TABLE IF NOT EXISTS `cursos` (
  `idCurso` int NOT NULL AUTO_INCREMENT,
  `nombreCurso` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `cantDiasSemanas` int DEFAULT NULL,
  `seccion` int NOT NULL,
  `idProfesor` int NOT NULL,
  `nrc` int NOT NULL,
  `idPeriodo` int NOT NULL,
  PRIMARY KEY (`idCurso`),
  FOREIGN KEY (`idProfesor`) REFERENCES `usuarios`(`id`) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (`idPeriodo`) REFERENCES `periodos`(`id`) ON UPDATE CASCADE ON DELETE CASCADE
)


DROP TABLE IF EXISTS `curso_estudiante`;
CREATE TABLE IF NOT EXISTS `curso_estudiante` (
  `idCursoEstudiante` int NOT NULL AUTO_INCREMENT,
  `idCurso` int NOT NULL,
  `idUsuario` int NOT NULL,
  PRIMARY KEY (`idCursoEstudiante`),
  KEY `idCurso` (`idCurso`),
  KEY `idUsuario` (`idUsuario`)
)


CREATE TABLE IF NOT EXISTS `periodos` (
  id INT NOT NULL AUTO_INCREMENT,
  nombrePeriodo VARCHAR(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  cantidadSemanas INT NOT NULL,
  status TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (id)
)

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
)

INSERT INTO `usuarios` (`id`, `correoUcab`, `clave`, `apellidos`, `nombres`, `cedula`, `estatus`, `tipoUsuario`, `token`) VALUES
(11, 'profesor@gmail.com', '1234', 'Inojosa mendez', 'jesus miguel', '214243', 1, 'docente', '234433234'),
(10, 'sahilikarim22@gmail.com', '1234', 'Sahili Helbawi', 'Karim Ali', '28161244', 1, 'administrador', '39498342'),
(9, 'kasahili.20@est.ucab.edu.ve', '1234', 'Helbawi Sahili', 'Karim Ali', '28161244', 1, 'estudiante', '2877bcf1ee2aac5239d0964b652c6e02514d8051'),
(7, 'karimsh2001@gmail.com', '1234', 'Sahili Helbawi', 'Karim Ali', '28161244', 1, 'estudiante', '9eafff32a2db00e700e29879c97e6296f0b57347');
