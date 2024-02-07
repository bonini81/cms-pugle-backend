const express = require("express");
// const { check } = require("express-validator");

 const homeContentController = require("../controllers/home-content-controllers");

const router = express.Router();

router.get("/", homeContentController.getHomeContent);

router.post("/new", homeContentController.postHomeContent);

module.exports = router;