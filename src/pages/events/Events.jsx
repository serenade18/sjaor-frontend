import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import HeaderNav from '../../components/HeaderNav'
import { saveEventCategory } from '../../actions/auth';
import { connect } from 'react-redux';
import Select from 'react-select';
import { toast } from 'react-toastify';

const Events = ({ saveEventCategory }) => {
    const navigate = useNavigate()
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
                // fetchAllDocuments();
            }
    
        } catch (error) {
            console.log('Error during form submission', error)
            toast.error('Something went wrong. Check Your Network', { toastId: 'error' });
           
        }
    }

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
        saveEventCategory: (category) => dispatch(saveEventCategory(category))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Events)
