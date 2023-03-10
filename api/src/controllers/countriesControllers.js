const { Activity, Country } = require("../db");
const axios = require("axios");
var latinize = require("latinize");

const todosCountries = async () => {
  const allCountries = await Country.findAll();
  if (!allCountries.length) {
    const apiCountriesResponse = await axios.get(
      "https://restcountries.com/v3/all"
    );
    var apiCountries = apiCountriesResponse.data.map((e, i) => {
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
  return allCountries;
};

const getAllCountries = async (name) => {
  let result;
  if (name == undefined) {
    result = Country.findAll();
    return result;
  } else {
    result = Country.findOne({
      where: {
        name: name,
      },
    });
    return result;
  }
};

const getCountryById = async (id) => {
  let countries;
  if (id.length > 1) {
    countries = await Country.findByPk(id, { include: Activity });

    return {
      id: countries.id,
      name: countries.name,
      image: countries.image,
      region: countries.region,
      capital: countries.capital,
      subregion: countries.subregion,
      area: countries.area,
      population: countries.population,
      activities: countries.activities.map((e) => {
        return {
          id: e.id,
          name: e.name,
          difficulty: e.difficulty,
          duration: e.duration,
          season: e.season,
        };
      }),
    };
    //console.log(countries);
  }
};

module.exports = { todosCountries, getAllCountries, getCountryById };
