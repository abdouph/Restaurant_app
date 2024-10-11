import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import { TbBowlSpoon } from "react-icons/tb";
import { BiDish, BiDrink } from "react-icons/bi";
import { LuIceCream2, LuSalad } from "react-icons/lu";
import { IoPlayForwardOutline } from "react-icons/io5";
import {
  MdFreeBreakfast,
  MdOutlineFreeBreakfast,
  MdShoppingBasket,
} from "react-icons/md";
import "./App.css";
import v from "./img/v.mp4";
import logo from "./img/fulllogo.png";
import { data } from "./Data/data.js";

function App() {
  const [selectedNav, setSelectedNav] = useState(1);
  const navItems = ["Home", "About", "Menu"];

  // Create refs for sections
  const homeRef = useRef(null);
  const menuRef = useRef(null);
  const aboutRef = useRef(null);
  const historyRef = useRef(null);

  const scrollToSection = (index) => {
    const sectionRefs = [homeRef, aboutRef, menuRef, historyRef];
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
  const types = [
    { name: "Breakfast", icon: <MdOutlineFreeBreakfast /> },
    { name: "First courses", icon: <TbBowlSpoon /> },
    { name: "Main courses", icon: <BiDish /> },
    { name: "Side dishes", icon: <LuSalad /> },
    { name: "Desserts", icon: <LuIceCream2 /> },
    { name: "Drinks", icon: <BiDrink /> },
  ];
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
      <div className="fixed flex justify-between items-start w-[98dvw] text-white p-5 z-50 bg-gradient-to-b from-black to-transparent">
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
          className={`animate mr-5 mt-1 !opacity-100 text-black font-medium hover:shadow-white/30 hover:shadow-lg bg-gradient-to-tr from-slate-500 to-slate-100`}
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
            <button
              onClick={() => {
                scrollToSection(2);
                setSelectedNav(3);
              }}
              className="bg-gradient-to-tr from-slate-500 font-semibold !px4 to-slate-100 text-black animate"
            >
              Discover Our Masterpieces
            </button>
            <button
              onClick={() => {
                scrollToSection(3);
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
        <div className="absolute w-full h-[20dvh] bg-gradident-to-t from-transparent via-black to-transparent -bottom-[10dvh]"></div>
      </div>
      {/* About sections */}
      <div ref={aboutRef} className=" w-full !pt-[11.5dvh] pb-32 relative">
        <img
          src={
            "https://img.freepik.com/free-vector/elegant-black-gold-marble-effect-background-with-gold-glitter_1048-18886.jpg?t=st=1728666110~exp=1728669710~hmac=457e7570549afeef01352408f7334c154563ff48373cc8baf300a9f2191a7bc3&w=740"
          }
          // src={bg}
          style={{ filter: "blur(2px)" }}
          className="-z-10 w-full h-full bg-cover object-cover absolute top-0 left-0"
          alt=""
        />{" "}
        <div className="w-full h-full absolute left-0 top-0 bg-gray-700 mix-blend-multiply -z-10"></div>
        <div className="flex items-start justify-center p-10 pt-5 gap-20 px-36 h-[90dvh] pb-10">
          <div className="flex w-2/6 flex-col h-full items-center justify-center gap-7">
            <p className="h-10 text-3xl ">Abous us</p>
            <video
              src={v}
              autoPlay
              loop
              className="rounded-3xl h-[70dvh] object-cover w-full flex-grow"
            />
          </div>
          <div className="flex w-4/6 flex-col h-full items-end justify-start gap-14">
            <img
              src="https://img.freepik.com/free-photo/grilled-beef-fillet-with-vegetable-appetizer-plate-generated-by-ai_188544-24766.jpg?t=st=1728669741~exp=1728673341~hmac=a5173a79ad7a40bedbd310acce476ac05082aa142a3ea2386793477974586758&w=826"
              alt=""
              className="rounded-xl object-cover w-7/12 h-[27dvh]"
            />
            <p className="h-10 uppercase text-xl  mr-auto mt-auto">
              The rich history <br /> of our restaurant
            </p>
            <div className="flex items-start justify-center gap-14 opacity-70 text-xs font-MontserratLight leading-5">
              <p className="w-1/2">
                Nestled in the heart of Casbah, a city steeped in rich history
                and cultural legacy, Noor El Djazair stands as a tribute to
                centuries of Mediterranean charm and Algerian warmth.
              </p>
              <p className="w-1/2">
                Founded in 1995, Noor El Djazair has since become a premier
                destination for culinary enthusiasts, blending traditional
                Algerian cuisine with modern elegance to create an unforgettable
                dining experience.
              </p>
            </div>
          </div>
        </div>
        <p
          ref={historyRef}
          className="w-full pt-24 text-center mb-5 text-4xl mt-10"
        >
          Watch our story
        </p>
        <div className="w-4/6 mx-auto h-[70vh] rounded-xl bg-gray-500"></div>
      </div>
      {/* Menu section */}
      <div
        ref={menuRef}
        className="flex relative flex-col items-start gap-4 pt-28 p-10"
      >
        <p className="h-10 text-2xl ">Menu</p>
        <img
          src={
            "https://img.freepik.com/free-vector/elegant-black-gold-marble-effect-background-with-gold-glitter_1048-18886.jpg?t=st=1728666110~exp=1728669710~hmac=457e7570549afeef01352408f7334c154563ff48373cc8baf300a9f2191a7bc3&w=740"
          }
          // src={bg}
          style={{ filter: "blur(2px)" }}
          className="-z-10 w-full h-full bg-cover object-cover absolute top-0 left-0"
          alt=""
        />
        <div className="w-full h-full absolute left-0 top-0 bg-gray-700 mix-blend-multiply -z-10"></div>
        <div className="flex items-center justify-start gap-10">
          {types.map((type, index) => (
            <div
              key={index}
              onClick={() => {
                setSelectedType(index);
              }}
              className={`flex items-center gap-2 text-zinc-500 hover:font-semibold hover:text-zinc-400/70 hover:border-b-zinc-400/70 pb-[0.05rem] border-b-2 border-transparent animate ${
                index === SelectedType &&
                " font-semibold text-zinc-400 border-b-zinc-400 "
              }`}
            >
              {type.icon}
              {type.name}
            </div>
          ))}
        </div>
        <div className="flex justify-start ">
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
            className={`orgbtn ${SelectedType === "Burgers" && "selectedBtn"}`}
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
            className={`orgbtn ${SelectedType === "Chicken" && "selectedBtn"}`}
          >
            Chicken
          </button>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4 cursor-pointer">
          {foods.map((item, index) => (
            // <div
            //   key={index}
            //   className="border shadow-lg rounded-lg hover:scale-105 duration-300"
            // >
            //   <img
            //     src={item.image}
            //     alt={item.name}
            //     className="w-full h-[200px] object-cover rounded-t-lg"
            //   />
            //   <div className="flex justify-between px-2 py-4">
            //     <p className="font-bold">{item.name}</p>
            //     <p>
            //       <span className="bg-orange-500 text-white px-2 py-1 rounded-full">
            //         {item.price}
            //       </span>
            //     </p>
            //   </div>
            // </div>
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="w-275 my-12 bg-slate-400/5  w-[285px] min-w-[275px] p-4 hover:drop-shadow-lg  shadow-md rounded-lg h-[165px] backdrop-blur-md duration-75 ease-in-out flex flex-col justify-between items-center"
            >
              <div className="w-full relative flex justify-between items-center ">
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className="w-32 h-32 absolute -mt-8 drop-shadow-xl"
                >
                  <img
                    className=" w-full h-full object-contain"
                    src={item.image}
                    alt=""
                  />
                </motion.div>
                <motion.div
                  whileTap={{ scale: 0.75 }}
                  // onClick={() => {
                  //   setItems([...cartItems, item]);
                  // }}
                  className="bg-red-600 rounded-full ml-auto w-8 h-8 cursor-pointer hover:drop-shadow-md flex items-center justify-center"
                >
                  <MdShoppingBasket className="text-white" />
                </motion.div>
              </div>
              <div className="flex flex-col items-end justify-end w-full h-full ">
                <p className="text-base text-textColor font-semibold md:text-lg">
                  {item.name}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  {" "}
                  {item.price} Calories
                </p>
                <div className="flex items-center justify-center">
                  <p className="text-headingColor text-lg font-semibold">
                    <span className="text-sm font-semibold text-red-500">
                      DZD
                    </span>{" "}
                    {item.price}
                  </p>
                </div>
              </div>
            </motion.div>
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
  );
}

export default App;
