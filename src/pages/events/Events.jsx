import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import HeaderNav from '../../components/HeaderNav'
import { saveEventCategory, deleteEvents, fetchAllEvents } from '../../actions/auth';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

const Events = ({ isAuthenticated, saveEventCategory, events, fetchAllEvents, deleteEvents }) => {
    const navigate = useNavigate()
    const { id } = useParams();
    const formRef = useRef(null);

    useEffect(() => {
        if (isAuthenticated) {
            // Fetch customer data only if authenticated
                fetchAllEvents();
        } else {
            // navigate('/');
        }
    }, [isAuthenticated, navigate, fetchAllEvents]);

    if (!isAuthenticated) {
        // navigate('/');
    } 

    const desktopStyle = {
        width: 'calc(100% - 265px)',
        marginLeft: '265px',
    };

    const mobileStyle = {
        width: '100%',
        marginLeft: '0',
    };

    // Apply media queries
    const mediaQuery = window.matchMedia('(min-width: 768px)')

    const [formData, setFormData] = useState({
        category: ''
    })

    const [categorybuttonText, setButtonText] = useState('Add Category'); // Initial button text
    const [iscategoryButtonDisabled, setButtonDisabled] = useState(false);
    
    const [isViewModalOpen, setViewModalOpen] = useState(false);

    const openViewModal = () => {
        setViewModalOpen(true);
    };
    
    const closeViewModal = () => {
        setViewModalOpen(false);
        setFormData({
            category: ''
        });
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log("form data" ,formData);
            const response = await saveEventCategory(formData.category);
            console.log(response);

            if (response.data.error) {
                toast.error(response.data.message, { toastId: 'error' });
            } else {
                toast.success('Category Added Successfully', { toastId: "success" });
                setTimeout(() => {
                    setFormData({
                        category: ''
                    });
                }, 2000)
                fetchAllEventCategory();
                fetchAllEvents();
            }
    
        } catch (error) {
            console.log('Error during form submission', error)
            // toast.error('Something went wrong. Check Your Network', { toastId: 'error' });
           
        }
    }

    const [searchQuery, setSearchQuery] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const eventsPerPage = 24;
    const maxPagesDisplayed = 5;

    const filteredEvents = events
    ? events.filter((events) =>
          events.event_name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

    const indexOfLastEvents = currentPage * eventsPerPage;
    const indexOfFirstEvents = indexOfLastEvents - eventsPerPage;
    const currentEvents = filteredEvents.slice(indexOfFirstEvents, indexOfLastEvents);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const startPage = Math.max(1, currentPage - Math.floor(maxPagesDisplayed / 2));
    const endPage = Math.min(
        Math.ceil(filteredEvents.length / eventsPerPage),
        startPage + maxPagesDisplayed - 1
    );

    const EditEvents = (events_id) => {
        navigate('/admin/editevent/' + events_id);
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
                                onClick={() => navigate('/admin/addevent')}
                            >
                                <i className="fa-regular fa-calendar-days"></i> New Event
                            </button>
                            
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
                                                                    value={formData.category}
                                                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
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
                                            {filteredEvents.length > 0 ? (
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
                                                                    Event Name
                                                                </a>
                                                            </th>
                                                            <th data-sortable="" style={{ width: '24%' }}>
                                                                <a href="#" className="dataTable-sorter text-dark">
                                                                    Event Day
                                                                </a>
                                                            </th>
                                                            <th data-sortable="" style={{ width: '10.6114%' }}>
                                                                <a href="#" className="dataTable-sorter text-dark">
                                                                    Event Month
                                                                </a>
                                                            </th>
                                                            <th data-sortable="" style={{ width: '24%' }}>
                                                                <a href="#" className="dataTable-sorter text-dark">
                                                                    Event Image
                                                                </a>
                                                            </th>
                                                            <th data-sortable="" style={{ width: '15%' }}>
                                                                <a href="#" className="dataTable-sorter text-dark">
                                                                    Event Location
                                                                </a>
                                                            </th>
                                                            <th data-sortable="" style={{ width: '15%' }}>
                                                                <a href="#" className="dataTable-sorter text-dark">
                                                                   Event Description 
                                                                </a>
                                                            </th>
                                                            <th data-sortable="" style={{ width: '15%' }}>
                                                                <a href="#" className="dataTable-sorter text-dark">
                                                                    Added On
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
                                                        {currentEvents.length > 0 ? (
                                                            currentEvents.map((events) => (
                                                                <tr key={events.id}>
                                                                    <td>
                                                                        <div className="d-flex align-items-center">
                                                                            <p className="text-xs font-weight-bold ms-2 mb-0">#{events.id}</p>
                                                                        </div>
                                                                    </td>
                                                                    <td className="font-weight-bold">
                                                                        <span className="my-2 text-xs">{events.event_name}</span>
                                                                    </td>
                                                                    <td className="text-xs font-weight-bold">
                                                                        <span className="my-2 text-xs">{events.event_day}</span>
                                                                    </td>
                                                                    <td className="text-xs font-weight-bold">
                                                                        <span className="my-2 text-xs">{events.event_month}</span>
                                                                    </td>
                                                                    <td className="w-20">
                                                                        <img
                                                                        className="w-100 h-50 border-radius-sm img-fluid" 
                                                                            src={events.event_image}
                                                                        />
                                                                    </td>
                                                                    <td className="text-xs font-weight-bold">
                                                                        <span className="my-2 text-xs">{events.event_location}</span>
                                                                    </td>
                                                                    <td className="text-xs font-weight-bold">
                                                                        <span className="my-2 text-xs">{events.event_description}</span>
                                                                    </td>
                                                                    <td className="text-xs font-weight-bold">
                                                                        <span className="my-2 text-xs">
                                                                            {new Date(events.added_on).toLocaleString()}
                                                                        </span>
                                                                    </td>
                                                                    <td className="text-xs font-weight-bold">
                                                                        <div className="d-flex align-items-center">
                                                                            <button
                                                                                className="btn btn-icon-only btn-rounded btn-outline-primary mb-0 me-2 btn-sm d-flex align-items-center justify-content-center"
                                                                                onClick={() => EditEvents(events.id)}
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
                                                                                onClick={() => handleDelete(events.id)}
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
                                            <div className="dataTable-info">Showing {filteredEvents.length} entries</div>
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
                                                    {currentPage + maxPagesDisplayed < Math.ceil(filteredEvents.length / eventsPerPage) && (
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
    events: state.auth.events,
    user: state.auth.user
});

const mapDispatchToProps = (dispatch) => {
    return {
        saveEventCategory: (category) => dispatch(saveEventCategory(category)),
        fetchAllEvents: () => dispatch(fetchAllEvents()),
        deleteEvents: (events_id) => dispatch(deleteEvents(events_id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Events)
