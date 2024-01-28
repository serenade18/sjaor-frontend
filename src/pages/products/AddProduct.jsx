import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HeaderNav from '../../components/HeaderNav'
import { connect } from 'react-redux';
import { saveProducts } from '../../actions/auth'
import { toast } from 'react-toastify';

const AddProduct = ({ isAuthenticated, saveProducts }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
          navigate('/');
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
        product_title: '',
        product_image: null,
        product_description: '',
    });

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'product_image' ? files[0] : value,
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();

        formDataToSend.append('product_title', formData.product_title);
        formDataToSend.append('product_image', formData.product_image);
        formDataToSend.append('product_description', formData.product_description);

        try {
            const response = await saveProducts(formDataToSend);
            console.log(response);

            // console.log('News posted successfully');
            // Show success toast
            toast.success('Produc Added successfully', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
            });
            navigate('/admin/products');

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

    return (
        <div>
            <HeaderNav/>
            <div className="container-fluid py-4 mt-4" style={mediaQuery.matches ? desktopStyle : mobileStyle}>
                <div className="container-fluid py-5">
                    <div className="d-sm-flex justify-content-between">
                        <div className="dropdown d-inline">
                            <Link to="/admin/products" className="btn btn-outline-dark">
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
                                            <div className="form-group col-lg-12 mt-2">
                                                <label htmlFor="title" className="form-control-label text-dark text-sm">
                                                    Title:
                                                </label>
                                                <input 
                                                    className="form-control form-control-lg bg-gray-201 text-dark text-capitalize text-sm" 
                                                    placeholder="Title"
                                                    name='product_title'
                                                    value={formData.product_title}
                                                    onChange={(e) => setFormData({ ...formData, product_title: e.target.value })}
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
                                                            name='product_image'
                                                            onChange={handleInputChange}
                                                        />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group col-lg-12 mt-2">
                                                <label htmlFor="last_name" className="form-control-label text-dark text-sm">
                                                    Description:
                                                </label>
                                                <textarea 
                                                    className="form-control bg-gray-201 mt-4 text-dark text-sm" 
                                                    id="exampleFormControlTextarea1" 
                                                    placeholder="Type / Paste your news article here....."
                                                    name='product_description'
                                                    value={formData.product_description}
                                                    onChange={(e) => setFormData({ ...formData, product_description: e.target.value })}
                                                    required
                                                    rows="8"
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

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { saveProducts })(AddProduct)
