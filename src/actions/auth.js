import Axios from 'axios';
import { 
    
    // auth
    LOGIN_SUCCESS, LOGIN_FAIL, 
    LOADED_USER_SUCCESS, LOADED_USER_FAIL ,
    AUTHENTICATED_SUCCESS, AUTHENTICATED_FAIL,
    PASSWORD_RESET_SUCCESS, PASSWORD_RESET_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS, PASSWORD_RESET_CONFIRM_FAIL,
    SIGNUP_SUCCESS, SIGNUP_FAIL,
    ADMIN_SIGNUP_SUCCESS, ADMIN_SIGNUP_FAIL,
    ACTIVATION_SUCCESS, ACTIVATION_FAIL,
    GOOGLE_AUTH_SUCCESS, GOOGLE_AUTH_FAIL,
    LOGOUT,

    // Account editing
    USERS_FETCH_ALL_SUCCESS, USERS_FETCH_ALL_FAIL,
    DELETE_USER_SUCCESS, DELETE_USER_FAIL, USER_UPDATE_LIST,

    // News
    NEWS_FETCH_ALL_SUCCESS, NEWS_FETCH_ALL_FAIL,
    NEWS_FETCH_DETAILS_SUCCESS, NEWS_FETCH_DETAILS_FAIL,
    NEWS_DELETE_SUCCESS, NEWS_DELETE_FAIL, NEWS_UPDATE_LIST,
    SAVE_NEWS_SUCCESS, SAVE_NEWS_FAIL,
    EDIT_NEWS_SUCCESS, EDIT_NEWS_FAIL,

    // CATALOGUES
    CATALOGUES_FETCH_ALL_SUCCESS, CATALOGUES_FETCH_ALL_FAIL,
    CATALOGUES_FETCH_DETAILS_SUCCESS, CATALOGUES_FETCH_DETAILS_FAIL,
    CATALOGUES_DELETE_SUCCESS, CATALOGUES_DELETE_FAIL, CATALOGUES_UPDATE_LIST,
    SAVE_CATALOGUES_SUCCESS, SAVE_CATALOGUES_FAIL,
    EDIT_CATALOGUES_SUCCESS, EDIT_CATALOGUES_FAIL,

    // SHUKRAN
    SHUKRAN_FETCH_ALL_SUCCESS, SHUKRAN_FETCH_ALL_FAIL,
    SHUKRAN_FETCH_DETAILS_SUCCESS, SHUKRAN_FETCH_DETAILS_FAIL,
    SHUKRAN_DELETE_SUCCESS, SHUKRAN_DELETE_FAIL, SHUKRAN_UPDATE_LIST,
    SAVE_SHUKRAN_SUCCESS, SAVE_SHUKRAN_FAIL,
    EDIT_SHUKRAN_SUCCESS, EDIT_SHUKRAN_FAIL,

    // DOCUMENTS
    DOCUMENTS_FETCH_ALL_SUCCESS, DOCUMENTS_FETCH_ALL_FAIL,
    DOCUMENTS_FETCH_DETAILS_SUCCESS, DOCUMENTS_FETCH_DETAILS_FAIL,
    DOCUMENTS_DELETE_SUCCESS, DOCUMENTS_DELETE_FAIL, DOCUMENTS_UPDATE_LIST,
    SAVE_DOCUMENTS_SUCCESS, SAVE_DOCUMENTS_FAIL,
    EDIT_DOCUMENTS_SUCCESS, EDIT_DOCUMENTS_FAIL,

    // cATEGORIES
    DOCUMENT_CATEGORY_FETCH_ALL_SUCCESS, DOCUMENT_CATEGORY_FETCH_ALL_FAIL,
    DOCUMENT_CATEGORY_FETCH_DETAILS_SUCCESS, DOCUMENT_CATEGORY_FETCH_DETAILS_FAIL,
    DOCUMENT_CATEGORY_DELETE_SUCCESS, DOCUMENT_CATEGORY_DELETE_FAIL, DOCUMENT_CATEGORY_UPDATE_LIST,
    SAVE_DOCUMENT_CATEGORY_SUCCESS, SAVE_DOCUMENT_CATEGORY_FAIL,
    EDIT_DOCUMENT_CATEGORY_SUCCESS, EDIT_DOCUMENT_CATEGORY_FAIL,
    DOCUMENT_ONLY_FETCH_SUCCESS, DOCUMENT_ONLY_FETCH_FAIL,

    // dashboard
    DASHBOARD_FETCH_SUCCESS, DASHBOARD_FETCH_FAIL,

}  from './types';

