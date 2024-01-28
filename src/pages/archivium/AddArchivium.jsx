import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HeaderNav from '../../components/HeaderNav'
import { connect } from 'react-redux';
import { saveArchivium } from '../../actions/auth'
import { toast } from 'react-toastify';

const AddArchivium = ({ isAuthenticated, saveArchivium }) => {
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
        avm_title: '',
        avm_picture: null,
        avm_body: '',
        avm_video: ''
    });

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'avm_video') {
            // Parse and modify the iframe tag
            const modifiedValue = modifyIframeTag(value);
            setFormData({
                ...formData,
                [name]: modifiedValue,
            });
        } else {
            setFormData({
                ...formData,
                [name]: name === 'avm_picture' ? files[0] : value,
            });
        }
    };

    const modifyIframeTag = (iframeTag) => {
        // Parse the iframe tag
        const parser = new DOMParser();
        const doc = parser.parseFromString(iframeTag, 'text/html');
        const iframeElement = doc.body.firstChild;

        // Modify width and height attributes
        iframeElement.width = '100%';
        iframeElement.height = '100%';

        // Serialize the modified iframe tag
        const modifiedIframeTag = new XMLSerializer().serializeToString(iframeElement);

        return modifiedIframeTag;
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();

        formDataToSend.append('avm_title', formData.avm_title);
        formDataToSend.append('avm_picture', formData.avm_picture);
        formDataToSend.append('avm_body', formData.avm_body);
        formDataToSend.append('avm_video', formData.avm_video);

        try {
            const response = await saveArchivium(formDataToSend);
            console.log(response);

            // Show success toast
            toast.success('Archivium posted successfully', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
            });
            navigate('/admin/archivium');

        } catch (error) {
            console.error('Error posting Archivium', error.message);
            // Show error toast
            toast.error('Error posting Archivium. Please try again.', {
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
                            <Link to="/admin/archivium" className="btn btn-outline-dark">
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
                                                    Title:
                                                </label>
                                                <input 
                                                    className="form-control form-control-lg bg-gray-201 text-dark text-capitalize text-sm" 
                                                    placeholder="Title"
                                                    name='avm_title'
                                                    value={formData.avm_title}
                                                    onChange={(e) => setFormData({ ...formData, avm_title: e.target.value })}
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
                                                            name='avm_picture'
                                                            onChange={handleInputChange}
                                                        />
                                                        </button>
                                                    </div>
                                                </div> 
                                            </div>
                                            <div className="form-group col-lg-12 mt-2">
                                                <label htmlFor="last_name" className="form-control-label text-dark text-sm">
                                                    Body:
                                                </label>
                                                <textarea 
                                                    className="form-control bg-gray-201 mt-4 text-dark text-sm" 
                                                    id="exampleFormControlTextarea1" 
                                                    placeholder="Type / Paste your news article here....."
                                                    name='avm_body'
                                                    value={formData.avm_body}
                                                    onChange={(e) => setFormData({ ...formData, avm_body: e.target.value })}
                                                    required
                                                    rows="8"
                                                />
                                            </div>
                                            <div className="form-group col-lg-12 mt-2">
                                                <label htmlFor="title" className="form-control-label text-dark text-sm">
                                                    Video Share Link:
                                                </label>
                                                <textarea 
                                                    className="form-control form-control-lg bg-gray-201 text-dark text-sm" 
                                                    placeholder="<iframe width='100' height='100'....."
                                                    name='avm_video'
                                                    value={formData.avm_video}
                                                    onChange={handleInputChange}
                                                    rows="8"
                                                    required
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
    );
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { saveArchivium })(AddArchivium);
