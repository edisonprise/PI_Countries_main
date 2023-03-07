const {
  todosCountries,
  getAllCountries,
  getCountryById,
} = require("../controllers/countriesControllers");

const getCountriesHandler = async (req, res) => {
  let name = req.query.name;
  const results = name ? countryName(name, res) : await todosCountries();
  res.status(200).json(results);
};

const getCountryHandler = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const country = await getCountryById(id);
    res.status(200).json(country);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = {
  getCountriesHandler,
  getCountryHandler,
};
