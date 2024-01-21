import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import backgroundImage from '../../assets/images/nastya.jpg'
import { signup } from '../../actions/auth';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { ToastContainer, toast } from 'react-toastify';

const Signup = ({ signup, isAuthenticated }) => {
    const navigate = useNavigate(); // Initialize navigate

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
        user_type: 'normal',
        password: '',
        re_password: '',
    });

    const { first_name, last_name, phone, email, user_type, password, re_password } = formData;
    const [showPassword, setShowPassword] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    const onCheckboxChange = () => {
        setAgreedToTerms(!agreedToTerms);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
      
        try {
            if (!agreedToTerms) {
                toast.error('Please agree to the terms and conditions.');
                return;
            }

          if (password === re_password) {
            const response = await signup(first_name, last_name, phone, email, user_type, password, re_password);
      
            console.log(response); // Log the API response
      
            if (response && response.success === false) {
              // Unsuccessful signup
              if (response.error && response.error.email) {
                toast.error(response.error.email[0]); // Use the error message from the API response
              } else {
                toast.error('Signup failed. Please check your details and try again.');
              }
            } else {
              // Successful signup
              toast.success('Signup successful. An activation link has been sent to your email.');
              navigate('/');
            }
          }
        } catch (err) {
          // Handle any other errors, e.g., network issues, and show an error toast.
          toast.error('An error occurred. Please try again.');
          console.log(err);
        }
    };

    //is authenticated
    if (isAuthenticated) {
        navigate('/home'); // Use navigate to redirect
        return null; // Return null or any other content if needed
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
                                    <h5>Register</h5>
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
                                            <input type="text" name="first_name" className="form-control" placeholder="First Name" aria-label="First Name" value={first_name} onChange={(e) => onChange(e)}/>
                                        </div>
                                        <div className="mb-3">
                                            <input type="text" name="last_name" className="form-control" placeholder="Last Name" aria-label="Last Name" value={last_name} onChange={(e) => onChange(e)}/>
                                        </div>
                                        <div className="mb-3">
                                            <input type="phone" name="phone" className="form-control" placeholder="Phone" aria-label="Phone" value={phone} onChange={(e) => onChange(e)}/>
                                        </div>
                                        <div className="mb-3">
                                            <input type="email" name="email" className="form-control" placeholder="Email" aria-label="Email" value={email} onChange={(e) => onChange(e)}/>
                                        </div>
                                        <div className="mb-3 input-group">
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                name="password"
                                                className="form-control"
                                                placeholder="*******"
                                                aria-label="Password"
                                                value={password}
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
                                                name="re_password"
                                                className="form-control"
                                                placeholder="*******"
                                                aria-label="Password"
                                                value={re_password}
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
                                        <div className="form-check form-check-info text-start">
                                            <input className="form-check-input" type="checkbox" checked={agreedToTerms} id="flexCheckDefault" onChange={onCheckboxChange} required/>
                                            <label className="form-check-label" for="flexCheckDefault">
                                            I agree the <a href="#" className="text-dark font-weight-bolder">Terms and Conditions</a>
                                            </label>
                                        </div>
                                        <div className="text-center">
                                            <button type="submit" className="btn bg-gradient-dark w-100 my-4 mb-2">Sign up</button>
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

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { signup })(Signup);
