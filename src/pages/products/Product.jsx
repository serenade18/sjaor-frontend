import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HeaderNav from '../../components/HeaderNav'
import { fetchAllProducts, deleteProducts } from '../../actions/auth';
import { connect } from 'react-redux';
import swal from 'sweetalert2';

const Product = ({ isAuthenticated, fetchAllProducts, deleteProducts, products, user }) => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 24;
    const maxPagesDisplayed = 5;

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

    useEffect(() => {
        if (isAuthenticated) {
            // Fetch customer data only if authenticated
                fetchAllProducts();
        } else {
            // navigate('/');
        }
    }, [isAuthenticated, navigate, fetchAllProducts]);

    if (!isAuthenticated) {
        // navigate('/');
    } 

    const viewProducts = (products_id) => {
        navigate('/admin/viewproduct/' + products_id);
    };

    const EditProduct = (products_id) => {
        navigate('/admin/editproduct/' + products_id);
    };

    const handleDelete = async (products_id) => {
        const confirmed = window.confirm('Are you sure you want to delete this products Article?');

        if (!confirmed) {
            swal.fire({
                icon: 'info',
                title: 'Operation Aborted',
                text: 'Deletion has been canceled.',
            });
            return;
        }

        try {
            await deleteProducts(products_id);
            await fetchAllProducts();
            swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'products deleted successfully!',
            });
        } catch (error) {
            swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to delete products Article. Please try again.',
            });
        }
    };
 
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProducts = products
    ? products.filter((products) =>
          products.product_description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const startPage = Math.max(1, currentPage - Math.floor(maxPagesDisplayed / 2));
    const endPage = Math.min(
        Math.ceil(filteredProducts.length / productsPerPage),
        startPage + maxPagesDisplayed - 1
    );

    return (
        <div>
            <HeaderNav/>
            <div className="container-fluid py-4 mt-4" style={mediaQuery.matches ? desktopStyle : mobileStyle}>
                <div className="container-fluid py-5">
                    <div className="d-sm-flex justify-content-between">
                        <div className="dropdown d-inline">
                            <Link to="/admin/addproduct" className="btn btn-outline-dark">
                                <i className="ni ni-cart"></i> Add Product
                            </Link>
                        </div>
                        <div className="d-flex">
                            
                        </div>
                    </div>

                    <div className="row mt-2">
                        <div className="col-12">
                            <div className="card">
                                <div className="table-responsive">
                                    <div className="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
                                        
                                        <div className="dataTable-top">
                                            <div className="dataTable-search"> 
                                                <input
                                                    className="dataTable-input"
                                                    placeholder="Search..."
                                                    type="text"
                                                    value={searchQuery}
                                                    onChange={(e) => setSearchQuery(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="dataTable-container">
                                            {filteredProducts.length > 0 ? (
                                                <table className="table table-flush dataTable-table" id="datatable-search">
                                                    <thead className="thead-light">
                                                        <tr>
                                                            <th data-sortable="" style={{ width: '16%' }}>
                                                                <a href="#" className="dataTable-sorter text-dark">
                                                                    Id
                                                                </a>
                                                            </th><th data-sortable="" style={{ width: '16%' }}>
                                                                <a href="#" className="dataTable-sorter text-dark">
                                                                    title
                                                                </a>
                                                            </th>
                                                            <th data-sortable="" style={{ width: '16%' }}>
                                                                <a href="#" className="dataTable-sorter text-dark">
                                                                    Image
                                                                </a>
                                                            </th>
                                                            <th data-sortable="" style={{ width: '16%' }}>
                                                                <a href="#" className="dataTable-sorter text-dark">
                                                                    Description
                                                                </a>
                                                            </th>
                                                            <th data-sortable="" style={{ width: '16%' }}>
                                                                <a href="#" className="dataTable-sorter text-dark">
                                                                    Added on
                                                                </a>
                                                            </th>
                                                            <th data-sortable="" style={{ width: '15%' }}>
                                                                <a href="#" className="dataTable-sorter text-dark">
                                                                    Action
                                                                </a>
                                                            </th>
                                                            <th data-sortable="" style={{ width: '15%' }}>
                                                                <a href="#" className="dataTable-sorter text-dark">
                                                                    
                                                                </a>
                                                            </th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        {currentProducts.length > 0 ? (
                                                            currentProducts.map((products) => (
                                                                <tr key={products.id}>
                                                                    <td>
                                                                        <div className="d-flex align-items-center">
                                                                            <p className="text-xs font-weight-bold ms-2 mb-0">#{products.id}</p>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="d-flex align-items-center">
                                                                            <p className="text-xs font-weight-bold ms-2 mb-0">{products.product_title}</p>
                                                                        </div>
                                                                    </td>
                                                                    <td className="w-20">
                                                                        <img
                                                                        className="w-100 h-50 border-radius-sm img-fluid" 
                                                                            src={products.product_image}
                                                                        />
                                                                    </td>
                                                                    <td className="font-weight-bold">
                                                                        <span className="my-2 text-xs">{products.product_description}</span>
                                                                    </td>
                                                                    <td className="text-xs font-weight-bold">
                                                                        <span className="my-2 text-xs">
                                                                            {new Date(products.added_on).toLocaleString()}
                                                                        </span>
                                                                    </td>
                                                                    <td className="text-xs font-weight-bold">
                                                                        <div className="d-flex align-items-center">
                                                                            <button
                                                                                className="btn btn-icon-only btn-rounded btn-outline-success mb-0 me-2 btn-sm d-flex align-items-center justify-content-center"
                                                                                onClick={() => viewProducts(products.id)}
                                                                            >
                                                                                <i className="fas fa-eye" aria-hidden="true"></i>
                                                                            </button>
                                                                            <span>View</span>
                                                                        </div>
                                                                    </td>
                                                                    <td className="text-xs font-weight-bold">
                                                                        <div className="d-flex align-items-center">
                                                                            <button
                                                                                className="btn btn-icon-only btn-rounded btn-outline-primary mb-0 me-2 btn-sm d-flex align-items-center justify-content-center"
                                                                                onClick={() => EditProduct(products.id)}
                                                                            >
                                                                                <i className="fa-regular fa-pen-to-square" aria-hidden="true"></i>
                                                                            </button>
                                                                            <span>Edit</span>
                                                                        </div>
                                                                    </td>
                                                                    <td className="text-xs font-weight-bold">
                                                                        <div className="d-flex align-items-center">
                                                                            <button
                                                                                className="btn btn-icon-only btn-rounded btn-outline-danger mb-0 me-2 btn-sm d-flex align-items-center justify-content-center"
                                                                                onClick={() => handleDelete(products.id)}
                                                                            >
                                                                            <i className="fas fa-times" aria-hidden="true"></i>
                                                                            </button>
                                                                            <span>Delete</span>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        ) : ( 
                                                            <tr>
                                                                <td colSpan="7">No records found.</td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            ) : (
                                                <div className="text-center py-4">
                                                    <p>No records found.</p>
                                                </div>
                                            )}
                                        </div>

                                        <div className="dataTable-bottom">
                                            <div className="dataTable-info">Showing {filteredProducts.length} entries</div>
                                            <nav className="dataTable-pagination">
                                                <ul className="dataTable-pagination-list">
                                                    <li className="pager">
                                                        <a href="#" data-page="1" onClick={() => paginate(1)}>
                                                            ‹
                                                        </a>
                                                    </li>
                                                    {Array.from({ length: endPage - startPage + 1 }).map((_, index) => (
                                                        <li
                                                            key={index}
                                                            className={currentPage === startPage + index ? 'active' : ''}
                                                        >
                                                            <a
                                                                href="#"
                                                                data-page={startPage + index}
                                                                onClick={() => paginate(startPage + index)}
                                                            >
                                                                {startPage + index}
                                                            </a>
                                                        </li>
                                                    ))}
                                                    {currentPage + maxPagesDisplayed < Math.ceil(filteredProducts.length / productsPerPage) && (
                                                        <li className="pager">
                                                            <a
                                                                href="#"
                                                                data-page={currentPage + 1}
                                                                onClick={() => paginate(currentPage + 1)}
                                                            >
                                                                ›
                                                            </a>
                                                        </li>
                                                    )}
                                                </ul>
                                            </nav>
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
    products: state.auth.products,
    user: state.auth.user
});

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllProducts: () => dispatch(fetchAllProducts()),
        deleteProducts: (products_id) => dispatch(deleteProducts(products_id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product)
