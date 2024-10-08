import React from "react";
import NavBar from "./NavBar";

const Hero = () => {
  return (
    <div className="w-[100dvw] relative h-[100dvh] overflow-hidden flex flex-col items-center justify-start">
      <img
        className="w-full h-full absolute left-0 top-0object-cover -z-10"
        src="https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        al
        t=""
      />
      <div className="w-full h-full absolute left-0 top-0 bg-black/30 -z-10"></div>
      <NavBar />
      <div className=" h-full w-full text-gray-200 max-h-[500px] bg-black/40 flex flex-col justify-center  rounded-xl">
        <h1 className="text-4xl px-4 font-bold sm:text-5xl lg:text-7xl">
          The <span className="text-orange-500">Best</span>
        </h1>
        <h1 className="text-4xl px-4 font-bold sm:text-5xl lg:text-7xl">
          <span className="text-orange-500">Foods</span> Delivered
        </h1>
      </div>
    </div>
  );
};

export default Hero;
