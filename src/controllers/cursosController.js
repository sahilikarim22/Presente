const conexion = require('../db/config');

const cursosController = {
    getCursos: (req, res) => {
      res.render('admin/cursos', { title: 'Proyecto Node.js con EJS' });
    },
    postCursos: (req,res)=> {
      const {
        nombreCurso,
        cantDiasSemanas,
        seccion,
        idProfesor,
        idEstudiante,
        nrc,
      } = req.body;
    
      const insertQuery = `INSERT INTO cursos (nombreCurso, cantDiasSemanas, seccion, idProfesor, idEstudiante, nrc) 
                          VALUES (?, ?, ?, ?, ?, ?)`;
    
      connection.query(
        insertQuery,
        [
          nombreCurso,
          cantDiasSemanas,
          facultad,
          escuela,
          seccion,
          idProfesor,
          idEstudiante,
          nrc,
        ],
        (error, resultados) => {
          if (error) {
            console.error('Error al insertar el curso en la base de datos:', error);
            return res.status(500).json({ error: 'Error al insertar el curso en la base de datos' });
          }
          res.json({ message: 'Curso insertado correctamente' });
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
          console.log(err);
          return res.status(400).json({ msg: 'Error al actualizar el curso' });
        }
        res.json({ message: 'Curso actualizado correctamente' });
      });
    }
    
  };

 
  
  // exportar modulos
  
  module.exports =  cursosController;