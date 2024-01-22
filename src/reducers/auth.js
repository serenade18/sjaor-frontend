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

    // Catalogues
    CATALOGUES_FETCH_ALL_SUCCESS, CATALOGUES_FETCH_ALL_FAIL,
    CATALOGUES_FETCH_DETAILS_SUCCESS, CATALOGUES_FETCH_DETAILS_FAIL,
    CATALOGUES_DELETE_SUCCESS, CATALOGUES_DELETE_FAIL, CATALOGUES_UPDATE_LIST,
    SAVE_CATALOGUES_SUCCESS, SAVE_CATALOGUES_FAIL,
    EDIT_CATALOGUES_SUCCESS, EDIT_CATALOGUES_FAIL,

    // cATEGORIES
    DOCUMENT_CATEGORY_FETCH_ALL_SUCCESS, DOCUMENT_CATEGORY_FETCH_ALL_FAIL,
    DOCUMENT_CATEGORY_FETCH_DETAILS_SUCCESS, DOCUMENT_CATEGORY_FETCH_DETAILS_FAIL,
    DOCUMENT_CATEGORY_DELETE_SUCCESS, DOCUMENT_CATEGORY_DELETE_FAIL, DOCUMENT_CATEGORY_UPDATE_LIST,
    SAVE_DOCUMENT_CATEGORY_SUCCESS, SAVE_DOCUMENT_CATEGORY_FAIL,
    EDIT_DOCUMENT_CATEGORY_SUCCESS, EDIT_DOCUMENT_CATEGORY_FAIL,

    // DOCUMENTS
    DOCUMENTS_FETCH_ALL_SUCCESS, DOCUMENTS_FETCH_ALL_FAIL,
    DOCUMENTS_FETCH_DETAILS_SUCCESS, DOCUMENTS_FETCH_DETAILS_FAIL,
    DOCUMENTS_DELETE_SUCCESS, DOCUMENTS_DELETE_FAIL, DOCUMENTS_UPDATE_LIST,
    SAVE_DOCUMENTS_SUCCESS, SAVE_DOCUMENTS_FAIL,
    EDIT_DOCUMENTS_SUCCESS, EDIT_DOCUMENTS_FAIL,

    // dashboard
    DASHBOARD_FETCH_SUCCESS, DASHBOARD_FETCH_FAIL,

} from '../actions/types'

