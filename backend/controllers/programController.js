const { body, validationResult } = require("express-validator");
const { Op } = require("sequelize");
const Program = require("../models/Program");
const College = require("../models/College");

exports.createProgram = [
  body("collegeID").notEmpty().withMessage("College ID is required"),
  body("programName").notEmpty().withMessage("Program Name is required"),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      collegeID,
      programName,
      programLength,
      programLevel,
      programLink,
      appDeadline,
      programRanking,
    } = req.body;

    const existingProgram = await Program.findOne({
      where: {
        collegeID,
        programName,
      },
    });

    if (existingProgram) {
      return res.status(400).json({
        message: "This program name already exists for the selected college.",
      });
    }

    try {
      const program = await Program.create({
        collegeID,
        programName,
        programLength: programLength || null,
        programLevel: programLevel || null,
        programLink: programLink || null,
        appDeadline: appDeadline || null,
        programRanking: programRanking || null,
      });

      res.status(201).json({
        message: "Program created successfully",
        programId: program.programID,
      });
    } catch (error) {
      res.status(500).json({ message: "Database error", error });
    }
  },
];

exports.getPrograms = [
  async (req, res) => {
    const { programLevel, country, programName } = req.query;

    if (!programLevel || !country) {
      return res
        .status(400)
        .json({ message: "Program Level and country are required filters" });
    }

    try {
      const programs = await Program.findAll({
        where: {
          programLevel,
          ...(programName && {
            programName: { [Op.like]: `%${programName}%` },
          }),
        },
        attributes: { exclude: ["collegeID", "programID"] },
        include: [
          {
            model: College,
            where: { Country: country },
            attributes: ["collegeName"],
          },
        ],
      });

      res.status(200).json({ programs });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
];
