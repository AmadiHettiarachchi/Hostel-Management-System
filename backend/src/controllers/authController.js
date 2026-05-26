import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const createToken = (id, accountType) => {
  return jwt.sign({ id, accountType }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

export const registerStudent = async (req, res) => {
  try {
    const { fullName, email, phone, nic, parentPhone, password } = req.body;

    if (!fullName || !email || !phone || !nic || !parentPhone || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const exists = await User.findOne({ email });

    if (exists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = await User.create({
      fullName,
      email,
      phone,
      nic,
      parentPhone,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Student registered successfully",
      user: {
        id: student._id,
        fullName: student.fullName,
        email: student.email,
        accountType: "student",
      },
      token: createToken(student._id, "student"),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.WARDEN_EMAIL &&
      password === process.env.WARDEN_PASSWORD
    ) {
      return res.json({
        message: "Warden login successful",
        user: {
          id: "warden",
          fullName: "Hostel Warden",
          email,
          accountType: "warden",
        },
        token: createToken("warden", "warden"),
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        accountType: "student",
      },
      token: createToken(user._id, "student"),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};