// Components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const dishTypeOptions = [
  'main course', 'side dish', 'dessert', 'appetizer', 'salad',
  'bread', 'breakfast', 'soup', 'beverage', 'sauce',
  'marinade', 'fingerfood', 'snack', 'drink'
];

const Sidebar = ({ searchTerm, setSearchTerm, filterDishType, setFilterDishType, disabled = false }) => {
  return (
    <div className="sidebar">
      <Link to="/" className="dashboard-button">🏠 Dashboard</Link>

      <input
        className="sidebar-input"
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => !disabled && setSearchTerm?.(e.target.value)}
        disabled={disabled}
      />

      <select
        className="sidebar-select"
        value={filterDishType}
        onChange={(e) => !disabled && setFilterDishType?.(e.target.value)}
        disabled={disabled}
      >
        <option value="">All Dish Types</option>
        {dishTypeOptions.map((type) => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>
    </div>
  );
};

export default Sidebar;
