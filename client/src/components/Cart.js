import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Cartitem from "./Cartitems";
import { addcart } from "../Redux/cartSlice";

const Cart = () => {
  const History = useHistory();
  const [blankorder, setblankorder] = useState(false);
  const [address, setaddress] = useState([]);
  const [pleaseaddyouaddress, setpleaseaddyouaddress] = useState(false);

  const [notaddress, setnotaddress] = useState(false);
  const [orderplaced, setorderplaced] = useState(false);
  const dispatch = useDispatch();
  const [first, setfirst] = useState([]);
  const authtoken = sessionStorage.getItem("authtoken");
  const cartdatastore = useSelector((state) => state.cart.value);
  const uristring = "http://localhost:5000/";

  /////////////// fetching customer address///////////////////
  const getaddress = () => {
    const configs = {
      headers: {
        "Content-type": "application/json",
        "auth-key": authtoken,
      },
    };
    axios.get(`/api/auth/getaddress`, configs).then((res) => {
      setaddress(res.data);

      if (res.data[0] == null) {
        setnotaddress(true);
      }
    });
    /////////////// fetching customer address///////////////////
  };

  const buynow = () => {
    ////////////////////// buy now ////////////////////
    if (first.length == 0) {
      setblankorder(true);
      setTimeout(() => {
        setblankorder(false);
      }, 2000);
      return;
    }
    if (notaddress === true) {
      setpleaseaddyouaddress(true);

      return;
    }
    if (!authtoken) {
      return;
    }
    const config = {
      headers: {
        "Content-type": "application/json",
        "auth-key": `${authtoken}`,
      },
    };
    axios
      .post(
        `/api/order/addtocart`,
        {
          details: first,
        },
        config
      )
      .then(() => {
        setorderplaced(true);
      });

    ////////////////// checkout order //////////////////
    const config2 = {
      headers: {
        "Content-type": "application/json",
        "auth-key": `${authtoken}`,
      },
    };
    axios.post(
      `/api/order/checkout`,
      {
        address: address,
        data: first,
      },
      config2
    );
    setTimeout(() => {
      window.location.reload(false);
    }, 1000);
    ////////////////////// buy now ////////////////////
  };

  const data = () => {
    setfirst(cartdatastore);
  };

  useEffect(() => {
    data();
    getaddress();
  }, []);

  return (
    <>
      {blankorder && (
        <div className="absolute w-full md:absolute md:w-fit md:left-[40%]">
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
                Please select your order
              </div>
            </div>
          </div>
        </div>
      )}
      {pleaseaddyouaddress && (
        <div className="absolute w-full md:absolute md:w-fit md:left-[40%]">
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
                Please provide your address
              </div>
            </div>
          </div>
        </div>
      )}
      {orderplaced && (
        <div className="absolute w-full md:absolute md:w-fit md:left-[40%]">
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
                Order Placed Sucessfully
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="container h-screen mx-auto px-11 ">
        <div className="flex shadow-md my-10">
          <div className="w-full bg-white md:px-10 py-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">Cart items</h1>
              <h2 className="font-semibold text-2xl">
                {cartdatastore.length + " Items"}
              </h2>
            </div>
            <div className="flex mt-10 mb-5">
              <h3 className="font-semibold text-gray-600 text-[10px] md:text-xs uppercase w-2/5">
                Product Details
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-[10px] md:text-xs uppercase w-1/5 ">
                Quantity
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-[10px] md:text-xs uppercase w-1/5 ">
                Size
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-[10px] md:text-xs uppercase w-1/5 ">
                Price
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-[10px] md:text-xs uppercase w-1/5 ">
                Total
              </h3>
            </div>

            {first.map((element, index) => {
              return (
                <Cartitem
                  key={index}
                  image={element.image}
                  price={element.price}
                  name={element.title}
                  qty={element.quantity}
                  size={element.size}
                
                />
              );
            })}

            {!orderplaced && (
              <button
                onClick={buynow}
                className="flex font-semibold py-2  px-3 rounded-md  bg-indigo-600 text-white text-sm mt-10"
              >
                Checkout
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
