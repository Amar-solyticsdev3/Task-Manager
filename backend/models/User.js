const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
  {
      firstName: {
        type: String,
        required: true,
      },

      lastName: {
        type: String,
      },
      
    emailId: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImageUrl: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      enum: ['admin', 'member'],
      default: 'member',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
