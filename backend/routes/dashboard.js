const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { calculateRetentionRate, getChurnCandidates } = require('../services/userMetrics');

router.get('/dashboard-metrics', async (req, res) => {
  try {
    const today = new Date();
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const dailyActive = await User.countDocuments({ lastLogin: { $gte: startOfToday } });
    const weeklyActive = await User.countDocuments({ lastLogin: { $gte: startOfWeek } });
    const monthlyActive = await User.countDocuments({ lastLogin: { $gte: startOfMonth } });

    const allUsers = await User.find({});
    const totalUsers = allUsers.length;
    const totalEngagementScore = allUsers.reduce((acc, user) => acc + user.engagementScore, 0);
    const avgEngagementScore = totalUsers ? totalEngagementScore / totalUsers : 0;

    // retention rate from the service
    const retentionRate = await calculateRetentionRate();

    // churn candidates from the service
    const churnCandidates = await getChurnCandidates();

    res.json({
      dailyActive,
      weeklyActive,
      monthlyActive,
      avgEngagementScore,
      retentionRate: retentionRate.toFixed(2),
      churnCandidates
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
