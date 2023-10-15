const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');
const registrarseController = require('../controllers/registrarseController');
const iniciarSesionController = require('../controllers/iniciarSesionController');
const adminController = require('../controllers/adminController');
// Ruta de inicio
router.get('/', indexController.getIndex);
router.get('/registrarse', registrarseController.getRegistrarse);
router.get('/iniciarSesion', iniciarSesionController.getIniciarSesion);
router.get('/admin', adminController.getAdmin);
module.exports = router;