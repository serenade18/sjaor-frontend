import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { fetchDashboard } from '../../../../actions/auth';

const dashboardSection = ({ isAuthenticated, user, fetchDashboard }) => {
    const navigate = useNavigate();

    const [totalUsers, setTotalUsers] = useState(0);
    const [ticketsSold, setTicketsSold] = useState(0);
    const [activePlays, setActivePlays] = useState(0);
    const [totalStreams, setTotalStreams] = useState(0);

    useEffect(() => {

        fetchDashboard().then((response) => {
            setTotalUsers(response.users);
            setTicketsSold(response.tickets_sold);
            setActivePlays(response.active_plays);
            setTotalStreams(response.active_streams);
        });
    }, [isAuthenticated, user, Navigate])

    return (
        <div>
            <div className="col-lg-12">
                <div className="row">
                    <div className="col-lg-3 col-md-6 col-12">
                        <div className="card bg-gray-901 mb-4">
                            <div className="card-body p-3">
                                <div className="row">
                                    
                                    <div className="col-4 text-end align-items-center">
                                        <div className="icon icon-shape bg-gradient-red shadow-primary text-center">
                                            <i className="fi fi-sr-chart-tree-map opacity-10" aria-hidden="true"></i>
                                        </div>
                                    </div>

                                    <div className="col-8">
                                        <div className="numbers">
                                            <p className="text-sm text-dark mb-0 text-capitalize font-weight-bold">Active Plays</p>
                                            <h5 className="font-weight-bolder text-dark">
                                                {activePlays}
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
                                <div className="row">
                                    
                                    <div className="col-4 text-end">
                                        <div className="icon icon-shape bg-gradient-red shadow-danger text-center">
                                            <i className="fi fi-rr-film text-lg opacity-10" aria-hidden="true"></i>
                                        </div>
                                    </div>

                                    <div className="col-8">
                                        <div className="numbers">
                                            <p className="text-sm text-dark mb-0 text-capitalize font-weight-bold">Active Streams</p>
                                            <h5 className="font-weight-bolder text-dark">
                                                {totalStreams}
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
                                <div className="row">
                                    <div className="col-4 text-end">
                                        <div className="icon icon-shape bg-gradient-red shadow-success text-center">
                                            <i className="fa-solid fa-users text-lg opacity-10" aria-hidden="true"></i>
                                        </div>
                                    </div>

                                    <div className="col-8">
                                        <div className="numbers">
                                            <p className="text-sm text-dark mb-0 text-capitalize font-weight-bold">Active Users</p>
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
                                <div className="row">
                                    <div className="col-4 text-end">
                                        <div className="icon icon-shape bg-gradient-red shadow-success text-center">
                                            <i className="fa-solid fa-ticket text-lg opacity-10" aria-hidden="true"></i>
                                        </div>
                                    </div>
                                    <div className="col-8">
                                        <div className="numbers">
                                            <p className="text-sm text-dark mb-0 text-capitalize font-weight-bold">Sold Tickets</p>
                                            <h5 className="font-weight-bolder text-dark">
                                                {ticketsSold}
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
