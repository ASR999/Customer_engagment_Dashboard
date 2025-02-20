const mongoose = require('mongoose');
        const EngagementSchema = new mongoose.Schema({
            userId: mongoose.Schema.Types.ObjectId,
            actions: Number,
            lastActive: Date
        });
        
        module.exports = mongoose.model('Engagement', EngagementSchema);