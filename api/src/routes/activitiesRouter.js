const { Router } = require("express");
const { Country, Activity } = require("../db");
const activitiesRouter = Router();
const { createActivityHandler, getActivityHandler } = require("../handlers/activitiesHandlers");

activitiesRouter.post("/", createActivityHandler);

activitiesRouter.get("/", getActivityHandler);
module.exports = activitiesRouter;
