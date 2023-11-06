const conexion = require('../db/config');

const loginController = {
    postLogin: (req, res) => {
        const { correoUcab, clave } = req.body;

        // Buscar el usuario en la base de datos y comparar la contraseña cifrada
        conexion.query(
            "SELECT * FROM usuarios WHERE correoUcab = ? AND clave = ?",
            [correoUcab, clave],
            (error, results) => {
                if (error) {
                    console.error(error);
                    res.render("/iniciarSesion");
                } else if (results.length > 0) {
                    const usuario = results[0];
                    if (usuario.clave === clave) {
                        req.session.usuario = usuario; // almacenar información del usuario en la sesión
                        req.session.userId = usuario.id;
                        req.session.correoUcab = usuario.correoUcab;
                        req.session.clave = usuario.clave;
                        req.session.tipoUsuario = usuario.tipoUsuario;
                        req.session.loggedin = true;
                        // Redirige a vistas diferentes según el tipo de usuario
                        if (usuario.tipoUsuario === 'administrador') {
                            res.redirect('/admin');
                        } else if (usuario.tipoUsuario === 'docente') {
                            conexion.query("SELECT id FROM periodos WHERE status = 1", (error, idPeriodoSeleccionado) => {
                                if (error) {
                                    res.redirect('/profesor/periodos');
                                } else {
                                    if (idPeriodoSeleccionado && idPeriodoSeleccionado.length > 0) {
                                        const idPeriodo = idPeriodoSeleccionado[0].id;
                                        res.redirect(`profesor/cursos/${idPeriodo}`);
                                    } else {
                                        res.redirect('/profesor/periodos');
                                    }
                                }
                            });
                        }else if (usuario.tipoUsuario === 'estudiante') {

                            // obtener idPeriodo
                            const idPeriodoSQL = `SELECT id FROM periodos WHERE status = 1`;

                            conexion.query(idPeriodoSQL, (error, idPeriodoSeleccionado) => {
                                if (error) {
                                    res.redirect('/estudiantes/cursos/');
                                } else {
                                    if (idPeriodoSeleccionado && idPeriodoSeleccionado.length > 0) {
                                        const idPeriodo = idPeriodoSeleccionado[0].id;
                                        res.redirect(`estudiantes/cursos/${idPeriodo}`);
                                    } else {
                                        res.redirect('/estudiantes/cursos/');
                                    }
                                }
                            });
                        } else {
                            // Si el tipo de usuario no es "administrador," "profesor" ni "estudiante," redirige a la página principal
                            res.redirect('/');
                        }
                    } else {
                        res.redirect("/iniciarSesion");
                    }
                } else {
                    console.log(2);
                    res.redirect("/iniciarSesion");
                }
            }
        );
    },
};

module.exports = loginController;