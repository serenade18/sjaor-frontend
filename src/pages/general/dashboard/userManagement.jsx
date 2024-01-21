import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteUser, fetchAllUsers } from '../../../actions/auth';
import swal from 'sweetalert2';

const userManagement = ({ isAuthenticated, fetchAllUsers, users, deleteUser }) => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;
    const maxPagesDisplayed = 5;

    useEffect(() => {
        if (isAuthenticated) {
             fetchAllUsers();
        } else {
             navigate('/');
        }
    }, [isAuthenticated, navigate, fetchAllUsers]);

    if (!isAuthenticated) {
        navigate('/');
    }

    const [searchQuery, setSearchQuery] = useState('');

    // const filteredUsers = users
    //     ? users.filter((users) =>
    //           `${users.first_name} ${users.last_name}`.toLowerCase().includes(searchQuery.toLowerCase())
    //       )
    //     : [];
    const filteredUsers = users
    ? users.filter((user) =>
        `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.phone.toLowerCase().includes(searchQuery.toLowerCase())
        )
    : [];
    
    console.log("filtered users", filteredUsers)  
    console.log("users", users)  

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const startPage = Math.max(1, currentPage - Math.floor(maxPagesDisplayed / 2));
    const endPage = Math.min(
        Math.ceil(filteredUsers.length / usersPerPage),
        startPage + maxPagesDisplayed - 1
    );

    const handleDelete = async (users_id) => {
        const confirmed = window.confirm('Are you sure you want to delete this User?');
    
        if (!confirmed) {
            swal.fire({
                icon: 'info',
                title: 'Operation Aborted',
                text: 'Deletion has been canceled.',
            });
            return;
        }
    
        try {
            await deleteUser(users_id);
            await fetchAllUsers();
            swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'User deleted successfully!',
            });
        } catch (error) {
            swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to delete the User. Please try again.',
            });
        }
      };

    return (
        <div className="row">
            <div className="col-12">
                <div className="card bg-gray-901">
                    <div className="table-responsive">
                        <div className="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
                            
                            <div className="dataTable-top">
                                <div className="text-dark">
                                    <h6 className="text-dark text-sm">Recent Activities</h6>
                                </div>
                                <div className="dataTable-search">
                                    <input
                                        className="dataTable-input bg-gray-201"
                                        placeholder="Search..."
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="dataTable-container">
                            {filteredUsers.length > 0 ? (
                                <table className="table table-flush dataTable-table" id="datatable-search">
                                    <thead className="thead-light">
                                        <tr>
                                            <th data-sortable="" style={{ width: '13%' }}>
                                                <a href="#" className="dataTable-sorter text-dark text-sm">
                                                    Name
                                                </a>
                                            </th>
                                            <th data-sortable="" style={{ width: '13%' }}>
                                                <a href="#" className="dataTable-sorter text-dark text-sm">
                                                    Phone
                                                </a>
                                            </th>
                                            <th data-sortable="" style={{ width: '13%' }}>
                                                <a href="#" className="dataTable-sorter text-dark text-sm">
                                                    Email
                                                </a>
                                            </th>
                                            <th data-sortable="" style={{ width: '12%' }}>
                                                <a href="#" className="dataTable-sorter text-dark text-sm">
                                                    View
                                                </a>
                                            </th>
                                            <th data-sortable="" style={{ width: '12%' }}>
                                                <a href="#" className="dataTable-sorter text-dark text-sm">
                                                    Delete
                                                </a>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {currentUsers.length > 0 ? (
                                        currentUsers.map((user) => (
                                        <tr key={user.id}>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <p className="text-sm text-dark font-weight-bold ms-2 mb-0">{user.first_name} {user.last_name}</p>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <p className="text-sm text-dark font-weight-bold ms-2 mb-0">{user.phone}</p>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <p className="text-sm text-dark font-weight-bold ms-2 mb-0">{user? user.email : ''}</p>
                                                </div>
                                            </td>
                                            <td className="text-xs font-weight-bold">
                                                <div className="d-flex align-items-center">
                                                    <button
                                                        className="btn btn-icon-only btn-rounded btn-outline-success mb-0 me-2 btn-sm d-flex align-items-center justify-content-center"
                                                        //onClick={() => viewusers(users.id)}
                                                    >
                                                        <i className="fas fa-eye" aria-hidden="true"></i>
                                                    </button>
                                                    <span>View</span>
                                                </div>
                                            </td>
                                            <td className="text-xs font-weight-bold">
                                                <div className="d-flex align-items-center">
                                                    <button
                                                        className="btn btn-icon-only btn-rounded btn-outline-danger mb-0 me-2 btn-sm d-flex align-items-center justify-content-center"
                                                        onClick={() => handleDelete(user.id)}
                                                    >
                                                        <i className="fa-solid fa-user-xmark" aria-hidden="true"></i>
                                                    </button>
                                                    <span>Delete</span>
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
                                <div className="text-center text-dark py-4">
                                    <p>No users found.</p>
                                </div>
                            )}   
                            </div>
                
                            {/* Pagination controls */}
                            <div className="dataTable-bottom">
                                <div className="dataTable-info text-dark">
                                    Showing {filteredUsers.length} entries
                                </div>
                                <nav className="dataTable-pagination">
                                    <ul className="dataTable-pagination-list">
                                    <li className="pager">
                                        <a
                                        href="#"
                                        data-page="1"
                                        onClick={() => paginate(1)}
                                        >
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
                                    {currentPage + maxPagesDisplayed < Math.ceil(filteredUsers.length / usersPerPage) && (
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
    )
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    users: state.auth.users,
});

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllUsers: () => dispatch(fetchAllUsers()),
        deleteUser: (users_id) => dispatch(deleteUser(users_id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(userManagement)
