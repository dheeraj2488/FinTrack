const jwt=require('jsonwebtoken')
const User=require('../models/userModel')
const verifyUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res
        .status(404)
        .json({ success: false, error: "Token not provided" });
    }

    jwt.verify(token, process.env.JWT_KEY, async (err, decode) => {
      if (err) {
        return res
          .status(404)
          .json({ success: false, error: "Token not valid" });
      }

      const user = await User.findById(decode.id).select("-password");
      if (!user) {
        return res
          .status(404)
          .json({ success: false, error: "User not found" });
      }
      
      req.user = user;
      next();
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Server sidee error" });
  }
};

module.exports= {verifyUser};
