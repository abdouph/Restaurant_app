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
    <div className="flex justify-between items-center w-full text-white p-5 pt-7 z-50 bg-gradient-to-b from-black/95 to-transparent">
      <h1 className=" px-2 text-2xl">Glossy</h1>

      <div className="hover:opacity-60 flex items-center justify-center mr-5 transition-all ease-in-out cursor-pointer">
        <BsFillCartFill size={18} color="white" className="mr-2 " />
        {/* Orders */}
      </div>
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