// Dashboard

export const fetchDashboard = () => async (dispatch, getState) => {
    const { access } = getState().auth;
  
    try {
      const response = await Axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/dashboard/`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });
  
      if (response.status === 200) {
        const dashboaardData = response.data;
  
        console.log("dashboaard Data:", dashboaardData); // Log the retrieved data
  
        dispatch({
          type: DASHBOARD_FETCH_SUCCESS,
          payload: dashboaardData,
        });
  
        return dashboaardData;
      } else {
        console.error("API Request Failed with Status Code:", response.status);
        dispatch({
          type: DASHBOARD_FETCH_FAIL,
        });
      }
    } catch (error) {
      console.error("Error fetching dashboaard data:", error);
      dispatch({
        type: DASHBOARD_FETCH_FAIL,
      });
    }
  };

// Application authentication and authorization 

export const load_user = () => async (dispatch) => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access')}`,
                'ACCEPT': 'application/json',
            },
        };

        try {
            const res = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/auth/users/me/`, config);
            const data = await res.json();

            if (!res.ok) {
                if (data.code === 'user_not_found') {
                    // Handle the case when the user is not found (redirect to login)
                    dispatch({
                        type: LOADED_USER_FAIL,
                        payload: 'User not found',
                    });
                } else {
                    // Handle other errors
                    throw Error(res.statusText);
                }
            } else {
                // User loaded successfully
                dispatch({
                    type: LOADED_USER_SUCCESS,
                    payload: data,
                });
            }
        } catch (error) {
            // Handle other errors
            dispatch({
                type: LOADED_USER_FAIL,
                payload: error.message,
            });
        }
    } else {
        // Handle the case when access token is not available
        dispatch({
            type: LOADED_USER_FAIL,
            payload: 'Access token not available',
        });
    }
};

export const googleAuthenticate = (code, state) => async (dispatch) => {
    if (code && state && !localStorage.getItem('access')) {
        const details = {
            code: code,
            state: state,
        };

        const formBody = Object.keys(details)
            .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(details[key]))
            .join('&');

        const url = `${import.meta.env.VITE_REACT_APP_API_URL}/auth/o/google-oauth2/?${formBody}`;

        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                ACCEPT: 'application/x-www-form-urlencoded',
            },
        };

        try {
            const res = await fetch(url, config);
            const data = await res.json();

            dispatch({
                type: GOOGLE_AUTH_SUCCESS,
                payload: data,
            });

            dispatch(load_user()); // Make sure to load user information after successful Google authentication.
        } catch (error) {
            dispatch({
                type: GOOGLE_AUTH_FAIL,
            });
        }
    }
};

export const checkAuthenticated = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-type': 'application/json',
                'ACCEPT': 'application/json'
            }
        }

        const body = JSON.stringify({ token: localStorage.getItem('access') })
        console.log(body)

        try {
            const res = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/auth/jwt/verify/`, {
                method: 'POST',
                headers: config.headers,
                body: body
            });

            const data = await res.json();

            if (data.code !== 'token not valid') {
                dispatch({
                    type: AUTHENTICATED_SUCCESS
                })
            } else {
                dispatch({
                    type: AUTHENTICATED_FAIL
                })
            }
            
        } catch (error) {
            dispatch({
                type: AUTHENTICATED_FAIL
            })
        }

    } else {
        dispatch({
            type: AUTHENTICATED_FAIL
        })
    }
}

