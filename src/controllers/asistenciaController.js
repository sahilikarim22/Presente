const conexion = require('../db/config');

const asistenciaController = {
    postAsistencia: (req, res) => {
        const { idAsistencia, idEstudiante, idCurso, fechaAsistencia, asistio, comentario } = req.body;

        // Primero, obtén el idPeriodo del curso
        conexion.query('SELECT idPeriodo FROM cursos WHERE idCurso = ?', idCurso, (error, resultados) => {
            if (error) {
                throw error;
            }
            
            const idPeriodo = resultados[0].idPeriodo; // Debes acceder al primer resultado

            // Ahora, realiza la inserción de la asistencia
            const insertQuery = 'INSERT INTO asistencias (idAsistencia, idEstudiante, idCurso, fechaAsistencia, asistio, comentario) VALUES (?,?,?,?,?,?)';

            conexion.query(insertQuery, [idAsistencia, idEstudiante, idCurso, fechaAsistencia, asistio, comentario], (err, result) => {
                if (err) {
                    throw err; // Deberías lanzar el error en lugar de hacer "return err"
                }

                // Redirige a la página deseada
                //res.redirect(`/profesor/cursoInfo/${idCurso}${idPeriodo}`);
                res.redirect(`localhost:3000/profesor/cursosprof`);
            });
        });
    },
    getAsistencias: (req, res) => {
        res.render("profesor/asistencias");
    }

};

module.exports = asistenciaController;
