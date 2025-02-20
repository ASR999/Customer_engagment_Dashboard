const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/ai-insights', async (req, res) => {
  try {
    const users = await User.find({});
    const suggestions = [];

    // > 30% of users have engagementScore below 50, suggesting discount offers.
    const lowEngagementCount = users.filter(u => u.engagementScore < 50).length;
    if (users.length && lowEngagementCount / users.length > 0.3) {
      suggestions.push({ message: "Offer special discounts to boost engagement among low-scoring users." });
    }
    // UI/UX improvements if average engagement is low.
    const avgEngagement = users.length ? (users.reduce((sum, u) => sum + u.engagementScore, 0) / users.length) : 0;
    if (avgEngagement < 60) {
      suggestions.push({ message: "Consider UI/UX enhancements to encourage more frequent usage." });
    }
    // loyalty programs for high retention users.
    suggestions.push({ message: "Introduce loyalty programs and rewards for high retention users." });

   
    const featureUsage = {
      mostUsed: "Dashboard Overview",
      underperforming: "Settings Page"
    };

    res.json({ suggestions, featureUsage });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
