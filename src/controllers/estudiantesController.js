const conexion = require("../db/config");

const estudiantesController = {
  getEntrada: (req, res) => {
    res.render("estudiantes/entrada");
  },
  getInicio: (req, res) => {
    res.render("estudiantes/inicio");
  },
  getCursos: (req, res) => {
    const idUsuario = req.session.userId;

    // Consulta para obtener los datos del usuario por su id
    const usuarioSQL = `SELECT * FROM usuarios WHERE id = ?`;

    conexion.query(usuarioSQL, [idUsuario], (error, usuario) => {
        if (error) {
            console.log(error);
            return res.status(500).send("Error de servidor");
        }

        // Consulta para obtener los cursos del usuario
        const cursosSQL = `
            SELECT c.nombreCurso, c.cantDiasSemanas, c.seccion, c.idCurso
            FROM curso_estudiante
            INNER JOIN cursos c ON curso_estudiante.idCurso = c.idCurso
            WHERE curso_estudiante.idUsuario = ?`;

        conexion.query(cursosSQL, [idUsuario], (err, cursos) => {
            if (err) {
                console.log(err);
                return res.status(500).send("Error de servidor");
            }

            // Renderiza la vista 'cursos' con los datos del usuario y sus cursos
            res.render("estudiantes/cursos", { usuario: usuario[0], cursos: cursos });
        });
    });
},
  gerCursoInfo: (req, res) => {

  },
  postInscripcionCurso: (req, res) => {
  const nrc = req.body.nrc;
  const idUsuario = req.session.userId;

  // Consulta para obtener el id del curso basado en el NRC
  const query = `SELECT idCurso FROM cursos WHERE nrc = '${nrc}'`;

  conexion.query(query, (error, results, fields) => {
    if (error) {
      console.error('Error al ejecutar la consulta: ', error);
      return res.status(500).send('Error en la consulta');
    }

    if (results.length > 0) {
      const idCurso = results[0].idCurso;

      // Verificar si el usuario ya está inscrito en el curso
      const checkQuery = `SELECT idCurso FROM curso_estudiante WHERE idUsuario = ${idUsuario} AND idCurso = ${idCurso}`;

      conexion.query(checkQuery, (checkError, checkResults) => {
        if (checkError) {
          console.error('Error al verificar la inscripción: ', checkError);
          return res.status(500).send('Error en la verificación de inscripción');
        }

        if (checkResults.length > 0) {
          // El usuario ya está inscrito en el curso, puedes mostrar un modal o enviar un mensaje
          return res.status(500).send('Ya inscribió el curso con ese nrc');
        } else {
          // El usuario no está inscrito, proceder con la inserción en la tabla curso_estudiante
          const insertQuery = `INSERT INTO curso_estudiante (idUsuario, idCurso) VALUES (${idUsuario}, ${idCurso})`;

          conexion.query(insertQuery, (insertError, insertResults) => {
            if (insertError) {
              console.error('Error al insertar en la tabla curso_estudiante: ', insertError);
              return res.status(500).send('Error en la inserción');
            } else {
              console.log('Inserción exitosa en la tabla curso_estudiante.');
              return res.redirect('/estudiantes/cursos');
            }
          });
        }
      });
    } else {
      console.log('No se encontró un curso con el NRC proporcionado.');
      return res.status(500).send('El curso con el nrc proporcionado no existe');
    }
  });
}

};

// exportar modulos

module.exports = estudiantesController;
