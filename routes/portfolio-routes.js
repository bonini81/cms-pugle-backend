const express = require("express");

const portfolioController = require("../controllers/portfolio-controllers");

const router = express.Router();

 router.post("/new", portfolioController.postPortfolioContent);
 
router.get("/", portfolioController.getPortfolioContent);

module.exports = router;
