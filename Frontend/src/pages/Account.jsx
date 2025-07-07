import React from 'react';
import { useAuth } from '../context/AuthContext';
import './Account.css';

function Account() {
    const { user } = useAuth();

    return (
        <div className="account-container">
            <div className="account-content">
                <h1>My Account</h1>
                <div className="profile-section">
                    <div className="profile-info">
                        <div className="info-group">
                            <label>Username</label>
                            <p>{user?.username || 'Not available'}</p>
                        </div>
                        <div className="info-group">
                            <label>Email</label>
                            <p>{user?.email || 'Not available'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Account;