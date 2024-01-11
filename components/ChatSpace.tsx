import React from "react";
import { StaticImageData } from "next/image";
import DefaultImage from "@/public/images/defaultmage.png";
import Messages from "./Messages";
import { useRouter } from "next/navigation";

interface UserData {
  name?: string;
  surname?: string;
  image?: string;
}

export default function ChatSpace({ socket, userData }: any) {
  const router = useRouter();

  return (
    <div className="scroll-container h-full w-full">
      <div className="pt-10 w-full flex flex-col gap-1 justify-center items-center">
        {userData.image === "DefaultImage" ? (
          <img
            src={(DefaultImage as StaticImageData).src}
            alt="image"
            height={60}
            width={60}
            className="rounded-full border-[1px]"
          />
        ) : !userData.image ? null : (
          <img
            src={userData.image}
            alt="image"
            height={60}
            width={60}
            className="rounded-full border-[1px]"
          />
        )}
        <h1 className="text-lg text-black font-semibold">
          {userData.name} {userData.surname}
        </h1>
      </div>
      <Messages userData={userData} socket={socket} />
    </div>
  );
}
