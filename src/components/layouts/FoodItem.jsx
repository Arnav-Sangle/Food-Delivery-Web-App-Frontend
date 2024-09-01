import React, { useEffect, useState } from "react";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addItemToCart,
  removeItemFromCart,
  updateCartQuantity,
} from "../../actions/cartAction";

export default function FoodItem({ fooditem, restaurant }) {
  // console.log(fooditem)
  // console.log(restaurant)
  
  const alert = useAlert();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const [showButtons, setShowButtons] = useState(false);

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.cartItems);


  useEffect(() => {
    const cartItem = cartItems.find(
      (item) => item.foodItem._id === fooditem._id
      /* 
        tells to Match    foodItem._id from cartItems     with      fooditem._id we have passed inside Props, list of all foodItems in Menu.jsx
        it saves that foodItem inside cartItem
      */
    );

    if (cartItem) {
      setQuantity(cartItem.quantity);
      setShowButtons(true);
    } else {
      setQuantity(1);
      setShowButtons(false);
    }
  }, [cartItems, fooditem]);

  const increaseQty = () => {
    if (quantity < fooditem.stock) {
      //fooditem = all fooditem in Menu,    No. of food item available in Menu
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
        // console.log(fooditem._id)
      dispatch(updateCartQuantity(fooditem._id, newQuantity, alert));
    } else {
      alert.error("Exceed Stock Limit")
    }
  };

  const decreaseQty = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
        // console.log(fooditem._id)
      dispatch(updateCartQuantity(fooditem._id, newQuantity, alert));
    } else {
      setQuantity(0);
      setShowButtons(false);
      dispatch(removeItemFromCart(fooditem._id));
      /* 
	        Here Not sending 	user._id	
		      Coz 1st we Login,
			      Without login, 	No cart oprtn can be perform 
        */
    }
  };

  const addToCartHandler = () => {
    if (!isAuthenticated && !user) {
      return navigate("/users/login");
    }
    if (fooditem && fooditem._id) {
      dispatch(addItemToCart(fooditem._id, restaurant, quantity, alert))
      setShowButtons(true);
    } else {
      console.error("Food item ID is not defined");
    }
  };

  return (
    <div className="col-sm-12 col-md-6 col-lg-3 my-3">
      <div className="card p-3 rounded">
        {/* Image */}
        <img
          // src="https://b.zmtcdn.com/data/pictures/chains/4/6506474/46b459cf0496467255dbc43ec8c21a25.jpg?fit=around|771.75:416.25&crop=771.75:416.25;*,*"
          src={fooditem.images[0].url}
          alt={fooditem.name}
          className="card-img-top mx-auto"
        />

        {/* Heading & Description */}
        <div className="card-body d-flex flex-column">
          <h5 className="card-title"> {fooditem.name} </h5>

          <p className="fooditem_des"> {fooditem.description} </p>

          <p className="card-text">
            <LiaRupeeSignSolid />
            {fooditem.price}
          </p>

          {
            !showButtons 
            ? (
              <button
                type="button"
                id="cart_btn"
                className="btn btn-primary d-inline ml-4"
                disabled={fooditem.stock === 0}
                onClick={addToCartHandler}
              >
                Add to Cart
              </button>
            ) 
            : (
              <div className="stockCounter d-inline">
                <span className="btn btn-danger minus" onClick={decreaseQty}>
                  -
                </span>

                <input
                  type="number"
                  className="form-control count d-inline"
                  value={quantity}
                  readOnly
                />

                <span className="btn btn-primary plus" onClick={increaseQty}>
                  +
                </span>
              </div>
            )
          }

          <br />
          <p>
            Status:
            <span
              id="stock_status"
              /* Dynamic ClassName */
              className={fooditem.stock ? "greenColor" : "redColor"}
            >
              {fooditem.stock ? "In Stock" : "Out of Stock"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
