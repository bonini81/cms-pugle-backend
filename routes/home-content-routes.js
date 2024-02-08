const express = require("express");

const homeContentController = require("../controllers/home-content-controllers");

const router = express.Router();

router.get("/", homeContentController.getHomeContent);

router.post("/new", homeContentController.postHomeContent);

module.exports = router;