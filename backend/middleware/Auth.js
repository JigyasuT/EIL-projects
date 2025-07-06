const jwt = require("jsonwebtoken");

exports.ensureAuthenticated = (req, res, next) => {
  const auth = req.headers["authorization"];
  console.log("token is ",auth)
  if (!auth) {
    return res
      .status(403)
      .json({ message: "Unauthorized, JWT token is required" });
  }

  const token = auth.split(" ")[1];
  if (!token) {
    return res.status(403).json({ message: "Token not found in header" });
  }
  console.log("token is 2nd ",token)

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded)
    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT Verification error:", error.message);
    return res
      .status(403)
      .json({ message: "Unauthorized, JWT token wrong or expired" });
  }
};
