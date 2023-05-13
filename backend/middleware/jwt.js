import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

export const verifyToken = (req, res, next) => {
  console.log(req.Cookies);
  if (!req.cookies || !req.cookies.accessToken) {
    return next(createError(401, "You are not authenticated now!"));
  }
  const token = req.cookies.accessToken;

  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.userId = payload.id;
    req.isSeller = payload.isSeller;
    next();
  });
};
