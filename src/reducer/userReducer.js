//Reducer for Managing Authentication related State

/* 
    Q
        how to keep person Logged-in ?
        OR
        how app knows the person has already Logged-in ?

    A
        use another API for "currentUser"
        at 1st time when app load,
            app check for currentUser
                true
                    app laod with userData
                false
                    app load without userData
*/

/* 
    paid
        wixstudio.in
        monster.com
        godaddy.com

    free
        netlify
        vercel
        render.com

    All provide domain/server to run Globally 
        web-app, api           
*/

import {
  CLEAR_ERRORS,
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_RESET,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PASSWORD_RESET,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_SUCCESS,
  NEW_PASSWORD_REQUEST,
  NEW_PASSWORD_SUCCESS,
  NEW_PASSWORD_FAIL,
} from "../constants/userConstant";


/* 
    authReducer
        login
        logout
        loadUser
    
    userReducer
        updateProfile
        updatePassword

    forgotPasswordReducer
        forgotPassword
        newPassword

*/
export const authReducer = (
  state = {
    user: null,
    loading: false,
    isAuthenticated: false,
    data: [],
  },
  action
) => {
  switch (action.type) {
    /* merging cases
            same action for all REQUEST cases 
        */
    case LOGIN_REQUEST:
    case REGISTER_USER_REQUEST:
    case LOAD_USER_REQUEST:
      return {
        ...state,
        loading: true,
        isAuthenticated: false,
      };

    /* merging LOGIN SUCCESS cases */
    case LOGIN_SUCCESS:
    case REGISTER_USER_SUCCESS:
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
      };

    /* merging FAIL cases */
    case LOGIN_FAIL:
    case REGISTER_USER_FAIL:
    case LOAD_USER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

    case LOGOUT_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};




export const userReducer = (state = {}, action) => {
  //state={}  is emptyState

  switch (action.type) {
    case UPDATE_PROFILE_REQUEST:
    case UPDATE_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_PROFILE_SUCCESS:
    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload, //from userAction.js, we are sending, payload: data.success
      };

    case UPDATE_PROFILE_RESET:
    case UPDATE_PASSWORD_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case UPDATE_PROFILE_FAIL:
    case UPDATE_PASSWORD_FAIL:
      return {
        ...state,
        isUpdated: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};



export const forgotPasswordReducer = (state={}, action) => {
    switch (action.type) {
        case FORGOT_PASSWORD_REQUEST:
        case NEW_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            }

        case FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload,
            }
        case NEW_PASSWORD_SUCCESS:
            return {
                ...state,
                success: action.payload,
            }

        case FORGOT_PASSWORD_FAIL:
        case NEW_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
    
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }

        default:
            return state;
    }
}