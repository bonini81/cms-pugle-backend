const HttpError = require("../models/http-error");
const PortfolioModel = require("../models/portfolio");

const postPortfolioContent = async (req, res, next) => {

 const  {  image, alt, title, category, description, linkTo, linkToText, hrefTo } = req.body;
 // const  { image } = req.file;

    const createdPortfolioContent = new PortfolioModel({
        image,
        alt,
        title,
        category,
        description,
        linkTo,
        linkToText,
        hrefTo
    });
    console.log("req");

    console.log(req.file);
    console.log(req.body);

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