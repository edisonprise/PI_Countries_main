const { Router } = require("express");
const { Op } = require("sequelize");

const router = Router();
const axios = require("axios");
const {
  getAllCountries,
  loadCountries,
  getCountriesById,
} = require("../controllers/Country");

router.get("/", getAllCountries);
router.get("/:idCountry", getCountriesById);

module.exports = router;
