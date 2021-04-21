const jwt = require("jsonwebtoken")
const APP_SECRET = "WOWOWOW";

function getTokenPayload(token) {
  return jwt.verify(token, APP_SECRET)
}

function getUserId(req, authToken) {
  if (req) {
    if (!req.headers.authorization) {
      throw new Error("No token found");
    }

    const authHeader = req.headers.authorization;
    const token = authHeader.replace("Bearer ", "");
    if (!token) {
      throw new Error("No token found");
    }
    const { userId } = getTokenPayload(token);
    return userId;
  } else if (authToken) {
    const { userId } = getTokenPayload(authToken);
    return userId;
  }

  throw new Error("Not authenticated");
}

module.exports = {
  APP_SECRET,
  getUserId,
};
