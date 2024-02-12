const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const homeContentSchema = new Schema({  
        mainHomeContent: 
        {
            titleServices: String,
            subtitleServices: String, 
            titleExperience: String,
            subTitleExperience: String,
            titleGallery: String,
            titleContact: String,
            subTitleContact: String,
        },
    experienceContent: [
            {
                item: String,
                icon: Number,
                link: String,
            }
        ],
        
            contactButtons: [
            {
                item: String,
                icon: Number,
                link: String,
            }
        ],
            heroContent: 
            {
                title1: String,
                subtitle1: String,
                subtitle2: String
            }
      
});

module.exports = mongoose.model("HomeContent", homeContentSchema);