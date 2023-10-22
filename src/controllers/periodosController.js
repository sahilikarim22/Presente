
const periodosController = {
    getPeriodos: (req, res) => {
      res.render('periodos', { title: 'Proyecto Node.js con EJS' });
    },
  };
  
  module.exports = periodosController;