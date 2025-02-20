import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AIInsightsPanel.css';

function AIInsightsPanel() {
  const [insights, setInsights] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/ai-insights')
      .then(res => setInsights(res.data))
      .catch(err => {
        console.error(err);
        setError("Failed to load AI insights");
      });
  }, []);

  if (error) return <div>{error}</div>;
  if (!insights) return <div>Loading AI Insights...</div>;

  return (
    <div className="ai-insights-panel">
      <h2>AI Insights</h2>
      <div className="suggestions">
        <h3>Suggestions to Reduce Churn</h3>
        <ul>
          {insights.suggestions.map((sug, index) => (
            <li key={index}>{sug.message}</li>
          ))}
        </ul>
      </div>
      <div className="feature-usage">
        <h3>Feature Usage</h3>
        <p><strong>Most Used:</strong> {insights.featureUsage.mostUsed}</p>
        <p><strong>Underperforming:</strong> {insights.featureUsage.underperforming}</p>
      </div>
    </div>
  );
}

export default AIInsightsPanel;