export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ email, password })
    };

    try {
        const res = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/auth/jwt/create/`, config);
        console.log()

        if (res.ok) {
            const data = await res.json();

            dispatch({
                type: LOGIN_SUCCESS,
                payload: data
            });

            dispatch(load_user());

            // Return a success response
            return { success: true };
        } else {
            dispatch({
                type: LOGIN_FAIL
            });

            // Extract the error message and return an error response
            const errorData = await res.json();
            return { error: errorData.detail };
        }
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL
        });

        // Return an error response for network or other errors
        return { error: 'An error occurred. Please try again.' };
    }
}

export const signup = (first_name, last_name, phone, email, user_type, password, re_password) => async dispatch => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ first_name, last_name, phone, user_type, email, password, re_password })
    };

    try {
        const res = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/auth/users/`, config);

        if (res.ok) {
            const data = await res.json();

            dispatch({
                type: SIGNUP_SUCCESS,
                payload: data
            });

          return { success: true, data };

        } else {
          const error = await res.json();
            dispatch({
                type: SIGNUP_FAIL,
                payload: error
            });
 
          return { success: false, error };
        }
    } catch (error) {
        dispatch({
            type: SIGNUP_FAIL
        });
    }
}

export const adminSignup = (first_name, last_name, phone, email, password, re_password) => async dispatch => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ first_name, last_name, phone, email, password, re_password })
    };

    try {
        const res = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/auth/superuser/`, config);

        if (res.ok) {
            const data = await res.json();

            dispatch({
                type: ADMIN_SIGNUP_SUCCESS,
                payload: data
            });

          return { success: true, data };

        } else {
          const error = await res.json();
            dispatch({
                type: ADMIN_SIGNUP_FAIL,
                payload: error
            });
 
          return { success: false, error };
        }
    } catch (error) {
        dispatch({
            type: ADMIN_SIGNUP_FAIL
        });
    }
}

export const verify = (uid, token) => async dispatch => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ uid, token })
    };

    try {
        await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/auth/users/activation/`, config);

        dispatch({
            type: ACTIVATION_SUCCESS,
        });
    } catch (error) {
        dispatch({
            type: ACTIVATION_FAIL
        });
    }
}

export const reset_password = (email) => async dispatch => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ email })
    };

    try {
        const res = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/auth/users/reset_password/`, config);

        if (res.ok) {
            const data = await res.json();

            dispatch({
                type: PASSWORD_RESET_SUCCESS,
                payload: data
            });

            dispatch(load_user());
        } else {
            dispatch({
                type: PASSWORD_RESET_FAIL
            });
        }
    } catch (error) {
        dispatch({
            type: PASSWORD_RESET_FAIL
        });
    }
}

export const reset_password_confirm = (uid, token, new_password, re_new_password ) => async dispatch => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ uid, token, new_password, re_new_password })
    };

    try {
        const res = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/auth/users/reset_password_confirm/`, config);

        if (res.ok) {
            const data = await res.json();

            dispatch({
                type: PASSWORD_RESET_CONFIRM_SUCCESS,
                payload: data
            });

            dispatch(load_user());
        } else {
            dispatch({
                type: PASSWORD_RESET_CONFIRM_FAIL
            });
        }
    } catch (error) {
        dispatch({
            type: PASSWORD_RESET_CONFIRM_FAIL
        });
    }
}

export const logout= () => dispatch => {
    dispatch({
        type: LOGOUT
    });
}

// Admin users

