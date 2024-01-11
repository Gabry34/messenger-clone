import Image from "next/image";
import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { RiRadioButtonLine } from "react-icons/ri";
import { HiSpeakerWave } from "react-icons/hi2";
import { useSession } from "next-auth/react";
import { RiMoneyDollarBoxFill } from "react-icons/ri";
import { BiMailSend } from "react-icons/bi";
import { AiFillStop } from "react-icons/ai";
import Link from "next/link";

export default function PreferencesModal({ socket }: any) {
  const { data: session } = useSession();
  const [openModal, setOpenModal] = useState(false);

  socket.on("open-modal", () => {
    setOpenModal(true);
  });

  return (
    <div>
      {openModal && (
        <div className="absolute w-full h-full flex justify-center items-center bg-gray-100 bg-opacity-70 z-50">
          <div className="w-[560px] h-[530px] flex flex-col shadow-2xl bg-white rounded-xl">
            <div className="w-full grid grid-cols-3 py-4 px-4">
              <div></div>
              <div className="w-full flex justify-center items-center">
                <h1 className="text-black font-medium text-lg">Preferences</h1>
              </div>
              <div className="w-full flex items-center justify-end">
                <div
                  className="flex justify-center items-center p-2 bg-[#F5F5F5] rounded-full cursor-pointer"
                  onClick={() => {
                    setOpenModal(false);
                  }}
                >
                  <RxCross2 size={18} color={"black"} />
                </div>
              </div>
            </div>

            <div className="border-b mx-3 pt-2 flex flex-col gap-1">
              <h1 className="text-black font-medium pl-2">Account</h1>
              <div className="w-full flex items-center gap-2 px-2 py-2 rounded-md cursor-pointer hover:bg-[#F5F5F5]">
                <img
                  src={session?.user?.image as string}
                  alt="profile image"
                  width={58}
                  height={58}
                  className="rounded-full"
                />
                <Link
                  href={`https://www.facebook.com/search/top?q=${session?.user?.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col"
                >
                  <h1 className="text-black font-medium">
                    {session?.user?.name}
                  </h1>
                  <p className="text-sm text-black opacity-70">
                    See your profile
                  </p>
                </Link>
              </div>
            </div>

            <div className="border-b mx-3 pb-3">
              <div className="flex items-center gap-2 w-full p-2 rounded-md cursor-not-allowed hover:bg-[#F5F5F5]">
                <div className="w-fit flex justify-center items-center p-2 rounded-full bg-[#F5F5F5]">
                  <RiRadioButtonLine size={20} color={"black"} />
                </div>
                <h1 className="text-black font-medium">Active Status: ON</h1>
              </div>
            </div>

            <div className="border-b mx-3 py-2 px-2">
              <h1 className="text-black font-medium">Notifications</h1>
              <div className="flex items-center gap-2 pt-3 pb-3">
                <div className="w-fit flex justify-center items-center p-2 rounded-full bg-[#F5F5F5]">
                  <HiSpeakerWave size={20} color={"black"} />
                </div>
                <div>
                  <h1 className="text-black font-medium">
                    Notification sounds
                  </h1>
                  <p className="text-sm text-black leading-[15px]">
                    Use sounds to notify you about incoming messages, calls,
                    video chats, and in-app sounds.
                  </p>
                </div>
              </div>
              <div></div>
            </div>

            <div className="w-full px-3">
              <div className="flex items-center gap-2 w-full p-2 rounded-md cursor-not-allowed hover:bg-[#F5F5F5]">
                <div className="w-fit flex justify-center items-center p-2 rounded-full bg-[#F5F5F5]">
                  <RiMoneyDollarBoxFill size={20} color={"black"} />
                </div>
                <h1 className="text-black font-medium">Manage payments</h1>
              </div>
              <div className="flex items-center gap-2 w-full p-2 rounded-md cursor-not-allowed hover:bg-[#F5F5F5]">
                <div className="w-fit flex justify-center items-center p-2 rounded-full bg-[#F5F5F5]">
                  <BiMailSend size={20} color={"black"} />
                </div>
                <h1 className="text-black font-medium">
                  Manage message delivery
                </h1>
              </div>
              <div className="flex items-center gap-2 w-full p-2 rounded-md cursor-not-allowed hover:bg-[#F5F5F5]">
                <div className="w-fit flex justify-center items-center p-2 rounded-full bg-[#F5F5F5]">
                  <AiFillStop
                    size={20}
                    color={"black"}
                    className="-rotate-45"
                  />
                </div>
                <h1 className="text-black font-medium">Manage blocking</h1>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
