import React, { useState } from "react";
import Avatar from "./avatars/Avatar";
import { TbMessageCircle2Filled } from "react-icons/tb";
import { IoPeople } from "react-icons/io5";
import { HiMiniBuildingStorefront } from "react-icons/hi2";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { BsFillArchiveFill } from "react-icons/bs";
import {
  TbLayoutSidebarLeftExpandFilled,
  TbLayoutSidebarRightExpandFilled,
} from "react-icons/tb";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface LateralNavProps {
  searchParams: any;
}

export default function LateralNav({ searchParams, passSection }: any) {
  const [expand, setExpand] = useState(false);
  const { data: session } = useSession();

  const setSection = (section: string) => {
    passSection(section);
  };
  return (
    <div
      className={`h-full border-r flex flex-col justify-between py-3 ${
        expand ? "w-[250px] items-start px-2" : "w-[60px] items-center"
      }`}
    >
      <div className={`flex flex-col ${expand ? "w-full" : ""}`}>
        <Link
          className={`p-[10px] rounded-lg flex items-center gap-3 ${
            searchParams.section === "chat" ? "bg-[#F5F5F5]" : "bg-white"
          } ${
            expand ? "min-w-full justify-start" : "justify-center"
          } hover:bg-[#F5F5F5]`}
          href={{
            query: {
              section: "chat",
              rightSide: searchParams.rightSide,
            },
          }}
          onClick={() => {
            setSection("chat");
          }}
        >
          <TbMessageCircle2Filled
            size={21}
            color={searchParams.section === "chat" ? "black" : "#65676B"}
          />
          {expand ? <h1 className="text-black font-medium">Chat</h1> : null}
        </Link>
        <Link
          className={`p-[10px] rounded-lg flex items-center gap-3 ${
            searchParams.section === "people" ? "bg-[#F5F5F5]" : "bg-white"
          } ${
            expand ? "min-w-full justify-start" : "justify-center"
          } hover:bg-[#F5F5F5]`}
          href={{
            query: {
              section: "people",
              rightSide: searchParams.rightSide,
            },
          }}
          onClick={() => {
            setSection("people");
          }}
        >
          <IoPeople
            size={23}
            color={searchParams.section === "people" ? "black" : "#65676B"}
          />
          {expand ? <h1 className="text-black font-medium">People</h1> : null}
        </Link>
        <Link
          className={`p-[10px] rounded-lg flex items-center gap-3 ${
            searchParams.section === "marketplace" ? "bg-[#F5F5F5]" : "bg-white"
          } ${
            expand ? "min-w-full justify-start" : "justify-center"
          } hover:bg-[#F5F5F5]`}
          href={{
            query: {
              section: "marketplace",
              rightSide: searchParams.rightSide,
            },
          }}
          onClick={() => {
            setSection("marketplace");
          }}
        >
          <HiMiniBuildingStorefront
            size={20}
            color={searchParams.section === "marketplace" ? "black" : "#65676B"}
          />
          {expand ? (
            <h1 className="text-black font-medium">Marketplace</h1>
          ) : null}
        </Link>
        <Link
          className={`p-[10px] rounded-lg flex items-center gap-3 ${
            searchParams.section === "requests" ? "bg-[#F5F5F5]" : "bg-white"
          } ${
            expand ? "min-w-full justify-start" : "justify-center"
          } hover:bg-[#F5F5F5]`}
          href={{
            query: {
              section: "requests",
              rightSide: searchParams.rightSide,
            },
          }}
          onClick={() => {
            setSection("requests");
          }}
        >
          <IoChatbubbleEllipsesSharp
            size={20}
            color={searchParams.section === "requests" ? "black" : "#65676B"}
          />
          {expand ? <h1 className="text-black font-medium">Requests</h1> : null}
        </Link>
        <Link
          className={`p-[10px] rounded-lg flex items-center gap-3 ${
            searchParams.section === "archive" ? "bg-[#F5F5F5]" : "bg-white"
          } ${
            expand ? "min-w-full justify-start" : "justify-center"
          } hover:bg-[#F5F5F5]`}
          href={{
            query: {
              section: "archive",
              rightSide: searchParams.rightSide,
            },
          }}
          onClick={() => {
            setSection("archive");
          }}
        >
          <BsFillArchiveFill
            size={18}
            color={searchParams.section === "archive" ? "black" : "#65676B"}
          />
          {expand ? <h1 className="text-black font-medium">Archive</h1> : null}
        </Link>
      </div>
      <div
        className={`w-full flex gap-2 items-center ${
          expand ? "flex-row justify-between px-2" : "flex-col"
        }`}
      >
        <div
          className={`flex gap-2 justify-center items-center font-medium ${
            expand ? "w-fit" : "w-full"
          }`}
        >
          <Avatar expand={expand} />
          {expand ? (
            <h1 className="text-black mt-1">
              {session?.user?.name?.split(" ")[0]}
            </h1>
          ) : null}
        </div>
        {expand ? (
          <div className="p-[6px] bg-[#F5F5F5] rounded-full flex justify-center items-center">
            <TbLayoutSidebarRightExpandFilled
              size={24}
              color={"black"}
              className="cursor-pointer"
              onClick={() => {
                setExpand(false);
              }}
            />
          </div>
        ) : (
          <div className="p-[6px] bg-[#F5F5F5] rounded-full flex justify-center items-center">
            <TbLayoutSidebarLeftExpandFilled
              size={24}
              color={"black"}
              className="cursor-pointer"
              onClick={() => {
                setExpand(true);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
