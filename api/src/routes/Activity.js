const { Router } = require("express");
const { Op } = require("sequelize");
const { Country, Activity } = require("../db");
const router = Router();
const axios = require("axios");
const {
  getActivities,
  postActivity,
  deleteActivity,
} = require("../controllers/Activity");

router.get("/", getActivities);

router.post("/", postActivity);

router.delete("/", deleteActivity);
module.exports = router;
