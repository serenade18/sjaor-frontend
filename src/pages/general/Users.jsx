import React from 'react'
import UserManagement from './dashboard/userManagement';
import HeaderNav from '../../components/HeaderNav';

function Users() {
    const desktopStyle = {
        width: 'calc(100% - 265px)',
        marginLeft: '265px',
    };

    const mobileStyle = {
        width: '100%',
        marginLeft: '0',
    };

    // Apply media queries
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    
    return (
        <div>
            <HeaderNav/>
            <div className="container-fluid py-4 mt-4" style={mediaQuery.matches ? desktopStyle : mobileStyle}>
                <UserManagement/>
            </div>
            
        </div>
    )
}

export default Users
