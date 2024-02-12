const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const portfolioSchema = new Schema({  
    image: { type: String, required: true },
    alt: { type: String, required: true },
    title: {type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    linkTo : {type: String, required: true },
    linkToText: { type: String, required: true },
    hrefTo: { type: String, required: true },
});

module.exports = mongoose.model("Portfolio", portfolioSchema);