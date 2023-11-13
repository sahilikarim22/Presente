const conexion = require("../db/config");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

function generateConfirmationToken() {
  const token = crypto.randomBytes(20).toString("hex");
  return token;
}

// Configurar un transportador de correo electrónico (utiliza tu propio servicio y credenciales)
const transporter = nodemailer.createTransport({
  service: "sahilikarim22@hotmail.com", // Ejemplo: Gmail
  auth: {
    user: "sahilikarim22@hotmail.com",
    pass: "Perronegro123.",
  },
});

function sendConfirmationEmail(email, token) {
  const mailOptions = {
      from: "sahilikarim22@hotmail.com",
      to: email,
      subject: "Confirmación de Registro",
      text: `Por favor, haz clic en el siguiente enlace para confirmar tu correo: https://presente.azurewebsites.net/confirmar/${token}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.error("Error al enviar el correo de confirmación:", error);
          // Handle error
      } else {
          console.log("Correo de confirmación enviado:", info.response);
      }
  });
}

const usuariosController = {
  postUsuarios: (req, res, next) => {
    const { correoUcab, clave, apellidos, nombres, cedula, tipoUsuario } = req.body;
    const estatus = 0;
    // Genera un token de confirmación
    const token = generateConfirmationToken();

    // Consulta para verificar si el usuario ya está registrado
    const selectQuery = "SELECT * FROM usuarios WHERE cedula = ?";

    conexion.query(selectQuery, [cedula], (error, results) => {
        if (error) {
            console.error("Error al buscar el usuario:", error);
            return next(new Error("Error al verificar el usuario en la base de datos"));
        }

        if (results.length > 0) {
            // Usuario ya existe, actualizar datos y enviar correo de confirmación
            const existingUser = results[0];
            
            // Actualizar datos
            const updateQuery =
                "UPDATE usuarios SET correoUcab = ?, clave = ?, apellidos = ?, nombres = ?, estatus = ?, tipoUsuario = ?, token = ? WHERE cedula = ?";

            conexion.query(
                updateQuery,
                [correoUcab, clave, apellidos, nombres, estatus, tipoUsuario, token, cedula],
                (updateError, updateResults) => {
                    if (updateError) {
                        console.error("Error al actualizar el usuario en la base de datos:", updateError);
                        return next(new Error("Error al actualizar el usuario en la base de datos"));
                    }
                    // Usuario actualizado, enviar correo de confirmación
                    sendConfirmationEmail(correoUcab, token);
                    return res.redirect('confirmarUsuario');
                }
            );
        } else {
            // Usuario no existe, agregar como nuevo
            const insertQuery =
                "INSERT INTO usuarios (correoUcab, clave, apellidos, nombres, cedula, estatus, tipoUsuario, token) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

            conexion.query(
                insertQuery,
                [correoUcab, clave, apellidos, nombres, cedula, estatus, tipoUsuario, token],
                (insertError, insertResults) => {
                    if (insertError) {
                        console.error("Error al insertar el usuario en la base de datos:", insertError);
                        return next(new Error("Error al insertar el usuario en la base de datos"));
                    }
                    // Usuario agregado, enviar correo de confirmación
                    sendConfirmationEmail(correoUcab, token);
                    return res.redirect('confirmarUsuario');
                }
            );
        }
    });
},
  // Ruta para confirmar el correo
  getConfirmacion: (req, res) => {
    const token = req.params.token;
    // Query SQL para actualizar el campo 'estatus' a 1 para el usuario con un token específico
    const updateQuery = "UPDATE usuarios SET estatus = 1 WHERE token = ?";
    // Ejecuta la consulta con el token como parámetro
    conexion.query(updateQuery, [token], (error, results) => {
      if (error) {
        console.error("Error al actualizar el campo estatus:", error);
        return res.send(
          "error al verificar su cuenta. Contacte a un administrador"
        );
        // Manejo de errores, por ejemplo, puedes enviar una respuesta de error
      } else {
        return res.redirect("/iniciarSesion");
      }
    });
  },
  getConfirmarUsuario: (req, res) => {
    res.render(`confirmarUsuario`);
  },
  getLogout: (req,res) => {
     // Destruir la sesión
     req.session.destroy(err => {
      if (err) {
          console.log(err);
      } else {
          res.redirect('/');
      }
    });
  }
};

module.exports = usuariosController;
