const { mongoose } = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: false,
    },
    lastname: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phonenumber: {
      type: String,
      default: null,
      required: true,
    },
    city: {
      type: String,
      default: null,
      required: false,
    },
    country: {
      type: String,
      default: "nigeria",
      required: false,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    role: {
      type: String,
      enum: ["admin", "standard", "guest"],
      default: "standard",
      required: false,
      validate: {
        validator: function (v) {
          return /^(admin|standard|guest)$/.test(v);
        },
        message: (props) => `${props.value} is not a valid status!`,
      },
    },
    added_on: {
      type: Date,
      default: Date.now,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);


module.exports = Users = mongoose.model("MyUsers", userSchema);
