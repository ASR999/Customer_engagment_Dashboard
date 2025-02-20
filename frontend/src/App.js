import React from 'react';
import DashboardOverview from './components/DashboardOverview';
import UserActivityTable from './components/UserActivityTable';
import AIInsightsPanel from './components/AIInsightsPanel';
import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

function App() {
 
  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      <header>
        <h1 style={{color:'#371a45',marginBottom:'39px'}} >CUSTOMER ENGAGEMENT DASHBOARD</h1>
      </header>
      <main>
        <section className="dashboard-section">
          <DashboardOverview />
        </section>
        <section className="user-activity-section">
          <UserActivityTable />
        </section>
        <section className="ai-insights-section">
          <AIInsightsPanel />
        </section>
      </main>
      <footer>
        <p>&copy; {new Date().getFullYear()} Customer Engagement Dashboard | Ayush Rawat</p>
      </footer>
    </div>
    </ThemeProvider>
  );
  
}

export default App;
