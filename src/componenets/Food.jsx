import React, { useState } from "react";
import { data } from "../Data/data.js";
export default function Food() {
  const [foods, setFoods] = useState(data);
  const filterType = (type) => {
    setFoods(
      data.filter((item) => {
        return item.category === type;
      })
    );
  };
  const filterPrice = (price) => {
    setFoods(
      data.filter((item) => {
        return item.price === price;
      })
    );
  };
  return (
    <div className="mx-auto p-4 py-8 max-w-[1640px] ">
      <h1 className="font-bold text-orange-600 text-4xl text-center">
        Top Rated Menu Items
      </h1>
      <div className="flex flex-col lg:flex-row justify-between">
        <div className="">
          <p className="font-bold text-gray-700">Filter Type</p>
          <div className="flex justify-between flex-wrap">
            <button
              onClick={() => setFoods(data)}
              className="border-orange-600 text-orange-600 hover:border-white m-1 hover:text-white hover:bg-orange-600"
            >
              All
            </button>
            <button
              onClick={() => filterType("burger")}
              className="border-orange-600 text-orange-600 hover:border-white m-1 hover:text-white hover:bg-orange-600"
            >
              Burgers
            </button>
            <button
              onClick={() => filterType("pizza")}
              className="border-orange-600 text-orange-600 hover:border-white m-1 hover:text-white hover:bg-orange-600"
            >
              Pizza
            </button>
            <button
              onClick={() => filterType("salad")}
              className="border-orange-600 text-orange-600 hover:border-white m-1 hover:text-white hover:bg-orange-600"
            >
              Salads
            </button>
            <button
              onClick={() => filterType("chicken")}
              className="border-orange-600 text-orange-600 hover:border-white m-1 hover:text-white hover:bg-orange-600"
            >
              Chicken
            </button>
          </div>
        </div>
        <div>
          <p className="font-bold text-gray-700">Filter Price</p>
          <div className="flex justify-between flex-wrap">
            <button
              onClick={() => filterPrice("$")}
              className="border-orange-600 text-orange-600 hover:border-white m-1 hover:text-white hover:bg-orange-600"
            >
              $
            </button>
            <button
              onClick={() => filterPrice("$$")}
              className="border-orange-600 text-orange-600 hover:border-white m-1 hover:text-white hover:bg-orange-600"
            >
              $$
            </button>
            <button
              onClick={() => filterPrice("$$$")}
              className="border-orange-600 text-orange-600 hover:border-white m-1 hover:text-white hover:bg-orange-600"
            >
              $$$
            </button>
            <button
              onClick={() => filterPrice("$$$$")}
              className="border-orange-600 text-orange-600 hover:border-white m-1 hover:text-white hover:bg-orange-600"
            >
              $$$$
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4 cursor-pointer">
        {foods.map((item, index) => (
          <div
            key={index}
            className="border shadow-lg rounded-lg hover:scale-105 duration-300"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-[200px] object-cover rounded-t-lg"
            />
            <div className="flex justify-between px-2 py-4">
              <p className="font-bold">{item.name}</p>
              <p>
                <span className="bg-orange-500 text-white px-2 py-1 rounded-full">
                  {item.price}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
