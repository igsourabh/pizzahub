import React, { useEffect, useState } from "react";
import homelogo from "./image/homepizza.png";
import Card from "./Card";
import axios from "axios";
import Spinner from "./Spinner";

const Main = () => {
  const [pizza, setpizza] = useState([]);
  const [loading, setloading] = useState(false);

  const [cardimage, setcardimage] = useState("");
  const getdata = () => {
    setloading(true)
    axios
      .get(
        // "https://datasss-2b0da-default-rtdb.firebaseio.com/data/-Mwp9RmQ2bcXUK5aYbeF/Vegetarian/.json",
        "https://datasss-2b0da-default-rtdb.firebaseio.com/pizzadata/-Mx-hpXcAoaWvad59N6S/Vegetarian/.json"
      )
      .then((res) => {
        setloading(false)
        setpizza(res.data);
      });
  };
  useEffect(() => {
    getdata();
  }, []);

  return (
    <>
      
      <main className="">
        <div className="con md:flex justify-around md:items-center flex-row-reverse md:mx-16 md:h-[70vh] bg-[#E7E7E7]">
          <div className="fl">
            <img src={homelogo}  draggable={false} alt={homelogo} srcSet="" className="md:w-[70vh] " />
          </div>

          <div className="left flex flex-col justify-center items-center md:items-start text-center p-8 md:text-left">
            <h1 className="text-2xl font-semibold my-1">Pizza hub</h1>
            <p className="my-1 md:w-[35vw]">
              Are you wondering why there’s a pizza slice in both of my hands?
              This is what I call a well-balanced meal
            </p>
            <button className="bg-black text-white w-40 p-3 my-1">
              Learn More
            </button>
          </div>
        </div>
      </main>
      {loading && 
      <div className="flex justify-center items-center mt-36">
 <Spinner />
      </div>
     }
    {!loading &&  <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4 p-6 md:p-16">
        {/* card components */}
        {pizza
          .map((element, index) => {
            return (
              <Card
                title={element.name}
                description={element.menu_description.slice(0,75)}
                key={index}
                price={element.price}
                image={element.assets.product_details_page[0].url}
                id={index}
              />
            );
          })}
      </div>}
    </>
  );
};

export default Main;
