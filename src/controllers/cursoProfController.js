const conexion = require('../db/config');

const cursosProfController = {
    getCursosProf: (req, res) => {
      const idPeriodo = req.params.idPeriodo;
      const idProfesor = req.session.userId;
      console.log(idProfesor);

      const cursosSQL = 'SELECT * FROM cursos WHERE idProfesor = ? AND idPeriodo = ?';
      conexion.query(cursosSQL, [idProfesor, idPeriodo], (err,cursos)=>{
        if(err){
          console.log(err);
          return res.status(500).send("Error de servidor");
        }else{
          conexion.query('SELECT * FROM periodos',(err,periodos) => {
            if(err){
              console.log(err);
              return res.status(500).send("Error de servidor");
            }else{
              console.log(cursos);
              res.render('profesor/cursosprof', {cursos: cursos, periodos: periodos});
            }
            
          });

        }
      });
    },
  };

 
  
  // exportar modulos
  
  module.exports =  cursosProfController;