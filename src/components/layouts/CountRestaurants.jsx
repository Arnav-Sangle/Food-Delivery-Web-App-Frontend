import React from 'react'
import { getRestaurants } from '../../actions/restaurantAction'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function CountRestaurants() {
  const dispatch = useDispatch()

  const {loading, error, count, showVegOnly, pureVegRestaurantsCount} = useSelector((state)=>state.restaurants)
    /* showVegOnly, pureVegRestaurantsCount
          comes form reducer
     */

  useEffect(()=>{
    dispatch(getRestaurants())
  }, [dispatch])

  return (
    <div>
      {
        loading
        ? (<p>Loading Restaurant count...</p>)
        : error 
          ? (<p>Error: {error}</p>)
          : (
            <>
              <p className="NumOfRestro">
                {showVegOnly ? pureVegRestaurantsCount : count} 
                {" "} {/* space */}
                <span className="Restro">
                  {/* condn for Singular/Plural restaurant(s) depending on count */}
                  {
                    showVegOnly 
                    ? (pureVegRestaurantsCount === 1 ? "Restaurant" : "Restaurants") 
                    : (count === 1 ? "Restaurant" : "Restaurants")
                  }
                </span>
              </p>
            </>
          )
      }

      <hr />
    </div>

  )
}

export default CountRestaurants
