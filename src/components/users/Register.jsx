import React, { useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { clearErrors, register } from "../../actions/userAction"

const Register = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );
  /*
      Not taking {user}, coz this is Register
        we still don't have userData
        we will be the one to send userData

      {isAuthenticated} 
        true then Register is successfuly completed
      
      after submit Register Form 
        user should be Directly Logged-in 

      State mngmnt
        to remember data inside Component
        to get data from user Input
        we cannot directly take values
    */


  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    phoneNumber: "",
  });
  const { name, email, password, passwordConfirm, phoneNumber } = user;
  /* 
        Ternary Operators consider
          "" = true
          null = false 
          undefined = false
      */

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/images/images.png");


  /* handle redirection with useEffect */
    useEffect( () => {
      if (isAuthenticated) {
        navigate("/")
      }
      if (error) {
        alert.error(error)
        dispatch(clearErrors)
      }
    }, [dispatch, alert, isAuthenticated, error, navigate])


    const submitHandler = (e) => {
      e.preventDefault()
        /* 
          whenever any field of form is changed,
            the page reloads
          this prevents the page reload  
        */

      if(password !== passwordConfirm) {
        alert.error("Password does Not match!")
        return                                      //exit this function()
      }

      /* 
        FormData()
          In-built JS func.

          Provides way to construct a set of key:value pairs 
            representing form fields and their values, 
            which can be sent using XMLHttpRequest.send() 
          It uses encoding type = "multipart/form-data".
      */
        const formData = new FormData()     
        formData.set("name", name)        //name: Rahul 
        formData.set("email", email)         
        formData.set("password", password)         
        formData.set("passwordConfirm", passwordConfirm)         
        formData.set("phoneNumber", phoneNumber)      

        /* 
          if pic file empty
            default pic
          else 
            file uploaded
        */
        if (avatar === "") {
          formData.set("avatar", "/images/images.png")
          /* 
            "images/images.png"   
              wrong path
              gives 500 Server ERROR

            img upload must be <20kb
              else gives 500 Server ERROR
          */
        } else {
          formData.set("avatar", avatar)
        }

      dispatch(register(formData))

    }

  /* img upload file handling */
    const onChange = (e) => {
        if(e.target.name === "avatar") {
          const reader = new FileReader()
                /* 
                  FileReader()
                    Lets web app asynchronously read contents of files
                    (or raw data buffers) stored on user's computer
                */
          reader.onload = () => {                   //https://flaviocopes.com/filereader/
            if (reader.readyState === 2) {          //indicates reading is done
              setAvatarPreview(reader.result)
              setAvatar(reader.result)
            }
          }
            /* 
              .onload = ()=>{}
                expects a callback func. ()=>{}
                sets up an eventListner
                  on the file reader event
                    when file is successfully read, it will create eventListner
            */

          reader.readAsDataURL(e.target.files[0])
          /* 
            .readAsDataURL()
              indicates file reading process
              it then triggers onLoad
            e.tartget.files[0]
              1st file selected by user
          */
        } else {          //when No pic upload, just set name
            setUser(
              {
                ...user,
                [e.target.name]: e.target.value
              }
            )
        }
    }



  return (
    <>
      <div className="row wrapper">
        <div className="col-10 col-lg-5 registration-form">
          <form 
            className="shadow-lg" 
            encType="multipart/form-data"
            onSubmit={submitHandler}                          
          >
            {/* onSubmit for Form is like onClick for Btn */}
            
            <h1 className="mb-3">Register</h1>
            <div className="form-group">
              <label htmlFor="name_field">Name</label>
              <input
                type="text"
                id="name_field"
                className="form-control"
                name="name"
                value={name}
                onChange={onChange}
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                value={email}
                onChange={onChange}
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                name="password"
                value={password}
                onChange={onChange}
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="passwordConfirm_field">Password Confirm</label>
              <input
                type="password"
                id="passwordConfirm_field"
                className="form-control"
                name="passwordConfirm"
                value={passwordConfirm}
                onChange={onChange}
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber_field">Phone Number</label>
              <input
                type="number"
                id="phoneNumber_field"
                className="form-control"
                name="phoneNumber"
                value={phoneNumber}
                onChange={onChange}
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="avatar_upload">Avatar</label>
              <div className="d-flex align-items-center">
                <div>
                  <figure className="avatar mr-3 item-rtl">
                    <img
                      src={avatarPreview}
                      className="rounded-circle"
                      alt="Avatar Preview"
                    />
                  </figure>
                </div>
                <div className="custom-file">
                  <input
                    type="file"
                    name="avatar"
                    className="custom-file-input"
                    id="customFile"
                    accept="images/*"
                    onChange={onChange}
                  ></input>
                  <label className="custom-file-label" htmlFor="customFile">
                    Choose Avatar
                  </label>
                </div>
              </div>
            </div>

            <button
              id="register_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading ? true : false}
            >
              REGISTER
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
