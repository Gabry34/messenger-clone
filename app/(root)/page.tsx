"use client";

import LateralNav from "@/components/LateralNav";
import Chat from "@/components/sections/Chat";
import People from "@/components/sections/People";
import Marketplace from "@/components/sections/Marketplace";
import Requests from "@/components/sections/Requests";
import Archive from "@/components/sections/Archive";
import MiddleChat from "@/components/MiddleChat";
import RightContainer from "@/components/RightContainer";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import PreferencesModal from "@/components/modals/PreferencesModal";
//up

export default function Home() {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState({});
  const [section, setSection] = useState("chat");
  const [rightSide, setRightSide] = useState("open");
  const router = useRouter();
  const socket = io("http://localhost:5000");

  if (status !== "loading") {
    if (!session) {
      router.push("/login");
    }
  }

  socket.on("get-data", () => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  });

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const handleSection = (data: any) => {
    setSection(data);
  };

  const handleRightSide = (data: string) => {
    setRightSide(data);
  };

  return (
    <main className="w-screen h-screen flex">
      {status === "loading" ? (
        <div className="w-screen h-screen flex items-center justify-center">
          <svg
            className="spinner-ring w-20 h-20"
            viewBox="25 25 50 50"
            strokeWidth="5"
          >
            <circle cx="50" cy="50" r="20" />
          </svg>
        </div>
      ) : (
        <div className="w-full max-h-screen flex overflow-y-scroll">
          <PreferencesModal socket={socket} />
          <div className="w-fit h-full flex">
            <LateralNav passSection={handleSection} socket={socket} />
            {section === "chat" ? (
              <Chat userData={userData} socket={socket} />
            ) : null}
            {section === "people" ? <People /> : null}
            {section === "marketplace" ? <Marketplace /> : null}
            {section === "requests" ? <Requests /> : null}
            {section === "archive" ? (
              <Archive userData={userData} socket={socket} />
            ) : null}
          </div>
          <div className="h-full w-full">
            <MiddleChat
              socket={socket}
              setStateRightSide={handleRightSide}
              userData={userData}
            />
          </div>
          <div
            className={`${
              rightSide === "closed" ? "hidden" : ""
            } min-w-[380px] border-l`}
          >
            <RightContainer userData={userData} />
          </div>
        </div>
      )}
    </main>
  );
}
