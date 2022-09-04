const User = require("../models/User");
const TokenBlack = require("../models/tokenblack");
const Employe = require("../models/Employe");
const bcrypt = require("bcryptjs");

const { validationResult } = require("express-validator");

const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.statusCode = 422; //L’entité fournie avec la requête est incompréhensible ou incomplète.
    error.data = errors.array();
    // console.log("*********");
    // console.log(error.data);
    throw error;
  }
  const email = req.body.email;
  const password = req.body.password;
  const role = req.body.role;
  let employeId = req.body.employe_id;
  let employee = await Employe.findById(employeId);
  if (!employee) return res.status(400).send("Employee Id not Found");
  console.log(email, password);

  bcrypt
    .hash(password, 12)
    .then((hashedPwd) => {
      const user = new User({
        email: email,
        role: role,
        employe_id: employee._id,
        password: hashedPwd,
      });
      return user.save();
    })
    .then((result) => {
      res.status(201).json({
        message: "User Created",
        userId: result["_id"],
        created: result.createdAt,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  //console.log(email, password);

  User.findOne({ email: email })
    .then((u) => {
      if (!u) {
        const error = new Error("A user with this mail could not be found");
        error.statusCode = 401;
        throw error;
      }
      loadedUser = u;
      return bcrypt.compare(password, loadedUser.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error("Wrong Password !!");
        error.statusCode = 401;
        throw error;
      }
      //res.status(200).json({message : 'User logged !'});
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString(),
        },
        "supersecretcode",
        { expiresIn: "12h" }
      );

      res
        .status(200)
        .json({
          message: "User logged !",
          token: token,
          userId: loadedUser._id.toString(),
        });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.logout = async (req, res, next) => {
  const token = req.get("Authorization").split(" ")[1];
  newToken = new TokenBlack({
    token: token,
  });
  try {
    result = await newToken.save();
    res
      .status(200)
      .json({ message: "User disconnected", tokenId: result["_id"] });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.getAllUsers=(req, res, next) => {
    User.find()
      .then(users => res.status(200).json(users))
      
      .catch(err => {
        console.log(err);
        next();
    })
  };