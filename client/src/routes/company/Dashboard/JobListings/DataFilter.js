import React, { useState } from 'react';
import './DataFilter.css';

const DataFilter = () => {
  // State to track the active filter
  const [activeFilter, setActiveFilter] = useState('Today');

  // Function to handle filter button clicks
  const handleFilterClick = (filter) => {
    // Set the active filter when a button is clicked
    setActiveFilter(filter);
  };

  return (
    <div className="date-filter-container">
      <div className="date-filter">
        {/* Button for the Monthly filter */}
        <button
          className={`filter-button ${activeFilter === 'Monthly' ? 'active' : ''}`}
          onClick={() => handleFilterClick('Monthly')}
        >
          Monthly
        </button>
        {/* Button for the Weekly filter */}
        <button
          className={`filter-button ${activeFilter === 'Weekly' ? 'active' : ''}`}
          onClick={() => handleFilterClick('Weekly')}
        >
          Weekly
        </button>
        {/* Button for the Today filter */}
        <button
          className={`filter-button ${activeFilter === 'Today' ? 'active' : ''}`}
          onClick={() => handleFilterClick('Today')}
        >
          Today
        </button>
      </div>
    </div>
  );
};

export default DataFilter;
