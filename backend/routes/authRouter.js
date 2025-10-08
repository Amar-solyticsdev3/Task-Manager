const express = require('express');
const {
  signUpUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
} = require('../controllers/authController');
const { protect } = require('../middlewares/auth');
const upload = require('../middlewares/upload');
const authRouter = express.Router();

authRouter.post('/signup', signUpUser);
authRouter.post('/login', loginUser);
authRouter.get('/profile', protect, getUserProfile);
authRouter.put('/profile/edit', protect, updateUserProfile);

authRouter.post('/upload-image', upload.single('image'), (req, res) => {
  if (!req.file) {
    res.status(400).json({ message: 'No file uploaded!' });
  }
  const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${
    req.file.filename
  }`;
  res.status(200).json({ imageUrl });
});

module.exports = authRouter;
