const HttpError = require("../models/http-error");
const PortfolioModel = require("../models/portfolio");

const postPortfolioContent = async (req, res, next) => {

 const  { image, alt, title, category, description, linkTo, linkToText, hrefTo } = req.body;
 // const image  = req.file.path;
  // console.log("image");
  //console.log(image);

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

   // console.log(req);
    // console.log(req.body);

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

const findPortfolioContentByTitle = async (req, res, next) => {
    const { key } = req.params;
    let portfolioItem;
    try {
        portfolioItem = await PortfolioModel.findOne({key:key});
    } catch(err) {
        const error = new HttpError("Looking for the portfolio item failed", 500);
        return next(error);
    }

    res.json({
     title: portfolioItem.title,
     img: portfolioItem.img,
     category: portfolioItem.category,
     alt: portfolioItem.alt,
     description: portfolioItem.description,
     linkTo: portfolioItem.linkTo,
     linkToText: portfolioItem.linkToText,
     hrefTo: portfolioItem.hrefTo,
     key: key
    });
};

exports.postPortfolioContent = postPortfolioContent;
exports.getPortfolioContent = getPortfolioContent;
exports.findPortfolioContentByTitle = findPortfolioContentByTitle;