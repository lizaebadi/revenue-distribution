import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles.js/AdminPage.css';

const AdminPage = () => {
  return (
    <div data-cy="admin-container" className="admin-container">
      <h1 id='admin-title' >Admin</h1>
        <ul className="admin-container">
            <li><Link to="/addMovie">New Movie</Link></li>
            <li><Link to="/addShareholder">New Shareholder</Link></li>
            <li><Link to="/addTransfer">New Transfer</Link></li>
      </ul>
    </div>
  );
};

export default AdminPage;
