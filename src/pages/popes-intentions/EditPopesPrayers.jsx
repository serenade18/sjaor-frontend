import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import HeaderNav from '../../components/HeaderNav';
import { connect } from 'react-redux';
import { fetchPopesPrayersDetails, editPopesPrayers } from '../../actions/auth';
import { toast } from 'react-toastify';

const isUrl = (value) => {
    try {
        new URL(value);
        return true;
    } catch (error) {
        return false;
    }
};

const EditPopesPrayers = ({ isAuthenticated, fetchPopesPrayersDetails, editPopesPrayers }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const formRef = useRef(null);

    const [formData, setFormData] = useState({
        title: '',
        image: null,
        body: '',
        author: '',
    });

    useEffect(() => {
        if (!isAuthenticated && !id) {
            navigate('/');
        } else {
            const fetchData = async () => {
                try {
                    const prayersData = await fetchPopesPrayersDetails(id);

                    if (prayersData && prayersData) {
                        const prayerData = prayersData;
                        console.log('Fetched data', prayerData);

                        setFormData((prevFormData) => ({
                            ...prevFormData,
                            prayer_name: prayerData.prayer_name || '',
                            prayer_image: isUrl(prayerData.prayer_image) ? prayerData.prayer_image : null,
                            prayer_item: prayerData.prayer_item || '',
                            prayer_month: prayerData.prayer_month || '',
                            prayer_year: prayerData.prayer_year || '',
                        }));
                    }
                } catch (error) {
                    console.error('Error fetching news data', error);
                }
            };

            fetchData();
        }
    }, [isAuthenticated, navigate, fetchPopesPrayersDetails, id]);

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

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'prayer_image' ? files[0] : value,
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            await editPopesPrayers(formData, id);

            // Show success toast
            toast.success('prayer updated successfully', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
            });

            navigate('/admin/popes-prayer-intentions');
        } catch (error) {
            console.error('Error updating prayer', error.message);

            // Show error toast
            toast.error('Error updating prayer. Please try again.', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
            });
        }
    };

    return (
        <div>
            <HeaderNav />
            <div className="container-fluid py-4 mt-4" style={mediaQuery.matches ? desktopStyle : mobileStyle}>
                <div className="container-fluid py-5">
                    <div className="d-sm-flex justify-content-between">
                        <div className="dropdown d-inline">
                            <Link to="/admin/popes-prayer-intentions" className="btn btn-outline-dark">
                                <i className="ni ni-curved-next"></i> Back
                            </Link>
                        </div>
                        <div className="d-flex"></div>
                    </div>

                    <form ref={formRef} onSubmit={handleFormSubmit} encType="multipart/form-data">
                        <div className="row mt-2">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-body p-3">
                                        <div className="mt-4">
                                            <div className="form-group col-lg-12">
                                                <label htmlFor="title" className="form-control-label text-dark text-sm">
                                                    Prayer Month:
                                                </label>
                                                <input
                                                    className="form-control form-control-lg bg-gray-201 text-dark text-capitalize text-sm"
                                                    placeholder="Prayer Month"
                                                    name="prayer_month"
                                                    value={formData.prayer_month}
                                                    onChange={(e) => setFormData({ ...formData, prayer_month: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group col-lg-12">
                                                <label htmlFor="title" className="form-control-label text-dark text-sm">
                                                    Prayer year:
                                                </label>
                                                <input
                                                    className="form-control form-control-lg bg-gray-201 text-dark text-capitalize text-sm"
                                                    placeholder="Prayer Year"
                                                    name="prayer_year"
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
                                                    placeholder="Prayer Name"
                                                    name="prayer_name"
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
                                                    placeholder="Type / Paste your news article here....."
                                                    name="prayer_item"
                                                    value={formData.prayer_item}
                                                    onChange={(e) => setFormData({ ...formData, prayer_item: e.target.value })}
                                                    required
                                                    rows="8"
                                                />
                                            </div>
                                            <div className="form-group col-lg-12 mt-2">
                                                <label htmlFor="title" className="form-control-label text-dark text-sm">
                                                    Image:
                                                </label>
                                                <div className="form-control bg-gray-201 mt-4 dropzone dz-clickable" id="dropzone">
                                                    <div className="dz-default dz-message">
                                                {formData.prayer_image && <img src={formData.prayer_image} alt="Preview" style={{ width: '20%', height: 'auto' }} />}
                                                        <button className="dz-button" type="button">
                                                            Drop files here to upload
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                name="prayer_image"
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
                                    &nbsp;&nbsp;Save
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    newsDetails: state.auth.newsDetails,
    news: state.auth.news,
});

const mapDispatchToProps = (dispatch) => ({
    fetchPopesPrayersDetails: (popesPrayers_id) => dispatch(fetchPopesPrayersDetails(popesPrayers_id)),
    editPopesPrayers: (popesPrayers_id, formData) => dispatch(editPopesPrayers(popesPrayers_id, formData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPopesPrayers);
