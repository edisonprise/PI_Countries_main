const axios = require("axios");
const { Op } = require("sequelize");
const { Country, Activity } = require("../db");

const postActivity = async (req, res, next) => {
  try {
    let { name, difficulty, duration, season, countries } = req.body;
    name = name.toLowerCase();

    const [activity, created] = await Activity.findOrCreate({
      where: { name },
      defaults: {
        difficulty,
        duration,
        season,
      },
    });

    if (Array.isArray(countries)) {
      // Verifica si `countries` es un array
      await Promise.all(countries.map(async (country) => {
        await activity.addCountry(country);
      }));
    } else {
      // Si `countries` no es un array, manejar el caso aquí
      console.error('countries no es un array:', countries);
      // Puedes hacer un throw de un nuevo error o manejarlo de acuerdo a tu lógica
      throw new Error('countries no es un array');
    }

    return res.json(activity);
  } catch (error) {
    return next(error);
  }
};



const getActivities = (req, res, next) => {
  return Activity.findAll()
    .then((activities) => {
      return res.json(activities);
    })
    .catch((err) => next(err));
};

const deleteActivity = (req, res, next) => {
  let { name } = req.body; //nombre de la actividad

  console.log(name);
  if (name) {
    Activity.destroy({
      where: {
        name,
      },
    }).then((resp) => res.sendStatus(204));
  }
};
module.exports = {
  getActivities,
  postActivity,
  deleteActivity,
};
