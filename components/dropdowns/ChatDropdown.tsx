import React, { useState } from "react";
import ArchiveChat from "../buttons/ArchiveChat";
import DeleteChat from "../buttons/DeleteChat";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { IoMdPerson } from "react-icons/io";
import { HiPhone } from "react-icons/hi2";
import { FaVideo } from "react-icons/fa6";
import Link from "next/link";

export default function ChatDropdown({ chatId, isArchived, userData }: any) {
  return (
    <div className="border-2 bg-white rounded-full p-[8px] py-[3px] hover:bg-[#F5F5F5]">
      <div className="popover">
        <label
          className="popover-trigger btn btn-solid-primary bg-transparent p-0 m-0 h-fit hover:bg-transparent"
          tabIndex={0}
        >
          <HiOutlineDotsHorizontal size={14} color={"gray"} />
        </label>
        <div
          className="popover-content with-shadow mt-4 bg-white w-[320px] cursor-default"
          tabIndex={0}
        >
          <div className="popover-arrow bg-white"></div>
          <div className="flex flex-col items-center">
            <Link
              className="w-full flex items-center gap-3 p-2 rounded-md cursor-pointer hover:bg-[#F9F9F9]"
              href={`https://www.facebook.com/search/top?q=${userData.name} ${userData.surname}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="p-2 rounded-full bg-[#F5F5F5]">
                <IoMdPerson color={"black"} size={18} />
              </div>
              <h1 className="text-md font-semibold text-black">View profile</h1>
            </Link>

            <div className="px-2 my-1 w-full h-[1px]">
              <div className="w-full h-full bg-gray-200"></div>
            </div>

            <div className="w-full flex items-center gap-3 p-2 rounded-md cursor-not-allowed hover:bg-[#F9F9F9]">
              <div className="p-2 rounded-full bg-[#F5F5F5]">
                <HiPhone color={"black"} size={18} />
              </div>
              <h1 className="text-md font-semibold text-black">Audio call</h1>
            </div>

            <div className="w-full flex items-center gap-3 p-2 rounded-md cursor-not-allowed hover:bg-[#F9F9F9]">
              <div className="p-2 rounded-full bg-[#F5F5F5]">
                <FaVideo color={"black"} size={18} />
              </div>
              <h1 className="text-md font-semibold text-black">Video chat</h1>
            </div>

            <div className="px-2 my-1 w-full h-[1px]">
              <div className="w-full h-full bg-gray-200"></div>
            </div>

            <ArchiveChat isArchived={isArchived} chatId={chatId} />

            <DeleteChat chatId={chatId} />
          </div>
        </div>
      </div>
    </div>
  );
}
