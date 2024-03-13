const express = require("express");
const fileUpload = require("../middleware/file-upload");

const portfolioController = require("../controllers/portfolio-controllers");

const router = express.Router();

 router.post("/new", fileUpload.single("img"), portfolioController.postPortfolioContent);
 
router.get("/", portfolioController.getPortfolioContent);

router.get("/item/:key", portfolioController.findPortfolioContentByTitle);

router.delete("/item-delete/:key", portfolioController.deletePortfolioContentByKey);

router.patch("/item-update/:key", portfolioController.editPortfolioContentByKey);

module.exports = router;
