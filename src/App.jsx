import { Dialog, DialogBody } from "@material-tailwind/react";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { BiDrink, BiSolidDish } from "react-icons/bi";
import { IoPizzaOutline, IoPlayForwardOutline } from "react-icons/io5";
import { LuIceCream2, LuSalad } from "react-icons/lu";
import { MdFoodBank, MdShoppingBasket } from "react-icons/md";
import { PiCookingPot, PiShoppingCart } from "react-icons/pi";
import { RiVipCrownLine } from "react-icons/ri";
import { TbFish, TbGrill } from "react-icons/tb";
import "./App.css";
import { data } from "./Data/data.js";
import logo from "./img/fulllogo.png";
import v from "./img/v.mp4";
import bell from "./audio/bell.mp3";
import { Badge, message } from "antd";
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
    sectionRefs[index].current.scrollIntoView({ behavior: "smooth" });
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

  useEffect(() => {
    paragraphRefs.current.forEach((paragraph) => {
      if (paragraph) {
        const words = paragraph.innerText.split(" ");
        let firstLine = "";
        let restOfParagraph = "";
        let charCount = 0;

        for (let i = 0; i < words.length; i++) {
          const testLine = firstLine + words[i] + " ";
          if (charCount + words[i].length + 1 > 12) {
            restOfParagraph = words.slice(i).join(" ");
            break;
          }
          firstLine = testLine;
          charCount += words[i].length + 1;
        }

        paragraph.innerHTML = `${firstLine.trim()}<br/> ${restOfParagraph}`;
      }
    });
  }, [, foods]);
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
  return (
    <div className="w-[100dvw]  overflow-y-auto relative h-[100dvh] overflow-hidden flex flex-col items-center justify-start">
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
              className={`opacity-60 hover:text-blue-gray-200 hover:opacity-100 text-left animate relative  ${
                selectedNav === index + 1 ? "!opacity-100" : ""
              }`}
            >
              {item}
            </p>
          ))}

          <motion.div
            className="absolute w-10  -bottom-1 h-[3px] rounded-full bg-gradient-to-tr from-blue-gray-500 to-blue-gray-100"
            initial={false}
            animate={{
              left: `${(selectedNav - 1) * (126 / navItems.length)}%`,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </div>{" "}
        <div className=" flex items-center justify-center !gap-8">
          {orders === 0 ? (
            ""
          ) : (
            <Badge size="small" count={orders} className="cursor-pointer mt-2 ">
              <PiShoppingCart className="!text-2xl text-white" />
            </Badge>
          )}
          <button
            // onClick={() => setSelectedNav(index + 1)}
            className={`animate mr-5 mt-1 !opacity-100 text-black font-medium hover:shadow-white/30 hover:shadow-lg bg-gradient-to-tr from-blue-gray-500 to-blue-gray-100`}
          >
            Contact
          </button>
        </div>
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
            <span className="text-blue-gray-400"> Story</span>
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
              className="bg-gradient-to-tr from-blue-gray-500 font-semibold !px4 to-blue-gray-100 text-black animate"
            >
              Discover Our Masterpieces
            </button>
            <button
              onClick={() => {
                scrollToSection(3);
                setSelectedNav(2);
              }}
              className="flex bg-transparent hover:bg-blue-gray-300/10 animate items-center gap-2"
            >
              <IoPlayForwardOutline className="text-lg" />
              Watch our story
            </button>
          </motion.div>
        </motion.div>

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
                filterType(index - 1);
              }}
              className={`flex items-center gap-1 text-gray-500 hover:font-semibold hover:text-gray-400 hover:border-b-gray-400/70 pb-[0.05rem] border-b-2 border-transparent animate ${
                index === SelectedType &&
                " font-MontserratMedium !text-gray-300 border-b-gray-300 "
              }`}
            >
              {type.icon}
              {type.name}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4 cursor-pointer">
          {foods.map((item, index) => (
            <motion.div
              onClick={() => {
                setSelectedDish(index);
                setOpenDish(true);
              }}
              key={index}
              whileHover={{ scale: 1.015 }}
              transition={{ ease: "easeInOut" }}
              className="my-12 bg-blue-gray-400/5  w-[285px]  p-4 hover:drop-shadow-lg  shadow-md rounded-lg h-[165px] backdrop-blur-md duration-75 ease-in-out flex flex-col justify-between items-center"
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
                    className="text-lg font-semibold h-14"
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
              <DialogBody className="pl-16 gap-10 !shadow-none text-white font-Montserrat flex items-center justify-center">
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                  className="w-1/2 flex flex-col items-start justify-center"
                >
                  <p className="text-4xl font-semibold  mb-6 flex flex-col items-start">
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
                    className={`animate mr-5 mt-1 !opacity-100  text-black font-semibold hover:shadow-white/30 hover:shadow-lg bg-gradient-to-tr from-blue-gray-500 to-blue-gray-100`}
                  >
                    Let’s Get Cooking – Order Now
                  </button>
                </div>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                  className="w-1/2"
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
      </div>
    </div>
  );
}

export default App;
