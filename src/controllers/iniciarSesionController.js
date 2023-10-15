const iniciarSesionController = {
    getIniciarSesion: (req, res) => {
      res.render('iniciarSesion', { title: 'Proyecto Node.js con EJS' });
    },
  };
  
  module.exports = iniciarSesionController;