const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: null,
    user: null,
    news: [],
    newsDetails: null,
    catalogues: [],
    catalogueDetails: null,
    documents: [],
    documentDetails: null,
    documentCategories: []
}

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {

        // AUTHENTICATION & AUTHORIZATION REDUCERS
        
        case ADMIN_SIGNUP_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
            };

        case SIGNUP_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
            }  ;  

        case LOGIN_SUCCESS:
            localStorage.setItem('access', payload.access);
            return {
                ...state,
                isAuthenticated: true,
                access: payload.access,
                refresh: payload.refresh
            };

        case LOADED_USER_SUCCESS:
            return{
                ...state,
                user: payload
            };

        case AUTHENTICATED_FAIL:
            return {
                ...state,
                isAuthenticated: false,
            }   ;
        
        case GOOGLE_AUTH_SUCCESS:
            localStorage.setItem('access', payload.access)
            return {
                ...state,
                isAuthenticated: true,
                access: payload.access,
                refresh: payload.refresh
            };

        case SIGNUP_FAIL:
        case ADMIN_SIGNUP_FAIL:
        case GOOGLE_AUTH_FAIL:
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            return {
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                user: null
            } ;
            
        case PASSWORD_RESET_SUCCESS:
        case PASSWORD_RESET_FAIL:
        case PASSWORD_RESET_CONFIRM_SUCCESS:
        case PASSWORD_RESET_CONFIRM_FAIL:
        case ACTIVATION_SUCCESS:
        case ACTIVATION_FAIL:        
            return {
                ...state
            };

        case LOADED_USER_FAIL:
            return {
                ...state,
                user: null
            };
            
        case AUTHENTICATED_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
            };

        case USERS_FETCH_ALL_SUCCESS:
            return {
                ...state,
                users: payload.data, // Store the fetched users data
            };

        case USERS_FETCH_ALL_FAIL:
            return {
                ...state,
                users: [], // Handle the failure case
            }; 

        case DELETE_USER_SUCCESS: 
            const updateUser = state.user.filter(users => users.id !== payload.data);

            return {
                ...state,
                users: updateUser,
            };

        case DELETE_USER_FAIL:
            return {
                ...state,
            };     
            
        case USER_UPDATE_LIST:
            // Update the customer list by removing the deleted customer
            const updateUsers = state.users.filter((users) => users.id !== payload);
            return {
                ...state,
                users: updateUsers,
            };

        // News

        case SAVE_NEWS_SUCCESS:
            return {
                ...state,
                news: payload.data,
            };

        case SAVE_NEWS_FAIL:
            return{
                ...state,
            } ;

        case EDIT_NEWS_SUCCESS:
            return {
                ...state,
                news: payload.data,
            };

        case EDIT_NEWS_FAIL:
            return {
                ...state,
            };

        case SAVE_NEWS_FAIL:
            return{
                ...state,
            } ;   

        case NEWS_FETCH_ALL_SUCCESS:
            return {
                ...state,
                news: payload.data, // Store the fetched customer data
            };

        case NEWS_FETCH_ALL_FAIL:
            return {
                ...state,
                news: [], // Handle the failure case
            };

        case NEWS_FETCH_DETAILS_SUCCESS:
            return {
                ...state,
                newsDetails: payload, // Store the fetched NEWS data
            };

        case NEWS_FETCH_DETAILS_FAIL:
            return {
                ...state,
                newsDetails: [], // Store the fetched NEWS data
            };   
        
        case NEWS_UPDATE_LIST:
            // Update the customer list by removing the deleted customer
            const updatedNews = state.news.filter((news) => news.id !== payload);
            return {
                ...state,
                news: updatedNews,
            };

        case NEWS_DELETE_SUCCESS: 
            const updatedNew = state.news.filter(news => news.id !== payload.data);

            return {
                ...state,
                news: updatedNew,
            };

        case NEWS_DELETE_FAIL:
            return {
                ...state,
            };    
                    
        // cATALOGUES

        case SAVE_CATALOGUES_SUCCESS:
            return {
                ...state,
                catalogues: payload.data,
            };

        case SAVE_CATALOGUES_FAIL:
            return{
                ...state,
            } ;

        case EDIT_CATALOGUES_SUCCESS:
            return {
                ...state,
                catalogues: payload.data,
            };

        case EDIT_CATALOGUES_FAIL:
            return {
                ...state,
            };

        case SAVE_CATALOGUES_FAIL:
            return{
                ...state,
            } ;   

        case CATALOGUES_FETCH_ALL_SUCCESS:
            return {
                ...state,
                catalogues: payload.data, // Store the fetched customer data
            };

        case CATALOGUES_FETCH_ALL_FAIL:
            return {
                ...state,
                catalogues: [], // Handle the failure case
            };

        case CATALOGUES_FETCH_DETAILS_SUCCESS:
            return {
                ...state,
                catalogueDetails: payload, // Store the fetched CATALOGUES data
            };

        case CATALOGUES_FETCH_DETAILS_FAIL:
            return {
                ...state,
                catalogueDetails: [], // Store the fetched CATALOGUES data
            };   
        
        case CATALOGUES_UPDATE_LIST:
            // Update the customer list by removing the deleted customer
            const updatedCatalogues = state.catalogues.filter((catalogues) => catalogues.id !== payload);
            return {
                ...state,
                catalogues: updatedCatalogues,
            };

        case CATALOGUES_DELETE_SUCCESS: 
            const updatedCatalogue = state.catalogues.filter(catalogues => catalogues.id !== payload.data);

            return {
                ...state,
                catalogues: updatedCatalogue,
            };

        case CATALOGUES_DELETE_FAIL:
            return {
                ...state,
            };    
          
            // DOCUMENTS

        case SAVE_DOCUMENTS_SUCCESS:
            return {
                ...state,
                documents: payload.data,
            };

        case SAVE_DOCUMENTS_FAIL:
            return{
                ...state,
            } ;

        case EDIT_DOCUMENTS_SUCCESS:
            return {
                ...state,
                documents: payload.data,
            };

        case EDIT_DOCUMENTS_FAIL:
            return {
                ...state,
            };

        case SAVE_DOCUMENTS_FAIL:
            return{
                ...state,
            } ;   

        case DOCUMENTS_FETCH_ALL_SUCCESS:
            return {
                ...state,
                documents: payload.data, // Store the fetched customer data
            };

        case DOCUMENTS_FETCH_ALL_FAIL:
            return {
                ...state,
                documents: [], // Handle the failure case
            };

        case DOCUMENTS_FETCH_DETAILS_SUCCESS:
            return {
                ...state,
                documentDetails: payload, // Store the fetched DOCUMENTS data
            };

        case DOCUMENTS_FETCH_DETAILS_FAIL:
            return {
                ...state,
                documentDetails: [], // Store the fetched DOCUMENTS data
            };   
        
        case DOCUMENTS_UPDATE_LIST:
            // Update the customer list by removing the deleted customer
            const updatedDocuments = state.documents.filter((documents) => documents.id !== payload);
            return {
                ...state,
                documents: updatedDocuments,
            };

        case DOCUMENTS_DELETE_SUCCESS: 
            const updatedDocument = state.documents.filter(documents => documents.id !== payload.data);

            return {
                ...state,
                documents: updatedDocument,
            };

        case DOCUMENTS_DELETE_FAIL:
            return {
                ...state,
            };    
          
             // DOCUMENTS

        case SAVE_DOCUMENT_CATEGORY_SUCCESS:
            return {
                ...state,
                documents: payload.data,
            };

        case SAVE_DOCUMENT_CATEGORY_FAIL:
            return{
                ...state,
            } ;

        case EDIT_DOCUMENT_CATEGORY_SUCCESS:
            return {
                ...state,
                documents: payload.data,
            };

        case EDIT_DOCUMENT_CATEGORY_FAIL:
            return {
                ...state,
            };

        case SAVE_DOCUMENT_CATEGORY_FAIL:
            return{
                ...state,
            } ;   

        case DOCUMENT_CATEGORY_FETCH_ALL_SUCCESS:
            return {
                ...state,
                documents: payload.data, // Store the fetched customer data
            };

        case DOCUMENT_CATEGORY_FETCH_ALL_FAIL:
            return {
                ...state,
                documents: [], // Handle the failure case
            };

        case DOCUMENT_CATEGORY_FETCH_DETAILS_SUCCESS:
            return {
                ...state,
                documentDetails: payload, // Store the fetched DOCUMENTS data
            };

        case DOCUMENT_CATEGORY_FETCH_DETAILS_FAIL:
            return {
                ...state,
                documentDetails: [], // Store the fetched DOCUMENTS data
            };   
        
        case DOCUMENT_CATEGORY_UPDATE_LIST:
            // Update the customer list by removing the deleted customer
            const updatedDocumentCategories = state.documents.filter((documents) => documents.id !== payload);
            return {
                ...state,
                documents: updatedDocumentCategories,
            };

        case DOCUMENT_CATEGORY_DELETE_SUCCESS: 
            const updatedDocumentCategory = state.documents.filter(documents => documents.id !== payload.data);

            return {
                ...state,
                documents: updatedDocumentCategory,
            };

        case DOCUMENT_CATEGORY_DELETE_FAIL:
            return {
                ...state,
            };    
          
        // Dashboard
        
        case DASHBOARD_FETCH_SUCCESS:
            return {
                ...state,
                dashboard: payload
            };

        case DASHBOARD_FETCH_FAIL:
            return {
                ...state,
            };
            
        default:
            return state;
    }
}
