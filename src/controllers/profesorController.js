const conexion = require("../db/config");

const profesorController = {
  getCursos: (req, res) => {
    const idPeriodo = req.params.idPeriodo;
    const idProfesor = req.session.userId;
    const cursosSQL = `SELECT c.*, u.nombres AS nombre_profesor, u.apellidos AS apellido_profesor
      FROM cursos c
      JOIN usuarios u ON c.idProfesor = u.id
      WHERE c.idPeriodo = ? AND c.idProfesor = ?;
      `;
    conexion.query(cursosSQL, [idPeriodo, idProfesor], (err, cursos) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Error de servidor");
      } else {
        conexion.query("SELECT * FROM periodos", (err, periodos) => {
          if (err) {
            console.log(err);
            return res.status(500).send("Error de servidor");
          } else {
            res.render("profesor/cursos", {
              cursos: cursos,
              periodos: periodos,
            });
          }
        });
      }
    });
  },
  getPeriodos: (req, res) => {
    const idDocente = req.session.userId;
    const docenteSQL = `
      SELECT * FROM usuarios WHERE id =?`;
    conexion.query(docenteSQL, [idDocente], (error, docente) => {
      if (error) {
        console.log(error);
        return res.status(500).send("Error de servidor");
      }
      conexion.query("SELECT * FROM periodos", (error, results) => {
        if (error) {
          console.log(error);
        } else {
          res.render("profesor/periodos", {
            docente: docente,
            periodos: results,
          });
        }
      });
    });
  },
  getCursoInfo: (req, res) => {
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
      WHERE idCurso = ? AND idPeriodo = ?;
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
  
            res.render("profesor/cursoInfo", {
              curso: curso[0],
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
  postAsistencia: async (req, res) => {
    const asistencias = req.body; // Array de asistencias
    const idCurso = req.params.idCurso;
    const idPeriodo = req.params.idPeriodo;

    try {
      if (asistencias.length === 0) {
        return res
          .status(400)
          .json({ error: "No se han proporcionado asistencias." });
      }

      const nombreClase = asistencias[0].nombreClase;
      const fechaClase = asistencias[0].fechaClase;

      const insertClaseQuery =
        "INSERT INTO clases (nombreClase, descripcion, idCurso, fechaClase, idPeriodo) VALUES (?,?,?,?,?)";
      const insertClaseResult = await new Promise((resolve, reject) => {
        conexion.query(
          insertClaseQuery,
          [
            nombreClase,
            asistencias[0].descripcion,
            idCurso,
            asistencias[0].fechaClase,
            idPeriodo,
          ],
          (err, result) => {
            if (err) {
              console.log("Error en insertClaseQuery:", err);
              reject(err);
            } else {
              resolve(result.insertId); // Almacena el ID de la clase creada
            }
          }
        );
      });

      const idClase = insertClaseResult; // ID de la clase creada

      // Insertar las asistencias asociadas a la clase
      const insertAsistenciaQueries = asistencias.map(async (asistencia) => {
        const { idEstudiante, asistio } = asistencia;

        const insertAsistenciaQuery =
          "INSERT INTO asistencias (idEstudiante, idCurso, idClase, asistio) VALUES (?,?,?,?)";
        const insertAsistenciaResult = await new Promise((resolve, reject) => {
          conexion.query(
            insertAsistenciaQuery,
            [idEstudiante, idCurso, idClase, asistio],
            (err, result) => {
              if (err) {
                console.log("Error en insertAsistenciaQuery:", err);
                reject(err);
              } else {
                resolve(result);
              }
            }
          );
        });
      });

      await Promise.all(insertAsistenciaQueries); // Esperar a que todas las inserciones se completen
      res
        .status(200)
        .json({ message: "Asistencias registradas correctamente." });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Hubo un problema al procesar las asistencias." });
    }
  },
  getAsistencias: (req, res) => {
    const idCurso = req.params.idCurso;
    const idPeriodo = req.params.idPeriodo;

    const estudiantesInscritosSQL = `
    SELECT u.nombres, u.apellidos, u.cedula, ce.idUsuario
    FROM usuarios u
    JOIN curso_estudiante ce ON ce.idUsuario = u.id
    JOIN cursos c ON c.idCurso = ce.idCurso
    WHERE ce.idCurso = ? AND c.idPeriodo = ?;`;

    conexion.query(
      estudiantesInscritosSQL,
      [idCurso, idPeriodo],
      (error, estudiantes) => {
        if (error) {
          console.log(error);
        } else {
          // console.log(estudiantes)
          res.render("profesor/asistencias", {
            estudiantes,
            idCurso,
            idPeriodo,
          });
        }
      }
    );
  },
};

// exportar modulos

module.exports = profesorController;
