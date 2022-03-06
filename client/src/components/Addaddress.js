import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
const Addadress = () => {
  const History = useHistory()
  const [name, setname] = useState("");
  const [phonenumber, setphonenumber] = useState("");
  const [address, setaddress] = useState("");
  const [city, setcity] = useState("");
  const [state, setstate] = useState("");
  const [pincode, setpincode] = useState("");
  const uristring="http://localhost:5000/"
  const namechange = (e) => {
    setname(e.target.value);
  };

  const phonenumberchange = (e) => {
    setphonenumber(e.target.value);
  };
  const adresschange = (e) => {
    setaddress(e.target.value);
  };
  const citychange = (e) => {
    setcity(e.target.value);
  };
  const statechange = (e) => {
    setstate(e.target.value);
  };
  const pincodechange = (e) => {
    setpincode(e.target.value);
  };
  const authtoken = sessionStorage.getItem("authtoken");
  const addresssubmit = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-type": "application/json",
        "auth-key": `${authtoken}`,
      },
    };
    axios
      .post(
        `/api/auth/address`,
        {
          name: name,
          phonenumber: phonenumber,
          address: address,
          city: city,
          state: state,
          pincode: pincode,
        },
        config
      )
      .then((res) => {
        History.push("/user")
      });

      
  };
  return (
    <>
      <div className="sec flex justify-center items-center p-7">
        <form className="w-full max-w-lg" onSubmit={addresssubmit}>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Name
              </label>
              <input
                onChange={namechange}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                value={name}
                type="text"
                placeholder="Your name"
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Phone number
              </label>
              <input
                onChange={phonenumberchange}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                value={phonenumber}
                type="text"
                placeholder="Phone number"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Address
              </label>
              <input
                onChange={adresschange}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-password"
                type="text"
                value={address}
                placeholder=""
              />
              <p className="text-gray-600 text-xs italic">
                Make it as long and as crazy as you'd like
              </p>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-city"
              >
                City
              </label>
              <input
                onChange={citychange}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-city"
                type="text"
                value={city}
                placeholder="City"
              />
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-city"
              >
                State
              </label>
              <input
                onChange={statechange}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-city"
                type="text"
                value={state}
                placeholder="State"
              />
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-zip"
              >
                Zip
              </label>
              <input
                onChange={pincodechange}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-zip"
                type="text"
                value={pincode}
                placeholder="90210"
              />
            </div>
          </div>
          <button className="bg-yellow-500 hover:bg-yellow-600 px-7 py-2 text-lg font-semibold rounded-md flex justify-end items-end">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Addadress;
