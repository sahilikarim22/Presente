const conexion = require('../db/config');

const cursosProfController = {
    getCursosProf: (req, res) => {
      
      conexion.query('SELECT * FROM periodos',(err,periodos) => {
        console.log(periodos);
        res.render('profesor/cursosprof', {periodos});
      });
    },
  };

 
  
  // exportar modulos
  
  module.exports =  cursosProfController;