import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { fetchDashboard } from '../../../actions/auth';

const dashboardSection = ({ isAuthenticated, user, fetchDashboard }) => {
    const navigate = useNavigate();

    const [totalUsers, setTotalUsers] = useState(0);
    const [newsPosted, setNewsPosted] = useState(0);
    const [verifiedAdusums, setVerifiedAdusums] = useState(0);
    const [totalProducts, setTotalProducts] = useState(0);

    useEffect(() => {

        fetchDashboard().then((response) => {
            setTotalUsers(response.all_users);
            setNewsPosted(response.all_news);
            setVerifiedAdusums(response.adusums);
            setTotalProducts(response.products)
        });
    }, [isAuthenticated, user, Navigate])

    return (
        <div>
            <div className="col-lg-12">
                <div className="row">
                    <div className="col-lg-3 col-md-6 col-12">
                        <div className="card bg-gray-901 mb-4">
                            <div className="card-body p-3">
                                <div className="row cursor-pointer" onClick={() => navigate('/admin/adusums')}>
                                    
                                    <div className="col-4 text-end align-items-center">
                                        <div className="icon icon-shape bg-gradient-success shadow-primary text-center">
                                            <i className="fa-solid fa-church opacity-10" aria-hidden="true"></i>
                                        </div>
                                    </div>

                                    <div className="col-8">
                                        <div className="numbers">
                                            <p className="text-sm text-dark mb-0 text-uppercase font-weight-bold"> Adusums</p>
                                            <h5 className="font-weight-bolder text-dark">
                                                {verifiedAdusums}
                                            </h5>
                                            <p className="mb-0">
                                                <span className="text-success text-sm font-weight-bolder"></span>
                                            </p>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6 col-12">
                        <div className="card bg-gray-901 mb-4">
                            <div className="card-body p-3">
                                <div className="row cursor-pointer" onClick={() => navigate('/admin/news')}>
                                    
                                    <div className="col-4 text-end">
                                        <div className="icon icon-shape bg-gradient-success shadow-danger text-center">
                                            <i className="fi fi-rs-newspaper text-lg opacity-10" aria-hidden="true"></i>
                                        </div>
                                    </div>

                                    <div className="col-8">
                                        <div className="numbers">
                                            <p className="text-sm text-dark mb-0 text-uppercase font-weight-bold">Posted News</p>
                                            <h5 className="font-weight-bolder text-dark">
                                                {newsPosted}
                                            </h5>
                                            <p className="mb-0">
                                                <span className="text-success text-sm font-weight-bolder"></span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6 col-12">
                        <div className="card bg-gray-901 mb-4">
                            <div className="card-body p-3">
                                <div className="row cursor-pointer" onClick={() => navigate('/admin/users')}>
                                    <div className="col-4 text-end">
                                        <div className="icon icon-shape bg-gradient-success shadow-success text-center">
                                            <i className="fa-solid fa-users text-lg opacity-10" aria-hidden="true"></i>
                                        </div>
                                    </div>

                                    <div className="col-8">
                                        <div className="numbers">
                                            <p className="text-sm text-dark mb-0 text-uppercase font-weight-bold">Active Users</p>
                                            <h5 className="font-weight-bolder text-dark">
                                                {totalUsers}
                                            </h5>
                                            <p className="mb-0">
                                                <span className="text-danger text-sm font-weight-bolder"></span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6 col-12">
                        <div className="card bg-gray-901 mb-4">
                            <div className="card-body p-3">
                                <div className="row cursor-pointer" onClick={() => navigate('/admin/products')}>
                                    <div className="col-4 text-end">
                                        <div className="icon icon-shape bg-gradient-success shadow-success text-center">
                                            <i className="ni ni-cart text-lg opacity-10" aria-hidden="true"></i>
                                        </div>
                                    </div>
                                    <div className="col-8">
                                        <div className="numbers">
                                            <p className="text-sm text-dark mb-0 text-uppercase font-weight-bold">Event Categories</p>
                                            <h5 className="font-weight-bolder text-dark">
                                                {totalProducts}
                                            </h5>
                                            <p className="mb-0">
                                                <span className="text-success text-sm font-weight-bolder"></span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => {
    return {
        fetchDashboard: () => dispatch(fetchDashboard()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(dashboardSection)
