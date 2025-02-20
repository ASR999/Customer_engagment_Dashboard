const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/users', async (req, res) => {
  try {
    const { startDate, endDate, minEngagement, maxEngagement, retentionCategory, search } = req.query;
    const query = {};

    if (startDate) {
      query.lastLogin = { ...query.lastLogin, $gte: new Date(startDate) };
    }
    if (endDate) {
      query.lastLogin = { ...query.lastLogin, $lte: new Date(endDate) };
    }
    if (minEngagement) {
      query.engagementScore = { ...query.engagementScore, $gte: Number(minEngagement) };
    }
    if (maxEngagement) {
      query.engagementScore = { ...query.engagementScore, $lte: Number(maxEngagement) };
    }
    if (retentionCategory) {
      query.retentionCategory = retentionCategory;
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const users = await User.find(query);
    res.json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
