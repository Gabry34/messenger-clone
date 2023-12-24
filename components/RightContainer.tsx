import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ImSearch } from "react-icons/im";
import { FaFacebook } from "react-icons/fa";
import { GoChevronRight, GoChevronDown } from "react-icons/go";
import { IoImagesSharp } from "react-icons/io5";
import { FaFileLines } from "react-icons/fa6";
import { FaLink } from "react-icons/fa6";
import { AiFillStop } from "react-icons/ai";
import { MdDoNotDisturbOff } from "react-icons/md";
import { MdReportProblem } from "react-icons/md";
import Link from "next/link";

interface UserData {
  name: string;
  surname: string;
  image?: string | null;
}

export default function RightContainer({ searchParams }: any) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [openMedia, setOpenMedia] = useState(false);
  const [openSupport, setOpenSupport] = useState(false);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, [searchParams]);

  return (
    <div className="w-full h-full flex flex-col gap-5">
      <div className="pt-4 w-full flex flex-col gap-1 justify-center items-center">
        {userData && userData.image === "DefaultImage" ? (
          <Image
            src="/images/defaultImage.png"
            alt="image"
            height={70}
            width={70}
            className="rounded-full border-[1px]"
          />
        ) : null}
        {userData && (
          <h1 className="text-lg text-black font-semibold">
            {userData.name} {userData.surname}
          </h1>
        )}
      </div>

      <div className="w-full flex gap-8 justify-center items-center">
        {userData && (
          <Link
            className="cursor-pointer"
            href={`https://www.facebook.com/search/top?q=${userData.name} ${userData.surname}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="p-[10px] bg-[#F5F5F5] rounded-full flex justify-center items-center hover:bg-[#F1F1F1]">
              <FaFacebook color={"black"} size={18} />
            </div>
            <h1 className="text-black text-sm">Profile</h1>
          </Link>
        )}
        <div className="cursor-pointer">
          <div className="p-[10px] bg-[#F5F5F5] rounded-full flex justify-center items-center hover:bg-[#F1F1F1]">
            <ImSearch color={"black"} size={18} />
          </div>
          <h1 className="text-black text-sm">Search</h1>
        </div>
      </div>

      <div className="w-full px-2">
        <div
          className="w-full flex justify-between items-center px-2 py-3 rounded-md cursor-pointer hover:bg-[#F5F5F5]"
          onClick={() => {
            setOpenMedia(!openMedia);
          }}
        >
          <h1 className="text-black text-[15px] font-semibold select-none">
            Media, files and links
          </h1>
          {openMedia ? (
            <GoChevronDown color={"black"} size={22} />
          ) : (
            <GoChevronRight color={"black"} size={22} />
          )}
        </div>
        {openMedia ? (
          <div className="w-full">
            <div className="w-full flex items-center gap-2 py-2 px-2 rounded-md cursor-pointer hover:bg-[#F5F5F5] select-none">
              <div className="flex justify-center items-center p-2 rounded-full bg-[#F5F5F5]">
                <IoImagesSharp color={"black"} size={16} />
              </div>
              <h1 className="text-black text-[15px] font-semibold">Media</h1>
            </div>
            <div className="w-full flex items-center gap-2 py-2 px-2 rounded-md cursor-pointer hover:bg-[#F5F5F5] select-none">
              <div className="flex justify-center items-center p-2 rounded-full bg-[#F5F5F5]">
                <FaFileLines color={"black"} size={16} />
              </div>
              <h1 className="text-black text-[15px] font-semibold">Files</h1>
            </div>
            <div className="w-full flex items-center gap-2 py-2 px-2 rounded-md cursor-pointer hover:bg-[#F5F5F5] select-none">
              <div className="flex justify-center items-center p-2 rounded-full bg-[#F5F5F5]">
                <FaLink color={"black"} size={16} />
              </div>
              <h1 className="text-black text-[15px] font-semibold">Links</h1>
            </div>
          </div>
        ) : null}
        <div
          className="w-full flex justify-between items-center px-2 py-3 rounded-md cursor-pointer hover:bg-[#F5F5F5]"
          onClick={() => {
            setOpenSupport(!openSupport);
          }}
        >
          <h1 className="text-black text-[15px] font-semibold select-none">
            Privacy & support
          </h1>
          {openSupport ? (
            <GoChevronDown color={"black"} size={22} />
          ) : (
            <GoChevronRight color={"black"} size={22} />
          )}
        </div>
        {openSupport ? (
          <div className="w-full">
            <div className="w-full flex items-center gap-2 py-2 px-2 rounded-md cursor-pointer hover:bg-[#F5F5F5] select-none">
              <div className="flex justify-center items-center p-2 rounded-full bg-[#F5F5F5]">
                <MdDoNotDisturbOff color={"black"} size={16} />
              </div>
              <h1 className="text-black text-[15px] font-semibold">Restrict</h1>
            </div>
            <div className="w-full flex items-center gap-2 py-2 px-2 rounded-md cursor-pointer hover:bg-[#F5F5F5] select-none">
              <div className="flex justify-center items-center p-2 rounded-full bg-[#F5F5F5]">
                <AiFillStop color={"black"} size={16} className="-rotate-45" />
              </div>
              <h1 className="text-black text-[15px] font-semibold">Block</h1>
            </div>
            <div className="w-full flex items-center gap-2 py-1 px-2 rounded-md cursor-pointer hover:bg-[#F5F5F5] select-none">
              <div className="flex justify-center items-center p-2 rounded-full bg-[#F5F5F5]">
                <MdReportProblem color={"black"} size={16} />
              </div>
              <div className="flex flex-col">
                <h1 className="text-black text-[15px] font-semibold">Report</h1>
                <h1 className=" text-gray-500 text-[13px]">
                  Give feedback and report the conversation
                </h1>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
