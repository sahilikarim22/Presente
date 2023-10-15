const registrarseController = {
    getRegistrarse: (req, res) => {
      res.render('registrarse', { title: 'Proyecto Node.js con EJS' });
    },
  };
  
  module.exports = registrarseController;