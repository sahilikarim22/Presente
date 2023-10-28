const conexion = require('../db/config');

const estudiantesController = {
  getEstudiantes: (req, res) => {
    const idUsuario = req.session.userId;
    const cursosEstudiantesSQL = `
    SELECT ce.idCursoEstudiante, c.idCurso, c.nombreCurso
    FROM curso_estudiante ce
    INNER JOIN cursos c ON ce.idCurso = c.idCurso
    INNER JOIN usuarios u ON ce.idUsuario = u.id
    WHERE u.id = ?;`;

    conexion.query(cursosEstudiantesSQL, [idUsuario], (error, cursos) => {
      if (error) {
        console.log(error);
        return res.status(500).send("Error de servidor");
      }

      const estudiantesSQL = `
        SELECT nombres, apellidos
        FROM usuarios
        WHERE id = ?;`;

      conexion.query(estudiantesSQL, [idUsuario], (error, estudiantes) => {
        if (error) {
          console.log(error);
          return res.status(500).send("Error de servidor");
        }


        res.render('estudiantes', {
          cursos,
          estudiantes
        });
      });
    });
  }
};

module.exports = estudiantesController;
