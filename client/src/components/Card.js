import React from "react";
import { Link } from "react-router-dom";

const Card = (props) => {
  const { title, description, image, id } = props;
  return (
    <>
      <div className="card flex flex-col mt-6">
        <img src={image} draggable={false} alt={image} className="h-[236px]" />

        <div className="content text-left ">
          <h1 className=" text-lg   md:text-xl font-semibold my-1">{title}</h1>
          <p className="text-base  my-1 md:text-sm w-4/3 font-sans">
            {description}
          </p>
          <Link to={`./details/${id}`}>
            <button className="text-blue-700 text-lg font-semibold my-1">
              Shop now
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Card;
