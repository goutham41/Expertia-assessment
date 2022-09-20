const router = require("express").Router();
const { Getcompanies, Createcompanies} = require("../controllers/companies");
router.post("/",Createcompanies)
router.get("/", Getcompanies);
module.exports = router;
