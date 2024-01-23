import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import HeaderNav from '../../components/HeaderNav'
import { connect } from 'react-redux';
import swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { fetchAllShukran, saveShukran, deleteShukran } from '../../actions/auth'

const Shukran = ({ isAuthenticated, fetchAllShukran, shukran, saveShukran, deleteShukran }) => {
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(1);
    const shukranPerPage = 24;
    const maxPagesDisplayed = 5;
    const { id } = useParams();
    const formRef = useRef(null);

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
                fetchAllShukran();
        } else {
            // navigate('/');
        }
    }, [isAuthenticated, navigate, fetchAllShukran]);

    if (!isAuthenticated) {
        navigate('/');
    } 

    const [searchQuery, setSearchQuery] = useState('');

    const filteredShukran = shukran
    ? shukran.filter((shukran) =>
          shukran.shukran_name && shukran.shukran_name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

    const indexOfLastShukran = currentPage * shukranPerPage;
    const indexOfFirstShukran = indexOfLastShukran - shukranPerPage;
    const currentShukran = filteredShukran.slice(indexOfFirstShukran, indexOfLastShukran);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const startPage = Math.max(1, currentPage - Math.floor(maxPagesDisplayed / 2));
    const endPage = Math.min(
        Math.ceil(filteredShukran.length / shukranPerPage),
        startPage + maxPagesDisplayed - 1
    );

    //  function to get the filename from the full path
    const getFileName = (filePath) => {
        const startIndex = filePath.lastIndexOf('/') + 1;
        return filePath.substring(startIndex);
    };

    // Function to trigger pdf download
    const downloadCatalogue = (catalogueId) => {
        // Find the selected catalogue using the ID
        const selectedCatalogue = shukran.find(catalogue => catalogue.id === catalogueId);

        // Ensure the catalogue is found
        if (selectedCatalogue) {
            // Use the shukran_file to initiate the download
            window.open(selectedCatalogue.shukran_file, '_blank');
        } else {
            // Handle the case where the catalogue is not found
            console.error('Catalogue not found');
        }
    };

    const [formData, setFormData] = useState({
        shukran_name: '',
        shukran_year: '',
        shukran_file: null,
    })

    const [submitSuccess, setSubmitSuccess] = useState(false);
    
    const [buttonText, setButtonText] = useState('Add Shukran'); // Initial button text
    const [isButtonDisabled, setButtonDisabled] = useState(false);

    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };
    
    const closeModal = () => {
        setModalOpen(false);
        setFormData({
            shukran_name: '',
            shukran_year: '',
            shukran_file: null,
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();

        formDataToSend.append('shukran_name', formData.shukran_name);
        formDataToSend.append('shukran_year', formData.shukran_year);
        formDataToSend.append('shukran_file', formData.shukran_file);

        try {
            const response = await saveShukran(formDataToSend);
            console.log(response);

            // console.log('News posted successfully');
            // Show success toast
            toast.success('Shukran added successfully', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
            });
            fetchAllShukran();

        } catch (error) {
            console.error('Error posting play', error.message);
            // Show error toast
            toast.error('Error posting play. Please try again.', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
            });
            return;
        }
    };

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'shukran_file' ? files[0] : value,
        });
    };

    const handleDelete = async (shukran_id) => {
        const confirmed = window.confirm('Are you sure you want to delete this Catalogue?');

        if (!confirmed) {
            swal.fire({
                icon: 'info',
                title: 'Operation Aborted',
                text: 'Deletion has been canceled.',
            });
            return;
        }

        try {
            await deleteShukran(shukran_id);
            await fetchAllShukran();
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

    return (
        <div>
            <HeaderNav/>
            <div className="container-fluid py-4 mt-1" style={mediaQuery.matches ? desktopStyle : mobileStyle}>
                <div className="container-fluid py-5">
                    <div className="d-sm-flex justify-content-between">
                        <div className="dropdown d-inline align-center">
                            <button 
                                type="button" 
                                className="btn btn-outline-dark"
                                onClick={openModal}
                            >
                                <i className="fi fi-ss-newspaper-open"></i> New Shukran Issue
                            </button>
                            {isModalOpen && (
                                <div
                                    className="modal fade show"
                                    id="modal-form"
                                    tabIndex="-1"
                                    role="dialog"
                                    aria-modal="true"
                                    style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                                    onClick={closeModal}
                                >
                                    <div
                                        className="modal-dialog modal-dialog-centered modal-md"
                                        role="document"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <div className="modal-content">
                                            <div className="modal-body p-0">
                                                <div className="card card-plain">
                                                    <div className="card-header pb-0 text-left">
                                                        <span className="close" onClick={closeModal}>
                                                        &times;
                                                        </span>
                                                        <h3 className="font-weight-bolder text-dark text-gradient">
                                                        Add Catalogue
                                                        </h3>
                                                    </div>
                                                    <div className="card-body">
                                                        <form role="form text-left" ref={formRef} method="POST" onSubmit={handleFormSubmit}>
                                                            <label>Shukran Name</label>
                                                            <div className="input-group mb-3">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    name="shukran_name"
                                                                    placeholder="Shukran Name"
                                                                    value={formData.shukran_name}
                                                                    onChange={(e) => setFormData({ ...formData, shukran_name: e.target.value })}
                                                                    required
                                                                />
                                                            </div>
                                                            <label>Shukran Year</label>
                                                            <div className="input-group mb-3">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    name="shukran_year"
                                                                    placeholder="Shukran Name"
                                                                    value={formData.shukran_year}
                                                                    onChange={(e) => setFormData({ ...formData, shukran_year: e.target.value })}
                                                                    required
                                                                />
                                                            </div>
                                                            <label>Catalogue File</label>
                                                            <div className="input-group mb-3">
                                                                <input
                                                                    type="file"
                                                                    name="shukran_file"
                                                                    className="form-control"
                                                                    onChange={handleInputChange}
                                                                    required
                                                                />
                                                            </div>
                                                            
                                                            <div className="text-center">
                                                                <button
                                                                    type="submit"
                                                                    className="btn btn-round bg-gradient-dark btn-lg w-100 mt-4 mb-0"
                                                                    disabled={isButtonDisabled}
                                                                >
                                                                    {buttonText}
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                    <div className="card-footer text-center pt-0 px-lg-2 px-1">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="d-flex">
                           
                        </div>
                    </div>

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
                                            {filteredShukran.length > 0 ? (
                                                <table className="table table-flush dataTable-table" id="datatable-search">
                                                    <thead className="thead-light">
                                                        <tr>
                                                            <th data-sortable="" style={{ width: '4.6514%' }}>
                                                                <a href="#" className="dataTable-sorter text-dark">
                                                                    Id
                                                                </a>
                                                            </th>
                                                            <th data-sortable="" style={{ width: '23%' }}>
                                                                <a href="#" className="dataTable-sorter text-dark">
                                                                    Name
                                                                </a>
                                                            </th>
                                                            <th data-sortable="" style={{ width: '23%' }}>
                                                                <a href="#" className="dataTable-sorter text-dark">
                                                                    Year
                                                                </a>
                                                            </th>
                                                            <th data-sortable="" style={{ width: '24%' }}>
                                                                <a href="#" className="dataTable-sorter text-dark">
                                                                    File
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
                                                        {currentShukran.length > 0 ? (
                                                            currentShukran.map((shukran) => (
                                                                <tr key={shukran.id}>
                                                                    <td>
                                                                        <div className="d-flex align-items-center">
                                                                            <p className="text-xs font-weight-bold ms-2 mb-0">#{shukran.id}</p>
                                                                        </div>
                                                                    </td>
                                                                    <td className="font-weight-bold">
                                                                        <span className="my-2 text-xs">{shukran.shukran_name}</span>
                                                                    </td>
                                                                    <td className="font-weight-bold">
                                                                        <span className="my-2 text-xs">{shukran.shukran_year}</span>
                                                                    </td>
                                                                    <td className="w-20">
                                                                        <span className="my-2 text-xs">
                                                                            <i className="fa-regular fa-file-pdf text-lg text-danger"></i> {getFileName(shukran.shukran_file)}
                                                                        </span>
                                                                    </td>
                                                                    <td className="text-xs font-weight-bold">
                                                                        <span className="my-2 text-xs">
                                                                            {new Date(shukran.added_on).toLocaleString()}
                                                                        </span>
                                                                    </td>
                                                                    <td className="text-xs font-weight-bold">
                                                                        <div className="d-flex align-items-center">
                                                                            <button
                                                                                className="btn btn-icon-only btn-rounded btn-outline-success mb-0 me-2 btn-sm d-flex align-items-center justify-content-center"
                                                                                onClick={() => downloadCatalogue(shukran.id)}
                                                                            >
                                                                                <i className="fa-solid fa-download" aria-hidden="true"></i>
                                                                            </button>
                                                                            <span>Download</span>
                                                                        </div>
                                                                    </td>
                                                                    <td className="text-xs font-weight-bold">
                                                                        <div className="d-flex align-items-center">
                                                                            <button
                                                                                className="btn btn-icon-only btn-rounded btn-outline-danger mb-0 me-2 btn-sm d-flex align-items-center justify-content-center"
                                                                                onClick={() => handleDelete(shukran.id)}
                                                                            >
                                                                            <i className="fas fa-times" aria-hidden="true"></i>
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
                                                <div className="text-center py-4">
                                                    <p>No records found.</p>
                                                </div>
                                            )}
                                        </div>

                                        <div className="dataTable-bottom">
                                            <div className="dataTable-info">Showing {filteredShukran.length} entries</div>
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
                                                    {currentPage + maxPagesDisplayed < Math.ceil(filteredShukran.length / shukranPerPage) && (
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
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    shukran: state.auth.shukran,
    user: state.auth.user
});

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllShukran: () => dispatch(fetchAllShukran()),
        saveShukran: (formData) => dispatch(saveShukran(formData)),
        deleteShukran: (shukran_id) => dispatch(deleteShukran(shukran_id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Shukran)
