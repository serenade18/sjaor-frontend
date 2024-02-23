import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import HeaderNav from '../../components/HeaderNav'
import { connect } from 'react-redux';
import swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { fetchAllCatalogues, saveCatalogues, deleteCatalogues } from '../../actions/auth'

const Catalogues = ({ isAuthenticated, fetchAllCatalogues, catalogues, saveCatalogues, deleteCatalogues }) => {
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(1);
    const cataloguesPerPage = 24;
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
                fetchAllCatalogues();
        } else {
            // navigate('/');
        }
    }, [isAuthenticated, navigate, fetchAllCatalogues]);

    if (!isAuthenticated) {
        navigate('/');
    } 

    const [searchQuery, setSearchQuery] = useState('');

    const filteredCatalogues = catalogues
    ? catalogues.filter((catalogues) =>
          catalogues.catalogue_name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

    const indexOfLastCatalogues = currentPage * cataloguesPerPage;
    const indexOfFirstCatalogues = indexOfLastCatalogues - cataloguesPerPage;
    const currentCatalogues = filteredCatalogues.slice(indexOfFirstCatalogues, indexOfLastCatalogues);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const startPage = Math.max(1, currentPage - Math.floor(maxPagesDisplayed / 2));
    const endPage = Math.min(
        Math.ceil(filteredCatalogues.length / cataloguesPerPage),
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
        const selectedCatalogue = catalogues.find(catalogue => catalogue.id === catalogueId);

        // Ensure the catalogue is found
        if (selectedCatalogue) {
            // Use the catalogue_file to initiate the download
            window.open(selectedCatalogue.catalogue_file, '_blank');
        } else {
            // Handle the case where the catalogue is not found
            console.error('Catalogue not found');
        }
    };

    const [formData, setFormData] = useState({
        catalogue_name: '',
        catalogue_file: null,
        month:'',
        year: '',
    })

    const [submitSuccess, setSubmitSuccess] = useState(false);
    
    const [buttonText, setButtonText] = useState('Add Catalogue'); // Initial button text
    const [isButtonDisabled, setButtonDisabled] = useState(false);

    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };
    
    const closeModal = () => {
        setModalOpen(false);
        setFormData({
            catalogue_name: '',
            catalogue_file: null,
            month:'',
            year: '',
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();

        formDataToSend.append('catalogue_name', formData.catalogue_name);
        formDataToSend.append('catalogue_file', formData.catalogue_file);
        formDataToSend.append('month', formData.month);
        formDataToSend.append('year', formData.year);

        // Show starting notification
        const startToastId = toast.info('Uploading Catalogue...', {
            position: 'top-right',
            autoClose: false,
            hideProgressBar: false,
        });
    
        // Function to handle progress updates
        const handleProgress = (progress) => {
            // Update the existing toast with progress information
            toast.update(startToastId, {
                render: `Uploading Play... ${progress.toFixed(2)}%`,
                autoClose: false,
            });
        };

        try {
            const response = await saveCatalogues(formDataToSend, handleProgress);
            console.log(response);

            // Show success toast
            toast.success('Catalogue added successfully', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
            });
            
            // Close the starting notification toast
            toast.dismiss(startToastId);

            fetchAllCatalogues();

        } catch (error) {
            console.error('Error posting play', error.message);
            // Show error toast
            toast.error('Error posting play. Please try again.', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
            });
            
            // Close the starting notification toast
            toast.dismiss(startToastId);
            
            return;
        }
    };

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'catalogue_file' ? files[0] : value,
        });
    };

    const handleDelete = async (catalogues_id) => {
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
            await deleteCatalogues(catalogues_id);
            await fetchAllCatalogues();
            swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Catalogue deleted successfully!',
            });
        } catch (error) {
            swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to delete Catalogue. Please try again.',
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
                                <i className="fi fi-br-file-user"></i> New Catalogue
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
                                                            <label>Catalogue Name</label>
                                                            <div className="input-group mb-3">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    name="catalogue_name"
                                                                    placeholder="Catalogue Name"
                                                                    value={formData.catalogue_name}
                                                                    onChange={(e) => setFormData({ ...formData, catalogue_name: e.target.value })}
                                                                    required
                                                                />
                                                            </div>
                                                            <label>Catalogue File</label>
                                                            <div className="input-group mb-3">
                                                                <input
                                                                    type="file"
                                                                    name="catalogue_file"
                                                                    className="form-control"
                                                                    onChange={handleInputChange}
                                                                    required
                                                                />
                                                            </div>
                                                            <label>Month</label>
                                                            <div className='input-group'>
                                                                <select 
                                                                    className='form-control' 
                                                                    name='month' 
                                                                    placeholder='Month'
                                                                    value={formData.month}
                                                                    onChange={(e) =>setFormData({ ...formData, month: e.target.value })}
                                                                >
                                                                    <option value="">--- Choose Month---</option>
                                                                    <option value="January">January</option>
                                                                    <option value="February">February</option>
                                                                    <option value="March">March</option>
                                                                    <option value="April">April</option>
                                                                    <option value="May">May</option>
                                                                    <option value="June">June</option>
                                                                    <option value="July">July</option>
                                                                    <option value="August">August</option>
                                                                    <option value="September">September</option>
                                                                    <option value="October">October</option>
                                                                    <option value="November">November</option>
                                                                    <option value="December">December</option>
                                                                </select>
                                                            </div>
                                                            <label>Year</label>
                                                            <div className="input-group mb-3">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    name="year"
                                                                    placeholder="Year"
                                                                    value={formData.year}
                                                                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
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
                                            {filteredCatalogues.length > 0 ? (
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
                                                        {currentCatalogues.length > 0 ? (
                                                            currentCatalogues.map((catalogues) => (
                                                                <tr key={catalogues.id}>
                                                                    <td>
                                                                        <div className="d-flex align-items-center">
                                                                            <p className="text-xs font-weight-bold ms-2 mb-0">#{catalogues.id}</p>
                                                                        </div>
                                                                    </td>
                                                                    <td className="font-weight-bold">
                                                                        <span className="my-2 text-xs">{catalogues.catalogue_name}</span>
                                                                    </td>
                                                                    <td className="w-20">
                                                                        <span className="my-2 text-xs">
                                                                            <i className="fa-regular fa-file-pdf text-lg text-danger"></i> {getFileName(catalogues.catalogue_file)}
                                                                        </span>
                                                                    </td>
                                                                    <td className="text-xs font-weight-bold">
                                                                        <span className="my-2 text-xs">
                                                                            {new Date(catalogues.added_on).toLocaleString()}
                                                                        </span>
                                                                    </td>
                                                                    <td className="text-xs font-weight-bold">
                                                                        <div className="d-flex align-items-center">
                                                                            <button
                                                                                className="btn btn-icon-only btn-rounded btn-outline-success mb-0 me-2 btn-sm d-flex align-items-center justify-content-center"
                                                                                onClick={() => downloadCatalogue(catalogues.id)}
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
                                                                                onClick={() => handleDelete(catalogues.id)}
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
                                            <div className="dataTable-info">Showing {filteredCatalogues.length} entries</div>
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
                                                    {currentPage + maxPagesDisplayed < Math.ceil(filteredCatalogues.length / cataloguesPerPage) && (
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
    catalogues: state.auth.catalogues,
    user: state.auth.user
});

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllCatalogues: () => dispatch(fetchAllCatalogues()),
        saveCatalogues: (formData) => dispatch(saveCatalogues(formData)),
        deleteCatalogues: (catalogues_id) => dispatch(deleteCatalogues(catalogues_id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Catalogues)
