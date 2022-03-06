import React from "react";

const Cartitem = (props) => {
  const { name, price, qty, size, image } = props;
  return (
    <>
      <div className="flex items-center justify- hover:bg-gray-100 md:-mx-8 px-4 md:px-6  py-5">
        <div className="flex-col w-1/4 md:w-2/5">
          <div className="md:w-28">
            <img className=""  draggable={false} src={image} alt="" />
          </div>
          <div className="text-[10px] font-semibold md:text-base">{name}</div>
        </div>
        <div className="flex justify-center w-1/5">
          <div className="qty">{qty}</div>
        </div>
        <span className="text-center w-1/5 font-semibold text-xs md:text-sm ">{size}</span>
        <span className="text-center w-1/5 font-semibold text-sm">
          {"$ " + price}
        </span>

        <span className="text-center w-1/5 font-semibold text-sm">
          {"$ " + price*qty}
        </span>
      </div>
    </>
  );
};

export default Cartitem;
