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
    
    // Adusum
    ADUSUM_FETCH_ALL_SUCCESS, ADUSUM_FETCH_ALL_FAIL,
    ADUSUM_FETCH_DETAILS_SUCCESS, ADUSUM_FETCH_DETAILS_FAIL,
    ADUSUM_DELETE_SUCCESS, ADUSUM_DELETE_FAIL, ADUSUM_UPDATE_LIST,
    SAVE_ADUSUM_SUCCESS, SAVE_ADUSUM_FAIL,
    EDIT_ADUSUM_SUCCESS, EDIT_ADUSUM_FAIL,
     
    // Archivium
    ARCHIVIUM_FETCH_ALL_SUCCESS, ARCHIVIUM_FETCH_ALL_FAIL,
    ARCHIVIUM_FETCH_DETAILS_SUCCESS, ARCHIVIUM_FETCH_DETAILS_FAIL,
    ARCHIVIUM_DELETE_SUCCESS, ARCHIVIUM_DELETE_FAIL, ARCHIVIUM_UPDATE_LIST,
    SAVE_ARCHIVIUM_SUCCESS, SAVE_ARCHIVIUM_FAIL,
    EDIT_ARCHIVIUM_SUCCESS, EDIT_ARCHIVIUM_FAIL,
     
    // Products
    PRODUCTS_FETCH_ALL_SUCCESS, PRODUCTS_FETCH_ALL_FAIL,
    PRODUCTS_FETCH_DETAILS_SUCCESS, PRODUCTS_FETCH_DETAILS_FAIL,
    PRODUCTS_DELETE_SUCCESS, PRODUCTS_DELETE_FAIL, PRODUCTS_UPDATE_LIST,
    SAVE_PRODUCTS_SUCCESS, SAVE_PRODUCTS_FAIL,
    EDIT_PRODUCTS_SUCCESS, EDIT_PRODUCTS_FAIL,
    
    // News
    NEWS_FETCH_ALL_SUCCESS, NEWS_FETCH_ALL_FAIL,
    NEWS_FETCH_DETAILS_SUCCESS, NEWS_FETCH_DETAILS_FAIL,
    NEWS_DELETE_SUCCESS, NEWS_DELETE_FAIL, NEWS_UPDATE_LIST,
    SAVE_NEWS_SUCCESS, SAVE_NEWS_FAIL,
    EDIT_NEWS_SUCCESS, EDIT_NEWS_FAIL,

    // Popes Prayer intentions
    POPES_PRAYER_INTENTION_FETCH_ALL_SUCCESS, POPES_PRAYER_INTENTION_FETCH_ALL_FAIL,
    POPES_PRAYER_INTENTION_FETCH_DETAILS_SUCCESS, POPES_PRAYER_INTENTION_FETCH_DETAILS_FAIL,
    POPES_PRAYER_INTENTION_DELETE_SUCCESS, POPES_PRAYER_INTENTION_DELETE_FAIL, POPES_PRAYER_INTENTION_UPDATE_LIST,
    SAVE_POPES_PRAYER_INTENTION_SUCCESS, SAVE_POPES_PRAYER_INTENTION_FAIL,
    EDIT_POPES_PRAYER_INTENTION_SUCCESS, EDIT_POPES_PRAYER_INTENTION_FAIL,

    // Catalogues
    CATALOGUES_FETCH_ALL_SUCCESS, CATALOGUES_FETCH_ALL_FAIL,
    CATALOGUES_FETCH_DETAILS_SUCCESS, CATALOGUES_FETCH_DETAILS_FAIL,
    CATALOGUES_DELETE_SUCCESS, CATALOGUES_DELETE_FAIL, CATALOGUES_UPDATE_LIST,
    SAVE_CATALOGUES_SUCCESS, SAVE_CATALOGUES_FAIL,
    EDIT_CATALOGUES_SUCCESS, EDIT_CATALOGUES_FAIL,

    //DOCUMENT CATEGORIES
    DOCUMENT_CATEGORY_FETCH_ALL_SUCCESS, DOCUMENT_CATEGORY_FETCH_ALL_FAIL,
    DOCUMENT_CATEGORY_FETCH_DETAILS_SUCCESS, DOCUMENT_CATEGORY_FETCH_DETAILS_FAIL,
    DOCUMENT_CATEGORY_DELETE_SUCCESS, DOCUMENT_CATEGORY_DELETE_FAIL, DOCUMENT_CATEGORY_UPDATE_LIST,
    SAVE_DOCUMENT_CATEGORY_SUCCESS, SAVE_DOCUMENT_CATEGORY_FAIL,
    EDIT_DOCUMENT_CATEGORY_SUCCESS, EDIT_DOCUMENT_CATEGORY_FAIL,
    DOCUMENT_ONLY_FETCH_SUCCESS, DOCUMENT_ONLY_FETCH_FAIL,

    // SHUKRAN
    SHUKRAN_FETCH_ALL_SUCCESS, SHUKRAN_FETCH_ALL_FAIL,
    SHUKRAN_FETCH_DETAILS_SUCCESS, SHUKRAN_FETCH_DETAILS_FAIL,
    SHUKRAN_DELETE_SUCCESS, SHUKRAN_DELETE_FAIL, SHUKRAN_UPDATE_LIST,
    SAVE_SHUKRAN_SUCCESS, SAVE_SHUKRAN_FAIL,
    EDIT_SHUKRAN_SUCCESS, EDIT_SHUKRAN_FAIL,

    // IGNATIAN THOUGHTS
    IGNATIAN_THOUGHTS_FETCH_ALL_SUCCESS, IGNATIAN_THOUGHTS_FETCH_ALL_FAIL,

    // DOCUMENTS
    DOCUMENTS_FETCH_ALL_SUCCESS, DOCUMENTS_FETCH_ALL_FAIL,
    DOCUMENTS_FETCH_DETAILS_SUCCESS, DOCUMENTS_FETCH_DETAILS_FAIL,
    DOCUMENTS_DELETE_SUCCESS, DOCUMENTS_DELETE_FAIL, DOCUMENTS_UPDATE_LIST,
    SAVE_DOCUMENTS_SUCCESS, SAVE_DOCUMENTS_FAIL,
    EDIT_DOCUMENTS_SUCCESS, EDIT_DOCUMENTS_FAIL,

    // NECROLOGY
    NECROLOGY_FETCH_ALL_SUCCESS, NECROLOGY_FETCH_ALL_FAIL,
    NECROLOGY_FETCH_DETAILS_SUCCESS, NECROLOGY_FETCH_DETAILS_FAIL,
    NECROLOGY_DELETE_SUCCESS, NECROLOGY_DELETE_FAIL, NECROLOGY_UPDATE_LIST,
    SAVE_NECROLOGY_SUCCESS, SAVE_NECROLOGY_FAIL,
    EDIT_NECROLOGY_SUCCESS, EDIT_NECROLOGY_FAIL,
    
    //EVENT CATEGORIES
    EVENT_CATEGORY_FETCH_ALL_SUCCESS, EVENT_CATEGORY_FETCH_ALL_FAIL,
    EVENT_CATEGORY_FETCH_DETAILS_SUCCESS, EVENT_CATEGORY_FETCH_DETAILS_FAIL,
    EVENT_CATEGORY_DELETE_SUCCESS, EVENT_CATEGORY_DELETE_FAIL, EVENT_CATEGORY_UPDATE_LIST,
    SAVE_EVENT_CATEGORY_SUCCESS, SAVE_EVENT_CATEGORY_FAIL,
    EDIT_EVENT_CATEGORY_SUCCESS, EDIT_EVENT_CATEGORY_FAIL,
    EVENT_ONLY_FETCH_SUCCESS, EVENT_ONLY_FETCH_FAIL,
     
    // EVENTS
    EVENTS_FETCH_ALL_SUCCESS, EVENTS_FETCH_ALL_FAIL,
    EVENTS_FETCH_DETAILS_SUCCESS, EVENTS_FETCH_DETAILS_FAIL,
    EVENTS_DELETE_SUCCESS, EVENTS_DELETE_FAIL, EVENTS_UPDATE_LIST,
    SAVE_EVENTS_SUCCESS, SAVE_EVENTS_FAIL,
    EDIT_EVENTS_SUCCESS, EDIT_EVENTS_FAIL,

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
    necrology: [],
    necrologyDetails: null,
    documentCategories: [],
    shukran: [],
    shukranDetails: null,
    ignatian_thoughts: [],
    popesPrayers: [],
    popesPrayerDetails: null, 
    eventCategories: [],
    events: [],
    eventDetails: null,
    adusums: [],
    adusumDetails: null,
    archivium: [],
    archiviumDetails: null,
    products: [],
    productDetails: null,
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

            // ADUSUM

        case SAVE_ADUSUM_SUCCESS:
            return {
                ...state,
                adusums: payload.data,
            };

        case SAVE_ADUSUM_FAIL:
            return{
                ...state,
            } ;

        case EDIT_ADUSUM_SUCCESS:
            return {
                ...state,
                adusums: payload.data,
            };

        case EDIT_ADUSUM_FAIL:
            return {
                ...state,
            };

        case SAVE_ADUSUM_FAIL:
            return{
                ...state,
            } ;   

        case ADUSUM_FETCH_ALL_SUCCESS:
            return {
                ...state,
                adusums: payload.data, // Store the fetched customer data
            };

        case ADUSUM_FETCH_ALL_FAIL:
            return {
                ...state,
                adusums: [], // Handle the failure case
            };

        case ADUSUM_FETCH_DETAILS_SUCCESS:
            return {
                ...state,
                adusumDetails: payload, // Store the fetched ADUSUM data
            };

        case ADUSUM_FETCH_DETAILS_FAIL:
            return {
                ...state,
                adusumDetails: [], // Store the fetched ADUSUM data
            };   
        
        case ADUSUM_UPDATE_LIST:
            // Update the customer list by removing the deleted customer
            const updatedAdusums = state.adusums.filter((adusums) => adusums.id !== payload);
            return {
                ...state,
                adusums: updatedAdusums,
            };

        case ADUSUM_DELETE_SUCCESS: 
            const updatedAdusum = state.adusums.filter(adusums => adusums.id !== payload.data);

            return {
                ...state,
                adusums: updatedAdusum,
            };

        case ADUSUM_DELETE_FAIL:
            return {
                ...state,
            };    
        
            // ARCHIVIUM

        case SAVE_ARCHIVIUM_SUCCESS:
            return {
                ...state,
                archivium: payload.data,
            };

        case SAVE_ARCHIVIUM_FAIL:
            return{
                ...state,
            } ;

        case EDIT_ARCHIVIUM_SUCCESS:
            return {
                ...state,
                archivium: payload.data,
            };

        case EDIT_ARCHIVIUM_FAIL:
            return {
                ...state,
            };

        case SAVE_ARCHIVIUM_FAIL:
            return{
                ...state,
            } ;   

        case ARCHIVIUM_FETCH_ALL_SUCCESS:
            return {
                ...state,
                archivium: payload.data, // Store the fetched customer data
            };

        case ARCHIVIUM_FETCH_ALL_FAIL:
            return {
                ...state,
                archivium: [], // Handle the failure case
            };

        case ARCHIVIUM_FETCH_DETAILS_SUCCESS:
            return {
                ...state,
                archiviumDetails: payload, // Store the fetched ARCHIVIUM data
            };

        case ARCHIVIUM_FETCH_DETAILS_FAIL:
            return {
                ...state,
                archiviumDetails: [], // Store the fetched ARCHIVIUM data
            };   
        
        case ARCHIVIUM_UPDATE_LIST:
            // Update the customer list by removing the deleted customer
            const updateAchivium = state.archivium.filter((archivium) => archivium.id !== payload);
            return {
                ...state,
                archivium: updateAchivium,
            };

        case ARCHIVIUM_DELETE_SUCCESS: 
            const updatedAchivium = state.archivium.filter(archivium => archivium.id !== payload.data);

            return {
                ...state,
                archivium: updatedAchivium,
            };

        case ARCHIVIUM_DELETE_FAIL:
            return {
                ...state,
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
        
            // Popes Prayers

        case SAVE_POPES_PRAYER_INTENTION_SUCCESS:
            return {
                ...state,
                popesPrayers: payload.data,
            };

        case SAVE_POPES_PRAYER_INTENTION_FAIL:
            return{
                ...state,
            } ;

        case EDIT_POPES_PRAYER_INTENTION_SUCCESS:
            return {
                ...state,
                popesPrayers: payload.data,
            };

        case EDIT_POPES_PRAYER_INTENTION_FAIL:
            return {
                ...state,
            };

        case SAVE_POPES_PRAYER_INTENTION_FAIL:
            return{
                ...state,
            } ;   

        case POPES_PRAYER_INTENTION_FETCH_ALL_SUCCESS:
            return {
                ...state,
                popesPrayers: payload.data, // Store the fetched customer data
            };

        case POPES_PRAYER_INTENTION_FETCH_ALL_FAIL:
            return {
                ...state,
                popesPrayers: [], // Handle the failure case
            };

        case POPES_PRAYER_INTENTION_FETCH_DETAILS_SUCCESS:
            return {
                ...state,
                popesPrayerDetails: payload, // Store the fetched POPES_PRAYER_INTENTION data
            };

        case POPES_PRAYER_INTENTION_FETCH_DETAILS_FAIL:
            return {
                ...state,
                popesPrayerDetails: [], // Store the fetched POPES_PRAYER_INTENTIONS data
            };   
        
        case POPES_PRAYER_INTENTION_UPDATE_LIST:
            // Update the customer list by removing the deleted customer
            const updatedPrayer = state.popesPrayers.filter((popesPrayers) => popesPrayers.id !== payload);
            return {
                ...state,
                popesPrayers: updatedPrayer,
            };

        case POPES_PRAYER_INTENTION_DELETE_SUCCESS: 
            const updatedPrayers = state.popesPrayers.filter(popesPrayers => popesPrayers.id !== payload.data);

            return {
                ...state,
                popesPrayers: updatedPrayers,
            };

        case POPES_PRAYER_INTENTION_DELETE_FAIL:
            return {
                ...state,
            };    
        
        // CATALOGUES

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
          
            // SHUKRAN

        case SAVE_SHUKRAN_SUCCESS:
            return {
                ...state,
                shukran: payload.data,
            };

        case SAVE_SHUKRAN_FAIL:
            return{
                ...state,
            } ;

        case EDIT_SHUKRAN_SUCCESS:
            return {
                ...state,
                shukran: payload.data,
            };

        case EDIT_SHUKRAN_FAIL:
            return {
                ...state,
            };

        case SAVE_SHUKRAN_FAIL:
            return{
                ...state,
            } ;   

        case SHUKRAN_FETCH_ALL_SUCCESS:
            return {
                ...state,
                shukran: payload.data, // Store the fetched customer data
            };

        case SHUKRAN_FETCH_ALL_FAIL:
            return {
                ...state,
                shukran: [], // Handle the failure case
            };

        case SHUKRAN_FETCH_DETAILS_SUCCESS:
            return {
                ...state,
                shukranDetails: payload, // Store the fetched SHUKRAN data
            };

        case SHUKRAN_FETCH_DETAILS_FAIL:
            return {
                ...state,
                shukranDetails: [], // Store the fetched SHUKRAN data
            };   
        
        case SHUKRAN_UPDATE_LIST:
            // Update the customer list by removing the deleted customer
            const updatedShukran = state.shukran.filter((shukran) => shukran.id !== payload);
            return {
                ...state,
                shukran: updatedShukran,
            };

        case SHUKRAN_DELETE_SUCCESS: 
            const updatedShukrans = state.shukran.filter(shukran => shukran.id !== payload.data);

            return {
                ...state,
                shukran: updatedShukrans,
            };

        case SHUKRAN_DELETE_FAIL:
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
          
             // DOCUMENT CATEGORY

        case SAVE_DOCUMENT_CATEGORY_SUCCESS:
            return {
                ...state,
                documentCategories: payload.data,
            };

        case SAVE_DOCUMENT_CATEGORY_FAIL:
            return{
                ...state,
            } ;

        case EDIT_DOCUMENT_CATEGORY_SUCCESS:
            return {
                ...state,
                documentCategories: payload.data,
            };

        case DOCUMENT_ONLY_FETCH_SUCCESS:
            return {
                ...state,
                documentCategories: payload.data, // Store the fetched documents data
            };

        case DOCUMENT_ONLY_FETCH_FAIL:
            return {
                ...state,
                documentCategories: [], // Handle the failure case
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
                documentCategories: payload.data, // Store the fetched customer data
            };

        case DOCUMENT_CATEGORY_FETCH_ALL_FAIL:
            return {
                ...state,
                documentCategories: [], // Handle the failure case
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
          
            // IGNATIAN_THOUGHTS

        case IGNATIAN_THOUGHTS_FETCH_ALL_SUCCESS:
            return {
                ...state,
                ignatian_thoughts: payload.data, // Store the fetched customer data
            };

        case IGNATIAN_THOUGHTS_FETCH_ALL_FAIL:
            return {
                ...state,
                ignatian_thoughts: [], // Handle the failure case
            };

            // EVENT CATEGORY

        case SAVE_EVENT_CATEGORY_SUCCESS:
            return {
                ...state,
                eventCategories: payload.data,
            };

        case SAVE_EVENT_CATEGORY_FAIL:
            return{
                ...state,
            } ;

        case EDIT_EVENT_CATEGORY_SUCCESS:
            return {
                ...state,
                eventCategories: payload.data,
            };

        case EVENT_ONLY_FETCH_SUCCESS:
            return {
                ...state,
                eventCategories: payload.data, // Store the fetched EVENTs data
            };

        case EVENT_ONLY_FETCH_FAIL:
            return {
                ...state,
                eventCategories: [], // Handle the failure case
            };

        case EDIT_EVENT_CATEGORY_FAIL:
            return {
                ...state,
            };

        case SAVE_EVENT_CATEGORY_FAIL:
            return{
                ...state,
            } ;   

        case EVENT_CATEGORY_FETCH_ALL_SUCCESS:
            return {
                ...state,
                eventCategories: payload.data, // Store the fetched customer data
            };

        case EVENT_CATEGORY_FETCH_ALL_FAIL:
            return {
                ...state,
                eventCategories: [], // Handle the failure case
            };

        case EVENT_CATEGORY_FETCH_DETAILS_SUCCESS:
            return {
                ...state,
                documentDetails: payload, // Store the fetched DOCUMENTS data
            };

        case EVENT_CATEGORY_FETCH_DETAILS_FAIL:
            return {
                ...state,
                documentDetails: [], // Store the fetched DOCUMENTS data
            };   
        
        case EVENT_CATEGORY_UPDATE_LIST:
            // Update the customer list by removing the deleted customer
            const updatedEventCategories = state.documents.filter((documents) => documents.id !== payload);
            return {
                ...state,
                documents: updatedEventCategories,
            };

        case EVENT_CATEGORY_DELETE_SUCCESS: 
            const updatedEventCategory = state.documents.filter(documents => documents.id !== payload.data);

            return {
                ...state,
                documents: updatedEventCategory,
            };

        case EVENT_CATEGORY_DELETE_FAIL:
            return {
                ...state,
            };    
          
            // EVENTS

        case SAVE_EVENTS_SUCCESS:
            return {
                ...state,
                events: payload.data,
            };

        case SAVE_EVENTS_FAIL:
            return{
                ...state,
            } ;

        case EDIT_EVENTS_SUCCESS:
            return {
                ...state,
                events: payload.data,
            };

        case EDIT_EVENTS_FAIL:
            return {
                ...state,
            };

        case SAVE_EVENTS_FAIL:
            return{
                ...state,
            } ;   

        case EVENTS_FETCH_ALL_SUCCESS:
            return {
                ...state,
                events: payload.data, // Store the fetched customer data
            };

        case EVENTS_FETCH_ALL_FAIL:
            return {
                ...state,
                events: [], // Handle the failure case
            };

        case EVENTS_FETCH_DETAILS_SUCCESS:
            return {
                ...state,
                eventDetails: payload, // Store the fetched EVENTS data
            };

        case EVENTS_FETCH_DETAILS_FAIL:
            return {
                ...state,
                eventDetails: [], // Store the fetched EVENTS data
            };   
        
        case EVENTS_UPDATE_LIST:
            // Update the customer list by removing the deleted customer
            const updatedEvents = state.events.filter((events) => events.id !== payload);
            return {
                ...state,
                events: updatedEvents,
            };

        case EVENTS_DELETE_SUCCESS: 
            const updatedEvent = state.events.filter(events => events.id !== payload.data);

            return {
                ...state,
                events: updatedEvent,
            };

        case EVENTS_DELETE_FAIL:
            return {
                ...state,
            };    
        
            // PRODUCTS

        case SAVE_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: payload.data,
            };

        case SAVE_PRODUCTS_FAIL:
            return{
                ...state,
            } ;

        case EDIT_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: payload.data,
            };

        case EDIT_PRODUCTS_FAIL:
            return {
                ...state,
            };

        case SAVE_PRODUCTS_FAIL:
            return{
                ...state,
            } ;   

        case PRODUCTS_FETCH_ALL_SUCCESS:
            return {
                ...state,
                products: payload.data, // Store the fetched customer data
            };

        case PRODUCTS_FETCH_ALL_FAIL:
            return {
                ...state,
                products: [], // Handle the failure case
            };

        case PRODUCTS_FETCH_DETAILS_SUCCESS:
            return {
                ...state,
                productDetails: payload, // Store the fetched PRODUCTS data
            };

        case PRODUCTS_FETCH_DETAILS_FAIL:
            return {
                ...state,
                productDetails: [], // Store the fetched PRODUCTS data
            };   
        
        case PRODUCTS_UPDATE_LIST:
            // Update the customer list by removing the deleted customer
            const updateProduct = state.products.filter((products) => products.id !== payload);
            return {
                ...state,
                products: updateProduct,
            };

        case PRODUCTS_DELETE_SUCCESS: 
            const updatedProduct = state.products.filter(products => products.id !== payload.data);

            return {
                ...state,
                products: updatedProduct,
            };

        case PRODUCTS_DELETE_FAIL:
            return {
                ...state,
            };    
            
        // NECROLOGY

        case SAVE_NECROLOGY_SUCCESS:
            return {
                ...state,
                necrology: payload.data,
            };

        case SAVE_NECROLOGY_FAIL:
            return{
                ...state,
            } ;

        case EDIT_NECROLOGY_SUCCESS:
            return {
                ...state,
                necrology: payload.data,
            };

        case EDIT_NECROLOGY_FAIL:
            return {
                ...state,
            };

        case SAVE_NECROLOGY_FAIL:
            return{
                ...state,
            } ;   

        case NECROLOGY_FETCH_ALL_SUCCESS:
            return {
                ...state,
                necrology: payload.data, // Store the fetched customer data
            };

        case NECROLOGY_FETCH_ALL_FAIL:
            return {
                ...state,
                necrology: [], // Handle the failure case
            };

        case NECROLOGY_FETCH_DETAILS_SUCCESS:
            return {
                ...state,
                necrologyDetails: payload, // Store the fetched NECROLOGY data
            };

        case NECROLOGY_FETCH_DETAILS_FAIL:
            return {
                ...state,
                necrologyDetails: [], // Store the fetched NECROLOGY data
            };   
        
        case NECROLOGY_UPDATE_LIST:
            // Update the customer list by removing the deleted customer
            const updatedNecrologies = state.necrology.filter((necrology) => necrology.id !== payload);
            return {
                ...state,
                necrology: updatedNecrologies,
            };

        case NECROLOGY_DELETE_SUCCESS: 
            const updatedNecrology = state.necrology.filter(necrology => necrology.id !== payload.data);

            return {
                ...state,
                necrology: updatedNecrology,
            };

        case NECROLOGY_DELETE_FAIL:
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
