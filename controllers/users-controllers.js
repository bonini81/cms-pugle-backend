const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const User = require("../models/user");

const getUsers = async (req, res, next) => {
    let usersList;
    try {
        usersList = await User.find({}, "-password");
    } catch (err) {
        const error = new HttpError("Fetching users failed, please try again later", 500);
        return next(error);
    }
   
  res.status(201).json({ users: usersList.map(user => user.toObject({getters: true})) });
};

const signup = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return next(
         new HttpError("Empty fields, please check your data", 422)
        );
    }

    const { name, email, password } = req.body;

   let existingUser;
    try {
       existingUser = await User.findOne({email:email});
    } catch(err) {
        const error = new HttpError("Signing up failed 2, please try again later", 500);
        return next(error);
    }
    
if (existingUser) {
    const error = new HttpError("User exists already, please login instead", 422);
    return next(error);
}

    const createdUser = new User ({
        name,
        email,
        image: "https://thelaughingcake.com/wp-content/uploads/2023/12/TheLaughingCakePC.png",
        password
    });

    try {
        await createdUser.save();
    } catch(err) {
        const error = new HttpError("Signing up failed 3, please try again later", 500);
        return next(error);
    }

    res.status(201).json({ user: createdUser.toObject({getters: true}) });
};

const login = async (req, res, next) => {
    const { email, password } = req.body;

    let existingUser;
    try {
       existingUser = await User.findOne({email:email});
    } catch(err) {
        const error = new HttpError("Logging in failed, please try again later", 500);
        return next(error);
    }

    if(!existingUser || existingUser.password !== password) {
        const error = new HttpError("Invalidad credentials, could not log you in", 401);
        return next(error);
    }

    res.json({message: "Logged In"});
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;