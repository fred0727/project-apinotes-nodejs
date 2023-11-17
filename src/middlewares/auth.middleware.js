const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

exports.protect = async (req, res, next) => {
  try {
    //    Extract the token
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    console.log(token);

    //    Validate if the token exists
    if (!token) {
      return res.status(401).json({
        status: "error",
        message: "You are not logged, Please login in to get access",
      });
    }

    //   Decodific the token
    const decoded = await promisify(jwt.verify)(
      token,
      process.env.SECRET_JWT_SEED
    );

    //   Search the user and vaidate if the user exists
    const user = await User.findOne({
      where: {
        id: decoded.id,
      },
    });

    if (!user) {
      return res.status(401).json({
        status: "error",
        meesage: "The owner of this token is not longer",
      });
    }

    req.sessionUser = user;
    next();
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      error,
    });
  }
};
