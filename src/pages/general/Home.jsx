import React, { useState } from 'react'
import HeaderNav from '../../components/HeaderNav'
import DashboardSection from './dashboard/dashboardSection'

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

    const [searchQuery, setSearchQuery] = useState('');

    const filteredCustomers = []

    return (
        <div>
            <HeaderNav/>
            <div className="container-fluid py-4 mt-4" style={mediaQuery.matches ? desktopStyle : mobileStyle}>
                <DashboardSection/>
                <h5 className="text-start font-weight-bolder text-dark">Verify Adusum</h5>
                <div className="row mt-2">
                    <div className="col-12">
                        <div className="card">
                            <div className="table-responsive">
                                <div className="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
                                    
                                    <div className="dataTable-top">
                                        <div className="dataTable-search"> 
                                            <input
                                                className="dataTable-input"
                                                placeholder="Search..."
                                                type="text"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="dataTable-container">
                                        {filteredCustomers.length > 0 ? (
                                            <table className="table table-flush dataTable-table" id="datatable-search">
                                                <thead className="thead-light">
                                                    <tr>
                                                        <th data-sortable="" style={{ width: '4.6514%' }}>
                                                            <a href="#" className="dataTable-sorter">
                                                                Id
                                                            </a>
                                                        </th>
                                                        <th data-sortable="" style={{ width: '23.3657%' }}>
                                                            <a href="#" className="dataTable-sorter">
                                                                Name
                                                            </a>
                                                        </th>
                                                        <th data-sortable="" style={{ width: '16.2286%' }}>
                                                            <a href="#" className="dataTable-sorter">
                                                                Phone
                                                            </a>
                                                        </th>
                                                        <th data-sortable="" style={{ width: '10.6114%' }}>
                                                            <a href="#" className="dataTable-sorter">
                                                                Town
                                                            </a>
                                                        </th>
                                                        <th data-sortable="" style={{ width: '24%' }}>
                                                            <a href="#" className="dataTable-sorter">
                                                                Added on
                                                            </a>
                                                        </th>
                                                        <th data-sortable="" style={{ width: '15%' }}>
                                                            <a href="#" className="dataTable-sorter">
                                                                Action
                                                            </a>
                                                        </th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    {currentCustomers.length > 0 ? (
                                                        currentCustomers.map((customer) => (
                                                            <tr key={customer.id}>
                                                                <td>
                                                                    <div className="d-flex align-items-center">
                                                                        <p className="text-xs font-weight-bold ms-2 mb-0">#{customer.id}</p>
                                                                    </div>
                                                                </td>
                                                                <td className="font-weight-bold">
                                                                    <span className="my-2 text-xs">{customer.name}</span>
                                                                </td>
                                                                <td className="text-xs font-weight-bold">
                                                                    <span className="my-2 text-xs">{customer.phone}</span>
                                                                </td>
                                                                <td className="text-xs font-weight-bold">
                                                                    <span className="my-2 text-xs">{customer.town}</span>
                                                                </td>
                                                                <td className="text-xs font-weight-bold">
                                                                    <span className="my-2 text-xs">
                                                                        {new Date(customer.added_on).toLocaleString()}
                                                                    </span>
                                                                </td>
                                                                <td className="text-xs font-weight-bold">
                                                                    <div className="d-flex align-items-center">
                                                                        <button
                                                                            className="btn btn-icon-only btn-rounded btn-outline-success mb-0 me-2 btn-sm d-flex align-items-center justify-content-center"
                                                                            onClick={() => viewCustomer(customer.id)}
                                                                        >
                                                                            <i className="fas fa-eye" aria-hidden="true"></i>
                                                                        </button>
                                                                        <span>View</span>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    ) : ( 
                                                        <tr>
                                                            <td colSpan="7">No records found.</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        ) : (
                                            <div className="text-center py-4">
                                                <p>No records found.</p>
                                            </div>
                                        )}
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

export default Home
