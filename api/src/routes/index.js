const { Router } = require("express");
const countryRoute = require("./Country");
const activityRoute = require("./Activity");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/countries", countryRoute);
router.use("/activities", activityRoute);

module.exports = router;
