import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import HeaderNav from '../../components/HeaderNav'
import { connect } from 'react-redux';
import swal from 'sweetalert2';
import { fetchAllDocuments } from '../../actions/auth';

const Doucuments = ({ isAuthenticated, fetchAllDocuments, documents }) => {
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

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'catalogue_file' ? files[0] : value,
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
            await deleteCatalogues(documents_id);
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


    return (
        <div>
            <HeaderNav/>
            <div className="container-fluid py-4 mt-1" style={mediaQuery.matches ? desktopStyle : mobileStyle}>
                <div className="container-fluid py-5">
                    <div className="d-sm-flex justify-content-between">
                        <div className="dropdown d-inline align-center">
                            <button type="button" className="btn btn-outline-dark">
                                <i className="fi fi-tr-memo-circle-check"></i> New Document
                            </button>
                        </div>
                        <div className="d-flex">
                           <button className="btn btn-outline-success">
                                <i className="fa-solid fa-layer-group"></i> Add Category
                           </button>
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
        saveDocuments: (formData) => dispatch(saveDocuments(formData)),
        deleteDocuments: (documents_id) => dispatch(deleteDocuments(documents_id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Doucuments)
