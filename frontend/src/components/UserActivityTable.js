import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Pagination } from '@mui/material';
import './UserActivityTable.css';

function UserActivityTable() {
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    minEngagement: '',
    maxEngagement: '',
    retentionCategory: '',
    search: ''
  });
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchUsers = () => {
    axios.get('https://customer-engagment-dashboard-backend.onrender.com/api/users', { params: filters })
      .then(res => {
        setUsers(res.data.users);
        setError(null);
      })
      .catch(err => {
        console.error(err);
        setError("Failed to load users");
      });
  };

  useEffect(() => {
    setCurrentPage(1); 
    fetchUsers();
    
  }, [filters]);

  const handleInputChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  // Pagination calculations
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = users.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div className="user-activity-table">
      <h2>User Activity</h2>
      <div className="filters">
        <h3>Filters</h3>
        <div className="filter-group">
          <input 
            type="date" 
            name="startDate" 
            value={filters.startDate} 
            onChange={handleInputChange} 
            placeholder="Start Date" 
          />
          <input 
            type="date" 
            name="endDate" 
            value={filters.endDate} 
            onChange={handleInputChange} 
            placeholder="End Date" 
          />
          <input 
            type="number" 
            name="minEngagement" 
            value={filters.minEngagement} 
            onChange={handleInputChange} 
            placeholder="Min Engagement" 
          />
          <input 
            type="number" 
            name="maxEngagement" 
            value={filters.maxEngagement} 
            onChange={handleInputChange} 
            placeholder="Max Engagement" 
          />
          <select 
            name="retentionCategory" 
            value={filters.retentionCategory} 
            onChange={handleInputChange}
          >
            <option value="">Retention rate</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <input 
            type="text" 
            name="search" 
            value={filters.search} 
            onChange={handleInputChange} 
            placeholder="Search by name or email" 
          />
        </div>
      </div>
      {error && <div className="error">{error}</div>}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Last Login</th>
            <th>Engagement Score</th>
            <th>Retention Category</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.length > 0 ? (
            currentUsers.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{new Date(user.lastLogin).toLocaleString()}</td>
                <td>{user.engagementScore}</td>
                <td>{user.retentionCategory}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} color="primary" />
        </Box>
      )}
    </div>
  );
}

export default UserActivityTable;

