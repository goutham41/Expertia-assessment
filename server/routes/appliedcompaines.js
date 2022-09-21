const router = require("express").Router();
const {
  CreateAppliedCompanies,
  GetAppliedCompanies,
  CancelProcess,
} = require("../controllers/appliedCompaines");
router.post("/", CreateAppliedCompanies);
router.get("/:id", GetAppliedCompanies);
router.delete("/cancel/:id", CancelProcess);
module.exports = router;
