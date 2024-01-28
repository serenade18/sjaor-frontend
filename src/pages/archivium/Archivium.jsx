import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HeaderNav from '../../components/HeaderNav'
import { fetchAllArchivium, deleteArchivium } from '../../actions/auth';
import { connect } from 'react-redux';
import swal from 'sweetalert2';

const truncateText = (text, lines) => {
    const words = text.split(' ');
    const truncatedText = words.slice(0, lines).join(' ');
    return truncatedText;
  };

const Archivium = ({ isAuthenticated, fetchAllArchivium, deleteArchivium, archivium, user }) => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const archiviumPerPage = 24;
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
            const fetchData = async () => {
                try {
                    const archivum = await fetchAllArchivium();

                    if (archivum && archivum) {
                        const archivumData = archivum
                        console.log('Fetched Data', archivumData)
                    }
                } catch (error) {
                    console.error('Error fetching news data', error)
                }
            }

            fetchData()
                
        } else {
            // navigate('/');
        }
    }, [isAuthenticated, navigate, fetchAllArchivium]);

    if (!isAuthenticated) {
        navigate('/');
    } 

    const EditArchivium = (archivium_id) => {
        navigate('/admin/editarchivium/' + archivium_id);
    };

    const handleDelete = async (archivium_id) => {
        const confirmed = window.confirm('Are you sure you want to delete this Archivum Article?');

        if (!confirmed) {
            swal.fire({
                icon: 'info',
                title: 'Operation Aborted',
                text: 'Deletion has been canceled.',
            });
            return;
        }

        try {
            await deleteArchivium(archivium_id);
            await fetchAllArchivium();
            swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Archivium deleted successfully!',
            });
        } catch (error) {
            swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to delete Archivium Article. Please try again.',
            });
        }
    };
 
    const [searchQuery, setSearchQuery] = useState('');

    const filteredArchivium = archivium
    ? archivium.filter((archivium) =>
          archivium.avm_title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

    const indexOfLastArchivum = currentPage * archiviumPerPage;
    const indexOfFirstArchivum = indexOfLastArchivum - archiviumPerPage;
    const currentArchivium = filteredArchivium.slice(indexOfFirstArchivum, indexOfLastArchivum);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const startPage = Math.max(1, currentPage - Math.floor(maxPagesDisplayed / 2));
    const endPage = Math.min(
        Math.ceil(filteredArchivium.length / archiviumPerPage),
        startPage + maxPagesDisplayed - 1
    );

    return (
        <div>
            <HeaderNav/>
            <div className="container-fluid py-4 mt-4" style={mediaQuery.matches ? desktopStyle : mobileStyle}>
                <div className="container-fluid py-5">
                    <div className="d-sm-flex justify-content-between">
                        <div className="dropdown d-inline">
                            <Link to="/admin/addarchivium" className="btn btn-outline-dark">
                                <i className="fa-solid fa-box-archive"></i> New Archivium
                            </Link>
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
                                            {filteredArchivium.length > 0 ? (
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
                                                                    Image
                                                                </a>
                                                            </th>
                                                            <th data-sortable="" style={{ width: '10.6114%' }}>
                                                                <a href="#" className="dataTable-sorter text-dark">
                                                                    Body
                                                                </a>
                                                            </th>
                                                            <th data-sortable="" style={{ width: '10.6114%' }}>
                                                                <a href="#" className="dataTable-sorter text-dark">
                                                                    Video Link
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
                                                        {currentArchivium.length > 0 ? (
                                                            currentArchivium.map((archivium) => (
                                                                <tr key={archivium.id}>
                                                                    <td>
                                                                        <div className="d-flex align-items-center">
                                                                            <p className="text-xs font-weight-bold ms-2 mb-0">#{archivium.id}</p>
                                                                        </div>
                                                                    </td>
                                                                    <td className="font-weight-bold">
                                                                        <span className="my-2 text-xs">{archivium.avm_title}</span>
                                                                    </td>
                                                                    <td className="w-20">
                                                                        <img
                                                                        className="w-100 h-50 border-radius-sm img-fluid" 
                                                                            src={archivium.avm_picture}
                                                                        />
                                                                    </td>
                                                                    <td className="text-xs font-weight-bold">
                                                                        <span className="my-2 text-xs">{truncateText(archivium.avm_body, 8)}</span>
                                                                    </td>
                                                                    <td className="text-xs font-weight-bold">
                                                                        <span className="my-2 text-xs">{truncateText(archivium.avm_video, 4)}</span>
                                                                    </td>
                                                                    <td className="text-xs font-weight-bold">
                                                                        <span className="my-2 text-xs">
                                                                            {new Date(archivium.added_on).toLocaleString()}
                                                                        </span>
                                                                    </td>
                                                                    <td className="text-xs font-weight-bold">
                                                                        <div className="d-flex align-items-center">
                                                                            <button
                                                                                className="btn btn-icon-only btn-rounded btn-outline-primary mb-0 me-2 btn-sm d-flex align-items-center justify-content-center"
                                                                                onClick={() => EditArchivium(archivium.id)}
                                                                            >
                                                                                <i className="fa-regular fa-pen-to-square" aria-hidden="true"></i>
                                                                            </button>
                                                                            <span>Edit</span>
                                                                        </div>
                                                                    </td>
                                                                    <td className="text-xs font-weight-bold">
                                                                        <div className="d-flex align-items-center">
                                                                            <button
                                                                                className="btn btn-icon-only btn-rounded btn-outline-danger mb-0 me-2 btn-sm d-flex align-items-center justify-content-center"
                                                                                onClick={() => handleDelete(archivium.id)}
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
                                            <div className="dataTable-info">Showing {filteredArchivium.length} entries</div>
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
                                                    {currentPage + maxPagesDisplayed < Math.ceil(filteredArchivium.length / archiviumPerPage) && (
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
    archivium: state.auth.archivium,
    user: state.auth.user
});

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllArchivium: () => dispatch(fetchAllArchivium()),
        deleteArchivium: (archivium_id) => dispatch(deleteArchivium(archivium_id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Archivium)
