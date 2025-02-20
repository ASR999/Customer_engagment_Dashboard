exports.predictChurn = (users) => {
    return users.map(user => {
        const churnRisk = user.engagementScore < 50 ? 'High' : user.engagementScore < 70 ? 'Medium' : 'Low';
        return {
            email: user.email,
            churnRisk: churnRisk
        };
    });
};

