const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const placesRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());
app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
    if(res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message: error.message || "An unknown error occurred!"});
    const error = new HttpError("Could not find this route", 404);
    throw error;
});

//MiddleWare
app.use(placesRoutes);

mongoose
.connect(
    "mongodb+srv://andresdominguez81:et6TE7smQ9bUor1d@pugle.kspxgy8.mongodb.net/?retryWrites=true&w=majority"
)
.then(()=>{
    app.listen(5000);
})
.catch( err => console.log(err));
