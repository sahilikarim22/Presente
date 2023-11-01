const conexion = require('../db/config');

const periodosController = {
  
  getPeriodos: (req, res) => {
    const idDocente = req.session.userId;
    const docenteSQL = `
    SELECT * FROM usuarios WHERE id =?`;
    conexion.query(docenteSQL, [idDocente], (error, docente) => {
    if (error) {
      console.log(error);
      return res.status(500).send("Error de servidor");
      
    }
    conexion.query('SELECT * FROM periodos', (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.render('profesor/periodos', {
          docente:docente,
          periodos: results,
        });
      }
      });

    });
  },
  getCursoProfesor: (req, res) => {
    const id_curso = req.params.id_curso;
    const estudiantesSQL = `
    SELECT
      usuarios.nombres,
      usuarios.apellidos,
      usuarios.cedula,
      cursos.nombreCurso
    FROM
      usuarios
    INNER JOIN
      curso_estudiante ON usuarios.id = curso_estudiante.idUsuario
    INNER JOIN
      cursos
    ON
      cursos.idCurso = curso_estudiante.idCurso
    WHERE
      cursos.idCurso = ?;`;

    try {
      conexion.query(estudiantesSQL, [id_curso], (err, results) => {
        if (err) {
          console.log(err);
        } else {
          console.log(results);
          res.render('profesor/curso', {
            curso: results
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports = periodosController;