export const fetchAllUsers = () => async (dispatch, getState) => {
    const { access } = getState().auth;
  
    try {
      // Make an HTTP GET request to fetch customer data using the environment variable
      const response = await Axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/auth/users/`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });
  
      if (response.status === 200) {
        const usersData = response;
        dispatch({
          type: USERS_FETCH_ALL_SUCCESS,
          payload: usersData,
        });
      } else {
        dispatch({
          type: USERS_FETCH_ALL_FAIL,
        });
      }
    } catch (error) {
      console.error("Error fetching users data:", error);
      dispatch({
        type: USERS_FETCH_ALL_FAIL,
      });
    }
};

export const deleteUser = (id) => async (dispatch, getState) => {
    const { access } = getState().auth;
  
    try {
        const response = await Axios.delete(
            `${import.meta.env.VITE_REACT_APP_API_URL}/api/delete-user/${id}`,{
                headers: {
                    Authorization: `Bearer ${access}`,
                }
            }
        );
  
        if (response.status === 201) {
            dispatch({
                type: DELETE_USER_SUCCESS
            });

            dispatch({ type: USER_UPDATE_LIST, payload: id });
        } else {
            dispatch({
                type: DELETE_USER_FAIL,
            });
        }
    } catch (error) {
        console.error('Error posting play:', error);
        dispatch({
            type: DELETE_USER_FAIL,
        });
        throw error; // rethrow the error so that it can be caught in the handleFormSubmit function
    }
};

// Api Handler for NEWS

export const fetchAllNews = () => async (dispatch, getState) => {
    const { access } = getState().auth;
  
    try {
      // Make an HTTP GET request to fetch NEWS data using the environment variable
      const response = await Axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/news/`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });
  
      if (response.status === 200) {
        const newsData = response.data;
        dispatch({
          type: NEWS_FETCH_ALL_SUCCESS,
          payload: newsData,
        });
      } else {
        dispatch({
          type: NEWS_FETCH_ALL_FAIL,
        });
      }
    } catch (error) {
      console.error("Error fetching NEWS data:", error);
      dispatch({
        type: NEWS_FETCH_ALL_FAIL,
      });
    }
};

export const deleteNews = (id) => async (dispatch, getState) => {
    const { access } = getState().auth;

    try {
        const response = await Axios.delete(`${import.meta.env.VITE_REACT_APP_API_URL}/api/news/${id}/`, {
            headers: {
                Authorization: `Bearer ${access}`,
            },
        });

        if (response.status === 200) {
            // Dispatch a success action if the delete was successful
            dispatch({ type: NEWS_DELETE_SUCCESS });

            // Dispatch an action to update the customer list
            dispatch({ type: NEWS_UPDATE_LIST, payload: id }); // Send the deleted NEWS ID
        } else {
            // Dispatch a failure action if the delete failed
            dispatch({ type: NEWS_DELETE_FAIL });
        }
    } catch (error) {
        console.log(error);
        dispatch({ type: NEWS_DELETE_FAIL });
    }
};

export const fetchNewsDetails = (id) => async (dispatch, getState) => {
    const { access } = getState().auth;
  
    try {
      const response = await Axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/news/${id}/`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });
  
      if (response.status === 200) {
        const newsData = response.data.data; // Access data from the "data" key
        dispatch({
          type: NEWS_FETCH_DETAILS_SUCCESS,
          payload: newsData,
        });
        return newsData
      } else {
        dispatch({
          type: NEWS_FETCH_DETAILS_FAIL,
        });
      }
    } catch (error) {
      console.error("Error fetching NEWS data:", error);
      dispatch({
        type: NEWS_FETCH_DETAILS_FAIL,
      });
    }
};

export const saveNews = (formData) => async (dispatch, getState) => {
  const { access } = getState().auth;

  try {
      const res = await Axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/api/news/`,
      formData,
            {
                headers: {
                    Authorization: `Bearer ${access}`,
                    'Content-Type': 'multipart/form-data',
                }
            }
        );

      if (response.status === 201) {
          const data = await res.json();
          dispatch({
            type: SAVE_NEWS_SUCCESS,
            payload: data
          });
          console.log(data)
          return { success: true, data };
      } else {
          const error = await res.json();
          dispatch({
            type: SAVE_NEWS_FAIL,
            payload: error
          });
          return { success: false, error };
      }
  } catch (error) {
      return { success: false, error: 'Network error' };
  }
}  

