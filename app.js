// const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const usersRoutes = require("./routes/users-routes");
const homeContentRoutes = require("./routes/home-content-routes");
const portfolioContentRoutes = require("./routes/portfolio-routes");
const HttpError = require("./models/http-error");

const app = express();
const db_uri =process.env.DB_URI;

// const corsOrigin = "http://localhost:3000";
/** app.use(cors({
  origin:corsOrigin,
  methods:['GET','POST'],
  credentials: true 
})); */ 

app.use(cors());

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    next();
});

// app.use("/uploads/images", express.static(path.join("uploads", "images")));

app.use("/api/users", usersRoutes);

app.use("/api/homeContent", homeContentRoutes);

app.use("/api/portfolioContent", portfolioContentRoutes);

// 404 handler 
app.use((req, res, next) => {
    const error = new HttpError("Could not find this route", 404);
    return next(error);
});

// General Error handler 
app.use((error, req, res, next) => {

  /*  if (req.file) {
        fs.unlink(req.file.path, err => {
            console.log(err);
        }); 
    } */

    if(res.headersSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message: error.message || "An unknown error occurred!"});
});

mongoose
.connect(
    db_uri
)
.then(()=>{
    const port = process.env.PORT || 5000;
    app.listen(port);
})
.catch( err => console.log(err));
