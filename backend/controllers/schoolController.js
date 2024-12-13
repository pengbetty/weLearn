const { Op } = require('sequelize');
const School = require('../models/School');


exports.listSchools = async (req, res) => {
  try {
    const schools = await School.findAll();
    res.status(200).json({ schools });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching schools', error });
  }
};