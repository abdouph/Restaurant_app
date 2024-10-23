import { Dialog, DialogBody } from "@material-tailwind/react";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { BiDrink, BiFoodMenu, BiSolidDish } from "react-icons/bi";
import { IoPizzaOutline, IoPlayForwardOutline } from "react-icons/io5";
import { LuIceCream2, LuSalad } from "react-icons/lu";
import {
  MdEmail,
  MdFoodBank,
  MdLocationPin,
  MdOutlineMenu,
  MdOutlinePlayCircleOutline,
  MdPhone,
  MdShoppingBasket,
} from "react-icons/md"; // Base styles for media player and provider (~400B).
import "@vidstack/react/player/styles/base.css";
import { PiCookingPot, PiShoppingCart } from "react-icons/pi";
import { RiVipCrownLine } from "react-icons/ri";
import videojs from "video.js";

import { TbFish, TbGrill } from "react-icons/tb";
import "./App.css";
import { data } from "./Data/data.js";
import playicon from "./img/play.png";
import logo from "./img/fulllogo.png";
import v from "./img/v.mp4";
import bell from "./audio/bell.mp3";
import { Badge, message } from "antd";
import VideoJS from "./VideoJS.jsx";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import { GoPlay } from "react-icons/go";
import { Player } from "./Player.jsx";
import { BsFillSendFill } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";
import { FaChevronDown, FaFacebook, FaXTwitter } from "react-icons/fa6";
function App() {
  const [selectedNav, setSelectedNav] = useState(1);
  const navItems = ["Home", "About", "Menu"];
  const audioRef = useRef(null);

  const homeRef = useRef(null);
  const menuRef = useRef(null);
  const aboutRef = useRef(null);
  const historyRef = useRef(null);

  const scrollToSection = (index) => {
    const sectionRefs = [homeRef, aboutRef, menuRef, historyRef];
    if (sectionRefs[index] && sectionRefs[index].current) {
      if (charLimit === 23) sectionRefs[index].current.scrollIntoView();
      else sectionRefs[index].current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [foods, setFoods] = useState(data);
  const [SelectedType, setSelectedType] = useState(0);
  const filterType = (type) => {
    console.log(type);
    if (type === -1) {
      setFoods(
        data.filter((item) => {
          return item.fav !== undefined;
        })
      );
    } else
      setFoods(
        data.filter((item) => {
          return item.category === type;
        })
      );
  };
  const types = [
    {
      id: -1,
      name: "Our selection",
      icon: <RiVipCrownLine className="text-lg" />,
    },
    { id: 0, name: "Hot Dishes", icon: <PiCookingPot className="text-lg" /> },
    { id: 1, name: "Fish & Seafood", icon: <TbFish className="text-lg" /> },
    { id: 2, name: "Grilled Meats", icon: <TbGrill className="text-lg" /> },
    { id: 3, name: "Pizza", icon: <IoPizzaOutline className="text-lg" /> },
    { id: 4, name: "Salads", icon: <LuSalad className="text-lg" /> },
    { id: 5, name: "Desserts", icon: <LuIceCream2 className="text-lg" /> },
    { id: 6, name: "Drinks", icon: <BiDrink className="text-lg" /> },
  ];
  const paragraphRefs = useRef([]);
  const [charLimit, setCharLimit] = useState(23);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        // Tailwind's md breakpoint is 768px
        setCharLimit(23);
      } else {
        setCharLimit(12);
      }
    };

    // Initial check
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    paragraphRefs.current.forEach((paragraph) => {
      if (paragraph) {
        const words = paragraph.innerText.split(" ");
        let firstLine = "";
        let restOfParagraph = "";
        let charCount = 0;

        for (let i = 0; i < words.length; i++) {
          const testLine = firstLine + words[i] + " ";
          if (charCount + words[i].length + 1 > charLimit) {
            restOfParagraph = words.slice(i).join(" ");
            break;
          }
          firstLine = testLine;
          charCount += words[i].length + 1;
        }

        paragraph.innerHTML = `${firstLine.trim()}<br/> ${restOfParagraph}`;
      }
    });
  }, [, charLimit, foods]);
  useEffect(() => {
    filterType(-1);
  }, []);
  const [selectedDish, setSelectedDish] = useState(foods[0]);
  const [openDish, setOpenDish] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const info = (msg) => {
    messageApi.open({
      content: msg,
      duration: 5,
      icon: <BiSolidDish className="!text-lg !mr-2" />,
    });
  };
  const [orders, setOrders] = useState(0);
  const playerRef = React.useRef(null);
  const videoJsOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    height: 400,
    poster:
      "https://firebasestorage.googleapis.com/v0/b/nour-el-djazair.appspot.com/o/Fichier%206.png?alt=media&token=fbb9511d-56f9-4a92-b779-65e4d3af8e67",
    nativeControlsForTouch: true,
    controlBar: true,
    sources: [
      {
        src: "https://firebasestorage.googleapis.com/v0/b/nour-el-djazair.appspot.com/o/6015593_Chef_Man_1920x1080.mp4?alt=media&token=61005777-da89-4b1f-9467-a4749c620732",
        type: "video/mp4",
      },
    ],
  };
  const handlePlayerReady = (player) => {
    playerRef.current = player;

    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  };
  const [expandMenu, setExpandMenu] = useState(false);
  const [expandNav, setExpandNav] = useState(false);
  return (
    <div className="w-[100dvw] overflow-y-auto relative h-[100dvh] overflow-hidden flex flex-col items-center justify-start">
      {contextHolder} <audio ref={audioRef} src={bell} preload="auto" />
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
        src="https://firebasestorage.googleapis.com/v0/b/nour-el-djazair.appspot.com/o/1109982_Salt_Seasoning_1920x1080%20(1).webm?alt=media&token=58490c75-1c65-40f6-81d3-17edf7731a2a"
      ></video>
      <div className="w-full h-full absolute left-0 top-0 bg-gray-800/90 mix-blend-multiply -z-10"></div>
      {/* NavBar */}
      <div className="fixed flex justify-between items-start w-[98dvw] text-white p-5 md:pr-5 pr-3 z-50 bg-gradient-to-b from-black to-transparent">
        <img
          src={logo}
          className="md:size-16 size-14 md:ml-5 object-contain"
          alt=""
        />{" "}
        <div className="ml-16 hidden md:flex mt-2 px-10 py-2 backdrop-blur-xl rounded-full border-[2px] bg-blue-gray-500/15 border-blue-gray-500">
          <div className=" relative flex items-center justify-center gap-16 text-[0.82rem] ">
            {navItems.map((item, index) => (
              <p
                key={index}
                onClick={() => {
                  setSelectedNav(index + 1);
                  scrollToSection(index);
                }}
                className={`opacity-60 hover:text-blue-gray-200 hover:opacity-100 text-left animate relative  ${
                  selectedNav === index + 1 ? "!opacity-100" : ""
                }`}
              >
                {item}
              </p>
            ))}

            {/* <motion.div
              className="absolute w-10  -bottom-1 h-[3px] rounded-full bg-gradient-to-tr from-blue-gray-500 to-blue-gray-100"
              initial={false}
              animate={{
                left: `${(selectedNav - 1) * (126 / navItems.length)}%`,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            /> */}
          </div>
        </div>{" "}
        <div className="flex items-center justify-center !gap-8">
          {orders === 0 ? (
            ""
          ) : (
            <Badge size="small" count={orders} className="cursor-pointer mt-2 ">
              <PiShoppingCart className="!text-2xl text-white" />
            </Badge>
          )}
          <button
            className={`animate hidden md:block md:mr-5 mt-1 !opacity-100 text-black font-medium hover:shadow-white/30 hover:shadow-lg bg-gradient-to-tr from-blue-gray-500 to-blue-gray-100`}
          >
            Contact
          </button>
          <button
            onClick={() => setExpandNav(true)}
            className={`md:hidden !px-1.5 mt-1 text-[2rem] !opacity-100 text-white`}
          >
            <MdOutlineMenu />
          </button>
          <Dialog
            size="lg"
            className="md:hidden !bg-transparent !outline-none"
            open={expandNav}
          >
            <DialogBody className="pl-5 !shadow-none text-white font-MontserratMedium">
              <div className=" relative flex flex-col items-center justify-center gap-10 text-2xl ">
                {navItems.map((item, index) => (
                  <p
                    key={index}
                    onClick={() => {
                      setSelectedNav(index + 1);
                      scrollToSection(index);
                      setExpandNav(false);
                    }}
                    className={`opacity-60 hover:text-blue-gray-200 hover:opacity-100 text-left animate relative  ${
                      selectedNav === index + 1 ? "!opacity-100" : ""
                    }`}
                  >
                    {item}
                  </p>
                ))}
              </div>
            </DialogBody>
          </Dialog>
        </div>
      </div>
      {/* Hero section */}
      <div className="section" ref={homeRef}>
        <motion.div
          className="h-full w-full text-gray-200 items-center flex md:pb-10 flex-col md:justify-end justify-center md:gap-5 gap-7 rounded-xl"
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
            className="w-[10dvw] hidden md:flex object-contain mb-3"
            variants={{
              hidden: { opacity: 0, y: 35 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }} // Transition for img
          />
          <motion.p
            className="text-center md:text-5xl text-4xl font-MontserratMedium leading-[3.7rem]"
            variants={{
              hidden: { opacity: 0, y: 35 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }} // Transition for text
          >
            Where Every Meal <br /> Tells a
            <span className="text-blue-gray-400"> Story</span>
          </motion.p>
          <motion.p
            className="md:w-[37dvw] w-[80%] leading-[1.79rem] md:leading-normal font-light opacity-80 text-center"
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
            className="flex-col md:flex items-center justify-center  md:gap-2"
          >
            <button
              onClick={() => {
                scrollToSection(2);
                setSelectedNav(3);
              }}
              className="bg-gradient-to-tr md:w-auto w-[75dvw] from-blue-gray-500 py-2.5 font-semibold !px4 to-blue-gray-100 text-black animate"
            >
              Discoverrr Our Masterpieces
            </button>
            <button
              onClick={() => {
                scrollToSection(3);
                setSelectedNav(2);
              }}
              className="flex justify-center hover:bg-blue-gray-300/30 md:mt-0 mt-3 md:py-2 py-3 md:bg-blue-gray-300/10 bg-blue-gray-300/20  backdrop-blur-xl animate items-center gap-2 w-full"
            >
              <IoPlayForwardOutline className="text-lg" />
              Watch our story
            </button>
          </motion.div>
        </motion.div>

        <div className="absolute w-full h-[20dvh] bg-gradident-to-t from-transparent via-black to-transparent -bottom-[10dvh]"></div>
      </div>
      {/* About sections */}
      <div ref={aboutRef} className=" !w-screen  !pt-[11.5dvh] pb-32 relative">
        {/* <img
          src={
            "https://firebasestorage.googleapis.com/v0/b/nour-el-djazair.appspot.com/o/Artboard%201.png?alt=media&token=bd65373f-af82-4769-ae41-5b2078f117ab"
          }
          // src={bg}
          // style={{ filter: "blur(2px)" }}
          className="-z-10 w-full h-screen bg-cover object-cover absolute top-0 left-0"
          alt=""
        />{" "} */}
        <div className="w-full  h-full absolute left-0 top-0 bg-gray-700 mix-blend-multiply -z-10"></div>
        <div className="flex w-full  items-start justify-center p-4 md:p-10 pt-5 gap-20 md:px-36 h-[90dvh] pb-10 !z[1000]">
          <div className="hidden md:flex md:w-2/6 w-0 flex-col h-full items-center justify-center gap-7">
            <p className="h-10 text-3xl ">Abous us</p>
            <video
              src={v}
              autoPlay
              loop
              className="rounded-3xl h-[70dvh] object-cover w-full flex-grow"
            />
          </div>
          <div className="flex w-full md:w-4/6 flex-col h-full items-center md:text-end justify-start gap-10 md:gap-14">
            <p className="h-10 text-4xl w-full text-center md:hidden opacity-90">
              Abous us
            </p>

            <img
              src="https://img.freepik.com/free-photo/grilled-beef-fillet-with-vegetable-appetizer-plate-generated-by-ai_188544-24766.jpg?t=st=1728669741~exp=1728673341~hmac=a5173a79ad7a40bedbd310acce476ac05082aa142a3ea2386793477974586758&w=826"
              alt=""
              className="rounded-xl object-cover md:w-7/12 md:h-[27dvh] w-10/12 h-[20dvh]"
            />
            <p className="h-10 uppercase text-xl mt-7 mr-auto md:mt-auto">
              The rich history <br /> of our restaurant
            </p>
            <div className="flex-col md:flex items-start justify-center gap-14 opacity-70 text-xs font-MontserratLight leading-5">
              <p className="md:w-1/2 leading-loose">
                Nestled in the heart of Casbah, a city steeped in rich history
                and cultural legacy, Noor El Djazair stands as a tribute to
                centuries of Mediterranean charm and Algerian warmth.
              </p>
              <p className="md:w-1/2 leading-loose md:mt-0 mt-5">
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
          className="text-2xl md:text-3xl mt-7 pt-28 leading-relaxed w-full text-center mb-7 opacity-75"
        >
          From Dream to Reality <span className="hidden md:block">–</span>
          <span className="md:hidden">
            <br />
          </span>{" "}
          Watch Our Story
        </p>{" "}
        <div className=" md:w-4/6 w-11/12 mx-auto rounded-3xl overflow-hidden relative">
          <Player />
        </div>
      </div>
      {/* Menu section */}
      <div
        ref={menuRef}
        className="flex relative w-full flex-col items-start gap-4 pt-28 p-3"
      >
        <p className="h-10 text-3xl font-MontserratMedium md:text-2xl ">Menu</p>
        <div className="w-full h-full absolute left-0 top-0 bg-gray-700 mix-blend-multiply -z-10"></div>
        <div className="md:flex hidden items-center md:justify-start justify-between gap-7 md:gap-10">
          {types.map((type, index) => (
            <div
              key={index}
              onClick={() => {
                setSelectedType(index);
                filterType(index - 1);
              }}
              className={` flex items-center gap-1 text-gray-500 hover:font-semibold hover:text-gray-400 hover:border-b-gray-400/70 pb-[0.05rem] border-b-2 border-transparent animate ${
                index === SelectedType &&
                " font-MontserratMedium !text-gray-300 border-b-gray-300 "
              }`}
            >
              {type.icon}
              {type.name}
            </div>
          ))}
        </div>
        <div className="flex w-full items-center justify-between md:hidden">
          <div
            onClick={() => {
              setSelectedType(0);
              filterType(-1);
              setExpandMenu(!expandMenu);
            }}
            className={`flex items-center gap-1 hover:font-semibold hover:text-gray-400 hover:border-b-gray-400/70 pb-[0.05rem] border-b-2 border-transparent animate font-MontserratMedium !text-gray-300 border-b-gray-300`}
          >
            {types[SelectedType].icon}
            {types[SelectedType].name} <FaChevronDown />
          </div>
        </div>
        {expandMenu && (
          <div className="md:hidden grid grid-cols-2 md:w-auto w-full items-center md:justify-start justify-between gap-7 md:gap-10">
            {types.map(
              (type, index) =>
                index !== 0 && (
                  <div
                    key={index}
                    onClick={() => {
                      setSelectedType(index);
                      filterType(index - 1);
                      setExpandMenu(false);
                    }}
                    className={` flex items-center gap-1 text-gray-500 hover:font-semibold hover:text-gray-400 hover:border-b-gray-400/70 pb-[0.05rem] border-b-2 border-transparent animate ${
                      index === SelectedType &&
                      " font-MontserratMedium !text-gray-300 border-b-gray-300 "
                    }`}
                  >
                    {type.icon}
                    {type.name}
                  </div>
                )
            )}
          </div>
        )}
        <div className="grid md:grid-cols-2 items-center justify-center lg:grid-cols-4 gap-6 pt-4 cursor-pointer">
          {foods.map((item, index) => (
            <motion.div
              onClick={() => {
                setSelectedDish(index);
                setOpenDish(true);
              }}
              key={index}
              whileHover={{ scale: 1.015 }}
              transition={{ ease: "easeInOut" }}
              className="md:my-12 my-10 bg-blue-gray-400/5  w-full md:w-[285px]  p-4 hover:drop-shadow-lg  shadow-md rounded-lg h-[165px] backdrop-blur-md duration-75 ease-in-out flex flex-col justify-between items-center"
            >
              <div className="w-full relative flex justify-end items-center ">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ ease: "easeInOut" }}
                  className="w-32 h-32 absolute -mt-8 drop-shadow-xl"
                >
                  <img
                    className=" w-full h-full object-contain"
                    src={item.image}
                    alt=""
                  />
                </motion.div>{" "}
              </div>
              <div className="flex flex-col items-start justify-between w-full h-full ">
                <div className="flex flex-col items-start justify-center w-full ">
                  <p
                    ref={(el) => (paragraphRefs.current[index] = el)}
                    className="text-xl md:text-lg font-semibold h-14"
                  >
                    {item.name}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">{item.desc}</p>
                </div>{" "}
                <div className="flex w-full items-center justify-between">
                  <p className="text-headingColor text-lg font-semibold">
                    {item.price}{" "}
                    <span className="text-sm font-semibold text-blue-gray-500">
                      DZD
                    </span>
                  </p>{" "}
                  <motion.div
                    whileTap={{ scale: 0.75 }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      info(`Your ${item.name} is on the way !`);
                      setTimeout(() => {
                        audioRef.current.play();
                      }, 100);

                      setOrders(orders + 1);
                    }}
                    className="bg-blue-gray-600 rounded-full ml-auto w-8 h-8 cursor-pointer hover:drop-shadow-md flex items-center justify-center"
                  >
                    <MdShoppingBasket className="text-white" />
                  </motion.div>{" "}
                </div>
              </div>
            </motion.div>
          ))}
        </div>{" "}
        {foods.length > 0 &&
          (selectedDish || selectedDish === 0) &&
          !isNaN(selectedDish) && (
            <Dialog
              size="lg"
              onClick={() => setOpenDish(false)}
              className="!bg-transparent !outline-none"
              open={openDish}
              handler={() => setOpenDish(!openDish)}
            >
              <DialogBody className="md:pl-16 pl-5 gap-10 !shadow-none text-white font-Montserrat flex items-center justify-center">
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                  className="w-full md:w-1/2 flex md:gap-0 gap-2 flex-col items-start justify-center"
                >
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                    }}
                    className="md:hidden my-5 w-full"
                  >
                    <motion.img
                      className="size-52 mx-auto object-contain"
                      src={foods[selectedDish].image}
                      alt=""
                      animate={
                        !foods[selectedDish].rotate
                          ? {
                              y: [0, -10, 0], // Floating effect
                              transition: {
                                repeat: Infinity,
                                duration: 3,
                                ease: "easeInOut",
                              },
                            }
                          : {
                              rotate: 360, // Rotating effect
                              transition: {
                                repeat: Infinity,
                                duration: 25,
                                ease: "linear",
                              },
                            }
                      }
                    />
                  </div>{" "}
                  <p className="text-4xl font-semibold md:mt-0 mt-4 mb-6 flex flex-col items-start">
                    {foods[selectedDish].name}
                    <div className="w-[75%] mt-0.5 ml-0.5 h-[4px] rounded-full bg-gradient-to-tr from-blue-gray-500 to-blue-gray-100" />
                  </p>
                  <p className="text-lg font-MontserratMedium">ingrediants :</p>
                  <p className="text-gray-500 mb-4">
                    {foods[selectedDish].desc}
                  </p>
                  <p className="text-lg w-full flex gap-3  font-MontserratMedium">
                    Weight :
                    <p className="text-gray-500 mb-4 font-Montserrat">200g</p>
                  </p>
                  <p className="text-lg w-full flex gap-3  font-MontserratMedium">
                    Price :
                    <p className="text-lg font-semibold mb-4  font-Montserrat">
                      {foods[selectedDish].price}{" "}
                      <span className="text-sm font-semibold text-blue-gray-500">
                        DZD
                      </span>
                    </p>
                  </p>
                  <button
                    onClick={() => {
                      info(`Your ${foods[selectedDish].name} is on the way !`);
                      setOpenDish(false);
                      setTimeout(() => {
                        audioRef.current.play();
                      }, 500);
                      setOrders(orders + 1);
                    }}
                    className={`animate mr-5 mt-1 !opacity-100  text-black font-semibold hover:shadow-white/30 hover:shadow-lg bg-gradient-to-tr md:w-auto w-full md:h-auto h-10 from-blue-gray-500 to-blue-gray-100`}
                  >
                    Let’s Get Cooking – Order Now
                  </button>
                </div>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                  className="w-1/2 hidden md:block"
                >
                  <motion.img
                    className="size-72 object-contain"
                    src={foods[selectedDish].image}
                    alt=""
                    animate={
                      !foods[selectedDish].rotate
                        ? {
                            y: [0, -10, 0], // Floating effect
                            transition: {
                              repeat: Infinity,
                              duration: 3,
                              ease: "easeInOut",
                            },
                          }
                        : {
                            rotate: 360, // Rotating effect
                            transition: {
                              repeat: Infinity,
                              duration: 25,
                              ease: "linear",
                            },
                          }
                    }
                  />
                </div>
              </DialogBody>
            </Dialog>
          )}
        <div className="flex rounded-xl overflow-hidden mx-auto mt-20 items-center justify-between h-14 w-full md:w-1/2 text-white bg-[#1d1e20] !mb-10">
          <input
            placeholder="You want to subscribe ? enter your email"
            className="md:px-5 px-3 md:text-base text-sm !outline-none placeholder:opacity-70 opacity-60 flex-grow bg-transparent h-full"
          />

          <div className="w-[4rem] rounded-lg md:w-[4.5rem] bg-gradient-to-tr hover:to-blue-500 transition-all ease-in-out animate from-blue-900 to-blue-700 h-full flex items-center justify-center text-2xl">
            <BsFillSendFill />
          </div>
        </div>
      </div>{" "}
      {/* Footer section */}
      <footer className="hidden md:flex flex-col items-start justify-center w-full bg-[#08080a]/70 backdrop-blur-lg p-10 pb-7">
        <div className="flex items-center justify-between w-full">
          <img src={logo} alt="" className="size-24 ml-7" />

          <div className="flex items-start gap-4 text-xs">
            <div className="flex-col items-start hidden w-56 gap-2 text-left md:flex text-white/50">
              <p className="mb-2 text-base font-medium text-white">
                A propos de nous
              </p>
              <div className="flex items-center">
                <MdLocationPin className="mr-2 text-lg" />
                <div>
                  <p>B07 n03, rue Collonel Amirouch </p>
                  <p>Bab ezzouar, Algeris, Algeria</p>
                </div>
              </div>
              <div className="flex items-center">
                <MdPhone className="mr-2 text-lg" />
                <div className="flex flex-col items-start">023.25.24.26</div>
              </div>
              <div className="flex items-center hover:text-white/75 animate">
                <MdEmail className="mr-2 text-lg" />
                contact@nrdz.com
              </div>
            </div>
            <div className="flex flex-col items-start gap-2 text-left text-white/50">
              <p className="mb-2 text-base font-medium text-white">
                Entrer en contact
              </p>
              <p className="hover:text-white/75 animate">
                Question ou feedback ?
              </p>
              <p>Nous aimerions recevoir de vos nouvelles</p>
              <div className="flex items-center justify-start gap-5 mt-4 text-2xl text-white ">
                <a
                  href={"https://www.facebook.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebook className="hover:text-white/75 animate" />
                </a>
                <a
                  href={"https://www.facebook.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaXTwitter className="hover:text-white/75 animate" />
                </a>
                <a
                  href={"https://www.facebook.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <AiFillInstagram className="hover:text-white/75 animate" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <p className="w-full mt-10 text-xs text-center text-white/40">
          © Copyrights 2024 by Nour Al Djazair, All rights reserved
        </p>
      </footer>
      <footer className=" md:hidden flex-col items-start justify-center w-full bg-[#08080a]/70 backdrop-blur-lg  pt-8 pb-4 md:!pb-7">
        <div className="flex items-center justify-between gap-10 w-full">
          <img src={logo} alt="" className="size-24 ml-7" />
          <div className="flex flex-col text-xs  flex-grow items-start gap-1 text-left text-white/50">
            <p className=" text-base font-medium text-white">
              Entrer en contact
            </p>
            <p className="hover:text-white/75 animate">
              Question ou feedback ?
            </p>
            <p>Nous aimerions recevoir de vous</p>
            <div className="flex items-center justify-start gap-5 mt-2 text-lg text-white ">
              <a
                href={"https://www.facebook.com"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook className="hover:text-white/75 animate" />
              </a>
              <a
                href={"https://www.facebook.com"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaXTwitter className="hover:text-white/75 animate" />
              </a>
              <a
                href={"https://www.facebook.com"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiFillInstagram className="hover:text-white/75 animate" />
              </a>
            </div>
          </div>
        </div>

        <p className="w-full mt-10 text-xs text-center text-white/40">
          © Copyrights 2024 by Nour Al Djazair, All rights reserved
        </p>
      </footer>
    </div>
  );
}

export default App;