export const editNews = (formData, id) => async (dispatch, getState) => {
  const { access } = getState().auth;

  try {
    const response = await Axios.put(
      `${import.meta.env.VITE_REACT_APP_API_URL}/api/news/${id}/`,
      formData,
      {
          headers: {
              Authorization: `Bearer ${access}`,
              'Content-Type': 'multipart/form-data',
          }
      }
  );

    if (response.status === 201) {
        const newsData = response.data;
        dispatch({
            type: EDIT_NEWS_SUCCESS,
            payload: newsData,
        });
    } else {
      const error = await res.json();
      dispatch({
        type: EDIT_NEWS_FAIL,
        payload: error,
      });
      return { success: false, error };
    }
  } catch (error) {
    dispatch({
      type: EDIT_NEWS_FAIL, // Change this to the correct action type
    });
    return { success: false, error: 'Network error' };
  }
};

// Api Handler for Catalogues

export const fetchAllCatalogues = () => async (dispatch, getState) => {
  const { access } = getState().auth;

  try {
    // Make an HTTP GET request to fetch NEWS data using the environment variable
    const response = await Axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/catalogues/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });

    if (response.status === 200) {
      const cataloguesData = response.data;
      dispatch({
        type: CATALOGUES_FETCH_ALL_SUCCESS,
        payload: cataloguesData,
      });
    } else {
      dispatch({
        type: CATALOGUES_FETCH_ALL_FAIL,
      });
    }
  } catch (error) {
    console.error("Error fetching CATALOGUES data:", error);
    dispatch({
      type: CATALOGUES_FETCH_ALL_FAIL,
    });
  }
};

export const deleteCatalogues = (id) => async (dispatch, getState) => {
  const { access } = getState().auth;

  try {
      const response = await Axios.delete(`${import.meta.env.VITE_REACT_APP_API_URL}/api/catalogues/${id}/`, {
          headers: {
              Authorization: `Bearer ${access}`,
          },
      });

      if (response.status === 200) {
          // Dispatch a success action if the delete was successful
          dispatch({ type: CATALOGUES_DELETE_SUCCESS });

          // Dispatch an action to update the customer list
          dispatch({ type: CATALOGUES_UPDATE_LIST, payload: id }); // Send the deleted CATALOGUES ID
      } else {
          // Dispatch a failure action if the delete failed
          dispatch({ type: CATALOGUES_DELETE_FAIL });
      }
  } catch (error) {
      console.log(error);
      dispatch({ type: CATALOGUES_DELETE_FAIL });
  }
};

export const fetchCatalogueDetails = (id) => async (dispatch, getState) => {
  const { access } = getState().auth;

  try {
    const response = await Axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/catalogues/${id}/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });

    if (response.status === 200) {
      const cataloguesData = response.data.data; // Access data from the "data" key
      dispatch({
        type: CATALOGUES_FETCH_DETAILS_SUCCESS,
        payload: cataloguesData,
      });
      return cataloguesData
    } else {
      dispatch({
        type: CATALOGUES_FETCH_DETAILS_FAIL,
      });
    }
  } catch (error) {
    console.error("Error fetching CATALOGUES data:", error);
    dispatch({
      type: CATALOGUES_FETCH_DETAILS_FAIL,
    });
  }
};

