import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for styling
import React, { useEffect, lazy, Suspense } from 'react';
import store from './store/store';
import { Provider } from 'react-redux';
import { load_user } from './actions/auth'; // Import the load_user action
import './assets/css/argon-dashboard.min9c7f.css'
import Layout from './hoc/Layout';

// Lazy load components
const Signup = lazy(() => import('./pages/auth/Signup'));
const AdminSignup = lazy(() =>  import('./pages/auth/AdminSignup'));
const Login = lazy(() => import('./pages/auth/Login'));
const Activate = lazy(() => import('./pages/auth/Activate'));
const ResetPassword = lazy(() => import('./pages/auth/ResetPassword'));
const ResetPasswordConfirm = lazy(() => import('./pages/auth/ResetPasswordConfirm'));

// General Routes
const Home = lazy(() => import('./pages/general/Home'));
const Users = lazy(() => import('./pages/general/Users'));
const Documents = lazy(() => import('./pages/general/Documents'));
const Catalogues = lazy(() => import('./pages/general/Catalogues'));
const Shukran = lazy(() => import('./pages/general/Shukran'));
const IgnatianThoughts = lazy(() => import('./pages/general/IgnatianThoughts'));

// News Routes
const News = lazy(() => import('./pages/news/News'));
const AddNews = lazy(() => import('./pages/news/AddNews'));
const EditNews = lazy(() => import('./pages/news/EditNews'));
const ViewNews = lazy(() => import('./pages/news/ViewNews'));

// Events Routes
const Events = lazy(() => import('./pages/events/Events'));
const AddEvents = lazy(() => import('./pages/events/AddEvents'));
const EditEvents = lazy(() => import('./pages/events/EditEvents'));

const Adusums = lazy(() => import('./pages/general/Adusums'));

// Archivium routes
const Archivium = lazy(() => import('./pages/archivium/Archivium'));
const AddArchivium = lazy(() => import('./pages/archivium/AddArchivium'));
const EditArchivium = lazy(() => import('./pages/archivium/EditArchivium'));

// Popes Prayers Routes
const PopesPrayerIntentions = lazy(() => import('./pages/popes-intentions/PopesPrayerIntentions'));
const AddPopesPrayer = lazy(() => import('./pages/popes-intentions/AddPopesPrayer'));
const EditPopesPrayers = lazy(() => import('./pages/popes-intentions/EditPopesPrayers'));

// Products Routes
const Product = lazy(() => import('./pages/products/Product'));
const AddProduct = lazy(() => import('./pages/products/AddProduct'));
const EditProduct = lazy(() => import('./pages/products/EditProduct'));
const ViewProduct = lazy(() => import('./pages/products/ViewProduct'));

function App() {
  useEffect(() => {
    // Load user when the app loads
    store.dispatch(load_user());
  }, []);

  return (
    <Provider store={store}>
      <ToastContainer position="bottom-right" autoClose={5000} />
      <Router>
        <Suspense fallback={
          <div className="d-flex justify-content-center align-items-center min-vh-100">
            <div className="spinner-border text-success" role="status">
                <span className="sr-only">Loading...</span>
            </div>
          </div>
        }>
          <Routes>
            {/* Auth Pages */}
            <Route exact path='/signup' element={<Signup/>}/>
            <Route exact path="/admin-signup" element={<AdminSignup />} />
            <Route exact path="/" element={<Login />}/>
            <Route exact path="/activate/:uid/:token" element={<Activate />}/>
            <Route exact path="/reset-password" element={<ResetPassword />}/>
            <Route exact path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm />}/>
          </Routes>

          <Layout>
            <Routes>
              {/* General Pages */}
              <Route exact path="/admin/home" element={<Home />}/>
              <Route exact path="/admin/users" element={<Users />}/>
              <Route exact path="/admin/adusums" element={<Adusums />}/>
              <Route exact path="/admin/documents" element={<Documents />}/>
              <Route exact path="/admin/catalogues" element={<Catalogues />}/>
              <Route exact path="/admin/shukran" element={<Shukran />}/>
              <Route exact path="/admin/ignatian-thoughts" element={<IgnatianThoughts />}/>

              {/* News */}
              <Route exact path="/admin/news" element={<News/>}/>
              <Route exact path="/admin/addnews" element={<AddNews/>}/>
              <Route exact path="/admin/edit-news/:id" element={<EditNews/>}/>
              <Route exact path="/admin/newsdetails/:id" element={<ViewNews/>}/>

              {/* Events */}
              <Route exact path="/admin/events" element={<Events/>}/>
              <Route exact path="/admin/editevent/:id" element={<EditEvents/>}/>
              <Route exact path="/admin/addevent" element={<AddEvents/>}/>

              {/* Archivium */}
              <Route exact path="/admin/archivium" element={<Archivium/>}/>
              <Route exact path="/admin/addarchivium" element={<AddArchivium/>}/>
              <Route exact path="/admin/editarchivium/:id" element={<EditArchivium/>}/>

              {/* Popes Prayers */}
              <Route exact path="/admin/popes-prayer-intentions" element={<PopesPrayerIntentions/>}/>
              <Route exact path="/admin/addprayers" element={<AddPopesPrayer/>}/>
              <Route exact path="/admin/editprayers/:id" element={<EditPopesPrayers/>}/>

              {/* Products */}
              <Route exact path="/admin/products" element={<Product/>}/>
              <Route exact path="/admin/addproduct" element={<AddProduct/>}/>
              <Route exact path="/admin/editproduct/:id" element={<EditProduct/>}/>
              <Route exact path="/admin/viewproduct/:id" element={<ViewProduct/>}/>

            </Routes>
          </Layout>
        </Suspense>
      </Router>
    </Provider>
  )
}

export default App
