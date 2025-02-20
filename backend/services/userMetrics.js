const User = require('../models/User');

// Function to calculate retention rate
exports.calculateRetentionRate = async () => {
  try {
    const today = new Date();
    const startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
    
    const totalUsers = await User.countDocuments();
    const weeklyActive = await User.countDocuments({ lastLogin: { $gte: startOfWeek } });

    return totalUsers ? (weeklyActive / totalUsers) * 100 : 0; // Retention Rate as a percentage, using this current formula
  } catch (error) {
    console.error("Error calculating retention rate:", error);
    throw new Error("Could not calculate retention rate");
  }
};

// Enhanced churn prediction logic
exports.getChurnCandidates = async () => {
  try {
    const allUsers = await User.find({});
    return allUsers.filter(user => user.engagementScore < 50);
  } catch (error) {
    console.error("Error fetching churn candidates:", error);
    throw new Error("Could not fetch churn candidates");
  }
};
