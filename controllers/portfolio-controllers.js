const HttpError = require("../models/http-error");
const PortfolioModel = require("../models/portfolio");

const postPortfolioContent = async (req, res, next) => {

   let portfolioContent = req.body;

    const createdPortfolioContent = new PortfolioModel(portfolioContent);

    try {
       await createdPortfolioContent.save();
    } catch(err) {
        const error = new HttpError("Creating home content failed, please try again", 500);
        return next(error);
    }

    res.status(201).json("Portfolio Content uploaded successfully!");
}

const getPortfolioContent = async (req, res, next) => {
    let content;
    try {
        content = await PortfolioModel.find();
        
    }
    catch {
        const error = new HttpError("Fetching home content failed, please try again later", 500);
        return next(error);
    }
    res.status(201).json({ message: "Fetched portfolio content successfully!", portfolioContent: content.map(contentview => contentview.toObject({getters: true})) } );

}

exports.postPortfolioContent = postPortfolioContent;
exports.getPortfolioContent = getPortfolioContent;