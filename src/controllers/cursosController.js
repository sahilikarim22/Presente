const cursosController = {
    getCursos: (req, res) => {
      res.render('admin/cursos', { title: 'Proyecto Node.js con EJS' });
    },
  };

 
  
  // exportar modulos
  
  module.exports =  cursosController;