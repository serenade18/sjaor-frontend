import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import backgroundImage from '../../assets/images/nastya.jpg'
import { reset_password_confirm } from '../../actions/auth';

const ResetPasswordConfirm = ({ reset_password_confirm, match }) => {
    const navigate = useNavigate();
    const { uid, token } = useParams(); // Use useParams to access route parameters
    const [requestSent, setRequestSent] = useState(false)

    const [formData, setFormData] = useState({
        new_password: '',
        re_new_password: ''
    });

    const { new_password, re_new_password } = formData;
    const [showPassword, setShowPassword] = useState(false);

    const onChange = (e) =>
        setFormData({
        ...formData,
        [e.target.name]: e.target.value
        });

    const onSubmit = (e) => {
        e.preventDefault();

        reset_password_confirm(uid, token, new_password, re_new_password);
        setRequestSent(true);
    };

    //is authenticated
    // redidrect
    if (requestSent) {
        navigate('/'); // Use navigate to redirect
    }
    
    return (
        <main className="main-content main-content-bg mt-0 ps">
            <div className="page-header min-vh-100" style={{backgroundImage: `url(${backgroundImage})`, backgroundPosition: "center center"}}>
                <span className="mask bg-gradient-dark opacity-6"></span>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-4 col-md-7">
                            <div className="card border-0 mb-0">

                                <div className="card-header bg-transparent">
                                    <h5 className="text-dark text-center mt-2 mb-3">Reset</h5>
                                </div>

                                <div className="card-body px-lg-5 pt-0">
                                    
                                    <form className="text-start" method="POST" onSubmit={onSubmit}>
                                        
                                        <div className="mb-3 input-group">
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                name="new_password"
                                                className="form-control"
                                                placeholder="*******"
                                                aria-label="Password"
                                                value={new_password}
                                                onChange={(e) => onChange(e)}
                                            />
                                            <span
                                                className="input-group-text bg-gray-100"
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                <i className={`fa ${showPassword ? 'fa-eye text-white' : 'fa-eye-slash'}`}></i>
                                            </span>
                                        </div>
                                        <div className="mb-3 input-group">
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                name="re_new_password"
                                                className="form-control"
                                                placeholder="*******"
                                                aria-label="Password"
                                                value={re_new_password}
                                                onChange={(e) => onChange(e)}
                                            />
                                            <span
                                                className="input-group-text bg-gray-100"
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                <i className={`fa ${showPassword ? 'fa-eye text-white' : 'fa-eye-slash'}`}></i>
                                            </span>
                                        </div>
                                        <div className="text-center">
                                            <button type="submit" className="btn bg-gradient-dark w-100 my-4 mb-2">Submit</button>
                                        </div>
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

export default connect(null, { reset_password_confirm })(ResetPasswordConfirm);
