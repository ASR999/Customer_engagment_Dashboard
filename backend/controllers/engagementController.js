exports.getEngagementMetrics = (req, res) => {
    res.json({
        activeUsers: { daily: 120, weekly: 850, monthly: 3200 },
        engagementScore: 75,
        retentionRate: 65,
        churnPrediction: ["user1@example.com", "user2@example.com"]
    });
};