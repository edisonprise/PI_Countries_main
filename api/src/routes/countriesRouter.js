const { Router } = require("express");
const countriesRouter = Router();

const {
  getCountriesHandler,
  getCountryHandler,
} = require("../handlers/countriesHandlers");

countriesRouter.get("/", getCountriesHandler);

countriesRouter.get("/:id", getCountryHandler);

module.exports = countriesRouter;
