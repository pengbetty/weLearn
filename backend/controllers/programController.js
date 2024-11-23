
const { body, validationResult } = require('express-validator');
const { Op } = require('sequelize');
const Program = require('../models/Program');
const College = require('../models/College');


exports.createProgram = [
  body('ColID').notEmpty().withMessage('College ID is required'),
  body('PName').notEmpty().withMessage('Program Name is required'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { ColID, PName, PLength, PLevel, Link, AppDeadline, PRanking } = req.body;

    const existingProgram = await Program.findOne({
        where: {
          ColID,
          PName
        }
      });

      if (existingProgram) {
        return res.status(400).json({ message: 'This program name already exists for the selected college.' });
      }

    

    try {
      const program = await Program.create({
        ColID,
        PName,
        PLength: PLength || null,
        PLevel: PLevel || null,
        Link: Link || null,
        AppDeadline: AppDeadline || null,
        PRanking: PRanking || null
      });

      res.status(201).json({ message: 'Program created successfully', programId: program.PID });
    } catch (error) {
      res.status(500).json({ message: 'Database error', error });
    }
  }
];




exports.getPrograms = [
  async (req, res) => {
    const { PLevel, country, programName } = req.query;

    if (!PLevel || !country) {
      return res.status(400).json({ message: 'PLevel and country are required filters' });
    }

    try {
      const programs = await Program.findAll({
        where: {
          PLevel,
          ...(programName && { PName: { [Op.like]: `%${programName}%` } })
        },
        attributes: { exclude: ['ColID', 'PID'] },
        include: [{
          model: College,
          where: { Country: country },
          attributes: ['Name']
        }]
      });

      res.status(200).json({ programs });
    } catch (error) {
      res.status(500).json({ message: 'Database error', error });
    }
  }
];



