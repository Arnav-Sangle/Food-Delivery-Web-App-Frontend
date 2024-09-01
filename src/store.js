import {
    legacy_createStore as createStore,
        /*   
            https://redux.js.org/api/createstore
                crates a array|object container  
        */  

    combineReducers,       
        /*   
            https://redux.js.org/api/combinereducers   
                combines different types of reducers 
                    that carry out diff actions for diff components like(restaurant, foodItem, cart, order)       
                when an Action is Dispatched
                    it calls all the diff Reducers that has been combined into a single reducer
        */ 

    applyMiddleware,
        /*         
                https://redux.js.org/api/applymiddleware
                    it performs extra tasks between Action and Reducer
                    it is the software which communicates between frontend & backend 
        */    

    compose,
        /*     
            https://redux.js.org/api/compose
                it reads the reducerFunc from right to left (<--)
                it increases Readability of the code 
        */

} from "redux";

import thunk from "redux-thunk"
    /* 
        https://redux.js.org/usage/writing-logic-thunks    
            it helps to do delayed work (i.e. fetching data from extrnlDB)
    */

import {restaurantReducer} from "./reducer/restaurantReducer"
import { menuReducer } from "./reducer/menuReducer";
import { authReducer, forgotPasswordReducer, userReducer } from "./reducer/userReducer";
import { cartReducer } from "./reducer/cartReducer";
import { myOrderReducer, newOrderReducer, orderDetailsReducer } from "./reducer/orderReducer";





const reducer = combineReducers(
    {
        restaurants: restaurantReducer,
        menus: menuReducer,
        auth: authReducer,
        user: userReducer,
        forgotPassword: forgotPasswordReducer,
        cart: cartReducer,
        newOrder: newOrderReducer,
        myOrders: myOrderReducer,
        orderDetails: orderDetailsReducer,
    }
)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    /* 
    used in React apps
        allow to use multiple enhancer in a row
        help React app proj to connect to Redux DevTools
    */

const middleware = [thunk]

const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(...middleware))
        /* 
            enhance multiple stores
                or the custom middlewares
        */
)

export default store
