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

const Home = lazy(() => import('./pages/general/Home'));
const Users = lazy(() => import('./pages/general/Users'));

const News = lazy(() => import('./pages/news/News'));
const AddNews = lazy(() => import('./pages/news/AddNews'));
const EditNews = lazy(() => import('./pages/news/EditNews'));
const ViewNews = lazy(() => import('./pages/news/ViewNews'));

const Events = lazy(() => import('./pages/events/Events'));
const Adusums = lazy(() => import('./pages/general/Adusums'));
const Documents = lazy(() => import('./pages/general/Documents'));
const Catalogues = lazy(() => import('./pages/general/Catalogues'));
const Shukran = lazy(() => import('./pages/general/Shukran'));
const IgnatianThoughts = lazy(() => import('./pages/general/IgnatianThoughts'));
const Archivium = lazy(() => import('./pages/archivium/Archivium'));

const PopesPrayerIntentions = lazy(() => import('./pages/popes-intentions/PopesPrayerIntentions'));
const AddPopesPrayer = lazy(() => import('./pages/popes-intentions/AddPopesPrayer'));
const EditPopesPrayers = lazy(() => import('./pages/popes-intentions/EditPopesPrayers'));

const Product = lazy(() => import('./pages/products/Product'));

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

              {/* Archivium */}
              <Route exact path="/admin/archivium" element={<Archivium/>}/>

              {/* Popes Prayers */}
              <Route exact path="/admin/popes-prayer-intentions" element={<PopesPrayerIntentions/>}/>
              <Route exact path="/admin/addprayers" element={<AddPopesPrayer/>}/>
              <Route exact path="/admin/editprayers/:id" element={<EditPopesPrayers/>}/>

              {/* Products */}
              <Route exact path="/admin/products" element={<Product/>}/>

            </Routes>
          </Layout>
        </Suspense>
      </Router>
    </Provider>
  )
}

export default App