export const saveCatalogues = (formData) => async (dispatch, getState) => {
const { access } = getState().auth;

try {
    const res = await Axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/api/catalogues/`,
    formData,
          {
              headers: {
                  Authorization: `Bearer ${access}`,
                  'Content-Type': 'multipart/form-data',
              }
          }
      );

    if (response.status === 201) {
        const data = await res.json();
        dispatch({
          type: SAVE_CATALOGUES_SUCCESS,
          payload: data
        });
        console.log(data)
        return { success: true, data };
    } else {
        const error = await res.json();
        dispatch({
          type: SAVE_CATALOGUES_FAIL,
          payload: error
        });
        return { success: false, error };
    }
} catch (error) {
    return { success: false, error: 'Network error' };
}
}  

export const editCatalogues = (formData, id) => async (dispatch, getState) => {
const { access } = getState().auth;

try {
  const response = await Axios.put(
    `${import.meta.env.VITE_REACT_APP_API_URL}/api/catalogues/${id}/`,
    formData,
    {
        headers: {
            Authorization: `Bearer ${access}`,
            'Content-Type': 'multipart/form-data',
        }
    }
);

  if (response.status === 201) {
      const cataloguesData = response.data;
      dispatch({
          type: EDIT_CATALOGUES_SUCCESS,
          payload: cataloguesData,
      });
  } else {
    const error = await res.json();
    dispatch({
      type: EDIT_CATALOGUES_FAIL,
      payload: error,
    });
    return { success: false, error };
  }
} catch (error) {
  dispatch({
    type: EDIT_CATALOGUES_FAIL, // Change this to the correct action type
  });
  return { success: false, error: 'Network error' };
}
};

// Api Handler for Documents

export const fetchAllDocuments = () => async (dispatch, getState) => {
  const { access } = getState().auth;

  try {
    // Make an HTTP GET request to fetch NEWS data using the environment variable
    const response = await Axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/documents/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });

    if (response.status === 200) {
      const documentsData = response.data;
      dispatch({
        type: DOCUMENTS_FETCH_ALL_SUCCESS,
        payload: documentsData,
      });
    } else {
      dispatch({
        type: DOCUMENTS_FETCH_ALL_FAIL,
      });
    }
  } catch (error) {
    console.error("Error fetching DOCUMENTS data:", error);
    dispatch({
      type: DOCUMENTS_FETCH_ALL_FAIL,
    });
  }
};

export const deleteDocuments = (id) => async (dispatch, getState) => {
  const { access } = getState().auth;

  try {
      const response = await Axios.delete(`${import.meta.env.VITE_REACT_APP_API_URL}/api/documents/${id}/`, {
          headers: {
              Authorization: `Bearer ${access}`,
          },
      });

      if (response.status === 200) {
          // Dispatch a success action if the delete was successful
          dispatch({ type: DOCUMENTS_DELETE_SUCCESS });

          // Dispatch an action to update the customer list
          dispatch({ type: DOCUMENTS_UPDATE_LIST, payload: id }); // Send the deleted DOCUMENTS ID
      } else {
          // Dispatch a failure action if the delete failed
          dispatch({ type: DOCUMENTS_DELETE_FAIL });
      }
  } catch (error) {
      console.log(error);
      dispatch({ type: DOCUMENTS_DELETE_FAIL });
  }
};

export const fetchDocumentsDetails = (id) => async (dispatch, getState) => {
  const { access } = getState().auth;

  try {
    const response = await Axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/documents/${id}/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });

    if (response.status === 200) {
      const documentsData = response.data.data; // Access data from the "data" key
      dispatch({
        type: DOCUMENTS_FETCH_DETAILS_SUCCESS,
        payload: documentsData,
      });
      return documentsData
    } else {
      dispatch({
        type: DOCUMENTS_FETCH_DETAILS_FAIL,
      });
    }
  } catch (error) {
    console.error("Error fetching DOCUMENTS data:", error);
    dispatch({
      type: DOCUMENTS_FETCH_DETAILS_FAIL,
    });
  }
};

export const saveDocuments= (formData) => async (dispatch, getState) => {
const { access } = getState().auth;

try {
    const res = await Axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/api/documents/`,
    formData,
          {
              headers: {
                  Authorization: `Bearer ${access}`,
                  'Content-Type': 'multipart/form-data',
              }
          }
      );

    if (res.status === 201) {
        const data = await res.data;
        dispatch({
          type: SAVE_DOCUMENTS_SUCCESS,
          payload: data
        });
        console.log(data)
        return data;
    } else {
        dispatch({
          type: SAVE_DOCUMENTS_FAIL,
        });
    }
} catch (error) {
  console.error('Error posting Docs:', error);
  dispatch({
    type: SAVE_DOCUMENTS_FAIL,
  });
  throw error;
}
}  

