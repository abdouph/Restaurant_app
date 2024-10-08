import React from "react";
import {
  AiFillTag,
  AiOutlineClose,
  AiOutlineMenu,
  AiOutlineSearch,
} from "react-icons/ai";
import { BsFillCartFill, BsFillSaveFill } from "react-icons/bs";
import { TbTruckDelivery } from "react-icons/tb";
import { MdFavorite, MdHelp } from "react-icons/md";
import { FaUserFriends, FaWallet } from "react-icons/fa";
import { useState } from "react";

const NavBar = () => {
  let [nav, setNav] = useState(false);
  return (
    <div className="flex justify-between items-center mt-2 w-full text-white p-5 z-50">
      <div className="flex items-center">
        <div onClick={() => setNav(true)}>
          <AiOutlineMenu size={25} className="cursor-pointer ml-2" />
        </div>
        <h1 className=" px-2 text-2xl sm:text-3xl lg:text-4xl">
          Commerce <span className="font-bold">Amzonix</span>
        </h1>
        <div className="hidden lg:flex  bg-gray-200 items-center rounded-full text-[14px]">
          <p className="px-2 py-2 cursor-pointer rounded-full bg-black text-white">
            Delevery
          </p>
          <p className="px-2 py-2 cursor-pointer">PickUp</p>
        </div>
      </div>
      <div className="flex items-center bg-gray-200 rounded-full px-2 w-[200px] sm:w-[300px] lg:w-[400px]">
        <div>
          <input
            type="text"
            placeholder="Search food"
            className="bg-transparent p-2 focus:outline-none w-full"
          />
        </div>
      </div>
      <button className="flex rounded-full bg-black text-white items-center mr-3">
        <BsFillCartFill size={18} color="white" className="mr-2" />
        Cart
      </button>
      {nav && (
        <div className="w-full fixed z-10 top-0 left-0 bg-black/80 h-screen"></div>
      )}
      <div
        className={
          nav
            ? "h-screen w-[300px] top-0 left-0 fixed z-10 bg-white duration-300"
            : "h-screen w-[300px] top-0 left-[-100%] fixed z-10 bg-white duration-300"
        }
      >
        <AiOutlineClose
          className="absolute cursor-pointer right-4 top-4"
          onClick={() => setNav(false)}
        />
        <h1 className="text-xl p-2   font-bold">Amzonix</h1>
        <nav>
          <ul className="flex flex-col p-4 text-gray-800">
            <li className="flex text-xl py-4">
              <TbTruckDelivery size={25} className="mr-4" />
              Orders
            </li>
            <li className="flex text-xl py-4">
              <MdFavorite size={25} className="mr-4" />
              Favorits
            </li>
            <li className="flex text-xl py-4">
              <FaWallet size={25} className="mr-4" />
              Wallet
            </li>
            <li className="flex text-xl py-4">
              <MdHelp size={25} className="mr-4" />
              Help
            </li>
            <li className="flex text-xl py-4">
              <AiFillTag size={25} className="mr-4" />
              Promotions
            </li>
            <li className="flex text-xl py-4">
              <BsFillSaveFill size={25} className="mr-4" />
              Best One
            </li>
            <li className="flex text-xl py-4">
              <FaUserFriends size={25} className="mr-4" />
              Invite Friends
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
