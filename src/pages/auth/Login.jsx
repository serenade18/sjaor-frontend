import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../../actions/auth';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import backgroundImage from '../../assets/images/nastya.jpg'
import logo from '../../assets/images/lgo.png'

const Login = ({ login, isAuthenticated, user }) => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
      email: '',
      password: ''
    });
    const { email, password } = formData;

    const onChange = (e) =>
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
  
    const onSubmit = async (e) => {
      e.preventDefault();
      try {
        await login(email, password);
      } catch (err) {
        alert('Confirm login credentials')
        console.log(err);
      }
    };

    const [showPassword, setShowPassword] = useState(false);

    //is authenticated redirect
    if (isAuthenticated) {
        return (
            navigate('/home')
        );
    } 

    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        try {
            setLoading(true); // Set loading state to true
            const response = await login(email, password);
            console.log(response)
    
            if (response.success) {
                // Display a success toast only when the login is successful
                toast.success('Login successful', { toastId: 'success' });
                navigate('/home');
            } else if (response.error) {
                // If the API response contains an 'error' property, show an error toast with the error message.
                toast.error(response.error, { toastId: 'error' });
            } else {
                // Handle other unexpected responses.
                toast.error('An error occurred. Please try again.', { toastId: 'error' });
            }
        } catch (err) {
            // Handle any other errors, e.g., network issues, and show an error toast.
            toast.error('An error occurred. Please try again.', { toastId: 'error' });
            console.log(err);
        } finally {
            setLoading(false); // Reset loading state after login attempt
        }
    };  


    return (
        <main className="main-content main-content-bg mt-0 ps">
            <section>
                <div className="page-header min-vh-100">
                    <div className="container">
                        <div className="row">
                            <div className="col-6 col-md-8 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 start-0 text-center justify-content-center flex-column">
                                <div
                                    className="position-relative bg-gradient-primary h-100 m-3 py-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden"
                                    style={{
                                        backgroundImage: `url(${backgroundImage})`,
                                        backgroundPosition: "center center",
                                        backgroundRepeat: "no-repeat"
                                    }}
                                >
                                    <span className="mask bg-gradient-dark opacity-3"></span>
                                    <div className="position-absolute bottom-0 start-0 mb-5 ms-5">
                                        <p className="text-white text-start"> 
                                            <img
                                                src={logo} // Replace with the actual image URL
                                                alt="Your Alt Text"
                                                className="w-7 border-radius-sm img-fluid" // Adjust classes as needed
                                            />
                                            <strong> SJ-AOR</strong> Welcome to the admin panel for the SJ-AOR jesuits application
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="col-6 col-md-4 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 end-0 text-center justify-content-center flex-column">
                                <div className="col-md-10 d-flex flex-column mx-auto text-end">
                                    <div className="card card-plain">
                                        <div className="card-header pb-0 text-start">
                                            <h4 className="font-weight-bolder">Sign In</h4>
                                            <p className="mb-0">Enter your email and password to sign in</p>
                                        </div>
                                        <div className="card-body">
                                            <form role="form" method="POST" onSubmit={onSubmit}>
                                                <div className="mb-3">
                                                    <input 
                                                        type="email" 
                                                        className="form-control form-control-lg" 
                                                        placeholder="Email" 
                                                        name="email"
                                                        aria-label="Email"
                                                        value={email}
                                                        onChange={(e) => onChange(e)}
                                                        required
                                                    />
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
                                                <div className="form-check form-switch">
                                                    <input 
                                                        className="form-check-input" 
                                                        type="checkbox" 
                                                        id="rememberMe"
                                                    />
                                                    <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                                                </div>
                                                <div className="form-check-label text-start mt-2">
                                                    Forgot password? <Link to="/reset-password" className="text-dark font-weight-bolder">Reset</Link>
                                                </div>
                                                <div className="text-center">
                                                    <button 
                                                        type="submit" 
                                                        className="btn btn-lg bg-gradient-dark btn-lg w-100 mt-4 mb-0"
                                                        onClick={handleLogin}
                                                        disabled={loading}
                                                    >
                                                        {loading ? 'Signing In...' : 'Sign in'}
                                                    </button>
                                                </div>
                                                <div className="form-check-label text-start mt-2">
                                                    Don't have an account? <Link to="/signup" className="text-dark font-weight-bolder">Sign Up</Link>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
