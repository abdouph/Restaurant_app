import React from "react";

const Hero = () => {
  return (
    <div className="mx-auto p-4 max-w-[1640px] rounded-xl">
      <div className="max-h-[500px] relative">
        <div className="absolute h-full w-full text-gray-200 max-h-[500px] bg-black/40 flex flex-col justify-center  rounded-xl">
          <h1 className="text-4xl px-4 font-bold sm:text-5xl lg:text-7xl">
            The <span className="text-orange-500">Best</span>
          </h1>
          <h1 className="text-4xl px-4 font-bold sm:text-5xl lg:text-7xl">
            <span className="text-orange-500">Foods</span> Delivered
          </h1>
        </div>
        <img
          className="w-full max-h-[500px] object-cover  rounded-xl"
          src="https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
      </div>
    </div>
  );
};

export default Hero;
