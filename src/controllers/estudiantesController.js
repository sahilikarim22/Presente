const conexion = require("../db/config");

const estudiantesController = {
  getEntrada: (req, res) => {
    res.render("estudiantes/entrada");
  },
  getInicio: (req, res) => {
    res.render("estudiantes/inicio");
  },
  getCursos: (req, res) => {
    const idUsuario = req.session.userId;
  
    const cursosSQL = `
      SELECT c.nombreCurso, c.cantDiasSemanas, c.seccion, c.idCurso
      FROM curso_estudiante
      INNER JOIN cursos c ON curso_estudiante.idCurso = c.idCurso
      WHERE curso_estudiante.idUsuario = ?`;
  
    conexion.query(cursosSQL, [idUsuario], (err, cursos) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Error de servidor");
      }
  
      const porcentajeAsistenciasSQL = `
        SELECT CE.idCurso, COUNT(A.idAsistencia) AS total_asistencias, c.cantDiasSemanas
        FROM curso_estudiante CE
        JOIN Asistencias A ON CE.idCurso = A.idCurso
        JOIN cursos c ON CE.idCurso = c.idCurso
        WHERE CE.idUsuario = ?
        GROUP BY CE.idCurso
      `;
  
      conexion.query(porcentajeAsistenciasSQL, [idUsuario], (error, asistencias) => {
        if (error) {
          console.log(error);
          return res.status(500).send("Error de servidor");
        }

        const estudiantesSQL = `
        SELECT * FROM usuarios WHERE id = ?`;
  
      conexion.query(estudiantesSQL, [idUsuario], (error, estudiantes) => {
        if (error) {
          console.log(error);
          return res.status(500).send("Error de servidor");
        }

        console.log(asistencias)


        res.render("estudiantes/cursos", { cursos, asistencias, estudiantes });
      });
      });
    });
  }  
};

// exportar modulos

module.exports = estudiantesController;
