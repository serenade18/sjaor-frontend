import React from 'react'
import HeaderNav from '../../components/HeaderNav'

function Home() {
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
            
        </div>
    )
}

export default Home
