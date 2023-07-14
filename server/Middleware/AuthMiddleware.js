require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../Models/UserModel");

module.exports.authMiddleware =  async (req, res, next) => {
    try {
        console.log("Headers",req.headers.authorization);
      var token =req.headers.authorization;
  
      if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
      }
    token=token.split(" ")[1];
      jwt.verify(token, process.env.TOKEN_KEY,  async (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: "Invalid token." });
        }
       
       
        const user = await User.findById(decoded.id) ;
        if (user)  req.user=user;// Assuming the JWT payload contains the user information
  
        next();
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error." });
    }
  };