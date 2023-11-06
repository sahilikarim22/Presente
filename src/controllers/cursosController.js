const conexion = require('../db/config');

const cursosController = {
    postCurso: (req,res)=> {
      //const idProfesor = req.session.userId;
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
            return res.status(500).json({ error: 'Error al insertar el curso en la base de datos' });
          }
          res.redirect("/profesor/cursos/"+idPeriodo);
        }
      );
    }, 
    putCurso: (req, res) => {
      const idCurso = req.params.idCurso;

      const {
        nombreCurso,
        cantDiasSemanas,
        seccion,
        nrc
      } = req.body;

      const updateQuery = 'UPDATE cursos SET nombreCurso = ?, cantDiasSemanas = ?, seccion = ?, nrc = ? WHERE idCurso = ?';

      conexion.query(updateQuery, [nombreCurso, cantDiasSemanas, seccion, nrc, idCurso], (err, resultado) => {
        if (err) {
          console.log(err);1
          return res.status(400).json({ msg: 'Error al actualizar el curso' });
        }
        res.json({ message: 'Curso actualizado correctamente' });
      });
    },

    deleteCurso: (req, res) => {
      const idCurso = req.params.idCurso;
      const deleteQuery = 'delete from curso_estudiante where idCurso=?';
      conexion.query(deleteQuery, [idCurso], (err, resultado) => {
        if(err){
          console.log(err)
        }else{
          res.json({ message: 'Curso eliminado correctamente' });
        }
      });
    }
  };

 
  
  // exportar modulos
  
  module.exports =  cursosController;