import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HeaderNav from '../../components/HeaderNav'
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { savePopesPrayers } from '../../actions/auth'

const AddPopesPrayer = ({ isAuthenticated, savePopesPrayers }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
          //navigate('/');
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
        prayer_month: '',
        prayer_year: '',
        prayer_name: '',
        prayer_item: '',
        prayer_image: null,
    });

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'prayer_image' ? files[0] : value,
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();

        formDataToSend.append('prayer_month', formData.prayer_month);
        formDataToSend.append('prayer_year', formData.prayer_year);
        formDataToSend.append('prayer_name', formData.prayer_name);
        formDataToSend.append('prayer_item', formData.prayer_item);
        formDataToSend.append('prayer_image', formData.prayer_image);

        try {
            const response = await savePopesPrayers(formDataToSend);
            console.log(response);

            // console.log('News posted successfully');
            // Show success toast
            toast.success('Prayer posted successfully', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
            });
            navigate('/admin/popes-prayer-intentions');

        } catch (error) {
           
        }
    };

    return (
        <div>
            <HeaderNav/>
            <div className="container-fluid py-4 mt-4" style={mediaQuery.matches ? desktopStyle : mobileStyle}>
                <div className="container-fluid py-5">
                    <div className="d-sm-flex justify-content-between">
                        <div className="dropdown d-inline">
                            <Link to="/admin/popes-prayer-intentions" className="btn btn-outline-dark">
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
                                                    Prayer Month:
                                                </label>
                                                <div className='input-group'>
                                                    <select 
                                                        className='form-control' 
                                                        name='prayer_month' 
                                                        placeholder='Month'
                                                        value={formData.prayer_month}
                                                        onChange={(e) =>setFormData({ ...formData, prayer_month: e.target.value })}
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
                                                    Prayer Year:
                                                </label>
                                                <input 
                                                    className="form-control form-control-lg bg-gray-201 text-dark text-capitalize text-sm" 
                                                    placeholder="Year"
                                                    name='prayer_year'
                                                    value={formData.prayer_year}
                                                    onChange={(e) => setFormData({ ...formData, prayer_year: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group col-lg-12">
                                                <label htmlFor="title" className="form-control-label text-dark text-sm">
                                                    Prayer Name:
                                                </label>
                                                <input 
                                                    className="form-control form-control-lg bg-gray-201 text-dark text-capitalize text-sm" 
                                                    placeholder="Name"
                                                    name='prayer_name'
                                                    value={formData.prayer_name}
                                                    onChange={(e) => setFormData({ ...formData, prayer_name: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group col-lg-12 mt-2">
                                                <label htmlFor="last_name" className="form-control-label text-dark text-sm">
                                                    Prayer Item:
                                                </label>
                                                <textarea 
                                                    className="form-control bg-gray-201 mt-4 text-dark text-sm" 
                                                    id="exampleFormControlTextarea1" 
                                                    placeholder="Type / Paste your news article here....."
                                                    rows="8"
                                                    name='prayer_item'
                                                    value={formData.prayer_item}
                                                    onChange={(e) => setFormData({ ...formData, prayer_item: e.target.value })}
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
                                                            name='prayer_image'
                                                            onChange={handleInputChange}
                                                        />
                                                        </button>
                                                    </div>
                                                </div>
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
                                    &nbsp;&nbsp;Post 
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { savePopesPrayers })(AddPopesPrayer)
