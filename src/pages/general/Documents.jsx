import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HeaderNav from '../../components/HeaderNav'
import { connect } from 'react-redux';
import swal from 'sweetalert2';

const Doucuments = ({}) => {

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
            <div className="container-fluid py-4 mt-1" style={mediaQuery.matches ? desktopStyle : mobileStyle}>
                <div className="container-fluid py-5">
                    <div className="d-sm-flex justify-content-between">
                        <div className="dropdown d-inline align-center">
                            <Link to="/addcustomer" className="btn btn-outline-dark">
                                <i className="fi fi-tr-memo-circle-check"></i> New Document
                            </Link>
                        </div>
                        <div className="d-flex">
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Doucuments
