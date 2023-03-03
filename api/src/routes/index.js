const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");
const { Country } = require("../db");
const router = Router();
var latinize = require("latinize");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//router.use("/countries", countries);
//router.use("/activities", activities);

const getAllCountries = async () => {
  const allCountries = Country.findAll();
  if (!allCountries.length) {
    const apiCountriesResponse = await axios.get(
      "https://restcountries.com/v3/all"
    );
    var apiCountries = apiCountriesResponse.data.map((e, i) => {
      console.log(e.capital ? e.capital[0] : "not found");
      return {
        name: e.name.official,
        img: e.flags,
        region: e.region,
        capital: e.capital ? latinize(e.capital[0]) : "not found",
        subregion: e.subregion,
        area: e.area,
        population: e.population,
      };
    });
    Country.bulkCreate(apiCountries);
    console.log("creado");
  }
};

router.get("/countries", async (req, res) => {
  const name = req.query.name;
  let countriesTotal = await getAllCountries();
  if (name) {
    let countryName = await countriesTotal.filter(
      (el = el.name.toLowerCase().includes(name.toLowerCase()))
    );
    countryName.length
      ? res.status(200).send(countryName)
      : res.status(404).send("No esta el country, sorry");
  } else {
    res.status(200).send(countriesTotal);
  }
});

module.exports = router;
