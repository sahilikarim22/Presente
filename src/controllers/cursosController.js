const conexion = require('../db/config');

const cursosController = {
  postCurso: (req, res, next) => {
    const idProfesor = req.session.userId;
    const {
      nombreCurso,
      cantDiasSemanas,
      seccion,
      nrc,
      idPeriodo
    } = req.body;

    const insertQuery = `INSERT INTO cursos (nombreCurso, cantDiasSemanas, seccion, idProfesor, nrc, idPeriodo) 
                        VALUES (?, ?, ?, ?, ?, ?)`;

    conexion.query(
      insertQuery,
      [
        nombreCurso,
        cantDiasSemanas,
        seccion,
        idProfesor,
        nrc,
        idPeriodo
      ],
      (error, resultados) => {
        if (error) {
          console.error('Error al insertar el curso en la base de datos:', error);
          return next(new Error('Error al insertar el curso en la base de datos'));
        }
        res.redirect("/profesor/cursos/" + idPeriodo);
      }
    );
  },
  putCurso: (req, res, next) => {
    const idCurso = req.params.idCurso;
    const { nombreCurso, cantDiasSemanas, seccion, nrc } = req.body;
    const updateQuery = 'UPDATE cursos SET nombreCurso = ?, cantDiasSemanas = ?, seccion = ?, nrc = ? WHERE idCurso = ?';

    conexion.query(updateQuery, [nombreCurso, cantDiasSemanas, seccion, nrc, idCurso], (err, resultado) => {
      if (err) {
        console.log(err);
        return next(new Error('Error al actualizar el curso'));
      }
      res.json({ message: 'Curso actualizado correctamente' });
    });
  },

  deleteCurso: (req, res, next) => {
    const idCurso = req.params.idCurso;
    const deleteQuery = 'DELETE FROM curso_estudiante WHERE idCurso = ?';

    conexion.query(deleteQuery, [idCurso], (err, resultado) => {
      if (err) {
        console.log(err);
        return next(new Error('Error al eliminar el curso'));
      }
      res.json({ message: 'Curso eliminado correctamente' });
    });
  }
  };

 
  
  // exportar modulos
  
  module.exports =  cursosController;