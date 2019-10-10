// Inicializar el router express
let router = require('express').Router();
// El api por defecto
router.get('/', function (req, res) {
    res.json({
        status: 'OK',
        message: 'Bienvenido!'
    });
});

// Exportar las rutas del api.

var grafosController = require('./grafosController');

router.route('/grafos').get(grafosController.buscar1);

router.route('/crudo').get(grafosController.buscar);

router.route('/prueba').get(grafosController.prueba);
module.exports = router;