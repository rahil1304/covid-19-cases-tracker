const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  dob: {
    type: Date,
  },
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
  },
  symptomatic: {
    type: Boolean,
    required: true,
  },
  symptoms: {
    type: [String],
  },
  comments: {
    type: String,
  },
  from: {
    type: Date,
    required: true,
  },
  to: {
    type: Date,
    required: true,
  },
  current: {
    type: Boolean,
    default: false,
  },
  admitted: {
    type: Boolean,
    required: true,
  },
  medicines: {
    type: [String],
  },
  social: {
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    linkedIn: {
      type: String,
    },
    instagram: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
