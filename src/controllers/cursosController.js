const conexion = require('../db/config');

const cursosController = {
    getCursos: (req, res) => {
      res.render('admin/cursos', { title: 'Proyecto Node.js con EJS' });
    },
    postCursos: (req,res)=> {
      const {
        nombreCurso,
        cantDiasSemanas,
        facultad,
        escuela,
        seccion,
        idProfesor,
        idEstudiante,
        nrc,
      } = req.body;
    
      const insertQuery = `INSERT INTO cursos (nombreCurso, cantDiasSemanas, facultad, escuela, seccion, idProfesor, idEstudiante, nrc) 
                          VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    
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
    }
    
  };

 
  
  // exportar modulos
  
  module.exports =  cursosController;