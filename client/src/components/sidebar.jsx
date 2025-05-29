import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar({ role }) {
  return (
    <aside style={{ width: '200px', background: '#f4f4f4', padding: '20px' }}>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li><Link to="../pages/Dashboard.jsx">Dashboard</Link></li>

        {role === 'Teacher' && (
          <>
            <li><Link to="/">Post lecture</Link></li>
            <li><Link to="/">Assignments</Link></li>
            <li><Link to ="/" >Messages</Link></li>
          </>
        )}

        {role === 'Student' && (
          <>
            <li><Link to="/settings">My Courses</Link></li>
            <li><Link to="/settings">Assignments</Link></li>
            <li><Link to ="/">Sumit Assignments</Link></li>
            <li><Link to ="/">Message</Link></li>
          </>
        )}

        {role === 'Admin' && (
          <>
            <li><Link to="/settings">User Management</Link></li>
            <li><Link to="/settings">System Settings</Link></li>
          </>
        )}

        
      </ul>
    </aside>
  );
}

export default Sidebar;