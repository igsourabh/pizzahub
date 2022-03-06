import axios from "axios";
import React from "react";

const Addressitem = (props) => {
  const uristring = "http://localhost:5000/";

  const authtoken = sessionStorage.getItem("authtoken");
  const deletaddress = () => {
    const configs = {
      headers: {
        "Content-type": "application/json",
        "auth-key": authtoken,
      },
    };
    axios.delete(
      `/api/auth/deleteaddress/${props.id}`,

      configs
    ).then(()=>{

      window.location.reload(false);
    })
  };
  return (
    <>
      <div className="flex text-lg text-left justify-center md:justify-start ">
        <div className="">
          <div className="name  my-1"> {"name- " + props.name}</div>
          <div className="phonennumber  my-1">
            {"phonennumber- " + props.phonenumber}
          </div>
          <div className="address  my-1">{"address- " + props.address}</div>
          <div className="city  my-1">{"city- " + props.city}</div>
          <div className="state  my-1">{"state- " + props.state}</div>
          <div className="pincode  my-1">{"pincode- " + props.pincode}</div>
        </div>

        <button
          className="bg-black text-sm capitalize  text-white font-bold h-fit rounded"
          onClick={deletaddress}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </>
  );
};

export default Addressitem;
