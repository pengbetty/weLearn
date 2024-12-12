// const { Op } = require('sequelize');
// const College = require('../models/College');

const { body, validationResult } = require("express-validator");
const { Op } = require("sequelize");
const College = require("../models/College");

exports.getColleges = [
  async (req, res) => {
    const { search } = req.query;

    if (!search) {
      return res.status(400).json({ message: "Search parameter is required" });
    }

    try {
      const colleges = await College.findAll({
        where: {
          collegeName: {
            [Op.like]: `%${search}%`,
          },
        },
        attributes: [
          "collegeName",
          "city",
          "state",
          "country",
          "usRanking",
          "qsRanking",
          "environment",
          "collegeLink",
          "ugNumber",
          "pgNumber",
        ],
      });

      if (colleges.length === 0) {
        return res
          .status(404)
          .json({ message: "No colleges found matching the search criteria" });
      }

      res.status(200).json({ colleges });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ message: "Database error", error });
    }
  },
];

exports.createCollege = [
  body("collegeName").notEmpty().withMessage("College name is required"),
  body("environment")
    .isIn(["Rural", "Urban", "Suburb"])
    .withMessage("Environment can only be Rural, Urban, or Suburb."),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const college = await College.create(req.body);
      res
        .status(201)
        .json({ message: "College created successfully", college });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Database error", error });
    }
  },
];

exports.listColleges = async (req, res) => {
  try {
    const colleges = await College.findAll();
    if (colleges.length === 0) {
      return res.status(404).json({ message: "No colleges found" });
    }
    res.status(200).json({ colleges });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Database error", error });
  }
};

exports.getCollegeById = async (req, res) => {
  const { id } = req.params;

  try {
    const college = await College.findByPk(id);

    if (!college) {
      return res.status(404).json({ message: "College not found" });
    }

    res.status(200).json({ college });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Database error", error });
  }
};

exports.updateCollege = [
  body("collegeName").optional().notEmpty().withMessage("Name cannot be empty"),
  body("environment")
    .optional()
    .isIn(["Rural", "Urban", "Suburb"])
    .withMessage("Invalid environment type"),
  async (req, res) => {
    const { id } = req.params;

    try {
      const college = await College.findByPk(id);

      if (!college) {
        return res.status(404).json({ message: "College not found" });
      }

      await college.update(req.body);
      res
        .status(200)
        .json({ message: "College updated successfully", college });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Database error", error });
    }
  },
];

exports.deleteCollege = async (req, res) => {
  const { id } = req.params;

  try {
    const college = await College.findByPk(id);

    if (!college) {
      return res.status(404).json({ message: "College not found" });
    }

    await college.destroy();
    res.status(200).json({ message: "College deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Database error", error });
  }
};
