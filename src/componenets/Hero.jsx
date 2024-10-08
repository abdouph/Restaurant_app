import React from "react";
import NavBar from "./NavBar";

const Hero = () => {
  return (
    <div className="w-[100dvw] relative h-[100dvh] overflow-hidden flex flex-col items-center justify-start">
      <img
        className="w-full h-full absolute left-0 top-0object-cover -z-10"
        // src="https://img.freepik.com/premium-photo/restaurant-with-table-chairs-with-lit-candle-middle_337384-108358.jpg?w=826"
        src="https://img.freepik.com/premium-photo/moody-food-restaurant-website_1234738-438608.jpg?w=826"
      />
      <div className="w-full h-full absolute left-0 top-0 bg-black/70 -z-10"></div>
      <NavBar />
      <div className=" h-full w-full text-gray-200 max-h-[500px] items-center flex flex-col justify-center  rounded-xl">
        <h1 className="text-4xl px-4 text-center font-medium ">
          {" "}
          The Best Restaurent
          <br />
          <span className="text-orange-500">in the west</span>
        </h1>
      </div>
    </div>
  );
};

export default Hero;
