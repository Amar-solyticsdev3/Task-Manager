// utils/generateToken.js
const jwt = require('jsonwebtoken');

const generateToken = (res, userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });

  // Save token in cookie
  res.cookie('token', token, {
    httpOnly: true, // prevents JS from accessing cookie (XSS protection)
    secure: process.env.NODE_ENV === 'production', // only send over HTTPS in production
    sameSite: 'strict', // protects against CSRF
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
  });

  return token;
};

module.exports = generateToken;
