const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  phoneNumber: {
    type: String,
    validate: {
      validator: function (pn) {
        return /\d{3}-\d{3}-\d{4}/.test(pn);
      },
      message: (phonNum) => `${phonNum.value} is not a valid phone number`,
    },
    required: [true, "Phone Number is required"],
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
  ],
  code: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
