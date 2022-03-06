import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Addressitem from "./Addressitem";
import Spinner from "./Spinner";

const User = () => {
  const History = useHistory();
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  const authtoken = sessionStorage.getItem("authtoken");
  const [loading, setloading] = useState(false);

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [username, setusername] = useState("");
  const [useremail, setuseremail] = useState("");
  const [anothernpassword, setanothernpassword] = useState(false);
  const [address, setaddress] = useState([]);

  const uristring = "http://localhost:5000/";

  const emailhandelchange = (e) => {
    setemail(e.target.value);
  };

  const passwordhandelchange = (e) => {
    setpassword(e.target.value);
  };

  const handelsubmit = (e) => {
    e.preventDefault();
    // sending data to server
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    axios
      .post(
        `/api/auth/login`,
        {
          email: email,
          password: password,
        },
        config
      )
      .then((res) => {
        if (res.data.sucess) {
          sessionStorage.setItem("authtoken", res.data.authtoken);
          History.push("/");
          window.location.reload(false);
        } else {
          setanothernpassword(true);
        }
      });
  };

  ///////// fetch user details email and address/////////
  const getdata = () => {
    
    setloading(true);

    if (!authtoken) {
      return;
    }

    const configs = {
      headers: {
        "Content-type": "application/json",
        "auth-key": authtoken,
      },
    };
    axios.get(`/api/auth/getuser`, configs).then((res) => {
      setusername(res.data.name);
      setuseremail(res.data.email);
    });
    ///////// fetch user details email adn address/////////
 
    ;
    axios.get(`/api/auth/getaddress`, configs).then((res) => {
      setaddress(res.data);
      setloading(false);
    });
    
  };
  ///////// getting user address/////////

  ///////////////// logout/////////////////
  const logout = () => {
    sessionStorage.removeItem("authtoken");
    History.push("/");
    window.location.reload(false);
    ///////////////// logout/////////////////
  };

  const passwordtoast = () => {
    setanothernpassword(false);
  };

  useEffect(() => {
    
    getdata();
  }, []);

  return (
    <>
      {authtoken && loading && (
        <div className="flex justify-center items-center mt-36">
          <Spinner />
        </div>
      )}
      {authtoken && !loading && (
        <div className="justify-center  capitalize max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-32 lg:my-0">
          <div
            id="profile"
            className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-gray-200 opacity-75 mx-6 lg:mx-0"
          >
            <div className="p-4 md:p-12 text-center lg:text-left">
              <div className="">
                <h1 className="text-xl mx-2 font-semi my-3 lg:pt-0 capitalize">
                  {"Name : " + username}
                </h1>
                <h1 className="text-xl mx-2 font-semi my-3 lg:pt-0 capitalize">
                  {"email : " + useremail}
                </h1>
              </div>

              <div className="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start">
                <svg
                  className="h-4 fill-current text-green-700 pr-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm7.75-8a8.01 8.01 0 0 0 0-4h-3.82a28.81 28.81 0 0 1 0 4h3.82zm-.82 2h-3.22a14.44 14.44 0 0 1-.95 3.51A8.03 8.03 0 0 0 16.93 14zm-8.85-2h3.84a24.61 24.61 0 0 0 0-4H8.08a24.61 24.61 0 0 0 0 4zm.25 2c.41 2.4 1.13 4 1.67 4s1.26-1.6 1.67-4H8.33zm-6.08-2h3.82a28.81 28.81 0 0 1 0-4H2.25a8.01 8.01 0 0 0 0 4zm.82 2a8.03 8.03 0 0 0 4.17 3.51c-.42-.96-.74-2.16-.95-3.51H3.07zm13.86-8a8.03 8.03 0 0 0-4.17-3.51c.42.96.74 2.16.95 3.51h3.22zm-8.6 0h3.34c-.41-2.4-1.13-4-1.67-4S8.74 3.6 8.33 6zM3.07 6h3.22c.2-1.35.53-2.55.95-3.51A8.03 8.03 0 0 0 3.07 6z" />
                </svg>
                Your address
                <div className="editaddress mx-2 text-blue-600">
                  <Link to="/addadress">Edit address</Link>
                </div>
              </div>
              <div className="py-4 text-sm">
                <div className="addressdetails capitalize">
                  {address.map((element, index) => {
                    return (
                      <Addressitem
                        key={index}
                        name={element.name}
                        address={element.address}
                        phonenumber={element.phonenumber}
                        city={element.city}
                        state={element.state}
                        pincode={element.pincode}
                        id={element._id}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="pt-12 pb-8">
                <button
                  onClick={logout}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-full"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {!authtoken && (
        <div className=" flex flex-col items-center  w-screen h-screen mt-3 bg-gray-200 text-gray-700">
          <form
            className="flex flex-col bg-white rounded shadow-lg p-12 mt-12"
            onSubmit={handelsubmit}
          >
            <label className="font-semibold text-xs" htmlFor="usernameField">
              Email
            </label>
            <input
              onChange={emailhandelchange}
              value={email}
              className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
              type="text"
            />
            <label
              className="font-semibold text-xs mt-3"
              htmlFor="passwordField"
            >
              Password
            </label>
            <input
              onChange={passwordhandelchange}
              value={password}
              className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
              type="password"
            />
            <button className="flex items-center justify-center h-12 px-6 w-64 bg-yellow-500 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-yellow-600">
              Login
            </button>
            <div className="flex mt-6 justify-center text-xs">
              <Link className="text-blue-400 hover:text-blue-500" to="/user">
                Login
              </Link>
              <span className="mx-2 text-gray-300">/</span>
              <Link className="text-blue-400 hover:text-blue-500" to="/signup">
                Sign Up
              </Link>
            </div>
          </form>
          {anothernpassword && (
            <div
              id="toast-success"
              className="flex items-center w-full max-w-xs p-4 mb-4 mt-7 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
              role="alert"
            >
              <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <div className="ml-3 text-sm font-normal">
                Please login with correct credentials
              </div>
              <button
                onClick={passwordtoast}
                type="button"
                className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                data-collapse-toggle="toast-success"
                aria-label="Close"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default User;
