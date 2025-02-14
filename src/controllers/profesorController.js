const conexion = require("../db/config");

const profesorController = {
  getCurso: (req, res) => {
    const idCurso = req.params.idCurso;
    const cursoSQL = "SELECT * FROM cursos WHERE idCurso = ?";
    conexion.query(cursoSQL, [idCurso], (error, curso) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ error: "Error de servidor" });
      } else {
        if (curso.length > 0) {
          res.json(curso[0]); // Devuelve los detalles del curso en formato JSON
        } else {
          res.status(404).json({ error: "Curso no encontrado" });
        }
      }
    });
  },
  deleteCurso: (req, res) => {
    const idCurso = req.params.idCurso;

    const cursoSQL = "DELETE FROM cursos WHERE idCurso = ?";
    conexion.query(cursoSQL, [idCurso], (error, curso) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ error: "Error de servidor" });
      } else {
        res.json({ message: "Curso eliminado correctamente" });
      }
    });
  },
  getCursos: (req, res) => {
    const idPeriodo = req.params.idPeriodo;
    const idProfesor = req.session.userId;
    const cursosSQL = `SELECT c.*
      FROM cursos c
      JOIN usuarios u ON c.idProfesor = u.id
      WHERE c.idPeriodo = ? AND c.idProfesor = ?;
      `;
    conexion.query(cursosSQL, [idPeriodo, idProfesor], (err, cursos) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Error de servidor");
      } else {
        conexion.query(
          "SELECT * FROM periodos WHERE status = 1",
          (err, periodos) => {
            if (err) {
              console.log(err);
              return res.status(500).send("Error de servidor");
            } else {
              const idProfesor = req.session.userId;

              conexion.query(
                "SELECT * FROM usuarios WHERE id = ?",
                [idProfesor],
                (err, profesor) => {
                  if (err) {
                    console.log(err);
                    return res.status(500).send("Error de servidor");
                  } else {
                    res.render("profesor/cursos", {
                      cursos: cursos,
                      periodos: periodos,
                      profesor: profesor[0],
                    });
                  }
                }
              );
            }
          }
        );
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
      conexion.query(
        "SELECT * FROM periodos WHERE status=1",
        (error, results) => {
          if (error) {
            console.log(error);
          } else {
            res.render("profesor/periodos", {
              docente: docente,
              periodos: results,
            });
          }
        }
      );
    });
  },
  getCursoInfo: (req, res) => {
    const idCurso = req.params.idCurso;
    const idPeriodo = req.params.idPeriodo;

    const cursoSQL = `SELECT c.*, p.cantidadSemanas
    FROM cursos c
    INNER JOIN periodos p ON c.idPeriodo = p.id
    WHERE c.idCurso = ? AND c.idPeriodo = ?;`;

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
    ORDER BY fechaClase ASC;;
    `;
    const asistenciaSQL = `
      SELECT a.asistio, u.nombres, u.apellidos, u.cedula, u.id, a.idClase
      FROM usuarios u
      JOIN asistencias a ON u.id = a.idEstudiante
      JOIN clases c ON c.idClase = a.idClase
      WHERE c.idCurso = ?;
    `;

    const inasistenciasSQL = `SELECT 
    DISTINCT u.nombres, 
    u.apellidos, 
    u.cedula, 
    (COUNT(a.idEstudiante) / (p.cantidadSemanas * cu.cantDiasSemanas)) * 100 AS porcentajeInasistencias
FROM 
    usuarios u
JOIN 
    asistencias a ON u.id = a.idEstudiante
JOIN 
    clases c ON c.idClase = a.idClase
JOIN 
    periodos p ON c.idPeriodo = p.id
JOIN 
    cursos cu ON cu.idCurso = c.idCurso
WHERE 
    c.idCurso = ? 
    AND a.asistio = 0
GROUP BY 
    u.id, a.idClase
HAVING 
    porcentajeInasistencias > 30;
`;

    conexion.query(inasistenciasSQL, [idCurso], (error, inasistencias) => {
      if (error) {
        console.log(error);
        return res.status(500).send("Error de servidor");
      }

      conexion.query(cursoSQL, [idCurso, idPeriodo], (error, curso) => {
        if (error) {
          console.log(error);
          return res.status(500).send("Error de servidor");
        }

        conexion.query(
          estudiantesSQL,
          [idCurso, idPeriodo],
          (error, estudiantes) => {
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
                asistencia.forEach((registro) => {
                  if (!asistenciaPorClase[registro.idClase]) {
                    asistenciaPorClase[registro.idClase] = [];
                  }
                  asistenciaPorClase[registro.idClase].push(registro);
                });

                // Formatear la fecha en cada objeto de 'clases'
                clases = clases.map((clase) => {
                  clase.fechaClase = new Date(
                    clase.fechaClase
                  ).toLocaleDateString("es-ES", {
                    dateStyle: "short",
                  });
                  return clase;
                });

                res.render("profesor/cursoInfo", {
                  curso,
                  estudiantes,
                  clases,
                  asistenciaPorClase,
                  idPeriodo,
                  inasistencias,
                });
              });
            });
          }
        );
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
          res.render("profesor/asistencias", {
            estudiantes,
            idCurso,
            idPeriodo,
          });
        }
      }
    );
  },
  deleteEstudianteCurso: (req, res) => {
    const idEstudiante = req.body.idEstudiante;
    const idCurso = req.body.idCurso;

    // Consulta SQL para eliminar al estudiante del curso en la tabla curso_estudiante
    const query =
      "DELETE FROM curso_estudiante WHERE idUsuario = ? AND idCurso = ?";

    // Ejecutar la consulta con los parámetros
    conexion.query(query, [idEstudiante, idCurso], (error, results, fields) => {
      if (error) {
        res
          .status(500)
          .json({ message: "Error al eliminar al estudiante del curso." });
      } else {
        // Consulta para obtener el idPeriodo asociado al idCurso
        const queryPeriodo = "SELECT idPeriodo FROM cursos WHERE idCurso = ?";

        conexion.query(
          queryPeriodo,
          [idCurso],
          (errorPeriodo, resultsPeriodo) => {
            if (errorPeriodo) {
              res
                .status(500)
                .json({ message: "Error al obtener el periodo del curso." });
            } else {
              const idPeriodo = resultsPeriodo[0].idPeriodo;
              res.status(200).json({ idPeriodo: idPeriodo, idCurso: idCurso });
            }
          }
        );
      }
    });
  },
  putEstudiante: (req, res) => {
    // Obtén los datos actualizados del estudiante desde el cuerpo de la solicitud
    const { cedula, nombres, apellidos, idEstudiante } = req.body;

    // Verifica que los datos necesarios estén presentes
    if (!idEstudiante) {
        return res.status(400).json({ error: 'El ID del estudiante es requerido' });
    }

    // Crea un objeto para almacenar los campos actualizados
    const updateFields = {};

    // Verifica y agrega los campos actualizados al objeto
    if (cedula) updateFields.cedula = cedula;
    if (nombres) updateFields.nombres = nombres;
    if (apellidos) updateFields.apellidos = apellidos;

    // Verifica si hay campos para actualizar
    if (Object.keys(updateFields).length === 0) {
        return res.status(400).json({ error: 'No hay campos para actualizar' });
    }

    // Construye la consulta SQL dinámicamente
    const updateQuery = `UPDATE usuarios SET ${Object.keys(updateFields).map(field => `${field} = ?`).join(', ')} WHERE id = ?`;

    // Ejecuta la consulta SQL con los valores actualizados
    conexion.query(updateQuery, [...Object.values(updateFields), idEstudiante], (error, result) => {
        if (error) {
            console.error('Error al actualizar el estudiante:', error);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }

        // La actualización fue exitosa
        console.log('Estudiante actualizado exitosamente');
        res.status(200).json({ success: true });
    });
},
postEstudiante: (req, res) => {
  const { cedula, nombres, apellidos, idCurso } = req.body;
  const tipoUsuario = 'estudiante'; // Puedes ajustar según tu modelo de datos

  // Verificar si el estudiante ya existe en la tabla de usuarios
  const checkUserQuery = 'SELECT * FROM usuarios WHERE cedula = ?';
  conexion.query(checkUserQuery, [cedula], (err, results) => {
    if (err) {
      console.error('Error al verificar el estudiante:', err);
      return res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }

    // Si no existe, agregarlo a la tabla de usuarios
    if (results.length === 0) {
      const insertUserQuery = 'INSERT INTO usuarios (cedula, nombres, apellidos, tipoUsuario) VALUES (?, ?, ?, ?)';
      conexion.query(insertUserQuery, [cedula, nombres, apellidos, tipoUsuario], (err, userResult) => {
        if (err) {
          console.error('Error al agregar el estudiante:', err);
          return res.status(500).json({ success: false, message: 'Error interno del servidor' });
        }

        // Agregar la relación en la tabla curso_estudiante
        const insertRelationQuery = 'INSERT INTO curso_estudiante (idCurso, idUsuario) VALUES (?, ?)';
        conexion.query(insertRelationQuery, [idCurso, userResult.insertId], (err) => {
          if (err) {
            console.error('Error al agregar la relación:', err);
            return res.status(500).json({ success: false, message: 'Error interno del servidor' });
          }
          // Enviar una respuesta de éxito al frontend with the correct user ID
          res.json({ success: true, estudiante: { id: userResult.insertId, cedula, nombres, apellidos } });
        });
      });
    } else {
      // Si ya existe, solo agregar la relación en la tabla curso_estudiante
      const insertRelationQuery = 'INSERT INTO curso_estudiante (idCurso, idUsuario) VALUES (?, ?)';
      conexion.query(insertRelationQuery, [idCurso, results[0].id], (err) => {
        if (err) {
          console.error('Error al agregar la relación:', err);
          return res.status(500).json({ success: false, message: 'Error interno del servidor' });
        }
        // Enviar una respuesta de éxito al frontend with the correct user ID
        res.json({ success: true, estudiante: { id: results[0].id, cedula, nombres, apellidos } });
      });
    }
  });
}


};

// exportar modulos

module.exports = profesorController;
