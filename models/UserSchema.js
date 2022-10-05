const moment = require('moment');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    trim: true,
    unique: [true, 'Username is already taken'],
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  createdAt: {
    type: String,
    default: moment().format('MMMM Do YYYY, h:mm:ss a'),
  },
  avatar: {
    type: String,
  },
  status: {
    type: String,
    default: 'active',
    enum: ['active', 'deleted', 'deactivated'],
  },
}, {
  timestamps: true,
});

module.exports = mongoose.models?.User || mongoose.model('User', UserSchema);
