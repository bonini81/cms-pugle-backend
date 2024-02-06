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
        ]
      
});

module.exports = mongoose.model("HomeContent", homeContentSchema);