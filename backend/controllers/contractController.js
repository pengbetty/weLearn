const { body, validationResult } = require("express-validator");
const { Op } = require("sequelize");

const Contract = require("../models/Contract");
const User = require("../models/User");

exports.createContract = [
  body("UserID").notEmpty().withMessage("User ID is required"),
  body("StartDate").notEmpty().withMessage("Start date is required"),
  body("FinishDate").notEmpty().withMessage("Finish date is required"),
  body("Agent").notEmpty().withMessage("Agent Name is required"),
  body("ContractName").notEmpty().withMessage("Contract Name is required"),
  body("Amount")
    .isDecimal()
    .withMessage("Amount must be a valid decimal value"),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { UserID, StartDate, FinishDate, Agent, Amount } = req.body;

    try {
      const existingContract = await Contract.findOne({
        where: { UserID, StartDate, FinishDate },
      });

      if (existingContract) {
        return res.status(400).json({
          message:
            "A contract already exists for this user within the specified dates.",
        });
      }

      const contract = await Contract.create({
        UserID,
        StartDate,
        FinishDate,
        Agent,
        Amount,
      });

      res.status(201).json({
        message: "Contract created successfully",
        contractId: contract.ContractID,
      });
    } catch (error) {
      res.status(500).json({ message: "Database error", error });
    }
  },
];

exports.listContracts = [
  async (req, res) => {
    try {
      const contracts = await Contract.findAll({
        include: [
          {
            model: User,
            attributes: ["username", "displayname", "email"],
          },
        ],
      });

      if (contracts.length === 0) {
        return res
          .status(404)
          .json({ message: "No contracts found for the given criteria" });
      }

      res.status(200).json({ contracts });
    } catch (error) {
      res.status(500).json({ message: "Database error", error });
    }
  },
];

exports.updateContract = [
  body("StartDate").optional().notEmpty().withMessage("Start date is required"),
  body("FinishDate")
    .optional()
    .notEmpty()
    .withMessage("Finish date is required"),
  body("Amount")
    .optional()
    .isDecimal()
    .withMessage("Amount must be a valid decimal value"),
  body("ContractName")
    .optional()
    .notEmpty()
    .withMessage("Contract Name is required."),
  body("Agent").optional().notEmpty().withMessage("Agent Name is required."),

  async (req, res) => {
    const { id } = req.params;
    const { StartDate, FinishDate, Amount } = req.body;

    try {
      const contract = await Contract.findByPk(id);

      if (!contract) {
        return res.status(404).json({ message: "Contract not found" });
      }

      await contract.update({ StartDate, FinishDate, Amount });
      res
        .status(200)
        .json({ message: "Contract updated successfully", contract });
    } catch (error) {
      res.status(500).json({ message: "Database error", error });
    }
  },
];

exports.getContractById = async (req, res) => {
  const { id } = req.params;

  try {
    const contract = await Contract.findByPk(id, {
      include: [
        {
          model: User,
          attributes: ["username", "displayname", "email"],
        },
      ],
    });

    if (!contract) {
      return res.status(404).json({ message: "Contract not found" });
    }

    res.status(200).json({ contract });
  } catch (error) {
    res.status(500).json({ message: "Database error", error });
  }
};

exports.deleteContract = [
  async (req, res) => {
    const { id } = req.params;

    try {
      const contract = await Contract.findByPk(id);

      if (!contract) {
        return res.status(404).json({ message: "Contract not found" });
      }

      await contract.destroy();
      res.status(200).json({ message: "Contract deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Database error", error });
    }
  },
];
