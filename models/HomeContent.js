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
            required: true,
        },
    experienceContent: [
            {
                item: String,
                icon: Number,
                link: String,
                required: true,
            }
        ],
        
            contactButtons: [
            {
                item: String,
                icon: Number,
                link: String,
                required: true,
            }
        ]
      
});

module.exports = mongoose.model("HomeContent", homeContentSchema);