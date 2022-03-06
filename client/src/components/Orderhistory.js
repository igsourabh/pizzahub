import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Orderitem from "./Orderitem";
import Spinner from "./Spinner";

const Orderhistory = () => {
  const [pizzahistory, setpizzahistory] = useState([]);
  const [cartpizzahistory, setcartpizzahistory] = useState([]);
  const [datas, setdatas] = useState([]);
  const uristring = "http://localhost:5000/";
  const [loading, setloading] = useState(false);

  const authtoken = sessionStorage.getItem("authtoken");

  const getcartdata = () => {
    setloading(true);
    if (!authtoken) {
      return
    }
    const configs = {
      headers: {
        "Content-type": "application/json",
        "auth-key": authtoken,
      },
    };
    axios.get(`/api/order/getcartorder`, configs).then((res) => {
      setcartpizzahistory(res.data[0].details.reverse());
      setloading(false);
    });
  };

  useEffect(() => {
    getcartdata();
  }, []);

  return (
    <>
      <div className="container h-screen mx-auto px-11 ">
        <div className="flex shadow-md my-10">
          <div className="w-full bg-white md:px-10 py-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">Order History</h1>

              <h2 className="font-semibold text-2xl">
                {cartpizzahistory.length + " Items"}
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
            {loading && authtoken && (
              <div className="flex justify-center items-center mt-36">
                <Spinner />
              </div>
            )}
            {cartpizzahistory.map((element, index) => {
              return (
                <Orderitem
                  key={index}
                  image={element.image}
                  price={element.price}
                  name={element.title}
                  qty={element.quantity}
                  size={element.size}
                  
                />
              );
            })}

            <Link
              to="/"
              className="flex font-semibold text-indigo-600 text-sm mt-10"
            >
              <svg
                className="fill-current mr-2 text-indigo-600 w-4"
                viewBox="0 0 448 512"
              >
                <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
              </svg>
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orderhistory;
