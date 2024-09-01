import axios from "axios"

import { ALL_RESTAURANTS_FAIL, ALL_RESTAURANTS_REQUESTS, ALL_RESTAURANTS_SUCCESS, CLEAR_ERROR, SORT_BY_RATINGS, SORT_BY_REVIEWS, TOGGLE_VEG_ONLY } from "../constants/restaurantConstant"

/* getRestaurants()
    it is a func. to get all Restaurant data
        it will return an asyncFunc
                            that gets data from extrnl_DB/outsideSrc
                                so it requires async-await
    async (dispatch)
            it means giving command/order
            dispatch( {type:} )
                giving command to all {}Obj of type: ALL_RESTAURANTS_REQUESTS
                                                        this is the verbal communication/definiton/namme of action
                            
*/

export const getRestaurants = ()=>{
    return async (dispatch) => {
        try{
            //define verbal command?
                dispatch({type: ALL_RESTAURANTS_REQUESTS})

            //to fetch data
                let link = `/api/v1/eats/stores`
                                /* 
                                    //link contains estrnlDB data in JSON format    
                                        {
                                            "status": "success",
                                            "count": 8,
                                            "restaurants":  []
                                        }

                                */
                                
            //extract data
                const {data} = await axios.get(link) 
                /*  
                    Normal way
                        const obj_name = {value}        JSON object
                    
                    Destructured
                        Not storing in single container
                        const {obj_name} = value
                            it means obj_name = value,  pure JSON 
                */          

                console.log(data)
                const {restaurants, count} = data
                    /* Destructured = data into 2 vars {reastaurant, count} */
                
                dispatch(
                    {
                        type: ALL_RESTAURANTS_SUCCESS,         // type:    verbal command/name of action
                        payload: {restaurants, count},          // payload: data
                    }
                )
        
        }
        catch(err) {
            /* we use dispatch when we are interacting with the data */
            dispatch(
                {
                    type: ALL_RESTAURANTS_FAIL,
                    payload: err.response.data.message,
                }
            )
        }
        
    }
}



export const sortByRatings = ()=>{
    return {
        type: SORT_BY_RATINGS,
    }
}

export const sortByReviews = ()=>{
    return {
        type: SORT_BY_REVIEWS,
    }
}

export const toggleVegOnly = ()=>{
    return {
        type: TOGGLE_VEG_ONLY,
    }
}

export const clearErrors = ()=>{
    return {
        type: CLEAR_ERROR,
    }
}