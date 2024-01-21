import React, { useState } from 'react';
import { connect } from 'react-redux';
import { verify } from '../../actions/auth';
import backgroundImage from '../../assets/images/nastya.jpg'
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams

const Activate = ({ verify }) => {
    const navigate = useNavigate();
    const { uid, token } = useParams(); // Use useParams to access route parameters
    const [verified, setVerified] = useState(false);

    const verifyAccount = () => {
        verify(uid, token);
        setVerified(true);
    };

    // Redirect if verified
    if (verified) {
        navigate('/'); // Use navigate to redirect
        return null; // Return null or any other content if needed
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
                                    <h5 className="text-dark text-center mt-2 mb-3">Activate Account</h5>
                                    
                                </div>

                                <div className="card-body px-lg-5 pt-0">
                                    
                                    <form >
                                        <div className="text-center">
                                            <button type="submit" onClick={verifyAccount} className="btn bg-gradient-dark w-100 my-4 mb-2">Activate Account</button>
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

export default connect(null, { verify })(Activate);
