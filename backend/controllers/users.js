const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

exports.register = async (req, res) => {
  try {
 
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const role = req.body.role;

    const createUser = new User({
      email: email,
      username: username,
      password: password,
      role: role,
    });
    const created = await createUser.save();
    console.log(created);
    res.status(200).send("new user registred successfully");
  } catch (error) {
    res.status(400).send(error);
  }
};
exports.login = async (req, res) => { 
    try {
    const email = req.body.email;
    const password = req.body.password;
  
    //find user if exists
    const user = await User.findOne({ email: email });
    if (user) {
      //verify password
      const isMatch = await bcryptjs.compare(password, user.password);
      if (isMatch) {
        //generate Token defined in userScema
        const token = await user.generateToken();
        res.cookie("jwt", token , {
          //expires token in 24h
          expires: new Date(Date.now() + 86400000),
          httpOnly: true,
        });
        res.status(200).send("LoggedIn");
      } else {
        res.status(400).send("invalid credentials");
      }
    } else {
      res.status(400).send("your username or password is incorrect");
    }
  } catch (error) {
    console.log(error)
  } 
}

