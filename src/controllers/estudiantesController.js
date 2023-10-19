const estudiantesController = {
    getEstudiantes: (req, res) => {
      res.render('estudiantes', { title: 'Proyecto Node.js con EJS' });
    },
  };

 
  
  // exportar modulos
  
  module.exports =  estudiantesController;