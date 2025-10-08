// utils/generateToken.js
const jwt = require('jsonwebtoken');

const generateToken = (res, userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '7d', // token expires in 7 days
  });

  // Save token in cookie
  res.cookie('token', token, {
    httpOnly: true,           // prevents JS access (XSS protection)
    secure: process.env.NODE_ENV === 'production', // only send over HTTPS in production
    sameSite: 'None',          // allows cross-site cookie (frontend <-> backend)
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
  });

  return token;
};

module.exports = generateToken;
