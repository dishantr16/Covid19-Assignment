module.exports = (app) => {
  const router = require("express").Router();
  const covidRoutes = require("../controllers/covidController"); //importing controller
  router.post("/users", covidRoutes.users); 
  router.post("/vaccineFilter", covidRoutes.vaccineFilter); //vaccineFilter
  router.post("/covidLocation", covidRoutes.covidLocation); //covidLocation
  router.post("/dateRange", covidRoutes.dateRange); //dateRange
  router.get("/users", covidRoutes.Getusers); //Getusers
  app.use("/", router);
};
