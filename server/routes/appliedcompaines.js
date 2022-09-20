const router = require("express").Router();
const { CreateAppliedCompanies, GetAppliedCompanies } = require("../controllers/appliedCompaines");
router.post("/", CreateAppliedCompanies);
router.get("/:id", GetAppliedCompanies);
module.exports = router;
