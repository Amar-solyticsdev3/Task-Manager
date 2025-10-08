const User = require('../models/User');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

const signUpUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      emailId,
      password,
      profileImageUrl,
      adminInviteToken,
    } = req.body;

    const userExists = await User.findOne({ emailId });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists!' });
    }
    let role = 'member';
    if (
      adminInviteToken &&
      adminInviteToken == process.env.ADMIN_INVITE_TOKEN
    ) {
      role = 'admin';
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // for new user

    const user = await User.create({
      firstName,
      lastName,
      emailId,
      password: hashPassword,
      profileImageUrl,
      role,
    });
    generateToken(res, user._id);

    res.status(200).json({
      message: `${firstName} Sign Up successfully.. `,
      data: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        emailId: user.emailId,
        role: user.role,
        profileImageUrl: user.profileImageUrl,
      },
    });
  } catch (error) {
    res.status(401).json({ message: 'Server error', error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { emailId, password } = req.body;

    // 1. Check if user exists
    const user = await User.findOne({ emailId });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password!' });
    }

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password!' });
    }

    generateToken(res, user._id);

    // 3. Send user data
    res.json({
      messsge: 'Login Successfully!',
      data: user,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      res.status(404).json({ message: 'User not found!' });
    }
    res.json(user);
  } catch (error) {
    res.status(401).json({ message: 'Server error', error: error.message });
  }
};
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(404).json({ message: 'User not found!' });
    }
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.profileImageUrl = req.body.profileImageUrl || user.profileImageUrl;
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }

    const updateProfile = await user.save();

    res.json({
      _id: updateProfile._id,
      firstName: updateProfile.firstName,
      lastName: updateProfile.lastName,
      emailId: updateProfile.emailId,
      role: updateProfile.role,
      profileImageUrl: updateProfile.profileImageUrl,
    });
  } catch (error) {
    res.status(401).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { signUpUser, loginUser, getUserProfile, updateUserProfile };
