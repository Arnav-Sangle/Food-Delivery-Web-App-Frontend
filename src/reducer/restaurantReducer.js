import {
  ALL_RESTAURANTS_FAIL,
  ALL_RESTAURANTS_REQUESTS,
  ALL_RESTAURANTS_SUCCESS,
  SORT_BY_RATINGS,
  SORT_BY_REVIEWS,
  TOGGLE_VEG_ONLY,
  CLEAR_ERROR
} from "../constants/restaurantConstant";

const initialState = {
  restaurants: [],
};

/* 
    Normal way
        function reducer(state, action) {} 

    Arrow func
        const reducer = (state, action) => {}
*/
export const restaurantReducer = (state = initialState, action) => {
  switch (action.type) {
    //update data
    case ALL_RESTAURANTS_REQUESTS:
      return {
        //using ... spreadOperator load prev state
        ...state,
        /*    
                                {
                                    "status": "success",
                                    "count": 8,
                                    "restaurants":  []
                                } 
                            */

        //add new data
        loading: true,
        error: null,
      };

    //after data load success
    case ALL_RESTAURANTS_SUCCESS:
      return {
        ...state,
        loading: false,

        count: action.payload.count,
        restaurants: action.payload.restaurants,
      };

    case ALL_RESTAURANTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case SORT_BY_RATINGS:
      return {
        ...state,
        restaurants: [...state.restaurants].sort(
          (a, b) => b.ratings - a.ratings
        ),
        /* 
                            https://www.w3schools.com/js/js_array_sort.asp

                            When comparing a and b, the sort() method 
                                calls the compare sort( function(a, b) {return a-b} ) 
                                This func calculates (a-b), 
                                    If result = -ve, a is sorted before b.
                                    If result = +ve, b is sorted before a.
                                    If result = 0,   no change

                            func(a,b)
                                for Ascending order
                                    if return a-b
                                        a=40, b=100
                                            40-100 = -60
                                            +ve so a,b --> 40,100

                                        a=100, b=40
                                            100-40 = 60
                                            -ve so b,a --> 40,100

                                for Descending order
                                    if return b-a
                                        a=40, b=100
                                            100-40 = 60
                                            +ve so b,a --> 100,40

                                        a=100, b=40
                                            40-100 - -60
                                            -ve so a,b --> 100,40 
                        */
      };

    case SORT_BY_REVIEWS:
      return {
        ...state,
        restaurants: [...state.restaurants].sort(
          (a, b) => b.numOfReviews - a.numOfReviews
        ),
      };

    case TOGGLE_VEG_ONLY:
      return {
        ...state,
        showVegOnly: !state.showVegOnly,  
        /* 
                            showVegOnly = false (initially)
                                we want to implement Toggle func

                                if false
                                    then !false = true
                                if true
                                    then !true = false
                        */
        pureVegRestaurantsCount: calculatePureVegCount(
          state.restaurants,
          !state.showVegOnly    //showVegOnly not updated above instantly, so still !showVegOnly = true
          /* 
                                if showVegOnly = true
                                    i.e. PureVeg btn is clicked    
                                then 
                                    change the btn text to showAll
                                    show only veg restaurants
                                    calculate count of only veg restaurants & show the count
                                        by using middleware callback func calculatePureVegCount()

                                
                                    
                            */
        ),
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};


const calculatePureVegCount = (restaurants, showVegOnly) => {
    //calculatePureVegCount() acts like a middleware

  if (!showVegOnly) {
    return restaurants.length;
    /*         
            if showVegOnly is false      (!false=true, so if statement get exec when showVegOnly = false)
                return count of restaurants 
        */
  } 
  else {
    return restaurants.filter((restaurant) => restaurant.isVeg).length;
    /*         
            if showVegOnly is true
                return filtered arr of restaurants based on isVeg = true
        */
    /* 
                https://www.w3schools.com/jsref/jsref_filter.asp
                    ages.filter(checkAdult)
                        checkAdult returns bool (true/false)
                        filter() return arr copy where condn is staisfy      
            */
  }
};
