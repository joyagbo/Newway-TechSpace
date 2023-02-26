const users = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.getAllUsers = async (req, res) => {
  try {
    const result = await users.find();
    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.registerUser = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      phonenumber,
      city,
      country,
      password,
      role,
    } = req.body;

    // check if user already exists
    const userMail = await users.findOne({ email: req.body.email });

    if (userMail) {
      return res.status(400).json({
        status: "fail",
        message: "User already exists",
      });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await users.create({
      firstname,
      lastname,
      email,
      phonenumber,
      city,
      country,
      password: hashedPassword,
      role,
    });
    res.status(201).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    // find user
    const user = await users.findOne({ email: req.body.email });
    // if user not found
    if (!user) {
      return res.status(404).json({ status: 404, message: "User not found" });
    }
    // if user found
    // compare password
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    // if password not matched
    if (!isMatch) {
      return res
        .status(400)
        .json({ status: 400, message: "Invalid credentials" });
    }
    // if password matched
    // create a token
    const token = jwt.sign(
      { user: user._id, userRole: user.user_role },
      process.env.SECRET,
      { expiresIn: "7 days" }
    );

    // send token to client
    res.status(200).json({
      status: 200,
      message: "Login successful",
      data: {
        token,
        user,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
};

exports.updateProfile = async (req, res) => {
  // check if user exists
  const user = await users.findById(req.params.id);
  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: "User not found",
    });
  }

  // update user
  const updatedUser = await users.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: updatedUser,
  });
};

exports.deleteProfile = async (req, res) => {
  // check if user exists
  const user = await users.findById(req.params.id);
  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: "User not found",
    });
  }

  // delete user
  await users.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: "success",
  });
};
