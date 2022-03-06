import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import homelogo from "./image/homepizza.png";
const Navbar = () => {
  const cartdatastore = useSelector((state) => state.cart.value);

  const authtoken = sessionStorage.getItem("authtoken");
  const [showsidebar, setshowsidebar] = useState(false);
  const sidebar = () => {
    setshowsidebar(true);
  };
  const hidesidebar = () => {
    setshowsidebar(false);
  };
  return (
    <>
      <nav className="md:hidden p-3 flex justify-between">
        {!showsidebar && (
          <div
            onClick={sidebar}
            className="left flex justify-center items-center"
          >
            <div className="hamburbger flex-col cursor-pointer">
              <div className="line p- w-6 h-0.5 bg-black my-1"></div>
              <div className="line p- w-6 h-0.5 bg-black my-1"></div>
              <div className="line p- w-6 h-0.5 bg-black my-1"></div>
            </div>
          </div>
        )}
        {showsidebar && (
          <div
            onClick={hidesidebar}
            className="left flex justify-center items-center"
          >
            <div className="hamburbger flex-col cursor-pointer">
              <div className="line p- w-6 h-0.5 bg-black my-1"></div>
              <div className="line p- w-6 h-0.5 bg-black my-1"></div>
              <div className="line p- w-6 h-0.5 bg-black my-1"></div>
            </div>
          </div>
        )}
        <div className="logo text-xl font-bold text- ml-10">
          <Link to="/">
            <h1>Pizza hub</h1>
          </Link>
        </div>
        <div className="flex items-center">
          {authtoken && (
            <Link to="/cart">
              <div className="cart">
                <i
                  className="fa fa-shopping-cart"
                  style={{ fontSize: "24px" }}
                ></i>
                <p className="bg-yellow-400 text-xs absolute top-[0.1rem] right-[2.6rem] py-[0.20rem] rounded-2xl px-2">
                  {cartdatastore.length}
                </p>
              </div>
            </Link>
          )}

          <Link to="/user">
            <div className="profile mx-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </Link>
        </div>
      </nav>
      {showsidebar && (
        <div className="md:hidden sidebar absolute bg-gray-200 w-full  ">
          <ul className="con text-center capitalize">
            {authtoken && (
              <li className="my-1 text-lg">
                <Link to="/orderhistory">Order History</Link>
              </li>
            )}
            <li className="my-1 text-lg">
              <Link to="/contact">Contact Us</Link>
            </li>
          </ul>
        </div>
      )}
      <div className="sec hidden md:block">
        <nav className="flex p-5 justify-between mx-5 items-center">
          <div className="left flex ml-[50px] items-center">
            <div className="logo">
              <img
                src={homelogo}
                draggable={false}
                alt={homelogo}
                className="w-14"
                srcSet=""
              />
            </div>
            <Link to="/">
              <h1 className="text-2xl font-bold ">Pizza hub</h1>
            </Link>
            <ul className="flex">
              <li className="mx-3 sm:text-xs md:text-xs lg:text-base">
                <Link to="contact">Contact Us</Link>
              </li>
              {/* <li className="mx-3 sm:text-xs md:text-xs lg:text-base">
              <Link to="">Surface</Link>
            </li>
            <li className="mx-3 sm:text-xs md:text-xs lg:text-base">
              <Link to="">Xbox</Link>
            </li>
            <li className="mx-3 sm:text-xs md:text-xs lg:text-base">
              <Link to="">Windows</Link>
            </li>
            <li className="mx-3 sm:text-xs md:text-xs lg:text-base">
              <Link to="">Support</Link>
            </li> */}
            </ul>
          </div>

          <div className="right flex ">
            <ul className="flex">
              {authtoken && (
                <li className="mx-4 sm:text-xs md:text-xs lg:text-base">
                  <Link to="/orderhistory">Order history</Link>
                </li>
              )}
            </ul>
            <div className="flex">
              {authtoken && (
                <Link to="/cart">
                  <div className="cart ">
                    <i
                      className="fa fa-shopping-cart "
                      style={{ fontSize: "25px" }}
                    ></i>
                    <p className="bg-yellow-400 text-xs z-1 absolute top-5 right-[5.3rem] py-[0.20rem] rounded-3xl px-2">
                      {cartdatastore.length}
                    </p>
                  </div>
                </Link>
              )}
              <Link to="/user">
                <div className="profile mx-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
