const { uuid } = require("uuidv4");

const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");


const DUMMY_USERS = [
    {
        id: "u1",
        name: "Andres Dominguez",
        email: "info@pugle.net",
        password: "123456"
    }
];

const getUsers = (req, res, next) => {
    res.json({ users: DUMMY_USERS });
};

const signup = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        throw new HttpError("Invalid inputs passed, please check your data", 422);
    }

    const { name, email, password } = req.body;

    const hasUser = DUMMY_USERS.find(u => u.email === email);

    if(hasUser) {
        throw new HttpError("User already exists", 401); 
    }

    const createdUser = {
        id: uuid(),
        name,
        email,
        password
    };

    DUMMY_USERS.push(createdUser);

    res.status(201).json({ user: createdUser });
};

const login = (req, res, next) => {
    const { email, password } = req.body;

    const identifiedUser = DUMMY_USERS.find(u => u.email === email);
    if (!identifiedUser || identifiedUser.password !== password) {
        throw new HttpError("Wrong Credentials", 401);
    }

    res.json({message: "Logged In"});
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;