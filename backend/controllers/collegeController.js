const { Op } = require('sequelize');
const College = require('../models/College');

exports.getColleges = [
  async (req, res) => {
    const { search } = req.query;

    if (!search) {
      return res.status(400).json({ message: 'Search parameter is required' });
    }

    try {
      const colleges = await College.findAll({
        where: {
          Name: {
            [Op.like]: `%${search}%`,
            
          }
        },
        attributes: ['Name', 'City', 'State', 'Country', 'USRanking', 'QSRanking', 'Environment', 'Link', 'UGNumber', 'PGNumber']
      });

      if (colleges.length === 0) {
        return res.status(404).json({ message: 'No colleges found matching the search criteria' });
      }

      res.status(200).json({ colleges });
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ message: 'Database error', error });
    }
  }
];