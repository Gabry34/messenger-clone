import React, { useEffect, useState } from "react";
import Image from "next/image";
import { GiPhone } from "react-icons/gi";
import { IoVideocam } from "react-icons/io5";
import { PiDotsThreeCircleFill } from "react-icons/pi";
import { IoIosAddCircle } from "react-icons/io";
import { FaRegImage } from "react-icons/fa6";
import { BsStickyFill } from "react-icons/bs";
import { HiMiniGif } from "react-icons/hi2";
import { BsEmojiNeutralFill } from "react-icons/bs";
import { BsFillEmojiSmileFill } from "react-icons/bs";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import ChatSpace from "./ChatSpace";
import SendMessage from "./buttons/SendMessage";
import Emojis from "./dropdowns/Emojis";
import Link from "next/link";
import DefaultImage from "@/public/images/defaultmage.png";
import Images from "./dropdowns/Images";

interface UserData {
  name?: string;
  surname?: string;
  image?: string;
}

export default function MiddleChat({
  searchParams,
  socket,
  setStateRightSide,
}: any) {
  const [input, setInput] = useState("");
  const [userData, setUserData] = useState<UserData>({});
  const [filePopupVisible, setFilePopupVisible] = useState(false);
  const [selectedFile, setSelectedFile] = useState<any>("");
  const [images, setImages] = useState([]);
  const [resetImages, setResetImages] = useState<boolean[]>([]);
  const [rightSide, setRightSide] = useState("open");

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, [searchParams]);

  const scrollToBottom = () => {
    const scrollContainer = document.getElementById("scroll-container");
    if (scrollContainer) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  };

  socket.on("scroll", () => {
    scrollToBottom();
  });

  const handleEmoji = (data: any) => {
    setInput(`${input}${data}`);
  };

  const handleFileInputChange = (e: any) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedFile(reader.result);
      };

      reader.readAsDataURL(selectedFile);
    }
  };

  const handleImages = (data: any) => {
    setImages(data);
  };

  const setStateRight = (state: string) => {
    setStateRightSide(state);
  };

  return (
    <div className="w-full h-full grid grid-rows-[58px,1fr,55px]">
      <div className="w-full flex items-center justify-between border-b-[2px] pl-1 pr-3">
        <Link
          className="flex items-center gap-2 px-2 py-1 rounded-md cursor-pointer hover:bg-[#F2F2F2]"
          href={`https://www.facebook.com/search/top?q=${userData.name} ${userData.surname}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {userData.image === "DefaultImage" ? (
            <Image
              src={DefaultImage}
              alt="image"
              height={30}
              width={30}
              className="rounded-full border-[1px]"
            />
          ) : !userData.image ? null : (
            <Image
              src={userData.image}
              alt="image"
              height={38}
              width={38}
              className="rounded-full border-[1px]"
            />
          )}
          <h1 className="text-black font-medium">
            {userData.name} {userData.surname}
          </h1>
        </Link>
        <div className="flex items-center gap-5 pr-1">
          <GiPhone
            size={24}
            color={"#0976F2"}
            className="-rotate-90 cursor-not-allowed"
          />
          <IoVideocam
            size={24}
            color={"#0976F2"}
            className="cursor-not-allowed"
          />
          {rightSide === "open" ? (
            <div
              onClick={() => {
                setStateRight("closed");
                setRightSide("closed");
              }}
            >
              <PiDotsThreeCircleFill
                size={20}
                color={"#0976F2"}
                className="cursor-pointer"
              />
            </div>
          ) : (
            <div
              onClick={() => {
                setStateRight("open");
                setRightSide("open");
              }}
            >
              <HiOutlineDotsHorizontal
                size={20}
                color={"#0976F2"}
                className="cursor-pointer"
              />
            </div>
          )}
        </div>
      </div>
      <div
        id="scroll-container"
        className="scroll-container flex-grow overflow-y-scroll hide-scrollbar"
      >
        <ChatSpace searchParams={searchParams} socket={socket} />
      </div>
      <div className="w-full flex items-center gap-4 px-4 pb-1">
        <div className="">
          <IoIosAddCircle
            size={22}
            color={"#0976F2"}
            className="cursor-not-allowed"
          />
        </div>
        <div
          className={`${
            input || images[0] ? "hidden" : ""
          } flex items-center gap-4`}
        >
          <label
            htmlFor="file-input"
            className="cursor-pointer"
            onClick={() => setFilePopupVisible(true)}
          >
            <FaRegImage size={18} color={"#0976F2"} />
          </label>
          {filePopupVisible && (
            <input
              id="file-input"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e: any) => {
                setSelectedFile(handleFileInputChange(e));
                setFilePopupVisible(false);
              }}
            />
          )}
          <BsStickyFill
            size={18}
            color={"#0976F2"}
            className="cursor-not-allowed"
          />
          <HiMiniGif
            size={22}
            color={"#0976F2"}
            className="cursor-not-allowed"
          />
        </div>
        <div className={`w-full ${images[0] ? "relative mt-[44px]" : null}`}>
          <div
            className={`w-full flex flex-col items-center ${
              images[0] ? "absolute bottom-1" : null
            }`}
          >
            <Images
              selectedImage={selectedFile}
              passImages={handleImages}
              resetImages={resetImages}
            />
            <div
              className={`flex items-center justify-center gap-1 w-full bg-[#F3F3F5] pl-3 pr-3 py-[6px] rounded-full ${
                images[0] ? "rounded-b-2xl rounded-t-none" : null
              }`}
            >
              <input
                type="text"
                placeholder="Aa"
                className="w-full bg-transparent outline-none text-black"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
              />
              <Emojis passEmoji={handleEmoji} />
            </div>
          </div>
        </div>
        {input || images[0] ? (
          <div
            onClick={() => {
              setInput("");
              setSelectedFile("");
              setResetImages([false]);
            }}
          >
            <SendMessage
              userData={userData}
              input={input}
              searchParams={searchParams}
              socket={socket}
              images={images}
            />
          </div>
        ) : (
          <div>
            <h1 className="text-xl cursor-pointer">😂</h1>
          </div>
        )}
      </div>
    </div>
  );
}
