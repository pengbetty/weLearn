const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const db = require("../config/db");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET;

exports.signup = [
  body("userName").notEmpty(),
  body("displayName").notEmpty(),
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  body("isStudent").isBoolean(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { userName, displayName, email, password, isStudent } = req.body;
    const role = isStudent ? "student" : "agent";

    const checkEmailQuery = "SELECT * FROM user WHERE email = ?";
    db.query(checkEmailQuery, [email], (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Database query error", error: err });
      }
      if (results.length > 0) {
        return res.status(400).json({
          message: "Email already exists, use another email or try to login.",
        });
      }

      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          return res.status(500).json({ message: "Error hashing password" });
        }

        const query =
          "INSERT INTO user (userName, displayName, email, password, role) VALUES (?, ?, ?, ?, ?)";
        db.query(
          query,
          [userName, displayName, email, hashedPassword, role],
          (err, result) => {
            if (err) {
              return res.status(500).json({ message: err });
            }
            res.status(201).json({ message: "User registered successfully!" });
          }
        );
      });
    });
  },
];

exports.login = [
  body("email").isEmail().withMessage("Please provide a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const query = "SELECT * FROM user WHERE email = ?";
    db.query(query, [email], (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Database query error", error: err });
      }
      if (results.length === 0) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const user = results[0];
      console.log("User retrieved from database:", user); // Log user data

      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Error comparing passwords", error: err });
        }
        if (!isMatch) {
          return res.status(401).json({ message: "Invalid email or password" });
        }
        const token = jwt.sign(
          { userId: user.id, userName: user.userName, role: user.role },
          JWT_SECRET,
          { expiresIn: "1h" }
        );
        res.status(200).json({
          message: "Login successful",
          token,
          user: { userName: user.userName, role: user.role },
        });
      });
    });
  },
];

exports.listStudents = async (req, res) => {
  try {
    const students = await User.findAll({
      where: {
        role: "student",
      },
      attributes: ["userId", "userName", "displayName", "email", "created_at"],
    });

    if (students.length === 0) {
      return res.status(404).json({ message: "No students found" });
    }

    res.status(200).json({ students });
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Database error", error });
  }
};
