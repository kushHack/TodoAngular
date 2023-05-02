const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.statics.signup = async function (name, email, password) {
  if (!email || !password || !name) {
    throw Error("All fields are required");
  }
  if (!validator.isEmail(email)) {
    throw Error("Please enter a valid email.");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough.");
  }
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({ name, email, password: hash });
  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields are required");
  }
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Email or Password doesn't exist");
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Email or Password doesn't exist");
  }

  return user;
};

module.exports = mongoose.model("Users", userSchema);
