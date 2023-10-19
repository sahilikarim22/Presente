const adminController = {
    getAdmin: (req, res) => {
      res.render('admin/index', { title: 'Proyecto Node.js con EJS' });
    },
  };

 
  
  // exportar modulos
  
  module.exports =  adminController;