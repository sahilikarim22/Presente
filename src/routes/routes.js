const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');
const registrarseController = require('../controllers/registrarseController');
const iniciarSesionController = require('../controllers/iniciarSesionController');
const estudiantesController = require('../controllers/estudiantesController');

const cursosProfController = require('../controllers/cursoProfController');

const adminController = require('../controllers/adminController');
const cursosController = require('../controllers/cursosController');
// Ruta de inicio
router.get('/', indexController.getIndex);
router.get('/registrarse', registrarseController.getRegistrarse);
router.get('/iniciarSesion', iniciarSesionController.getIniciarSesion);
router.get('/admin', adminController.getAdmin);
router.get('/admin/cursos', cursosController.getCursos);
router.get('/estudiantes', estudiantesController.getEstudiantes);
router.get('/admin/cursosprof', cursosProfController.getCursosProf);

module.exports = router;