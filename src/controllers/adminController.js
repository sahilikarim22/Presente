const conexion = require('../db/config');

const adminController = {
  getAdmin: (req, res) => {
    conexion.query('SELECT * FROM periodos', (err,periodos) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Error de servidor");
      }
      // console.log(periodos);
      res.render('admin/index', { periodos });
       });
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
  deletePeriodo: (req, res) => {
  // Obtener el id del registro a eliminar
  const id = req.body.id;

  // Consulta SQL para eliminar el registro
  const query = `DELETE FROM periodos WHERE id = ${id}`;

  // Ejecutar la consulta
  conexion.query(query, (err, results) => {
    if (err) {
      console.log("Error executing query: ", err);
      res.status(500).send("Error al eliminar el registro");
      return;

    }
    console.log('Periodo borrado exitosamente');
    res.redirect('/admin');
  });
   },
   getAdminCursosPeriodo: (req, res) => {
    const idPeriodo = req.params.idPeriodo;
    // console.log(idPeriodo);
    conexion.query('SELECT * FROM cursos WHERE idPeriodo =?', [idPeriodo], (err,cursos) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error de servidor");
    }
    res.render('admin/cursos', {cursos: cursos});
  });

   }
};

// exportar módulos
module.exports = adminController;


