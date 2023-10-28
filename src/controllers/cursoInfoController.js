const conexion = require("../db/config");

const cursoInforController = {
  getCursoInfo: (req, res) => {
    const idCurso = req.params.idCurso;
    const idPeriodo = req.params.idPeriodo;

    conexion.query(
      "SELECT * FROM cursos WHERE idCurso=? AND idPeriodo=?",
      [idCurso, idPeriodo],
      (error, curso) => {
        if (error) {
          console.log(error);
          return res.status(500).send("Error de servidor");
        }

        const estudiantesSQL = `SELECT u.nombres, u.apellidos, u.cedula, u.id
              FROM curso_estudiante ce
              INNER JOIN cursos c ON ce.idCurso = c.idCurso
              INNER JOIN usuarios u ON ce.idUsuario = u.id
              WHERE c.idCurso = ? AND c.idPeriodo = ?;`;

        // const idUsuario = req.session.userId;

        conexion.query(
          estudiantesSQL,
          [idCurso, idPeriodo],
          (error, estudiantes) => {
            if (error) {
              console.log(error);
              return res.status(500).send("Error de servidor");
            }

            const asistenciaSQL = `
                    SELECT a.idAsistencia, a.fechaAsistencia, a.comentario
                    FROM asistencias a
                    WHERE a.idCurso = ?;
                    `;

            conexion.query(asistenciaSQL, [idCurso], (error, asistencia) => {
              if (error) {
                console.log(error);
                return res.status(500).send("Error de servidor");
              }

              // Formatear la fecha y hora en cada objeto de asistencia
              asistencia = asistencia.map((item) => {
                // Suponiendo que fechaAsistencia es la clave que contiene la fecha y hora en cada objeto de asistencia
                const fechaFormateada = new Date(
                  item.fechaAsistencia
                ).toLocaleString("es-ES", {
                  // Puedes ajustar el formato de fecha y hora según tus necesidades
                  dateStyle: "short",
                });

                // Añadir la fecha formateada al objeto de asistencia
                return {
                  ...item,
                  fechaAsistencia: fechaFormateada,
                };
              });

              console.log(asistencia);
              res.render("profesor/cursoInfo", {
                curso,
                estudiantes,
                asistencia,
              });
            });
          }
        );
      }
    );
  },
};

module.exports = cursoInforController;