export const editDocuments = (formData, id) => async (dispatch, getState) => {
const { access } = getState().auth;

try {
  const response = await Axios.put(
    `${import.meta.env.VITE_REACT_APP_API_URL}/api/documents/${id}/`,
    formData,
    {
        headers: {
            Authorization: `Bearer ${access}`,
            'Content-Type': 'multipart/form-data',
        }
    }
);

  if (response.status === 201) {
      const documentsData = response.data;
      dispatch({
          type: EDIT_DOCUMENTS_SUCCESS,
          payload: documentsData,
      });
  } else {
    const error = await res.json();
    dispatch({
      type: EDIT_DOCUMENTS_FAIL,
      payload: error,
    });
    return { success: false, error };
  }
} catch (error) {
  dispatch({
    type: EDIT_DOCUMENTS_FAIL, // Change this to the correct action type
  });
  return { success: false, error: 'Network error' };
}
};

//Api handler for document  category

export const fetchDocumentOnly = () => async (dispatch, getState) => {
  const { access } = getState().auth;

  try {
    // Make an HTTP GET request to fetch batch data using the environment variable
    const response = await Axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/documentonly/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });

    if (response.status === 200) {
      const categoryData = response.data;
      dispatch({
        type: DOCUMENT_ONLY_FETCH_SUCCESS,
        payload: categoryData,
      });
      return categoryData;
    } else {
      dispatch({
        type: DOCUMENT_ONLY_FETCH_FAIL,
      });
    }
  } catch (error) {
    console.error("Error fetching category data:", error);
    dispatch({
      type: DOCUMENT_ONLY_FETCH_FAIL,
    });
  }
};

export const saveDocumentCategory = (category) => async (dispatch, getState) => {
  const { access } = getState().auth;

  const config = {
      headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${access}`,
      },
      method: 'POST',
      body: JSON.stringify({ category })
  };

  try {
      const res = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/documents-category/`, config);

      if (res.ok) {
          const data = await res.json();
          dispatch({
            type: SAVE_DOCUMENT_CATEGORY_SUCCESS,
            payload: data
          });
          return { success: true, data };
      } else {
          const error = await res.json();
          dispatch({
            type: SAVE_DOCUMENT_CATEGORY_FAIL,
            payload: error
          });
          return { success: false, error };
      }
  } catch (error) {
      return { success: false, error: 'Network error' };
  }
}  

export const fetchAllCategory = () => async (dispatch, getState) => {
  const { access } = getState().auth;

  try {
    // Make an HTTP GET request to fetch NEWS data using the environment variable
    const response = await Axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/documents-category/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });

    if (response.status === 200) {
      const documentsData = response.data;
      dispatch({
        type: DOCUMENT_CATEGORY_FETCH_ALL_SUCCESS,
        payload: documentsData,
      });
    } else {
      dispatch({
        type: DOCUMENT_CATEGORY_FETCH_ALL_FAIL,
      });
    }
  } catch (error) {
    console.error("Error fetching DOCUMENTS data:", error);
    dispatch({
      type: DOCUMENT_CATEGORY_FETCH_ALL_FAIL,
    });
  }
};

// Api Handler for Catalogues

