const { body, validationResult } = require("express-validator");
const { Op } = require("sequelize");

const Contract = require("../models/Contract");
const User = require("../models/User");

exports.createContract = [
  body("userID").notEmpty().withMessage("User ID is required"),
  body("startDate").notEmpty().withMessage("Start date is required"),
  body("finishDate").notEmpty().withMessage("Finish date is required"),
  body("contractName").notEmpty().withMessage("Contract Name is required"),
  body("amount")
    .isDecimal()
    .withMessage("Amount must be a valid decimal value"),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { userID, contractName, startDate, finishDate, amount } = req.body;

    const agentName = req.user?.userName || "Unknown Agent";

    try {
      const existingContract = await Contract.findOne({
        where: { userID, startDate, finishDate },
      });

      if (existingContract) {
        return res.status(400).json({
          message:
            "A contract already exists for this user within the specified dates.",
        });
      }

      const contract = await Contract.create({
        userID,
        contractName,
        startDate,
        finishDate,
        agent: agentName,
        amount,
      });

      res.status(201).json({
        message: "Contract created successfully",
        contractId: contract.contractID,
        agent: agentName,
        contractName,
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
            attributes: ["userName", "displayName", "email"],
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
  body("startDate").optional().notEmpty().withMessage("Start date is required"),
  body("finishDate")
    .optional()
    .notEmpty()
    .withMessage("Finish date is required"),
  body("amount")
    .optional()
    .isDecimal()
    .withMessage("Amount must be a valid decimal value"),
  body("contractName")
    .optional()
    .notEmpty()
    .withMessage("Contract Name is required."),

  async (req, res) => {
    const { id } = req.params;
    const { startDate, finishDate, amount, contractName } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const contract = await Contract.findByPk(id);

      if (!contract) {
        return res.status(404).json({ message: "Contract not found" });
      }

      await contract.update({
        startDate,
        finishDate,
        amount,
        contractName,
      });

      res.status(200).json({
        message: "Contract updated successfully",
        contract,
      });
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
          attributes: ["userName", "displayName", "email"],
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
