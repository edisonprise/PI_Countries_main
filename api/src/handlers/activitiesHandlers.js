const {
  getActivities, createActivity,
} = require("../controllers/activitiesControllers");

const getActivityHandler = async (req, res) => {
  let name = req.query.name;
  const results = name ? ActivityName(name, res) : await getActivities();
  res.status(200).json(results);
};
const createActivityHandler = async (req, res) => {
  try {
    const { name, difficulty, duration, season, country } = req.body;
    const newActivity = await createActivity(
      name,
      difficulty,
      duration,
      season,
      country
    );
    res.status(201).json(newActivity);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = {
  createActivityHandler,
  getActivityHandler,
};
