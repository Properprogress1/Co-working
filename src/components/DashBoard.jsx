import React from 'react';

const DashBoard = ({ revenue }) => {
  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div>
        <p>Basic: ${revenue.basic.toFixed(2)}</p>
        <p>Premium: ${revenue.premium.toFixed(2)}</p>
        <p>Executive: ${revenue.executive.toFixed(2)}</p>
        <p>Team: ${revenue.team.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default DashBoard;
