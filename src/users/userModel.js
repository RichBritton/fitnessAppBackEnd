const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name:
  {
    type: String,
    required: true,
  },
  email:
  {
    type: String,
    required: true,
    unique: true,
  },
  password:
  {
    type: String,
    required: true,
  },
  currentWeight:
  {
    type: Number,
    default: 60
  },
  desiredWeight:
  {
    type: Number,
    default: 60
  },
  height:
  {
    type: Number,
    default: 170
  },
  age:
  {
    type: Number,
    default: 18
  },
  sex:
  {
    type: String,
    required: true,
  },
  calories:
  {
    type: Number,
    default: 0
  }
});

userSchema.statics.findByCredentials = async (email, password) => {
  console.log("email " + email)
  console.log( "password " + password)
  const user = await User.findOne({ email });
  console.log(user.password)

  if (!user)
  {
    throw new Error("Unable to login");
  }

  const passwordsMatch = bcrypt.compare(password, user.password);

  if (!passwordsMatch)
  {
    throw new Error("wrong password");
  }

  return user;
};

userSchema.methods.generateAuthToken = function()
{
  const token = jwt.sign({ _id: this._id }, process.env.SECRET);
  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;