const conexion = require('../db/config');

const estudiantesController = {
    getEstudiantes: (req, res) => {
      const idUsuario = req.session.userId;
      conexion.query("SELECT * FROM cursos", (error, cursos) => {
        if (error) throw error;
        console.log(cursos);
        conexion.query("SELECT * FROM usuarios WHERE id =?",[idUsuario],(error,usuario) => {
          if (error) throw error;
          console.log(usuario);
          res.render('estudiantes', {cursos, usuario});
        });
      });
    },
  };

 
  
  // exportar modulos
  
  module.exports =  estudiantesController;