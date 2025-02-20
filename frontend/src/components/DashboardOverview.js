import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';
import {
  Container, Card, CardContent, Typography, CircularProgress, List, ListItem, ListItemText,
  Box, useTheme, Paper, FormControl, Select, InputLabel, MenuItem, Pagination
} from '@mui/material';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function DashboardOverview() {
  const [metrics, setMetrics] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  
  const [filters, setFilters] = useState({
    dateRange: '30'
  });
  
  
  const [chartMode, setChartMode] = useState('activeUsers');
  
  
  const [churnPage, setChurnPage] = useState(1);
  const itemsPerPage = 5;
  
  const theme = useTheme();

  useEffect(() => {
    
    setChurnPage(1);
    fetchMetrics();
    
  }, [filters]);

  const fetchMetrics = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/dashboard-metrics', { params: filters });
      setMetrics(response.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to load metrics');
    }
    setLoading(false);
  };

  const handleFilterChange = (e) => {
    setFilters(prevFilters => ({ ...prevFilters, [e.target.name]: e.target.value }));
  };

  const handleChartModeChange = (e) => {
    setChartMode(e.target.value);
  };

 
  const handlePageChange = (event, value) => {
    setChurnPage(value);
  };

  if (error) {
    return (
      <Container sx={{ textAlign: "center", mt: 5 }}>
        <Typography color="error" variant="h6">{error}</Typography>
      </Container>
    );
  }

  if (loading || !metrics) {
    return (
      <Container sx={{ textAlign: "center", mt: 5 }}>
        <CircularProgress color="primary" />
        <Typography variant="body1">Loading metrics...</Typography>
      </Container>
    );
  }

  
  let chartData;
  switch (chartMode) {
    case 'activeUsers':
      chartData = {
        labels: ['Daily', 'Weekly', 'Monthly'],
        datasets: [{
          label: 'Active Users',
          data: [metrics.dailyActive, metrics.weeklyActive, metrics.monthlyActive],
          backgroundColor: [
            'rgba(75, 192, 192, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)'
          ],
          borderRadius: 10,
        }]
      };
      break;
    case 'avgEngagement':
      chartData = {
        labels: ['Avg Engagement'],
        datasets: [{
          label: 'Average Engagement Score',
          data: [parseFloat(metrics.avgEngagementScore.toFixed(2))],
          backgroundColor: 'rgba(153, 102, 255, 0.7)',
          borderRadius: 5
        }]
      };
      break;
    case 'retentionRate':
      chartData = {
        labels: ['Retention Rate'],
        datasets: [{
          label: 'Retention Rate (%)',
          data: [parseFloat(metrics.retentionRate)],
          backgroundColor: 'rgba(255, 159, 64, 0.7)',
          borderRadius: 5
        }]
      };
      break;
    case 'churnCandidates':
      chartData = {
        labels: ['Churn Candidates'],
        datasets: [{
          label: 'Number of Churn Candidates',
          data: [metrics.churnCandidates.length],
          backgroundColor: 'rgba(255, 99, 132, 0.7)',
          borderRadius: 5
        }]
      };
      break;
    default:
      chartData = {};
  }

 
  const totalChurn = metrics.churnCandidates.length;
  const totalPages = Math.ceil(totalChurn / itemsPerPage);
  const startIndex = (churnPage - 1) * itemsPerPage;
  const currentChurnCandidates = metrics.churnCandidates.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Graphic Visualization
      </Typography>

      {/* Combined Filters Section */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3,mt:4 }}>
        <FormControl variant="outlined" sx={{ width: '30%' }}>
          <InputLabel>Date Range</InputLabel>
          <Select
            value={filters.dateRange}
            onChange={handleFilterChange}
            label="Date Range"
            name="dateRange"
          >
            <MenuItem value="7">Last 7 Days</MenuItem>
            <MenuItem value="30">Last 30 Days</MenuItem>
            <MenuItem value="90">Last 90 Days</MenuItem>
            <MenuItem value="365">Last Year</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" sx={{ width: '50%' }}>
          <InputLabel>Chart Mode</InputLabel>
          <Select
            value={chartMode}
            onChange={handleChartModeChange}
            label="Chart Mode"
            name="chartMode"
          >
            <MenuItem value="activeUsers">Active Users</MenuItem>
            <MenuItem value="avgEngagement">Average Engagement</MenuItem>
            <MenuItem value="retentionRate">Retention Rate</MenuItem>
            <MenuItem value="churnCandidates">Churn Candidates</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Chart */}
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mb: 3 }}>
        <Bar data={chartData} />
      </Paper>

      <Card sx={{ mb: 3, bgcolor: theme.palette.mode === "dark" ? "grey.900" : "grey.100" }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Engagement Overview</Typography>
          <Typography variant="body1">
            <strong>Average Engagement Score:</strong> {metrics.avgEngagementScore.toFixed(2)}
          </Typography>
          <Typography variant="body1">
            <strong>Retention Rate:</strong> {metrics.retentionRate}%
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ bgcolor: "#FFF3CD" }}>
        <CardContent>
          <Typography variant="h6" gutterBottom color="textSecondary">Churn Prediction</Typography>
          {totalChurn > 0 ? (
            <>
              <List>
                {currentChurnCandidates.map(user => (
                  <ListItem key={user._id} divider>
                    <ListItemText
                      primary={<strong>{user.name}</strong>}
                      secondary={`${user.email} – Engagement Score: ${user.engagementScore}`}
                    />
                  </ListItem>
                ))}
              </List>
              {totalPages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                  <Pagination count={totalPages} page={churnPage} onChange={handlePageChange} color="primary" />
                </Box>
              )}
            </>
          ) : (
            <Typography variant="body2">No churn candidates identified.</Typography>
          )}
        </CardContent>
      </Card>

      <Card sx={{ mt: 3, bgcolor: "#D1E7DD" }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>AI Insights</Typography>
          <Typography variant="body2">Suggestions to reduce churn:</Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            - Offer discounts to users with low engagement scores.
          </Typography>
          <Typography variant="body2">Highlight most-used features:</Typography>
          <Typography variant="body2">
            - Feature A, Feature B, Feature C.
          </Typography>
          <Typography variant="body2">Underperforming features:</Typography>
          <Typography variant="body2">
            - Feature X, Feature Y.
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}

export default DashboardOverview;



