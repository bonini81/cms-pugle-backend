const HttpError = require("../models/http-error");
const PortfolioModel = require("../models/portfolio");

const postPortfolioContent = async (req, res, next) => {

 const  { img, alt, title, category, description, linkTo, linkToText, hrefTo, key } = req.body;
 // const image  = req.file.path;
  // console.log("image");
  //console.log(image);

    const createdPortfolioContent = new PortfolioModel({
        img,
        alt,
        title,
        category,
        description,
        linkTo,
        linkToText,
        hrefTo,
        key
    });

    try {
       await createdPortfolioContent.save();
 
    } catch(err) {
        const error = new HttpError("Creating portfolio content failed, please try again", err, 500);
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


 const deletePortfolioContentByKey = async (req, res, next) => {
    const { key } = req.params;
    let content;
    try {
        content = await PortfolioModel.deleteOne({key:key});
        
    }
    catch {
        const error = new HttpError("Fetching home content failed, please try again later", 500);
        return next(error);
    }
    res.status(201).json({ message: "Deleted portfolio content successfully!"} );

}

const editPortfolioContentByKey = async (req, res, next) => {
    
    const  { img, alt, title, category, description, linkTo, linkToText, hrefTo, key } = req.body;
    const idKey = req.params.key;

    let content;
    try {
        content = await PortfolioModel.findOne({key: idKey}); 
    }
    catch {
        const error = new HttpError("Fetching home content failed, please try again later", 500);
        return next(error);
    }
    content.img = img;
    content.alt = alt;
    content.title = title;
    content.category = category;
    content.description = description;
    content.linkTo = linkTo;
    content.linkToText = linkToText;
    content.hrefTo = hrefTo;
    // content.key = key;

    try {
        await content.save();
    }catch(err) {
        const error = new HttpError("Updating portfolio content failed, please try again", 500);
        return next(error);
    }

    res.status(201).json({ message: "Updated portfolio item successfully!",
        portfolioContent: content.toObject({getters: true})} );

}

exports.postPortfolioContent = postPortfolioContent;
exports.getPortfolioContent = getPortfolioContent;
exports.deletePortfolioContentByKey = deletePortfolioContentByKey;
exports.findPortfolioContentByTitle = findPortfolioContentByTitle;
exports.editPortfolioContentByKey = editPortfolioContentByKey;
