import React from "react";

export default function HeadLineCards() {
  return (
    <div className="mx-auto p-8 max-w-[1640px] grid md:grid-cols-3 gap-6">
      <div className="relative rounded-xl">
        <div className="absolute w-full h-full bg-black/50 text-white rounded-xl">
          <p className="px-2 py-4 font-bold text-2xl">Text 1, Text2</p>
          <p className="px-2">From 15/08/99</p>
          <button className="bg-white border-white text-black mx-2 absolute bottom-4 ">
            Order now
          </button>
        </div>
        <img
          className="max-h-[168px] md:max-h-[200px] w-full object-cover rounded-xl"
          src="https://images.pexels.com/photos/566566/pexels-photo-566566.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
      </div>
      <div className="relative rounded-xl">
        <div className="absolute w-full h-full bg-black/50 text-white rounded-xl">
          <p className="px-2 py-4 font-bold text-2xl">New Restaurant</p>
          <p className="px-2">From 15/08/99</p>
          <button className="bg-white border-white text-black mx-2 absolute bottom-4 ">
            Order now
          </button>
        </div>
        <img
          className="max-h-[168px] md:max-h-[200px] w-full object-cover rounded-xl"
          src="https://images.pexels.com/photos/1031780/pexels-photo-1031780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
      </div>
      <div className="relative rounded-xl">
        <div className="absolute w-full h-full bg-black/50 text-white rounded-xl">
          <p className="px-2 py-4 font-bold text-2xl">Some Desert</p>
          <p className="px-2">From 15/08/99</p>
          <button className="bg-white border-white text-black mx-2 absolute bottom-4 ">
            Order now
          </button>
        </div>
        <img
          className="max-h-[168px] md:max-h-[200px] w-full object-cover rounded-xl"
          src="https://images.pexels.com/photos/2273823/pexels-photo-2273823.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
      </div>
    </div>
  );
}
