import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import backgroundImage from '../../assets/images/nastya.jpg'

import { reset_password } from '../../actions/auth';

const ResetPassword = ({ reset_password }) => {
    
    const navigate = useNavigate();
    const [requestSent, setRequestSent] = useState(false)

    const [formData, setFormData] = useState({
        email: '',
    });

    const { email } = formData;

    const onChange = (e) =>
        setFormData({
        ...formData,
        [e.target.name]: e.target.value
        });

    const onSubmit = (e) => {
        e.preventDefault();

        reset_password(email);
        setRequestSent(true);
    };

    //is authenticated
    // redidrect
    if (requestSent) {
        navigate('/')
    }

    return (
        <main className="main-content main-content-bg mt-0 ps">
            <div className="page-header min-vh-100" style={{backgroundImage: `url(${backgroundImage})`, backgroundPosition: "center center"}}>
                <span className="mask bg-gradient-dark opacity-6"></span>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-4 col-md-7">
                            <div className="card z-index-0">
                                <div className="card-header text-center pt-4">
                                    <h5>Reset Password</h5>
                                </div>

                                <div className="row px-xl-5 px-sm-4 px-3">

                                    

                                    <div className="mt-2 position-relative text-center">
                                        <p className="text-sm font-weight-bold mb-2 text-secondary text-border d-inline z-index-2 bg-white px-3">
                                            or
                                        </p>
                                    </div>
                                </div>

                                <div className="card-body">
                                    <form method="POST" onSubmit={onSubmit}>
                                        <div className="mb-3">
                                            <input type="email" name="email" className="form-control" placeholder="Email" aria-label="Email" value={email} onChange={(e) => onChange(e)}/>
                                        </div>
                                        <div className="text-center">
                                            <button type="submit" className="btn bg-gradient-dark w-100 my-4 mb-2">Submit</button>
                                        </div>
                                        <p className="text-sm mt-3 mb-0">Already have an account? <Link to="/" className="text-dark font-weight-bolder">Sign in</Link></p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default connect(null, { reset_password })(ResetPassword);
