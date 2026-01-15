const HttpError = require("../models/http-error");
const HomeContent = require("../models/HomeContent");

const postHomeContent = async (req, res, next) => {

   let homeContent = req.body;

    const createdHomeContent = new HomeContent (homeContent);

    try {
       await createdHomeContent.save();
    } catch(err) {
        const error = new HttpError("Creating home content failed, please try again", 500);
        return next(error);
    }

    res.status(201).json("Home Content saved successfully!");
}

const getHomeContent = async (req, res, next) => {
   let content;
    try {
        content = await HomeContent.find();
        
    }
    catch {
        const error = new HttpError("Fetching home content failed, please try again later", 500);
        return next(error);
    }
    res.status(200).json({ message: "Fetched home content successfully!", homeContent: content.map(contentview => contentview.toObject({getters: true})) } );

}

exports.postHomeContent = postHomeContent;
exports.getHomeContent = getHomeContent;