import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HeaderNav from '../../components/HeaderNav'
import { connect } from 'react-redux';
import { saveEvents, fetchEventOnly } from '../../actions/auth'
import { toast } from 'react-toastify';
import Select from 'react-select';

const AddEvents = ({ isAuthenticated, saveEvents, fetchEventOnly }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
        //   navigate('/');
        }
    }, [isAuthenticated, navigate]);

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

    const [formData, setFormData] = useState({
        event_name: '',
        event_category: '',
        event_day: '',
        event_month: '',
        event_year: '',
        event_location: '',
        event_description: '',
        event_image: null,
    });

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'event_image' ? files[0] : value,
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();

        formDataToSend.append('event_name', formData.event_name);
        formDataToSend.append('event_category', formData.event_category);
        formDataToSend.append('event_day', formData.event_day);
        formDataToSend.append('event_month', formData.event_month);
        formDataToSend.append('event_year', formData.event_year);
        formDataToSend.append('event_location', formData.event_location);
        formDataToSend.append('event_description', formData.event_description);
        formDataToSend.append('event_image', formData.event_image);

        try {
            const response = await saveEvents(formDataToSend);
            console.log(response);

            // console.log('News posted successfully');
            // Show success toast
            toast.success('News posted successfully', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
            });
            navigate('/admin/events');

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

    const [selectedCategoryOptions, setSelectedCategoryOption] = useState(null);
    const [categoryOptions, setCategoryOptions] = useState([]);

    useEffect(() => {
        const fetchCategoryData = async () => {
            try {
                const categories = await fetchEventOnly();
                console.log(categories)
                setCategoryOptions(categories);
            } catch (error) {
                console.error('Error fetching batch data:', error);
            }
        };

        fetchCategoryData();
    }, [fetchEventOnly]);

    const handleCategorySelect = (selectedOption) => {
        setSelectedCategoryOption(selectedOption);
        if (selectedOption) {
            setFormData({
                ...formData,
                event_category: selectedOption.value, // Assign the selected batch's id to document_category
            });
            setSelectedCategoryOption(selectedOption);
        }
    };

    return (
        <div>
            <HeaderNav/>
            <div className="container-fluid py-4 mt-4" style={mediaQuery.matches ? desktopStyle : mobileStyle}>
                <div className="container-fluid py-5">
                    <div className="d-sm-flex justify-content-between">
                        <div className="dropdown d-inline">
                            <Link to="/admin/events" className="btn btn-outline-dark">
                                <i className="ni ni-curved-next"></i> Back
                            </Link>
                        </div>
                        <div className="d-flex">
                            
                        </div>

                    </div>

                    <form onSubmit={handleFormSubmit} encType="multipart/form-data">
                        <div className="row mt-2">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-body p-3">
                                        <div className="mt-4">
                                            <div className="form-group col-lg-12">
                                                <label htmlFor="title" className="form-control-label text-dark text-sm">
                                                    Event Name:
                                                </label>
                                                <input 
                                                    className="form-control form-control-lg bg-gray-201 text-dark text-capitalize text-sm" 
                                                    placeholder="Event Name"
                                                    name='event_name'
                                                    value={formData.event_name}
                                                    onChange={(e) => setFormData({ ...formData, event_name: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group col-lg-12">
                                                <label htmlFor="title" className="form-control-label text-dark text-sm">
                                                    Event Day:
                                                </label>
                                                <input 
                                                    className="form-control form-control-lg bg-gray-201 text-dark text-capitalize text-sm" 
                                                    placeholder="Day"
                                                    name='event_day'
                                                    value={formData.event_day}
                                                    onChange={(e) => setFormData({ ...formData, event_day: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group col-lg-12">
                                                <label htmlFor="title" className="form-control-label text-dark text-sm">
                                                    Event Month
                                                </label>
                                                <div className='input-group'>
                                                    <select 
                                                        className='form-control' 
                                                        name='event_month' 
                                                        placeholder='Month'
                                                        value={formData.event_month}
                                                        onChange={(e) =>setFormData({ ...formData, event_month: e.target.value })}
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
                                            </div>
                                            <div className="form-group col-lg-12">
                                                <label htmlFor="title" className="form-control-label text-dark text-sm">
                                                    Event Year:
                                                </label>
                                                <input 
                                                    className="form-control form-control-lg bg-gray-201 text-dark text-capitalize text-sm" 
                                                    placeholder="Year"
                                                    name='event_year'
                                                    value={formData.event_year}
                                                    onChange={(e) => setFormData({ ...formData, event_year: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group col-lg-12">
                                                <label htmlFor="title" className="form-control-label text-dark text-sm">
                                                    Event Location:
                                                </label>
                                                <input 
                                                    className="form-control form-control-lg bg-gray-201 text-dark text-capitalize text-sm" 
                                                    placeholder="Location"
                                                    name='event_location'
                                                    value={formData.event_location}
                                                    onChange={(e) => setFormData({ ...formData, event_location: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group col-lg-12">
                                                <label htmlFor="title" className="form-control-label text-dark text-sm">
                                                    Event desecription:
                                                </label>
                                                <input 
                                                    className="form-control form-control-lg bg-gray-201 text-dark text-capitalize text-sm" 
                                                    placeholder="Description"
                                                    name='event_description'
                                                    value={formData.event_description}
                                                    onChange={(e) => setFormData({ ...formData, event_description: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group col-lg-12 mt-2">
                                                <label htmlFor="title" className="form-control-label text-dark text-sm">
                                                    Image:
                                                </label>
                                                <div className="form-control bg-gray-201 mt-4 dropzone dz-clickable" id="dropzone" >
                                                    <div className="dz-default dz-message">
                                                        <button className="dz-button" type="button">Drop files here to upload
                                                        <input 
                                                            required
                                                            type="file"
                                                            accept='image/*'
                                                            name='event_image'
                                                            onChange={handleInputChange}
                                                        />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group col-lg-12">
                                                <label htmlFor="title" className="form-control-label text-dark text-sm">
                                                    Event Category:
                                                </label>
                                                <Select
                                                    id="document_category"
                                                    name="document_category"
                                                    className="form-control"
                                                    value={selectedCategoryOptions}
                                                    onChange={handleCategorySelect}
                                                    options={categoryOptions && categoryOptions.map((event) => ({
                                                        value: event.id,
                                                        label: event.category,
                                                    }))}
                                                    placeholder="--- Browse Category ---"
                                                    isClearable
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-12 d-flex justify-content-start text-white text-end">
                                <button className="btn bg-gradient-blue mt-4 text-white mx-0" type="submit">
                                    <i className="fas fa-plus" aria-hidden="true"></i>
                                    &nbsp;&nbsp;Save 
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

// const mapStateToProps = (state) => ({
//     isAuthenticated: state.auth.isAuthenticated,
// });

// export default connect(mapStateToProps, { saveEvents })(AddEvents)
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    events: state.auth.events,
    user: state.auth.user
});

const mapDispatchToProps = (dispatch) => {
    return {
        fetchEventOnly: () => dispatch(fetchEventOnly()),
        saveEvents: (formData) => dispatch(saveEvents(formData)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEvents)