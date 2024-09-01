import React from "react";
import CountRestaurants from "./CountRestaurants";
import Restaurant from "./Restaurant";

import { useEffect } from "react";
import {
  getRestaurants,
  sortByReviews,
  sortByRatings,
  toggleVegOnly,
} from "../../actions/restaurantAction";

import { useDispatch, useSelector } from "react-redux";
import { restaurantReducer } from "../../reducer/restaurantReducer";

import Loader from "./Loader";
import Message from "./Message";

/* 
    https://react-redux.js.org/api/hooks
        useSelector()
            Allows you to extract data from 
              the Redux store state 
              for use in this component, 
              using a selector function. 

        useDispatch()
            This hook returns a reference to the 
                dispatch function from the Redux store. 
            You may use it to dispatch actions as needed.

        useParams()
            This returns all the dynamic parameters (:id) 
                as an object
            It is a Redux hook, 
                to pass dynamic params btwn components 
            

*/

function Home() {
  /* lets Redux know that an Action has been dispatched */
  const dispatch = useDispatch();

  /* extract|select data from store */
  const {
    loading: restaurantsLoading,
    error: restaurantsError,
    restaurants,
    showVegOnly,
  } = useSelector((state) => state.restaurants);
  /*             
        Destructuring .restaurants property fetched from store
            loading: restaurantsLoading         
            error: restaurantsError
            restaurants
                
                this is just re-naming 
                    old_name: new_name


        .restaurants porperty refers to   
            in restaurantReducer.js
                const initialState = {restaurants: []}
            
            in store.js
                const reducer = combineReducers({restaurants: resaurantReducer})

    */


  /* trigger point for action
        here action = is to manage extrnl API's 
    */
  useEffect(() => {
    dispatch(getRestaurants());
  }, [dispatch]);


  /* dispatch action after button is clicked
      send instruction to reducer(dispatch) to execute a command(action) 
      */
  const handleSortByReview = () => {
    dispatch(sortByReviews());
  };

  const handleSortByRatings = () => {
    dispatch(sortByRatings());
  };

  const handleToggleVegOnly = () => {
    dispatch(toggleVegOnly());
  };


  
  return (
    <div>
      {/* Count Restaurants */}
      <CountRestaurants />

      {/* JS if-else condn to make web-page Dynamic */}
      {/* if component is in Loading state then
                    run Loader.jsx
                else
                    if there is error
                        display Message.jsx
                    else when No error
                        display Dynamic content
        */}
      {restaurantsLoading ? (
        <Loader />
      ) : restaurantsError ? (
        <Message variant="danger"> {restaurantsError} </Message>
      ) : (
        /*        
                    anything written in between are the children of that element
                        <Parent> children </Parent>
                            
                    {restauarantsError}
                        Child of Message.jsx component
                        
                    (variant="danger") 
                        attribute="data"
                        data is sent by the name of attribute 

                    we need Props
                        to pass Attri data and Children 
                        from Parent(Home.jsx) to Child(Message.jsx)
                */
        <>
          <section>
            {/* PureVeg SortByReview SortByRatings */}
            <div className="sort">
              <button className="sort_veg p-3" onClick={handleToggleVegOnly}>
                {showVegOnly ? "Show All" : "Pure Veg"}
              </button>
              <button className="sort_veg p-3" onClick={handleSortByReview}>
                Sort By Review
              </button>
              <button className="sort_veg p-3" onClick={handleSortByRatings}>
                Sort By Ratings
              </button>
            </div>

            {/* Restaurant Cards */}
            <div className="row mt-4">
              {
                restaurants
                ? restaurants.map((restaurant) => 
                  !showVegOnly || (showVegOnly && restaurant.isVeg)
                    /* if showVegOnly is false, show all restaurants    OR    showVegOnly is true, show restaurants with restaurants.isVeg=true (i.e. show only Veg restaurants) */
                    ? (
                        <Restaurant key={restaurant._id} restaurant={restaurant} />
                      )
                    : null)
                : (<Message variant="info"> No Restaurant found </Message>)
              }
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default Home;
