import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addcart } from "../Redux/cartSlice";
import Spinner from "./Spinner";
const Details = () => {
  const cartdatastore = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();
  const uristring = "http://localhost:5000/";
  const authtoken = sessionStorage.getItem("authtoken");
  const [address, setaddress] = useState([]);
  const { id } = useParams();
  const [pizza, setpizza] = useState([]);
  const [qty, setqty] = useState(1);
  const [loading, setloading] = useState(false);
  const [pizzasize, setpizzasize] = useState("Small");
  const [image, setimage] = useState("");
  const [notaddress, setnotaddress] = useState(false);
  const [orderplaced, setorderplaced] = useState(false);
  const [cartpizza, setcartpizza] = useState([]);
  const [cartpizzaimage, setcartpizzaimage] = useState("");

  const [cartpizzastate, setcartpizzastate] = useState([]);
  const data = () => {
    setloading(true);
    axios
      .get(
        `https://datasss-2b0da-default-rtdb.firebaseio.com/pizzadata/-Mx-hpXcAoaWvad59N6S/Vegetarian/${id}.json`
      )
      .then((res) => {
        setloading(false);
        setpizza(res.data);
        setimage(res.data.assets.product_details_page[0].url);
      });
  };

  //////////// for select size/////////////
  const handleSelectChange = (event) => {
    setpizzasize(event.target.value);
  };
  ///////////////////////qty///////////////////////
  const quantityplus = () => {
    setqty(qty + 1);
  };
  const quantityminus = () => {
    setqty(qty - 1);
  };
  ///////////////////////qty///////////////////////

  /////////////////////getting data from server//////////////////////////////
  const cartdata = () => {
    axios
      .get(
        `https://datasss-2b0da-default-rtdb.firebaseio.com/pizzadata/-Mx-hpXcAoaWvad59N6S/Vegetarian/${id}.json`
      )
      .then((res) => {
        setcartpizza(res.data);
        setcartpizzaimage(res.data.assets.product_details_page[0].url);
      });
  };

  const addtocart = () => {
    setcartpizzastate();
    dispatch(
      addcart({
        title: cartpizza.name,
        description: cartpizza.menu_description,
        image: cartpizzaimage,
        price: cartpizza.price,
        quantity: qty,
        size: pizzasize,
      })
    );
  };

  useEffect(() => {
    data();

    cartdata();
  }, []);
  return (
    <>
      {loading && (
        <div className="flex justify-center items-center mt-36">
          <Spinner />
        </div>
      )}
      {!loading && (
        <section className="text-gray-600 h-screen mt-14 sm:mt-0 body-font overflow-hidden  ">
          <div className="container px-5  py-18 md:py-16 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <img
                alt="ecommerce"
                draggable={false}
                className="lg:w-1/2 w-full lg:h-auto object-cover object-center rounded"
                src={image}
              />

              <div className="lg:w-1/2 w-full  sm:ml-0 lg:pl-10 lg:py-6 mt-6 lg:mt-0 ">
                <h2 className="text-sm title-font text-gray-500 tracking-widest">
                  {pizza.name}
                </h2>
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                  {pizza.name}
                </h1>
                <div className="flex mb-4">
                  <span className="flex items-center">
                    <svg
                      fill="currentColor"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 text-yellow-500"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg
                      fill="currentColor"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 text-yellow-500"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg
                      fill="currentColor"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 text-yellow-500"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg
                      fill="currentColor"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 text-yellow-500"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 text-yellow-500"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <span className="text-gray-600 ml-3">4 Reviews</span>
                  </span>
                  <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                    <a className="text-gray-500">
                      <svg
                        fill="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                      </svg>
                    </a>
                    <a className="text-gray-500">
                      <svg
                        fill="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                      </svg>
                    </a>
                    <a className="text-gray-500">
                      <svg
                        fill="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                      </svg>
                    </a>
                  </span>
                </div>
                <p className="leading-relaxed">{pizza.menu_description}</p>
                <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                  <div className="flex items-center">
                    <span className="mr-3 text-lg font-semibold">Size</span>
                    <div className="relative">
                      <select
                        value={pizzasize}
                        onChange={handleSelectChange}
                        className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:border-yellow-500 text-base pl-3 pr-10"
                      >
                        <option value="Small">Small</option>
                        <option value="Medium">Medium</option>
                        <option value="Large">Large</option>
                        <option value="Extra-large">Extra-large</option>
                      </select>
                      <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                        >
                          <path d="M6 9l6 6 6-6"></path>
                        </svg>
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mx-4">
                    <button
                      onClick={quantityplus}
                      className="mx-2flex ml-auto text-xl font-bol text-white bg-yellow-500 border-0  px-2 focus:outline-none hover:bg-yellow-600 rounded"
                    >
                      +
                    </button>
                    <h3 className="mx-2 text-sm sm:text-xl font-semibold">
                      <input
                        type="text"
                        className="w-16 text-center border-hidden outline-none text-base font-semibold placeholder-gray-900"
                        placeholder={"Qty: " + +qty}
                      />
                    </h3>
                    <button
                      disabled={qty === 1}
                      onClick={quantityminus}
                      className="mx-2flex ml-auto text-white bg-yellow-500 border-0  px-3 focus:outline-none hover:bg-yellow-600 rounded"
                    >
                      -
                    </button>
                  </div>
                </div>
                <div className="flex justify-start">
                  <span className="title-font font-medium text-2xl text-gray-900">
                    <input
                      type="text"
                      className="w-24 border-hidden outline-none text-lg font-semibold placeholder-gray-900"
                      placeholder={"Price $" + pizza.price * qty}
                    />
                  </span>

                  <button
                    onClick={addtocart}
                    className="flex  text-white bg-yellow-500 mx-2 border-0 py-2 px-2 focus:outline-none hover:bg-yellow-600 rounded"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Details;
