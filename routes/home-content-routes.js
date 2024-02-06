const express = require("express");
// const { check } = require("express-validator");

 const homeContentController = require("../controllers/home-content-controllers");

const router = express.Router();

// router.get("/", usersController.getUsers);

router.post("/new", homeContentController.postHomeContent);

module.exports = router;