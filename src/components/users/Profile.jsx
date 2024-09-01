import React from "react";
import Loader from "../layouts/Loader";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Profile = () => {
  /* 
    when Profile.jsx page is reload
      get TypeError: Cannot read properties of null (reading 'avatar')
        coz we are trying to access "user.avatar" 
        but we rendering page, before loading "user" component,
          coz "user" comes from useSelector()
            useSelector() runs at the Last,
              coz it takes time, 1.useSelector 2.state 3.store 4.fetch userData   

    Soln
      Optional Chaining (?.)
        access obj property or call func.
        if obj|func. is undefined|NULL
          it Not throw error, but give "undefined"


  */
  const {user, loading} = useSelector(state => state.auth) 


  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="row justify-content-around mt-5 user-info">
            <div className="col-12 col-md-5 profile">
              <div className="d-flex align-items-center mb-4">
                <figure className="avatar avatar-profile text-center mr-3">
                  <img
                    className="rounded-circle figure-img img-fluid"
                    src={user?.avatar.url}
                    alt={user?.name}
                  />
                </figure>
                <span>Welcome {user?.name}!</span>
              </div>
              <Link to="/users/me/update" id="edit_profile" className="btn btn-primary btn-block my-5">
                Edit Profile
              </Link>
              <h4>Full Name:</h4>
              <p>{user?.name}</p>

              <h4>Email Address</h4>
              <p>{user?.email}</p>

              <h4>Joined On</h4>
              <p>{ String(user?.createdAt).substring(0, 10) }</p>
                {/* https://www.w3schools.com/js/js_string_methods.asp#mark_substring */}
            
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
