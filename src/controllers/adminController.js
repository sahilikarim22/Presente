const conexion = require("../db/config");

const adminController = {
  getPruebas: (req, res) => {
    res.render("pruebas");
  },
  getAdmin: (req, res, next) => {
    conexion.query("SELECT * FROM periodos", (err, periodos) => {
      if (err) {
        console.log(err);
        return next(err);
      }

      const idUsuario = req.session.userId;

      conexion.query(`SELECT * FROM usuarios WHERE id=?`,[idUsuario], (err, usuarios) => {
        if (err) {
          console.log(err);
          return res.status(500).send("Error de servidor");
        }


      res.render("admin/index", { periodos, usuarios: usuarios[0] });
    });
  });
  },
  postPeriodo: (req, res) => {
    const { nombrePeriodo, cantidadSemanas } = req.body;
    const insertQuery = `INSERT INTO periodos (nombrePeriodo, cantidadSemanas) VALUES (?, ?)`;

    conexion.query(
      insertQuery,
      [nombrePeriodo, cantidadSemanas],
      (error, resultados) => {
        if (error) {
          console.log(error);
          return res
            .status(500)
            .send("Error al insertar el período en la base de datos");
        } else {
          res.redirect("/admin");
        }
      }
    );
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
      console.log("Periodo borrado exitosamente");
      res.redirect("/admin");
    });
  },
  getAdminCursosPeriodo: (req, res) => {
    const idPeriodo = req.params.idPeriodo;
    conexion.query(
      "SELECT * FROM cursos WHERE idPeriodo =?",
      [idPeriodo],
      (err, cursos) => {
        if (err) {
          console.log(err);
          return res.status(500).send("Error de servidor");
        } else {
          conexion.query(
            "SELECT * FROM periodos WHERE id =?",
            [idPeriodo],
            (err, periodo) => {
              if (err) {
                console.log(err);
                return res.status(500).send("Error de servidor");
              } else {
                res.render("admin/cursos", { cursos, periodo });
              }
            }
          );
        }
      }
    );
  },
  getAdminCursoDetalle: (req, res) => {
    const idCurso = req.params.idCurso;
    const idPeriodo = req.params.idPeriodo;

    const cursoSQL = "SELECT * FROM cursos WHERE idCurso=? AND idPeriodo=?";
    const estudiantesSQL = `
      SELECT u.nombres, u.apellidos, u.cedula, u.id
      FROM curso_estudiante ce
      INNER JOIN cursos c ON ce.idCurso = c.idCurso
      INNER JOIN usuarios u ON ce.idUsuario = u.id
      WHERE c.idCurso = ? AND c.idPeriodo = ?;
    `;
    const clasesSQL = `
      SELECT idClase, nombreClase, fechaClase
      FROM clases
      WHERE idCurso = ? AND idPeriodo = ?
      ORDER BY fechaClase ASC;
    `;
    const asistenciaSQL = `
      SELECT a.asistio, u.nombres, u.apellidos, u.cedula, u.id, a.idClase
      FROM usuarios u
      JOIN asistencias a ON u.id = a.idEstudiante
      JOIN clases c ON c.idClase = a.idClase
      WHERE c.idCurso = ?;
    `;
  
    conexion.query(cursoSQL, [idCurso, idPeriodo], (error, curso) => {
      if (error) {
        console.log(error);
        return res.status(500).send("Error de servidor");
      }
  
      conexion.query(estudiantesSQL, [idCurso, idPeriodo], (error, estudiantes) => {
        if (error) {
          console.log(error);
          return res.status(500).send("Error de servidor");
        }
  
        conexion.query(clasesSQL, [idCurso, idPeriodo], (error, clases) => {
          if (error) {
            console.log(error);
            return res.status(500).send("Error de servidor");
          }
  
          conexion.query(asistenciaSQL, [idCurso], (error, asistencia) => {
            if (error) {
              console.log(error);
              return res.status(500).send("Error de servidor");
            }
  
            // Transformar la estructura de 'asistencia' para asociarla con clases
            const asistenciaPorClase = {};
            asistencia.forEach(registro => {
              if (!asistenciaPorClase[registro.idClase]) {
                asistenciaPorClase[registro.idClase] = [];
              }
              asistenciaPorClase[registro.idClase].push(registro);
            });
  
            // Formatear la fecha en cada objeto de 'clases'
            clases = clases.map(clase => {
              clase.fechaClase = new Date(clase.fechaClase).toLocaleDateString("es-ES", {
                dateStyle: "short"
              });
              return clase;
            });

            res.render("admin/curso", {            
              curso,
              estudiantes,
              clases,
              asistenciaPorClase,
              idPeriodo
            });
          });
        });
      });
    });
  },
  putStatusPeriodo: (req, res) => {

    const { status, id } = req.body;

    const DesactivarSQL = `UPDATE periodos SET status = 0 WHERE status = 1`

    conexion.query(DesactivarSQL,(error,resultado)=>{
      if(error){
        console.log(error)
      }

    const periodoSQL = `UPDATE periodos SET status = ? WHERE id = ?`

    conexion.query(periodoSQL,[status,id],(error,resultado)=>{
      if(error){
        console.log(error)
      }
    })
    })
  }
};

// exportar módulos
module.exports = adminController;
