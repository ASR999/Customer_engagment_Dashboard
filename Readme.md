# Dashboard Overview

## Project Description
This project is a **Dashboard Overview** that visually represents key metrics related to user engagement. The frontend is built with **React** and uses **Chart.js** for graphical data visualization. The backend (not detailed here) provides APIs to fetch engagement metrics.

## Features
- **Graphical Visualization:** Displays Active Users, Engagement Score, Retention Rate, and Churn Candidates using bar charts.
- **Filtering Options:** Users can filter data by date range.
- **Pagination Support:** Churn candidate list supports pagination.
- **Material UI Components:** Uses MUI for a sleek and responsive UI.
- **API Integration:** Fetches data from an Express.js backend.

## Tech Stack
### Frontend:
- **React.js**
- **Chart.js** (for data visualization)
- **Material UI** (for UI components)
- **Axios** (for API calls)

### Backend:
- **Express.js** (Node.js framework for API)
- **MongoDB** (for storing engagement data)
- **REST API** (exposes metrics for the dashboard)

## Installation & Setup
### Prerequisites:
- **Node.js & npm** (or **yarn**) installed

### Clone the Repository
```sh
git clone https://github.com/yourusername/dashboard-project.git
cd dashboard-project
```

### Setup Frontend
```sh
cd frontend
npm install  # or yarn install
npm start  # Runs the frontend 
```

### Setup Backend (Assuming Express.js API)
```sh
cd backend
npm install  # or yarn install
npm start  # Runs the backend 
```

## API Endpoint
The frontend fetches data from the backend API:
```
GET /api/dashboard-metrics
```
**Response:**
```json
{
  "dailyActive": 100,
  "weeklyActive": 500,
  "monthlyActive": 1500,
  "avgEngagementScore": 7.5,
  "retentionRate": 85,
  "churnCandidates": [{ "name": "John Doe", "email": "john@example.com", "engagementScore": 3.2 }]
}
```

## Folder Structure
```
/
|-- backend/      # Express.js backend API
|-- frontend/     # React.js frontend dashboard
|-- .gitignore    # Ignores node_modules in both frontend & backend
|-- README.md     # Project documentation
```

## Usage
1. Use filters to modify the displayed data.
2. View key engagement insights and churn predictions.

---
Made using React & Express.js

