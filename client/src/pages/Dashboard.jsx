import React from 'react';

const Dashboard = ({ role, name }) => {
  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>
        Welcome, {role} {name}
      </h1>
      <p>This is your {role.toLowerCase()} dashboard.</p>

      {role === 'Teacher' && (
        <div>
          <h3></h3>
          <ul>
            <li>9:00 AM - Java Programming</li>
            <li>11:00 AM - Data Structures</li>
          </ul>
        </div>
      )}

      {role === 'Student' && (
        <div>
          <h3>Upcoming Assignments</h3>
          <ul>
            <li>AI class</li>
            <li>Maths Assignemts</li>
          </ul>
        </div>
      )}

      {role === 'Admin' && (
        <div>
          <h3>System Overview</h3>
          <p>Manage users, monitor logs, and view system reports.</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;