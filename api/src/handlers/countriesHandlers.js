const {
  todosCountries,
  getAllCountries,
  getCountryById,
} = require("../controllers/countriesControllers");

const getCountriesHandler = async (req, res) => {
  const { name } = req.query;
  try {
      const results = await getAllCountries(name);
      res.status(200).json(results);
  } catch (error) {
    res.status(404).send({ msg: "Not found" });
  }
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
