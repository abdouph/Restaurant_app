import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import { IoPlayForwardOutline } from "react-icons/io5";
import "./App.css";
import bg from "./img/bg.png";
import logo from "./img/fulllogo.png";
import { data } from "./Data/data.js";

function App() {
  const [selectedNav, setSelectedNav] = useState(1);
  const navItems = ["Home", "About", "Menu"];

  // Create refs for sections
  const homeRef = useRef(null);
  const menuRef = useRef(null);
  const aboutRef = useRef(null);

  const scrollToSection = (index) => {
    const sectionRefs = [homeRef, aboutRef, menuRef];
    sectionRefs[index].current.scrollIntoView({ behavior: "smooth" });
  };
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
    <div className="w-[100dvw]  overflow-y-auto relative h-[100dvh] overflow-hidden flex flex-col items-center justify-start">
      {/* <img
        className="w-full h-full absolute left-0 top-0object-cover -z-10"
        // src="https://img.freepik.com/premium-photo/restaurant-with-table-chairs-with-lit-candle-middle_337384-108358.jpg?w=826"
        src="https://img.freepik.com/premium-photo/moody-food-restaurant-website_1234738-438608.jpg?w=826"
      /> */}
      <video
        autoPlay
        muted
        loop
        className="w-full h-full absolute left-0 top-0 object-cover -z-10"
        src="https://firebasestorage.googleapis.com/v0/b/nour-el-djazair.appspot.com/o/6015593_Chef_Man_1920x1080.mp4?alt=media&token=61005777-da89-4b1f-9467-a4749c620732"
      ></video>

      <div className="w-full h-full absolute left-0 top-0 bg-gray-800/90 mix-blend-multiply -z-10"></div>
      {/* NavBar */}
      <div className="fixed flex justify-between items-start w-full text-white p-5 z-50 bg-gradient-to-b from-black to-transparent">
        <img src={logo} className="w-16 h-16 ml-5 object-contain" alt="" />{" "}
        <div className="relative flex mt-2 items-center justify-center gap-16 text-sm ">
          {navItems.map((item, index) => (
            <p
              key={index}
              onClick={() => {
                setSelectedNav(index + 1);
                scrollToSection(index);
              }}
              className={`opacity-60 hover:text-slate-200 hover:opacity-100 text-left animate relative  ${
                selectedNav === index + 1 ? "!opacity-100" : ""
              }`}
            >
              {item}
            </p>
          ))}

          <motion.div
            className="absolute w-10  -bottom-1 h-[3px] rounded-full bg-gradient-to-tr from-slate-500 to-slate-100"
            initial={false}
            animate={{
              left: `${(selectedNav - 1) * (126 / navItems.length)}%`,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </div>{" "}
        <button
          // onClick={() => setSelectedNav(index + 1)}
          className={`bg-white animate mr-5 mt-1 !opacity-100 text-black font-medium hover:bg-gradient-to-tr from-slate-500 to-slate-100`}
        >
          Contact
        </button>
      </div>
      {/* Hero section */}
      <div className="section" ref={homeRef}>
        <motion.div
          className="h-full w-full text-gray-200 max-h-[500px] items-center flex flex-col justify-end gap-5 rounded-xl"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {
              y: 35, // Start below
            },
            visible: {
              y: 0,
              transition: {
                staggerChildren: 0.15, // Delay for child animations
                ease: "easeInOut", // Easing function for smoother transitions
                duration: 0.5, // Overall duration of the animation
              },
            },
          }}
        >
          <motion.img
            src={logo}
            alt=""
            className="w-[10dvw] object-contain mb-3"
            variants={{
              hidden: { opacity: 0, y: 35 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }} // Transition for img
          />
          <motion.p
            className="text-center text-5xl font-medium leading-[3.7rem]"
            variants={{
              hidden: { opacity: 0, y: 35 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }} // Transition for text
          >
            Where Every Meal <br /> Tells a
            <span className="text-slate-400"> Story</span>
          </motion.p>
          <motion.p
            className="w-[37vw] font-light opacity-80 text-center"
            variants={{
              hidden: { opacity: 0, y: 35 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }} // Transition for text
          >
            Experience the fusion of Mediterranean flavors, exquisite spices,
            and the warmth of Algerian hospitality, all in one unforgettable
            dining experience.
          </motion.p>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 35 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }} // Transition for buttons
            className="flex items-center justify-center gap-2"
          >
            <button className="bg-gradient-to-tr from-slate-500 font- !px4 to-slate-100 text-black animate">
              Discover Our Masterpieces
            </button>
            <button
              onClick={() => {
                scrollToSection(1);
                setSelectedNav(2);
              }}
              className="flex bg-transparent hover:bg-slate-300/10 animate items-center gap-2"
            >
              <IoPlayForwardOutline className="text-lg" />
              Watch our story
            </button>
          </motion.div>
        </motion.div>

        {/* <div className=" h-full w-full text-gray-200 items-start px-10 flex py-20 flex-col justify-end gap-5 rounded-xl">
        <p className="text-left text-6xl font-medium leading-[4.5rem]">
          Where Every Meal <br /> Tells a
          <span className="text-slate-400"> Story</span>
        </p>
        <p className="w-[37vw] font-light opacity-80 text-left leading-7">
          Experience the fusion of Mediterranean flavors, exquisite spices, and
          the warmth of Algerian hospitality, all in one unforgettable dining
          experience
        </p>
        <div className="flex items-center justify-center gap-7">
          <button className="bg-gradient-to-tr from-slate-500 font-medium !px4 to-slate-100 text-black animate">
            Discover Our Masterpieces
          </button>
          <button className="flex bg-transparent hover:bg-slate-300/10 animate items-center gap-2">
            <IoPlayForwardOutline className="text-lg" />
            Watch our story
          </button>
        </div>
      </div> */}
      </div>
      {/* About sections */}
      <div ref={aboutRef} className="section relative">
        <img
          src={bg}
          className="-z-10 w-full h-full bg-cover object-cover absolute top-0 left-0"
          alt=""
        />{" "}
        <div className="w-full h-full absolute left-0 top-0 bg-gray-800/30 mix-blend-multiply -z-10"></div>
        <div className="flex items-start justify-center p-10 pt-5 gap-20 px-36 h-full pb-20">
          <div className="flex w-2/6 flex-col h-full items-center justify-center gap-7">
            <p className="h-10 text-3xl ">Abous us</p>
            <div className="rounded-3xl bg-slate-400 w-full flex-grow"></div>
          </div>
          <div className="flex w-4/6 flex-col h-full items-end justify-start gap-14">
            {" "}
            <div className="rounded-3xl bg-slate-400 w-7/12 h-[25dvh] "></div>
            <p className="h-10 text-xl capitalize mr-auto mt-auto">
              Abous us this a <br /> section somthing ama
            </p>
            <div className="flex items-center justify-center gap-20 opacity-70">
              <p className="text-sm">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo,
                id earum. Laboriosam vero quos suscipit ullam, voluptatum qui
                dignissimos cum error deleniti repudiandae
              </p>
              <p className="text-sm">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo,
                id earum. Laboriosam vero quos suscipit ullam, voluptatum qui
                dignissimos cum error deleniti repudiandae nisi
              </p>
            </div>
          </div>
        </div>
        <p className="w-full text-center mb-10 text-4xl mt-20">
          Watch our story
        </p>
        <div className="w-5/6 mx-auto h-[60vh] rounded-xl bg-gray-500"></div>
      </div>
      {/* Menu section */}
      <div ref={menuRef} className="section">
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
                  className={`orgbtn ${
                    SelectedType === "All" && "selectedBtn"
                  }`}
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
                  className={`orgbtn ${
                    SelectedType === "Pizza" && "selectedBtn"
                  }`}
                >
                  Pizza
                </button>
                <button
                  onClick={() => {
                    filterType("salad");
                    setSelectedType("Salads");
                  }}
                  className={`orgbtn ${
                    SelectedType === "Salads" && "selectedBtn"
                  }`}
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
                  className={`orgbtn ${
                    selectedPrice === "$$" && "selectedBtn"
                  }`}
                >
                  $$
                </button>
                <button
                  onClick={() => {
                    filterPrice("$$$");
                    setSelectedPrice("$$$");
                  }}
                  className={`orgbtn ${
                    selectedPrice === "$$$" && "selectedBtn"
                  }`}
                >
                  $$$
                </button>
                <button
                  onClick={() => {
                    filterPrice("$$$$");
                    setSelectedPrice("$$$$");
                  }}
                  className={`orgbtn ${
                    selectedPrice === "$$$$" && "selectedBtn"
                  }`}
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
          </div>{" "}
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
                className="w-full object-cover rounded-xl"
                src="https://images.pexels.com/photos/2273823/pexels-photo-2273823.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
