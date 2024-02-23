import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchAdusums, deleteAdusums, editAdusums  } from '../../actions/auth';
import { connect } from 'react-redux';
import swal from 'sweetalert2';
import HeaderNav from '../../components/HeaderNav'
import DashboardSection from './dashboard/dashboardSection'

const Home = ({ isAuthenticated, fetchAdusums, adusums, editAdusums, user }) => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const adusumsPerPage = 24;
    const maxPagesDisplayed = 5;

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

    useEffect(() => {
        if (isAuthenticated) {
            // Fetch customer data only if authenticated
                fetchAdusums();
        } else {
            // navigate('/');
        }
    }, [isAuthenticated, navigate, fetchAdusums]);

    if (!isAuthenticated) {
        // navigate('/');
    } 

    const verifyAdusum = async (adusumId) => {
    
        try {
            // Fetch the current Adusum data
            const adusumToUpdate = adusums.find(adusum => adusum.id === adusumId);
    
            // Prepare the updated data with the new status and existing values
            const updatedData = {
                ...adusumToUpdate,
                status: 1,
            };
    
            // Call the editAdusums action with the updated data
            await editAdusums(updatedData, adusumId);
            await fetchAdusums();
            swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Adusum verified successfully!',
            });
        } catch (error) {
            swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to verify Adusum. Please try again.',
            });
        }
    };
    

    const handleDelete = async (news_id) => {
        const confirmed = window.confirm('Are you sure you want to delete this News Article?');

        if (!confirmed) {
            swal.fire({
                icon: 'info',
                title: 'Operation Aborted',
                text: 'Deletion has been canceled.',
            });
            return;
        }

        try {
            await deleteAdusums(news_id);
            await fetchAdusums();
            swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'News deleted successfully!',
            });
        } catch (error) {
            swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to delete News Article. Please try again.',
            });
        }
    };

    const [searchQuery, setSearchQuery] = useState('');

    const filteredAdusums = Array.isArray(adusums)
    ? adusums.filter((adusums) =>
          adusums.fullname.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

    console.log("filtered", filteredAdusums)

    const indexOfLastAdusums = currentPage * adusumsPerPage;
    const indexOfFirstAdusums = indexOfLastAdusums - adusumsPerPage;
    const currentAdusums = filteredAdusums.slice(indexOfFirstAdusums, indexOfLastAdusums);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const startPage = Math.max(1, currentPage - Math.floor(maxPagesDisplayed / 2));
    const endPage = Math.min(
        Math.ceil(filteredAdusums.length / adusumsPerPage),
        startPage + maxPagesDisplayed - 1
    );

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
                                            {filteredAdusums.length > 0 ? (
                                                <table className="table table-flush dataTable-table" id="datatable-search">
                                                    <thead className="thead-light">
                                                        <tr>
                                                            <th data-sortable="" style={{ width: '3%' }}>
                                                                <a href="#" className="dataTable-sorter text-dark">
                                                                    Id
                                                                </a>
                                                            </th>
                                                            <th data-sortable="" style={{ width: '6%' }}>
                                                                <a href="#" className="dataTable-sorter text-dark">
                                                                    Full Name
                                                                </a>
                                                            </th>
                                                            <th data-sortable="" style={{ width: '6%' }}>
                                                                <a href="#" className="dataTable-sorter text-dark">
                                                                    username
                                                                </a>
                                                            </th>
                                                            <th data-sortable="" style={{ width: '6%' }}>
                                                                <a href="#" className="dataTable-sorter text-dark">
                                                                    Date of Birth
                                                                </a>
                                                            </th>
                                                            <th data-sortable="" style={{ width: '6%' }}>
                                                                <a href="#" className="dataTable-sorter text-dark">
                                                                    Date of entry
                                                                </a>
                                                            </th>
                                                            <th data-sortable="" style={{ width: '6%' }}>
                                                                <a href="#" className="dataTable-sorter text-dark">
                                                                    Provincial
                                                                </a>
                                                            </th>
                                                            <th data-sortable="" style={{ width: '6%' }}>
                                                                <a href="#" className="dataTable-sorter text-dark">
                                                                    Current Community
                                                                </a>
                                                            </th>
                                                            <th data-sortable="" style={{ width: '8%' }}>
                                                                <a href="#" className="dataTable-sorter text-dark">
                                                                    status
                                                                </a>
                                                            </th>
                                                            <th data-sortable="" style={{ width: '18%' }}>
                                                                <a href="#" className="dataTable-sorter text-dark">
                                                                    profile picture
                                                                </a>
                                                            </th>
                                                            <th data-sortable="" style={{ width: '24%' }}>
                                                                <a href="#" className="dataTable-sorter text-dark">
                                                                    Added on
                                                                </a>
                                                            </th>
                                                            <th data-sortable="" style={{ width: '15%' }}>
                                                                <a href="#" className="dataTable-sorter text-dark">
                                                                    Action
                                                                </a>
                                                            </th>
                                                            <th data-sortable="" style={{ width: '15%' }}>
                                                                <a href="#" className="dataTable-sorter text-dark">
                                                                    
                                                                </a>
                                                            </th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        {currentAdusums.length > 0 ? (
                                                            currentAdusums.map((adusums) => (
                                                                <tr key={adusums.id}>
                                                                    <td>
                                                                        <div className="d-flex align-items-center">
                                                                            <p className="text-xs font-weight-bold ms-2 mb-0">#{adusums.id}</p>
                                                                        </div>
                                                                    </td>
                                                                    <td className="font-weight-bold">
                                                                        <span className="my-2 text-xs">{adusums.fullname}</span>
                                                                    </td>
                                                                    <td className="font-weight-bold">
                                                                        <span className="my-2 text-xs">{adusums.username}</span>
                                                                    </td>
                                                                    <td className="font-weight-bold">
                                                                        <span className="my-2 text-xs">{adusums.date_of_birth}</span>
                                                                    </td>
                                                                    <td className="font-weight-bold">
                                                                        <span className="my-2 text-xs">{adusums.date_of_entry}</span>
                                                                    </td>
                                                                    <td className="font-weight-bold">
                                                                        <span className="my-2 text-xs">{adusums.name_of_provincials}</span>
                                                                    </td>
                                                                    <td className="font-weight-bold">
                                                                        <span className="my-2 text-xs">{adusums.current_community}</span>
                                                                    </td>
                                                                    <td className="font-weight-bold">
                                                                        <span className="my-2 text-xs">
                                                                            {
                                                                                adusums.status ? "Verified" : "Pending Verification"
                                                                            }
                                                                        </span>
                                                                    </td>
                                                                    <td className="w-20">
                                                                        <img
                                                                        className="w-100 h-50 border-radius-sm img-fluid" 
                                                                            src={adusums.profile_picture}
                                                                        />
                                                                    </td>
                                                                    <td className="text-xs font-weight-bold">
                                                                        <span className="my-2 text-xs">
                                                                            {new Date(adusums.added_on).toLocaleString()}
                                                                        </span>
                                                                    </td>
                                                                    {user && user.user_type === 'admin' && (
                                                                    <td className="text-xs font-weight-bold">
                                                                        <div className="d-flex align-items-center">
                                                                            <button
                                                                                className={`btn ${adusums.status ? 'btn-success' : 'bg-gradient-blue'} mb-0 me-2 btn-sm text-white d-flex align-items-center justify-content-center`}
                                                                                onClick={() => verifyAdusum(adusums.id)}
                                                                            >
                                                                                <i className="fa-regular fa-pen-to-square text-white" aria-hidden="true"></i> 
                                                                                {adusums.status ? 'Verified' : 'Verify'}
                                                                            </button>
                                                                        </div>
                                                                    </td>
                                                                    )}
                                                                    {user && user.user_type === 'admin' && (
                                                                    <td className="text-xs font-weight-bold">
                                                                        <div className="d-flex align-items-center">
                                                                            <button
                                                                                className="btn btn-icon-only btn-rounded btn-outline-danger mb-0 me-2 btn-sm d-flex align-items-center justify-content-center"
                                                                                onClick={() => handleDelete(adusums.id)}
                                                                            >
                                                                            <i className="fas fa-times" aria-hidden="true"></i>
                                                                            </button>
                                                                            <span>Delete</span>
                                                                        </div>
                                                                    </td>
                                                                    )}
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

                                        <div className="dataTable-bottom">
                                            <div className="dataTable-info">Showing {filteredAdusums.length} entries</div>
                                            <nav className="dataTable-pagination">
                                                <ul className="dataTable-pagination-list">
                                                    <li className="pager">
                                                        <a href="#" data-page="1" onClick={() => paginate(1)}>
                                                            ‹
                                                        </a>
                                                    </li>
                                                    {Array.from({ length: endPage - startPage + 1 }).map((_, index) => (
                                                        <li
                                                            key={index}
                                                            className={currentPage === startPage + index ? 'active' : ''}
                                                        >
                                                            <a
                                                                href="#"
                                                                data-page={startPage + index}
                                                                onClick={() => paginate(startPage + index)}
                                                            >
                                                                {startPage + index}
                                                            </a>
                                                        </li>
                                                    ))}
                                                    {currentPage + maxPagesDisplayed < Math.ceil(filteredAdusums.length / adusumsPerPage) && (
                                                        <li className="pager">
                                                            <a
                                                                href="#"
                                                                data-page={currentPage + 1}
                                                                onClick={() => paginate(currentPage + 1)}
                                                            >
                                                                ›
                                                            </a>
                                                        </li>
                                                    )}
                                                </ul>
                                            </nav>
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

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    adusums: state.auth.adusums,
    user: state.auth.user
});

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAdusums: () => dispatch(fetchAdusums()),
        deleteAdusums: (adusums_id) => dispatch(deleteAdusums(adusums_id)),
        editAdusums: (formData, id) => dispatch(editAdusums(formData, id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home)
