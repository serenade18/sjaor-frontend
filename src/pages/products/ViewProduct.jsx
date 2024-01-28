import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import HeaderNav from '../../components/HeaderNav'
import { connect } from 'react-redux';
import { fetchProductDetails } from '../../actions/auth'

const ViewProduct = ({ isAuthenticated, fetchProductDetails, productDetails }) => {
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (!isAuthenticated && !id) {
           navigate('/');
        } else {
            async function fetchData() {
                try {
                    const newsData = await fetchProductDetails(id)
                    console.log('News Data', newsData)
                } catch (error) {
                    console.error('Error fetching news data', error)
                }
            }
            fetchData();
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
                    <div className="row mt-2">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body p-3">
                                    <div className="mt-4">
                                        <div className="form-group col-lg-12">
                                            <label htmlFor="title" className="form-control-label text-dark text-sm">
                                                Title:
                                            </label>
                                            <h3 className='text-dark  text-lg font-weight-light'>
                                                {productDetails ? productDetails.product_title : ''}
                                            </h3>
                                        </div>
                                        <div className="form-group col-lg-12 mt-2">
                                            <label htmlFor="title" className="form-control-label text-dark text-sm">
                                                Image:
                                            </label>
                                            <img src={productDetails ? productDetails.product_image : ''} className='img-fluid w-30' alt="News"/>
                                        </div>
                                        <div className="form-group col-lg-12 mt-2">
                                            <label htmlFor="last_name" className="form-control-label text-dark text-sm">
                                                Description:
                                            </label>
                                            <p className="bg-gray-201 mt-4 text-dark text-sm">
                                                {productDetails ? productDetails.product_description : ''}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    productDetails: state.auth.productDetails,
    news: state.auth.news
});

const mapDispatchToProps = (dispatch) => ({
    fetchProductDetails: (news_id) => dispatch(fetchProductDetails(news_id)),
    
})

export default connect(mapStateToProps, mapDispatchToProps)(ViewProduct)
