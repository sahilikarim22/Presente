const conexion = require('../db/config');

const adminController = {
  getAdmin: (req, res) => {
    res.render('admin/index', { title: 'Proyecto Node.js con EJS' });
  },
  postPeriodo: (req, res) => {
    const { nombrePeriodo, cantidadSemanas } = req.body;
    console.log(req.body);

    const insertQuery = `INSERT INTO periodos (nombrePeriodo, cantidadSemanas) VALUES (?, ?)`;

    conexion.query(insertQuery, [nombrePeriodo, cantidadSemanas], (error, resultados) => {
      if (error) {
        console.log(error);
        return res.status(500).send('Error al insertar el período en la base de datos');
      } else {
        res.redirect('/admin');
      }
    });
  },
};

// exportar módulos
module.exports = adminController;


