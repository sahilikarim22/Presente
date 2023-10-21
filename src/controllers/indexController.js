
const indexController = {
    getIndex: (req, res) => {
      res.render('index', { title: 'Proyecto Node.js con EJS' });
    },
  };
  
  module.exports = indexController;