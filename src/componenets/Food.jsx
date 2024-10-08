import React, { useState } from "react";
import { data } from "../Data/data.js";
export default function Food() {
  const [foods, setFoods] = useState(data);
  const [selectedPrice, setSelectedPrice] = useState("$");
  const [SelectedType, setSelectedType] = useState("All");
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
              onClick={() => {
                setFoods(data);
                setSelectedType("All");
                setSelectedPrice("");
              }}
              className={`orgbtn ${SelectedType === "All" && "selectedBtn"}`}
            >
              All
            </button>
            <button
              onClick={() => {
                filterType("burger");
                setSelectedType("Burgers");
              }}
              className={`orgbtn ${
                SelectedType === "Burgers" && "selectedBtn"
              }`}
            >
              Burgers
            </button>
            <button
              onClick={() => {
                filterType("pizza");
                setSelectedType("Pizza");
              }}
              className={`orgbtn ${SelectedType === "Pizza" && "selectedBtn"}`}
            >
              Pizza
            </button>
            <button
              onClick={() => {
                filterType("salad");
                setSelectedType("Salads");
              }}
              className={`orgbtn ${SelectedType === "Salads" && "selectedBtn"}`}
            >
              Salads
            </button>
            <button
              onClick={() => {
                filterType("chicken");
                setSelectedType("Chicken");
              }}
              className={`orgbtn ${
                SelectedType === "Chicken" && "selectedBtn"
              }`}
            >
              Chicken
            </button>
          </div>
        </div>
        <div>
          <p className="font-bold text-gray-700">Filter Price</p>
          <div className="flex justify-between flex-wrap">
            <button
              onClick={() => {
                filterPrice("$");
                setSelectedPrice("$");
              }}
              className={`orgbtn ${selectedPrice === "$" && "selectedBtn"}`}
            >
              $
            </button>
            <button
              onClick={() => {
                filterPrice("$$");
                setSelectedPrice("$$");
              }}
              className={`orgbtn ${selectedPrice === "$$" && "selectedBtn"}`}
            >
              $$
            </button>
            <button
              onClick={() => {
                filterPrice("$$$");
                setSelectedPrice("$$$");
              }}
              className={`orgbtn ${selectedPrice === "$$$" && "selectedBtn"}`}
            >
              $$$
            </button>
            <button
              onClick={() => {
                filterPrice("$$$$");
                setSelectedPrice("$$$$");
              }}
              className={`orgbtn ${selectedPrice === "$$$$" && "selectedBtn"}`}
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
