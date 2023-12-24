import React, { useEffect, useState } from "react";
import Image from "next/image";
import DefaultImage from "@/public/images/defaultmage.png";
import Messages from "./Messages";
import { useRouter } from "next/navigation";

interface UserData {
  name?: string;
  surname?: string;
  image?: string;
}

export default function ChatSpace({ searchParams, socket }: any) {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData>({});

  const getUserData = () => {
    if (searchParams.w === "y") {
      const storedUserData = localStorage.getItem("userData");
      if (storedUserData) {
        setUserData(JSON.parse(storedUserData));
      }
      router.push(
        `/?section=${searchParams.section}&rightSide=${searchParams.rightSide}&w=n`
      );
    }
  };

  useEffect(() => {
    getUserData();
  }, [searchParams, router]);

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="scroll-container h-full w-full">
      <div className="pt-10 w-full flex flex-col gap-1 justify-center items-center">
        {userData.image === "DefaultImage" ? (
          <Image
            src={DefaultImage}
            alt="image"
            height={60}
            width={60}
            className="rounded-full border-[1px]"
          />
        ) : !userData.image ? null : (
          <Image
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
