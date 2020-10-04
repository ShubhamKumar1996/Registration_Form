const express = require("express");
const router = express.Router();

const registrationController = require("../controller/registration");

router.get("/registration-form", registrationController.getRegistration);

router.post("/registration-form", registrationController.postRegistration);

module.exports = router;