const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    lastLogin: { type: Date, required: true },
    engagementScore: { type: Number, required: true },
    retentionCategory: { type: String, enum: ['High', 'Medium', 'Low'], required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
