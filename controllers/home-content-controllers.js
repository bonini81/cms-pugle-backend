const HttpError = require("../models/http-error");
const HomeContent = require("../models/HomeContent");

const postHomeContent = async (req, res, next) => {

    let homeContent;
    homeContent = req.body;

    const createdHomeContent = new HomeContent (homeContent);

    try {
       const resultCreatedContent = await createdHomeContent.save();
    } catch(err) {
        const error = new HttpError("Signing up failed 3, please try again later", 500);
        return next(error);
    }

    res.status(201).json(resultCreatedContent);
}

exports.postHomeContent = postHomeContent;