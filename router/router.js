const express = require("express");
const cardrender = require("../cards/routes/cardRestController");
const userrender = require("../users/routes/userRestController");
const { handleError } = require("../utils/handleErrors");

const router = express.Router();

router.use("/cards", cardrender);
router.use("/users", userrender);



module.exports = router;