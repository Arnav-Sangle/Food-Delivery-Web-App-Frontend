import React from 'react'
import { Link } from 'react-router-dom'

/* Restaurant Card */
function Restaurant({restaurant}) {
  return (
    <div className='col-sm-12 col-md-6 col-lg-3 my-3'>
      <div className="card p-3 rounded">

        {/* image */}

          {/* STATIC */}
            {/* 
              <img 
                  src="https://b.zmtcdn.com/data/pictures/chains/6/10506/ad13cee41f089a32fa0d854e658a2b9a.jpg?output-format=webp&fit=around|771.75:416.25&crop=771.75:416.25;*,*" 
                  alt="Dominos" 
              /> 
            */}

          {/* DYNAMIC */}
          <Link 
            to={`eats/stores/${restaurant._id}/menus`} 
            className="btn btn-block"
          >
            <img 
              src={restaurant.images[0].url} 
              alt={restaurant.name} 
              className='card-img-top mx-auto'  
              />
          </Link>



            <div className="card-body d-flex flex-column">
                {/* heading & address */}

                  {/* STATIC */}
                    {/*                 
                      <h5 className="card-title">Dominos Pizza</h5>
                      <p className="rest_address">
                          123 Street, Place, City - 000000, State
                      </p> 
                    */}

                  {/* DYNAMIC */}
                    <h5 className="card-title"> {restaurant.name} </h5>                      
                    <p className="rest_address"> {restaurant.address} </p>



                {/* review & rating */}

                  {/* STATIC */}
                    {/* 
                      <div className="ratings mt-auto">
                        <div className="rating-outer">
                          <div className="rating-inner"></div>
                        </div>
                      
                        <span id="no_of_reviews"> (140 reviews) </span>
                      </div>
                    */}

                  {/* DYNAMIC */}
                    <div className="ratings mt-auto">
                      <div className="rating-outer">
                        <div 
                          className="rating-inner" 
                          style={{width:`${(restaurant.ratings / 5) * 100}%`}}
                        ></div>
                      </div>
                    
                      <span id="no_of_reviews"> ({restaurant.numOfReviews} reviews ) </span>
                    </div>
                      
            </div>
            
      </div>
    </div>
  )
}
 
export default Restaurant
