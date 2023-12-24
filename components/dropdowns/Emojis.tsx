import React, { useEffect, useState } from "react";
import emojis from "@/data/emojis.json";
import { IoMdSearch } from "react-icons/io";
import { BsFillEmojiSmileFill } from "react-icons/bs";
import { PiCatFill } from "react-icons/pi";
import { MdOutlineRestaurant } from "react-icons/md";
import { IoIosTennisball } from "react-icons/io";
import { FaCarAlt } from "react-icons/fa";
import { HiMiniLightBulb } from "react-icons/hi2";
import { RiShapesFill } from "react-icons/ri";
import { FaFlag } from "react-icons/fa6";
import Link from "next/link";

export default function Emojis({ passEmoji }: any) {
  const [group, setGroup] = useState("smile");
  const [selEmoji, setSelEmoji] = useState("");
  const [input, setInput] = useState("");

  useEffect(() => {
    passEmoji(selEmoji);
  }, [selEmoji]);

  return (
    <div className="popover">
      <label className="popover-trigger cursor-pointer text-md" tabIndex={0}>
        😄
      </label>
      <div
        className="popover-content popover-top-left with-shadow w-[320px] h-[320px] -mr-4 mb-4 p-0 bg-white"
        tabIndex={0}
      >
        <div className="popover-arrow bg-white"></div>
        <div className="flex flex-col items-center pt-0.5 h-full">
          <div className="w-full flex justify-center items-center px-2 pt-2 pb-1">
            <div className="w-full flex items-center gap-1 bg-[#F3F3F5] py-1 px-2 rounded-full">
              <IoMdSearch size={28} color={"#C2C2C4"} />
              <input
                type="text"
                placeholder="Search Emoji"
                className="w-full outline-none bg-transparent text-black"
                onChange={(e) => {
                  setInput(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="flex-grow w-full h-full overflow-y-scroll hide-scrollbar px-1">
            {emojis.map((group) => (
              <div
                key={group.slug}
                className={`${input ? "" : "pb-3"}`}
                id={group.slug}
              >
                <h1
                  className={`text-[#A6A7A9] px-1 text-sm ${
                    input ? "hidden" : ""
                  }`}
                >
                  {group.name}
                </h1>
                <div className="max-w-full flex-wrap">
                  {group.emojis.map((emoji) => (
                    <span
                      key={emoji.slug}
                      className="text-2xl cursor-pointer select-none"
                      draggable={false}
                      onClick={() => {
                        setSelEmoji(emoji.emoji);
                      }}
                    >
                      {emoji.name.includes(input) || !input
                        ? emoji.emoji
                        : null}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="w-full border-t py-1 flex items-center justify-around">
            <Link
              className="w-fit p-2.5 flex justify-center items-center cursor-pointer rounded-full hover:bg-[#F5F5F5]"
              href="#smileys_emotion"
              onClick={() => setGroup("smile")}
            >
              <BsFillEmojiSmileFill
                size={13}
                color={group === "smile" ? "#0A7CFF" : "#65676B"}
              />
            </Link>
            <Link
              href="#animals_nature"
              className="w-fit p-2.5 flex justify-center items-center cursor-pointer rounded-full hover:bg-[#F5F5F5]"
              onClick={() => setGroup("animals")}
            >
              <PiCatFill
                size={13}
                color={group === "animals" ? "#0A7CFF" : "#65676B"}
              />
            </Link>
            <Link
              className="w-fit p-2.5 flex justify-center items-center cursor-pointer rounded-full hover:bg-[#F5F5F5]"
              href="#food_drink"
              onClick={() => setGroup("foods")}
            >
              <MdOutlineRestaurant
                size={13}
                color={group === "foods" ? "#0A7CFF" : "#65676B"}
              />
            </Link>
            <Link
              className="w-fit p-2.5 flex justify-center items-center cursor-pointer rounded-full hover:bg-[#F5F5F5]"
              href="#activities"
              onClick={() => setGroup("activities")}
            >
              <IoIosTennisball
                size={13}
                color={group === "activities" ? "#0A7CFF" : "#65676B"}
              />
            </Link>
            <Link
              className="w-fit p-2.5 flex justify-center items-center cursor-pointer rounded-full hover:bg-[#F5F5F5]"
              href="#travel_places"
              onClick={() => setGroup("travels")}
            >
              <FaCarAlt
                size={13}
                color={group === "travels" ? "#0A7CFF" : "#65676B"}
              />
            </Link>
            <Link
              className="w-fit p-2.5 flex justify-center items-center cursor-pointer rounded-full hover:bg-[#F5F5F5]"
              href="#objects"
              onClick={() => setGroup("objects")}
            >
              <HiMiniLightBulb
                size={13}
                color={group === "objects" ? "#0A7CFF" : "#65676B"}
              />
            </Link>
            <Link
              className="w-fit p-2.5 flex justify-center items-center cursor-pointer rounded-full hover:bg-[#F5F5F5]"
              href="#symbols"
              onClick={() => setGroup("simbols")}
            >
              <RiShapesFill
                size={13}
                color={group === "simbols" ? "#0A7CFF" : "#65676B"}
              />
            </Link>
            <Link
              className="w-fit p-2.5 flex justify-center items-center cursor-pointer rounded-full hover:bg-[#F5F5F5]"
              href="#flags"
              onClick={() => setGroup("flags")}
            >
              <FaFlag
                size={13}
                color={group === "flags" ? "#0A7CFF" : "#65676B"}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
