const { Activity, Country } = require("../db");

const getActivities = async () => {
  const allActivities = await Activity.findAll({ include: Country });
  //filtro para el front que trae todas las actividades
  const filterA = allActivities.map((e) => e.name.toLowerCase());
  const total = filterA.filter((item, index) => {
    return filterA.indexOf(item) === index;
  });
  //console.log(total);
};

const createActivity = async (name, difficulty, duration, season, country) => {
  let activity = await Activity.create({
    name,
    difficulty,
    duration,
    season,
    country,
  });
  let activityWithCountry = await Country.findOne({
    where: { name: country },
  });
  console.log(activityWithCountry);
  await activity.setCountries(activityWithCountry.id);
};

module.exports = { createActivity, getActivities };
