const express = require("express");
const fileUpload = require("../middleware/file-upload");

const portfolioController = require("../controllers/portfolio-controllers");

const router = express.Router();

 router.post("/new", fileUpload.single("image") ,portfolioController.postPortfolioContent);
 
router.get("/", portfolioController.getPortfolioContent);

module.exports = router;
