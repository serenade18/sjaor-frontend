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
    ACCOUNT_EDIT_SUCCESS, ACCOUNT_EDIT_FAIL,
    USERS_FETCH_ALL_SUCCESS, USERS_FETCH_ALL_FAIL,
    DELETE_USER_SUCCESS, DELETE_USER_FAIL, USER_UPDATE_LIST,

} from '../actions/types'

const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: null,
    user: null
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
            
        default:
            return state;
    }
}
