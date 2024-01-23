import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import HeaderNav from '../../components/HeaderNav'
import { connect } from 'react-redux';
import swal from 'sweetalert2';
import { fetchAllDocuments, saveDocuments, deleteDocuments, fetchDocumentOnly, saveDocumentCategory, fetchAllCategory } from '../../actions/auth';
import Select from 'react-select';
import { toast } from 'react-toastify';

const Doucuments = ({ isAuthenticated, fetchAllDocuments, documents, saveDocuments, deleteDocuments, fetchDocumentOnly, saveDocumentCategory }) => {
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(1);
    const focumentsPerPage = 24;
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
                fetchAllDocuments();
        } else {
            // navigate('/');
        }
    }, [isAuthenticated, navigate, fetchAllDocuments]);

    if (!isAuthenticated) {
        navigate('/');
    } 

    const [searchQuery, setSearchQuery] = useState('');

    const filteredDocuments = documents
    ? documents.filter((documents) =>
          documents.document_name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

    const indexOfLastDocument = currentPage * focumentsPerPage;
    const indexOfFirstDocument = indexOfLastDocument - focumentsPerPage;
    const currentDocuments = filteredDocuments.slice(indexOfFirstDocument, indexOfLastDocument);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const startPage = Math.max(1, currentPage - Math.floor(maxPagesDisplayed / 2));
    const endPage = Math.min(
        Math.ceil(filteredDocuments.length / focumentsPerPage),
        startPage + maxPagesDisplayed - 1
    );

    const [formData, setFormData] = useState({
        document_name: '',
        document_file: null,
        document_category: ''
    })

    const [formData2, setFormData2] = useState({
        category: ''
    })

    const [submitSuccess, setSubmitSuccess] = useState(false);
    
    const [buttonText] = useState('Add Document'); // Initial button text
    const [isButtonDisabled] = useState(false);

    
    const [categorybuttonText, setButtonText] = useState('Add Category'); // Initial button text
    const [iscategoryButtonDisabled, setButtonDisabled] = useState(false);

    const [isModalOpen, setModalOpen] = useState(false);
    const [isViewModalOpen, setViewModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };
    
    const closeModal = () => {
        setModalOpen(false);
        setFormData({
            document_name: '',
            document_file: null,
            document_category: ''
        });
    };

    const openViewModal = () => {
        setViewModalOpen(true);
    };
    
    const closeViewModal = () => {
        setViewModalOpen(false);
        setFormData2({
            category: ''
        });
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();

        formDataToSend.append('document_name', formData.document_name);
        formDataToSend.append('document_file', formData.document_file);
        formDataToSend.append('document_category', formData.document_category);

        try {
            const response = await saveDocuments(formDataToSend);
            console.log(response);

            // console.log('News posted successfully');
            // Show success toast
            toast.success('Document posted successfully', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
            });
            fetchAllDocuments()

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

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log("form data" ,formData2);
            const response = await saveDocumentCategory(formData2.category);
            console.log(response);

            if (response.data.error) {
                toast.error(response.data.message, { toastId: 'error' });
            } else {
                toast.success('Category Added Successfully', { toastId: "success" });
                setTimeout(() => {
                    setFormData2({
                        category: ''
                    });
                }, 2000)
                fetchAllCategory();
                fetchAllDocuments();
            }
    
        } catch (error) {
            console.log('Error during form submission', error)
            toast.error('Something went wrong. Check Your Network', { toastId: 'error' });
           
        }
    }

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'document_file' ? files[0] : value,
        });
    };

    const handleDelete = async (documents_id) => {
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
            await deleteDocuments(documents_id);
            await fetchAllDocuments();
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

    //  function to get the filename from the full path
    const getFileName = (filePath) => {
        const startIndex = filePath.lastIndexOf('/') + 1;
        return filePath.substring(startIndex);
    };

    // Function to trigger pdf download
    const downloadCatalogue = (documentId) => {
        // Find the selected document using the ID
        const selectedDocument = documents.find(documents => documents.id === documentId);

        // Ensure the document is found
        if (selectedDocument) {
            // Use the document_file to initiate the download
            window.open(selectedDocument.document_file, '_blank');
        } else {
            // Handle the case where the document is not found
            console.error('document not found');
        }
    };

    const [selectedCategoryOptions, setSelectedCategoryOption] = useState(null);
    const [categoryOptions, setCategoryOptions] = useState([]);

    // Update useEffect for fetching custome data
    useEffect(() => {
        const fetchCategoryData = async () => {
            try {
                const categories = await fetchDocumentOnly();
                console.log(categories)
                setCategoryOptions(categories);
            } catch (error) {
                console.error('Error fetching batch data:', error);
            }
        };

        fetchCategoryData();
    }, [fetchDocumentOnly]);

    const handleCategorySelect = (selectedOption) => {
        setSelectedCategoryOption(selectedOption);
        if (selectedOption) {
            setFormData({
                ...formData,
                document_category: selectedOption.value, // Assign the selected batch's id to document_category
            });
            setSelectedCategoryOption(selectedOption);
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
                                <i className="fi fi-tr-memo-circle-check"></i> New Document
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
                                                        Add Document
                                                        </h3>
                                                    </div>
                                                    <div className="card-body">
                                                        <form role="form text-left" ref={formRef} method="POST" onSubmit={handleFormSubmit}>
                                                            <label>Document Name</label>
                                                            <div className="input-group mb-3">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    name="document_name"
                                                                    placeholder="Document Name"
                                                                    value={formData.document_name}
                                                                    onChange={(e) => setFormData({ ...formData, document_name: e.target.value })}
                                                                    required
                                                                />
                                                            </div>
                                                            <label>Document File</label>
                                                            <div className="input-group mb-3">
                                                                <input
                                                                    type="file"
                                                                    name="document_file"
                                                                    className="form-control"
                                                                    onChange={handleInputChange}
                                                                    required
                                                                />
                                                            </div>
                                                            <label>Category</label>
                                                            <div className="input-group mb-3">
                                                                <Select
                                                                    id="document_category"
                                                                    name="document_category"
                                                                    className="form-control"
                                                                    value={selectedCategoryOptions}
                                                                    onChange={handleCategorySelect}
                                                                    options={categoryOptions && categoryOptions.map((doucument) => ({
                                                                        value: doucument.id,
                                                                        label: doucument.category,
                                                                    }))}
                                                                    placeholder="--- Browse Category ---"
                                                                    isClearable
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
                           <button 
                            className="btn btn-outline-success"
                            onClick={openViewModal}
                           >
                                <i className="fa-solid fa-layer-group"></i> Add Category
                           </button>
                           {isViewModalOpen && (
                                <div
                                    className="modal fade show"
                                    id="modal-form"
                                    tabIndex="-1"
                                    role="dialog"
                                    aria-modal="true"
                                    style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                                    onClick={closeViewModal}
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
                                                        <span className="close" onClick={closeViewModal}>
                                                        &times;
                                                        </span>
                                                        <h3 className="font-weight-bolder text-dark text-gradient">
                                                        Add Document Category
                                                        </h3>
                                                    </div>
                                                    <div className="card-body">
                                                        <form role="form text-left" ref={formRef} method="POST" onSubmit={onSubmit}>
                                                            <label>Category</label>
                                                            <div className="input-group mb-3">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    name="category"
                                                                    placeholder="Category Name"
                                                                    value={formData2.category}
                                                                    onChange={(e) => setFormData2({ ...formData2, category: e.target.value })}
                                                                    required
                                                                />
                                                            </div>
                                                            <div className="text-center">
                                                                <button
                                                                    type="submit"
                                                                    className="btn btn-round bg-gradient-dark btn-lg w-100 mt-4 mb-0"
                                                                    disabled={iscategoryButtonDisabled}
                                                                >
                                                                    {categorybuttonText}
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
                                            {filteredDocuments.length > 0 ? (
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
                                                                    Title
                                                                </a>
                                                            </th>
                                                            <th data-sortable="" style={{ width: '24%' }}>
                                                                <a href="#" className="dataTable-sorter text-dark">
                                                                    File
                                                                </a>
                                                            </th>
                                                            <th data-sortable="" style={{ width: '24%' }}>
                                                                <a href="#" className="dataTable-sorter text-dark">
                                                                    Category
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
                                                        {currentDocuments.length > 0 ? (
                                                            currentDocuments.map((documents) => (
                                                                <tr key={documents.id}>
                                                                    <td>
                                                                        <div className="d-flex align-items-center">
                                                                            <p className="text-xs font-weight-bold ms-2 mb-0">#{documents.id}</p>
                                                                        </div>
                                                                    </td>
                                                                    <td className="font-weight-bold">
                                                                        <span className="my-2 text-xs">{documents.document_name}</span>
                                                                    </td>
                                                                    <td className="w-20">
                                                                        <span className="my-2 text-xs">
                                                                            <i className="fa-regular fa-file-pdf text-lg text-danger"></i> {getFileName(documents.document_file)}
                                                                        </span>
                                                                    </td>
                                                                    <td className="w-20">
                                                                        <span className="my-2 text-xs">
                                                                            {documents.document_category.category}
                                                                        </span>
                                                                    </td>
                                                                    <td className="text-xs font-weight-bold">
                                                                        <span className="my-2 text-xs">
                                                                            {new Date(documents.added_on).toLocaleString()}
                                                                        </span>
                                                                    </td>
                                                                    <td className="text-xs font-weight-bold">
                                                                        <div className="d-flex align-items-center">
                                                                            <button
                                                                                className="btn btn-icon-only btn-rounded btn-outline-success mb-0 me-2 btn-sm d-flex align-items-center justify-content-center"
                                                                                onClick={() => downloadCatalogue(documents.id)}
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
                                                                                onClick={() => handleDelete(documents.id)}
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
                                            <div className="dataTable-info">Showing {filteredDocuments.length} entries</div>
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
                                                    {currentPage + maxPagesDisplayed < Math.ceil(filteredDocuments.length / focumentsPerPage) && (
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
    documents: state.auth.documents,
    user: state.auth.user
});

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllDocuments: () => dispatch(fetchAllDocuments()),
        fetchDocumentOnly: () => dispatch(fetchDocumentOnly()),
        saveDocuments: (formData) => dispatch(saveDocuments(formData)),
        saveDocumentCategory: (category) => dispatch(saveDocumentCategory(category)),
        deleteDocuments: (documents_id) => dispatch(deleteDocuments(documents_id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Doucuments)