export const fetchAllShukran = () => async (dispatch, getState) => {
  const { access } = getState().auth;

  try {
    // Make an HTTP GET request to fetch NEWS data using the environment variable
    const response = await Axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/shukran/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });

    if (response.status === 200) {
      const shukranData = response.data;
      dispatch({
        type: SHUKRAN_FETCH_ALL_SUCCESS,
        payload: shukranData,
      });
    } else {
      dispatch({
        type: SHUKRAN_FETCH_ALL_FAIL,
      });
    }
  } catch (error) {
    console.error("Error fetching SHUKRAN data:", error);
    dispatch({
      type: SHUKRAN_FETCH_ALL_FAIL,
    });
  }
};

export const deleteShukran = (id) => async (dispatch, getState) => {
  const { access } = getState().auth;

  try {
      const response = await Axios.delete(`${import.meta.env.VITE_REACT_APP_API_URL}/api/shukran/${id}/`, {
          headers: {
              Authorization: `Bearer ${access}`,
          },
      });

      if (response.status === 200) {
          // Dispatch a success action if the delete was successful
          dispatch({ type: SHUKRAN_DELETE_SUCCESS });

          // Dispatch an action to update the customer list
          dispatch({ type: SHUKRAN_UPDATE_LIST, payload: id }); // Send the deleted SHUKRAN ID
      } else {
          // Dispatch a failure action if the delete failed
          dispatch({ type: SHUKRAN_DELETE_FAIL });
      }
  } catch (error) {
      console.log(error);
      dispatch({ type: SHUKRAN_DELETE_FAIL });
  }
};

export const fetchShukranDetails = (id) => async (dispatch, getState) => {
  const { access } = getState().auth;

  try {
    const response = await Axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/shukran/${id}/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });

    if (response.status === 200) {
      const shukranData = response.data.data; // Access data from the "data" key
      dispatch({
        type: SHUKRAN_FETCH_DETAILS_SUCCESS,
        payload: shukranData,
      });
      return shukranData
    } else {
      dispatch({
        type: SHUKRAN_FETCH_DETAILS_FAIL,
      });
    }
  } catch (error) {
    console.error("Error fetching SHUKRAN data:", error);
    dispatch({
      type: SHUKRAN_FETCH_DETAILS_FAIL,
    });
  }
};

export const saveShukran = (formData) => async (dispatch, getState) => {
const { access } = getState().auth;

try {
    const res = await Axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/api/shukran/`,
    formData,
          {
              headers: {
                  Authorization: `Bearer ${access}`,
                  'Content-Type': 'multipart/form-data',
              }
          }
      );

    if (response.status === 201) {
        const data = await res.json();
        dispatch({
          type: SAVE_SHUKRAN_SUCCESS,
          payload: data
        });
        console.log(data)
        return { success: true, data };
    } else {
        const error = await res.json();
        dispatch({
          type: SAVE_SHUKRAN_FAIL,
          payload: error
        });
        return { success: false, error };
    }
} catch (error) {
    return { success: false, error: 'Network error' };
}
}  

export const editShukran = (formData, id) => async (dispatch, getState) => {
const { access } = getState().auth;

try {
  const response = await Axios.put(
    `${import.meta.env.VITE_REACT_APP_API_URL}/api/shukran/${id}/`,
    formData,
    {
        headers: {
            Authorization: `Bearer ${access}`,
            'Content-Type': 'multipart/form-data',
        }
    }
);

  if (response.status === 201) {
      const shukranData = response.data;
      dispatch({
          type: EDIT_SHUKRAN_SUCCESS,
          payload: shukranData,
      });
  } else {
    const error = await res.json();
    dispatch({
      type: EDIT_SHUKRAN_FAIL,
      payload: error,
    });
    return { success: false, error };
  }
} catch (error) {
  dispatch({
    type: EDIT_SHUKRAN_FAIL, // Change this to the correct action type
  });
  return { success: false, error: 'Network error' };
}
};
