const mongoose = require("mongoose");

// User schema
const userSchema = new mongoose.Schema({
  fullname: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  googleId: { type: String, unique: true }, // מוסיף שדה עבור משתמשי Google
});

// User model
const User = mongoose.model("User", userSchema);

module.exports = User;
