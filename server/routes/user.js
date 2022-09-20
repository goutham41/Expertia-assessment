const router = require("express").Router();
const {CreateUser,LoginUser} = require("../controllers/user");
router.post("/create", CreateUser);
router.post("/login", LoginUser);
module.exports = router;