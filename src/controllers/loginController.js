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
                        req.session.loggedin = true;
                        // Redirige a vistas diferentes según el tipo de usuario
                        if (usuario.tipoUsuario === 'administrador') {
                            res.redirect('/admin');
                        } else if (usuario.tipoUsuario === 'docente') {
                            res.redirect('/profesor/periodos');
                        } else if (usuario.tipoUsuario === 'estudiante') {
                            res.redirect('/estudiantes');
                        } else {
                            // Si el tipo de usuario no es "administrador," "profesor" ni "estudiante," redirige a la página principal
                            res.redirect('/');
                        }
                    } else {
                        console.log(1);
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