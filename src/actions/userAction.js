import { CLEAR_CART } from "../constants/cartConstant"
import {CLEAR_ERRORS, FORGOT_PASSWORD_FAIL, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAIL, LOGOUT_SUCCESS, NEW_PASSWORD_FAIL, NEW_PASSWORD_REQUEST, NEW_PASSWORD_SUCCESS, REGISTER_USER_FAIL, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, UPDATE_PASSWORD_FAIL, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS, UPDATE_PROFILE_FAIL, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS} from "../constants/userConstant"
import axios from "axios"

/* 
    API
        application programming interface
        a kind of url which has some info
*/

/*
    CRUD (create, read, update, delete)
        
        create/send = POST        PUT = create/replace (not safe, coz overwrites State of server)
        read = GET 
        update = PATCH 
        delete = DELETE 

        https://byjus.com/gate/difference-between-put-and-patch-request/#:~:text=PUT%20is%20a%20technique%20of%20altering%20resources%20when%20the%20client,without%20changing%20the%20whole%20data.&text=The%20PUT%20HTTP%20method%20is%20known%20to%20be%20unchanged.
        https://www.keycdn.com/support/put-vs-post#:~:text=PUT%20is%20not%20a%20safe,the%20state%20of%20the%20server.
*/

/* 
Flow
    press Login btn
        go trigger Login API

    using Axios 
        send data(email, pass) to Backend(node.js express.js)

    data(email, pass) match with DB connected via Backend(node.js express.js)
        if match
            isAuthenticated = true
            return userData as an API

    we access API here(in Action) to get userData
*/


/*
    LOGIN
        we 1st send the data, so POST optn
        Not fetch data
            fetch done by LOAD_USERS 
*/
export const login = (email, password) => async(dispatch) => {
    try{
        dispatch({
            type: LOGIN_REQUEST
        })

        //headers send via axios = to specify data format 
        const config = {
            headers: {
                "Content-Type": "application/json", 
            }
        }

        //axios.post = to send data
        const {data} = await axios.post(
            `https://food-order-web-app-backend.onrender.com/api/v1/users/login`,
            {email, password},
            config
        )

        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.data.user,
        })

    } catch(error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: "Login Failed"
        })
        /* 
            dispatch({data}), data is sent to store  
        */
    }
}
    


/* 
    REGISTER
        POST oprtn, coz send the data
        "userData"(name, email, ph.no., pass, confirm pass) 
            will come from Register.jsx page
                when submit html "form"
                so in headers{}
                    Content-type = multipart/form-data
*/
export const register = (userData) => async(dispatch) => {
    try{
        dispatch({type: REGISTER_USER_REQUEST})

        const config = {
            headers: {"Content-Type": "multipart/form-data"}
        }

        const {data} = await axios.post(
            `https://food-order-web-app-backend.onrender.com/api/v1/users/signup`,
            userData,
            config
        )

        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data.data.user,
        })

        return data.data.user;  
            /* useful if the calling func. needs this data */
    
    } catch(error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message,
        })
    }
}





/* 
   LOAD USER ACTION 
        just load details of user which matches in DB

        we compare (email, pass) in BackendDB only,
            No compare in Action file
        
        if True
            send userData back to this API
*/
export const loadUser = () => async(dispatch) => {
    try{
        dispatch({type: LOAD_USER_REQUEST})

        const {data} = await axios.get(`https://food-order-web-app-backend.onrender.com/api/v1/users/me`)

        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.user                  
                /*                 
                    why for    axios.POST   payload: data.data.user
                        but    axios.GET    payload: data.user
                    ?
                */        
           })
    } catch(error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.message,
        })
    }
}



/* LOGOUT */
export const logout = () => async(dispatch) => {
    try{
        await axios.get(`https://food-order-web-app-backend.onrender.com/api/v1/users/logout`)

        dispatch({
            type: LOGOUT_SUCCESS
        })

        dispatch({
            type: CLEAR_CART            //clear Cart when logout
        })
    } catch(error) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response.data.message,
        })
    }
}



/* UPDATE PROFILE */
export const updateProfile = (userData) => async(dispatch) => {
    try {
        dispatch({type: UPDATE_PROFILE_REQUEST})

        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
        const {data} = await axios.put(         //using PUT to update data,  instead of PATCH why?
            `https://food-order-web-app-backend.onrender.com/api/v1/users/me/update`,
            userData,
            config
        )

        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: data.success
        })
    } catch(error) {
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response.data.message,
        })
    }


}



/* CLEAR ERRORS */
export const clearErrors = () => async(dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}


/* UPDATE PASSWORD */
export const updatePassword = (passwords) => async(dispatch) => {
    try{
        dispatch({type: UPDATE_PASSWORD_REQUEST})
        
        const config = {
            headers: {
                "Content-Type" : "application/json"
            }
        }

        const {data} = await axios.put(
            "https://food-order-web-app-backend.onrender.com/api/v1/users/passwords/update",
            passwords,
            config
        )

        dispatch({
            type: UPDATE_PASSWORD_SUCCESS,
            payload: data.success,
        })

    } catch(error) {
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error.respaonse.data.message,
        })
    }
}



/* FORGOT PASSWORD */
export const forgotPassword = (email) => async(dispatch) => {
    try {
        dispatch({type: FORGOT_PASSWORD_REQUEST})

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        const {data} = await axios.post(
            "https://food-order-web-app-backend.onrender.com/api/v1/users/forgetPassword",
            email,
            config,
        )

        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: data.success
        })
        
    } catch(error) {
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: error.response.data.message,
        })
    }
}



/* RESET PASSWORD */
export const resetPassword = (token, passwords) => async(dispatch) => {
    try {
        dispatch({
            type: NEW_PASSWORD_REQUEST
        })
        
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        const {data} = await axios.patch(
            `https://food-order-web-app-backend.onrender.com/api/v1/users/resetPassword/${token}`,
            passwords,
            config,
        )
        dispatch({
            type: NEW_PASSWORD_SUCCESS,
            payload: data.success,
        })

    } catch(error) {
        dispatch({
            type: NEW_PASSWORD_FAIL,
            payload: error.response.data.message,
        })
    }
}