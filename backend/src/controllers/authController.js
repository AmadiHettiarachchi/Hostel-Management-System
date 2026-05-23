import User from "../models/User.js";

export const registerStudent = async (req, res) => {
  console.log("BODY RECEIVED:", req.body);

  return res.status(201).json({
    message: "Register API working",
    data: req.body,
  });
};

export const loginUser = async (req, res) => {
  console.log("LOGIN BODY:", req.body);

  return res.json({
    message: "Login API working",
    user: {
      accountType: "student",
    },
  });
};