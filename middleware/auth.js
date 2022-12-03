import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    let newToken;
    const token = req.header("Authorization");
    if (!token) return res.status(403).json({ message: "Access Denied." });
    if (token.startsWith("Bearer ")) {
      newToken = token.slice(7, token.length).trimLeft();
    }

    const decoded = jwt.verify(newToken, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
