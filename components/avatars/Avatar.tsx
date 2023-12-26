"use client";

import React, { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import PreferencesModal from "../modals/PreferencesModal";
import DefaultImage from "@/public/images/defaultmage.png";
import { BsGearFill } from "react-icons/bs";
import { MdDoNotDisturbOff } from "react-icons/md";
import { PiLockKeyFill } from "react-icons/pi";
import { IoMdHelpCircle } from "react-icons/io";
import { MdReportProblem } from "react-icons/md";
import { VscListSelection } from "react-icons/vsc";
import { FaFacebookMessenger } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import Link from "next/link";

export default function Avatar({ expand, socket }: any) {
  const { data: session } = useSession();
  const [image, setImage] = useState("");

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const res = await fetch(
          "https://messenger-clone-peach-two.vercel.app/api/userInfo",
          {
            cache: "no-store",
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch userInfo");
        }

        const data = await res.json();
        const userInfos = data.userInfo;
        const userInfo = userInfos.find(
          (t: any) => t.email === session?.user?.email
        );

        if (userInfo) {
          setImage(userInfo.image);
        }
      } catch (error) {
        console.log("Error loading userInfos: ", error);
      }
    };

    getUserInfo();
  }, [session]);

  // Check if the image URL is available before rendering the Image component
  return (
    <div className="popover w-full flex items-center p-0 m-0">
      <label
        className="popover-trigger w-full flex justify-center mt-2 btn-solid-primary bg-transparent hover:bg-transparent"
        tabIndex={0}
      >
        {image === "DefaultImage" ? (
          <Image
            src={DefaultImage}
            alt="image"
            height={32}
            width={32}
            className="rounded-full border-[1px] border-[#BCBFC4] cursor-pointer opacity-90 hover:opacity-100"
          />
        ) : (
          <Image
            src={image}
            alt="image"
            height={34}
            width={34}
            className="rounded-full border-[1px] border-[#BCBFC4] cursor-pointer opacity-90 hover:opacity-100"
          />
        )}
      </label>
      <div
        className={`popover-content popover-top-right custom-shadow shadow-2xl mb-1 w-[350px] absolute bg-white ${
          expand ? "left-[6px]" : "left-8"
        }`}
      >
        <div className="popover-arrow bg-white rounded-br-sm"></div>
        <div className="w-full">
          <div
            className="w-full flex items-center gap-3 p-2 rounded-md cursor-pointer hover:bg-[#F9F9F9]"
            onClick={() => {
              socket.emit("open-preferences-modal");
            }}
          >
            <div className="p-2 rounded-full bg-[#F5F5F5]">
              <BsGearFill color={"black"} size={14} />
            </div>
            <h1 className="text-md font-semibold text-black">Preferences</h1>
          </div>

          <div className="px-2 my-1 w-full h-[1px]">
            <div className="w-full h-full bg-gray-200"></div>
          </div>

          <div className="w-full flex items-center gap-3 p-2 rounded-md cursor-not-allowed hover:bg-[#F9F9F9]">
            <div className="p-2 rounded-full bg-[#F5F5F5]">
              <MdDoNotDisturbOff color={"black"} size={14} />
            </div>
            <h1 className="text-md font-semibold text-black">
              Restricted accounts
            </h1>
          </div>

          <div className="px-2 my-1 w-full h-[1px]">
            <div className="w-full h-full bg-gray-200"></div>
          </div>

          <div className="w-full flex items-center gap-3 p-2 rounded-md cursor-not-allowed hover:bg-[#F9F9F9]">
            <div className="p-2 rounded-full bg-[#F5F5F5]">
              <PiLockKeyFill color={"black"} size={14} />
            </div>
            <h1 className="text-md font-semibold text-black">
              Privacy & safety
            </h1>
          </div>

          <div className="px-2 my-1 w-full h-[1px]">
            <div className="w-full h-full bg-gray-200"></div>
          </div>

          <Link
            className="w-full flex items-center gap-3 p-2 rounded-md cursor-pointer hover:bg-[#F9F9F9]"
            href="https://www.messenger.com/help/messenger-app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="p-2 rounded-full bg-[#F5F5F5]">
              <IoMdHelpCircle color={"black"} size={14} />
            </div>
            <h1 className="text-md font-semibold text-black">Help</h1>
          </Link>

          <div className="w-full flex items-center gap-3 p-2 rounded-md cursor-not-allowed hover:bg-[#F9F9F9]">
            <div className="p-2 rounded-full bg-[#F5F5F5]">
              <MdReportProblem color={"black"} size={14} />
            </div>
            <h1 className="text-md font-semibold text-black">
              Report a problem
            </h1>
          </div>

          <div className="px-2 my-1 w-full h-[1px]">
            <div className="w-full h-full bg-gray-200"></div>
          </div>

          <Link
            className="w-full flex items-center gap-3 p-2 rounded-md cursor-pointer hover:bg-[#F9F9F9]"
            href="https://www.facebook.com/policies_center/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="p-2 rounded-full bg-[#F5F5F5]">
              <VscListSelection color={"black"} size={14} />
            </div>
            <h1 className="text-md font-semibold text-black">Terms</h1>
          </Link>

          <Link
            className="w-full flex items-center gap-3 p-2 rounded-md cursor-pointer hover:bg-[#F9F9F9]"
            href="https://www.facebook.com/privacy/policy?entry_point=messenger_settings"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="p-2 rounded-full bg-[#F5F5F5]">
              <VscListSelection color={"black"} size={14} />
            </div>
            <h1 className="text-md font-semibold text-black">Privacy Policy</h1>
          </Link>

          <div className="w-full flex items-center gap-3 p-2 rounded-md cursor-not-allowed hover:bg-[#F9F9F9]">
            <div className="p-2 rounded-full bg-[#F5F5F5]">
              <BsGearFill color={"black"} size={14} />
            </div>
            <h1 className="text-md font-semibold text-black">
              Cookie settings
            </h1>
          </div>

          <div className="px-2 my-1 w-full h-[1px]">
            <div className="w-full h-full bg-gray-200"></div>
          </div>

          <Link
            className="w-full flex items-center gap-3 p-2 rounded-md cursor-pointer hover:bg-[#F9F9F9]"
            href="https://www.messenger.com/desktop/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="p-2 rounded-full bg-[#F5F5F5]">
              <FaFacebookMessenger color={"black"} size={14} />
            </div>
            <h1 className="font-medium text-black">
              Try Messenger for Windows
            </h1>
          </Link>

          <div
            className="w-full flex items-center gap-3 p-2 rounded-md cursor-pointer hover:bg-[#F9F9F9]"
            onClick={() => {
              signOut();
            }}
          >
            <div className="p-2 rounded-full bg-[#F5F5F5]">
              <TbLogout color={"black"} size={14} />
            </div>
            <h1 className="font-medium text-black">Log out</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
