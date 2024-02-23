import React, { useEffect } from 'react'; 
import { Link, useNavigate, useParams } from 'react-router-dom';
import HeaderNav from '../../components/HeaderNav'
import { connect } from 'react-redux';
import { fetchNewsDetails } from '../../actions/auth'

const ViewNews = ({ isAuthenticated, fetchNewsDetails, newsDetails }) => {
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (!isAuthenticated && !id) {
        //    navigate('/');
        } else {
            async function fetchData() {
                try {
                    const newsData = await fetchNewsDetails(id)
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

    const regex = /(<([^>]+)>)/ig;

    return (
        <div>
            <HeaderNav/>
            <div className="container-fluid py-4 mt-4" style={mediaQuery.matches ? desktopStyle : mobileStyle}>
                <div className="container-fluid py-5">
                    <div className="d-sm-flex justify-content-between">
                        <div className="dropdown d-inline">
                            <Link to="/admin/news" className="btn btn-outline-dark">
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
                                                {newsDetails ? newsDetails.title : ''}
                                            </h3>
                                        </div>
                                        <div className="form-group col-lg-12 mt-2">
                                            <label htmlFor="title" className="form-control-label text-dark text-sm">
                                                Image:
                                            </label>
                                            <img src={newsDetails ? newsDetails.image : ''} className='img-fluid w-100' alt="News"/>
                                        </div>
                                        <div className="form-group col-lg-12 mt-2">
                                            <label htmlFor="last_name" className="form-control-label text-dark text-sm">
                                                Body:
                                            </label>
                                            
                                            <p className="bg-gray-201 mt-4 text-dark text-sm">
                                                {newsDetails ? newsDetails.body.replace(regex, '') : ''}
                                            </p>
                                            <p className='text-dark text-lg '>
                                              Authored By : {newsDetails ? newsDetails.author : ''}
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
    newsDetails: state.auth.newsDetails,
    news: state.auth.news
});

const mapDispatchToProps = (dispatch) => ({
    fetchNewsDetails: (news_id) => dispatch(fetchNewsDetails(news_id)),
    
})

export default connect(mapStateToProps, mapDispatchToProps)(ViewNews)
