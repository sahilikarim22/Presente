const conexion = require('../db/config');

const usuariosController = {
    postUsuarios: (req, res) => {
        const { correoUcab, clave, apellidos, nombres, cedula, tipoUsuario, estatus } = req.body;

        console.log(req.body);

        const insertQuery = `INSERT INTO usuarios 
        (correoUcab, clave,apellidos,nombres, cedula,estatus) 
        VALUES ('${correoUcab}','${clave}','${apellidos}','${nombres}',
        '${cedula}','${tipoUsuario}','${estatus}')`;

        conexion.query(insertQuery,[correoUcab, clave, apellidos, nombres, cedula,tipoUsuario, estatus], (error,resultados)=>{
            if(error){
                console.log(error);
                return res.status(500).send('Error al insertar el estudiante en la base de datos');
            }else{
                res.redirect('/estudiantes');
            }
        });
    },
};



// exportar modulos

module.exports = usuariosController;