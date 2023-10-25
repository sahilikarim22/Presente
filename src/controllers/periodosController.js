const conexion = require('../db/config');

const periodosController = {



    getPeriodos: (req, res) => {

      conexion.query('SELECT * FROM periodos', (error, results) => {
        if (error) {
          console.log(error);
        } else {
          res.render('profesor/periodos', {
            periodos: results
          });
        }
      });
    },
    getCursoProfesor:(req, res) => {
      const id_curso = req.params.id_curso;
      conexion.query('SELECT * FROM cursos WHERE idCurso = ?', [id_curso], (error, cursos) => {
        if (error) {
          console.log(error);
        } else {
          res.render(`profesor/curso`, { cursos: cursos }); // Pasa el array de cursos
        }
      });
    }
    
    
}

  
  module.exports = periodosController;