import { ADD_TO_CART, FETCH_CART, REMOVE_CART_ITEM, UPDATE_CART_ITEM } from "../constants/cartConstant"
import axios from "axios"


export const fetchCartItems = (alert) => async(dispatch) => {
    try {
        const response = await axios.get(`/api/v1/eats/cart/get-cart`)
        dispatch({
            type: FETCH_CART,
            payload: response.data.data,
        })
    } catch(error) {
        console.error("Fetch cart error: ", error)
        if(alert) {
            alert.info("Cart is hungry")
        }
    }
}



/* ADD to Cart */
export const addItemToCart = (foodItemId, restaurant, quantity, alert) => async(dispatch, getState) => {
    try {
        const {user} = getState().auth      //returns the current Store tree
            /* 
                add item to cart 
                    only when user is logged in
                getState()
                    https://redux.js.org/api/store
                        used to access Store State
                        equal to last value returned by Store's Reducer 
                        
                        getState().auth
                            gives value last returned by authReducer
                                i.e. if user is logged in or Not 
                        
                            adds extra security level
            */

        const response = await axios.post(`/api/v1/eats/cart/add-to-cart`, {
            userId: user._id,                       //diff user diff cart
            foodItemId,                             //diff foodItem diff id
            restaurantId: restaurant,
            quantity,
        })

        alert.success("Item added to cart", response.data.cart)
        dispatch({
            type: ADD_TO_CART,  
            payload: response.data.cart
        })
        
    } catch (error) {
        alert.error(error.response ? error.response.data.message : error.message)
    }
}




/* UPDATE Cart Item Qty */
export const updateCartQuantity = (foodItemId, quantity, alert) => async(dispatch, getState) => {
    try {
        const {user} = getState().auth

        /* 
            if select 2-3 food items
                then all those foodItems ID come together     
        */
        if(typeof foodItemId === "object"){
            foodItemId = foodItemId._id                // converting Object into normal ID
                // console.log(foodItemId)
        }

        
        const response = await axios.post(`/api/v1/eats/cart/update-cart-item`, {
            userId: user._id,
            foodItemId: foodItemId,
            quantity
        })

        dispatch({
            type: UPDATE_CART_ITEM,
            payload: response.data.cart,
        })

    } catch (error) {
        // alert.error(error.response ? error.response.data.message : error.message)
        console.error(error.response ? error.response.data.message : error.message)
    }
}




/* REMOVE Items from Cart */
export const removeItemFromCart = (foodItemId, alert) => async(dispatch, getState) => {
    try {
        const {user} = getState().auth

        if(typeof foodItemId === "object") {
            foodItemId = foodItemId._id
        }

        const response = await axios.delete(`/api/v1/eats/cart/delete-cart-item`,
            {
                data: {userId: user._id, foodItemId}
            }
        )

        dispatch({
            type: REMOVE_CART_ITEM,
            payload: response.data,
        })
    } catch (error) {
        alert.error(error.response ? error.response.data.message : error.message)
    }
}