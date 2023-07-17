require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../Models/UserModel");

module.exports.authMiddleware = (requiredRoles) => {
  return async (req, res, next) => {
    try {
      console.log(req.cookies);
      const token = req.cookies.TOKEN;

      if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
      }

      jwt.verify(token, process.env.TOKEN_KEY, async (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: "Invalid token." });
        }

        const user = await User.findById(decoded.id);
        if (!user) {
          return res.status(401).json({ message: "Invalid token." });
        }

        req.user = user;

        const { role } = user;
        // console.log(role);
        if (!hasRequiredRole(role, requiredRoles)) {
          return res.status(403).json({ message: "Access denied. Insufficient role." });
        }

        next();
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error." });
    }
  };
};

const hasRequiredRole = (userRole, requiredRoles) => {
  return requiredRoles.includes(userRole);
};
