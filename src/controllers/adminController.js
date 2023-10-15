const adminController = {
    getAdmin: (req, res) => {
      res.render('index', { title: 'Proyecto Node.js con EJS' });
    },
  };
  
  module.exports = adminController;