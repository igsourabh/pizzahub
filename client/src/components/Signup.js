import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const uristring="http://localhost:5000/"

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  const [email, setemail] = useState("");
  const [name, setname] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [anothername, setanothername] = useState(false);
  const [anothernpassword, setanothernpassword] = useState(false);
  const [confirmpass, setconfirmpass] = useState(false);
  const [anotheremail, setanotheremail] = useState(false);
  const [userexist, setuserexist] = useState(false);
  const [usecreatesucessfully, setusecreatesucessfully] = useState(false);
  const emailhandelchange = (e) => {
    setemail(e.target.value);

  };

  const passwordhandelchange = (e) => {
    setpassword(e.target.value);

  };
  const confirmpasswordhandelchange = (e) => {
    setconfirmpassword(e.target.value);

  };
  const namehandelchange = (e) => {
    setname(e.target.value);

  };
 
  const handelsubmit = (e) => {
    e.preventDefault();

    if (!regex.test(email)) {
      setanotheremail(true);
      return;
    }
    if (name.length < 3) {
      setanothername(true);
      return;
    }
    if (password.length < 5) {
      setanothernpassword(true);
      return;
    }
    // ching if password or confirm passowrd same then code exicute otherwise it will throw a error
    if (password === confirmpassword) {
      setconfirmpass(false);
    } else {
      setconfirmpass(true);
      return;
    }

    // sending data to server
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    axios
      .post(
        `/api/auth/signup`,
        {
          name: name,
          email: email,
          password: password,
        },
        config
      )
      .then((res) => {
   
        if (res.data.sucess === true) {
          setemail("");
          setname("");
          setpassword("");
          setconfirmpassword("");
          setusecreatesucessfully(true);
        } else {
          setuserexist(true);
        }
      });
      setTimeout(() => {
        setuserexist(false);
      }, 3000);
      setTimeout(() => {
        setusecreatesucessfully(false);
      }, 3000);
  };
  const allfielderros = () => {
    setanothername(false);
  };
  const passwordtoast = () => {
    setanothernpassword(false);
  };
  const confirmpasswordtoast = () => {
    setconfirmpass(false);
  };
  const emailtoast = () => {
    setanotheremail(false);
  };
 
  return (
    <>
      <div className=" flex flex-col items-center  w-screen h-screen mt-3 bg-gray-200 text-gray-700">
        {usecreatesucessfully && (
          <div className="absolute">
            <div className="flex  justify-center  items-center">
              <div className="flex items-center bg-green-500 border-l-4 border-green-700 py-2 px-3 shadow-md mb-2">
                <div className="text-green-500 rounded-full bg-white mr-3">
                  <svg
                    width="1.8em"
                    height="1.8em"
                    viewBox="0 0 16 16"
                    className="bi bi-check"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"
                    />
                  </svg>
                </div>

                <div className="text-white max-w-xs ">
                  User created sucessfullly
                </div>
              </div>
            </div>
          </div>
        )}
        {userexist && (
          <div className="absolute">
            <div className="flex  justify-center  items-center">
              <div className="flex items-center bg-red-500 border-l-4 border-red-700 py-2 px-3 shadow-md mb-2">
                <div className="text-red-500 rounded-full bg-white mr-3">
                  <svg
                    width="1.8em"
                    height="1.8em"
                    viewBox="0 0 16 16"
                    className="bi bi-x"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"
                    />
                    <path
                      fillRule="evenodd"
                      d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"
                    />
                  </svg>
                </div>

                <div className="text-white max-w-xs ">
                  this user is already exist
                </div>
              </div>
            </div>
          </div>
        )}
        <form
          className="flex flex-col bg-white rounded shadow-lg p-12 mt-12"
          onSubmit={handelsubmit}
        >
          <label className="font-semibold text-xs" htmlFor="usernameField">
            Name
          </label>
          <input
            onChange={namehandelchange}
            value={name}
            className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
            type="text"
          />
          <label className="font-semibold text-xs" htmlFor="usernameField">
            Username or Email
          </label>
          <input
            onChange={emailhandelchange}
            value={email}
            className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
            type="text"
          />
          <label className="font-semibold text-xs mt-3" htmlFor="passwordField">
            Password
          </label>
          <input
            onChange={passwordhandelchange}
            value={password}
            className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
            type="password"
          />{" "}
          <label className="font-semibold text-xs mt-3" htmlFor="passwordField">
            Confirm Password
          </label>
          <input
            onChange={confirmpasswordhandelchange}
            value={confirmpassword}
            className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
            type="password"
          />
          <button className="flex items-center justify-center h-12 px-6 w-64 bg-yellow-500 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-yellow-600">
            Sign Up
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
        {anothername && (
          <div
            id="toast-success"
            className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
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
              Name should contain atleast 3 character
            </div>
            <button
              onClick={allfielderros}
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
        {anothernpassword && (
          <div
            id="toast-success"
            className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
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
              Password should contain atleast 5 character
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
        {confirmpass && (
          <div
            id="toast-success"
            className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
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
            <div className="ml-3 text-sm font-normal">Password not matched</div>
            <button
              onClick={confirmpasswordtoast}
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
        {anotheremail && (
          <div
            id="toast-success"
            className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
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
              This is not a valid Email
            </div>
            <button
              onClick={emailtoast}
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
    </>
  );
};

export default Signup;
