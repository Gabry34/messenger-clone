import { StaticImageData } from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ChatterAvatar from "../avatars/ChatterAvatar";
import { IoSearch } from "react-icons/io5";
import { MdInstallDesktop } from "react-icons/md";
import DefaultImage from "@/public/images/defaultmage.png";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { BsSearch } from "react-icons/bs";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FiEdit } from "react-icons/fi";

interface User {
  _id: string;
  name: string;
  surname: string;
  image: string;
  email: string;
}

interface Chat {
  _id: string;
  participants: {
    email1: string;
    email2: string;
  };
  messages: any;
  email1: string;
  email2: string;
}

export default function Chat({ socket, userData }: any) {
  const router = useRouter();
  const { data: session } = useSession();
  const [users, setUsers] = useState<User[]>([]);
  const [chats, setChats] = useState<Chat[]>([]);
  const [openSearch, setOpenSearch] = useState("closed");
  const [input, setInput] = useState("");
  const [archivedChats, setArchivedChats] = useState<string[]>([]);
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(typeof window !== "undefined" ? window.innerWidth : 0);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

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
      setUsers(userInfos);

      const archivedChats = userInfos.filter((user: any) => {
        return user.email === session?.user?.email;
      });
      setArchivedChats(archivedChats[0].archived);
    } catch (error) {
      console.log("Error loading userInfos: ", error);
    }
  };

  const getChats = async () => {
    try {
      const res = await fetch(
        "https://messenger-clone-peach-two.vercel.app/api/message",
        {
          cache: "no-store",
        }
      );
      if (!res.ok) {
        throw new Error("Failed to fetch userInfo");
      }
      const data = await res.json();
      const chats = data.chats;
      setChats(chats);
    } catch (error) {
      console.log("Error loading userInfos: ", error);
    }
  };

  useEffect(() => {
    getUserInfo();
    getChats();
  }, []);

  socket.on("refresh", () => {
    setTimeout(() => {
      getUserInfo();
      getChats();
    }, 2000);
  });

  const filteredPeople = users.filter((user) => {
    if (!input) {
      return false;
    }
    const fullName = `${user.name} ${user.surname}`;
    if (user.email === session?.user?.email) {
      return false;
    } else {
      return fullName.includes(input);
    }
  });
  return (
    <div className="h-full w-[360px] flex flex-col border-r pt-3 lg:w-[80px]">
      <div className="px-2">
        <div className="flex justify-between items-center pb-3 lg:hidden">
          <h1 className="text-black text-2xl font-bold pl-5">Chat</h1>
          <div className="flex justify-center items-center rounded-full bg-[#F5F5F5] p-2 mr-2 cursor-not-allowed">
            <FiEdit color={"black"} size={20} />
          </div>
        </div>

        <div className="flex items-center gap-1">
          {openSearch === "open" ? (
            <div
              className="flex items-center justify-center p-[9px] cursor-pointer rounded-full hover:bg-[#F3F3F5]"
              onClick={() => {
                setOpenSearch("closed");
              }}
            >
              <HiOutlineArrowLeft color={"#65676B"} size={19} />
            </div>
          ) : null}
          <div className="w-full flex items-center gap-1 bg-[#F3F3F5] px-3 py-[6px] mx-2 rounded-full">
            <IoSearch size={21} color={"#C2C2C4"} />
            <input
              type="text"
              placeholder={windowWidth > 900 ? `Search Messenger` : ""}
              className="bg-transparent outline-none text-black"
              value={input}
              onClick={() => {
                setOpenSearch("open");
              }}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
      <div className="scroll-container w-full h-full overflow-y-scroll mt-1 px-2 lg:overflow-y-hidden">
        {openSearch === "open" ? (
          <div>
            {input ? (
              <>
                <div className="flex items-center gap-4 px-3 py-[12px] rounded-lg cursor-pointer hover:bg-[#F3F3F5]">
                  <BsSearch size={24} color={"black"} />
                  <h1 className="text-black text-[15px]">
                    Search messages for {input}
                  </h1>
                </div>
                <h1 className="pl-2 pb-1 text-[#6E7074] font-bold">
                  Suggested
                </h1>
              </>
            ) : null}
            {filteredPeople.map((user) => (
              <div
                key={user._id}
                className="flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-[#F3F3F5]"
                onClick={() => {
                  localStorage.setItem(
                    "userData",
                    JSON.stringify({
                      id: user._id,
                      name: user.name,
                      surname: user.surname,
                      email: user.email,
                      image: user.image,
                    })
                  );

                  setInput("");
                  setOpenSearch("closed");

                  socket.emit("get-user-data", 100);
                }}
              >
                {user.image === "DefaultImage" ? (
                  <img
                    src={(DefaultImage as StaticImageData).src}
                    alt="image"
                    height={34}
                    width={34}
                    className="rounded-full border-[1px] border-[#BCBFC4] cursor-pointer opacity-90 hover:opacity-100"
                  />
                ) : (
                  <img
                    src={user.image}
                    alt="image"
                    height={34}
                    width={34}
                    className="rounded-full border-[1px] border-[#BCBFC4] cursor-pointer opacity-90 hover:opacity-100"
                  />
                )}
                <h1 className="text-black">
                  {user.name} {user.surname}
                </h1>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-2">
            {chats.map((chat) => (
              <div key={chat._id}>
                {chat.participants.email1 === session?.user?.email ||
                chat.participants.email2 === session?.user?.email ? (
                  <div>
                    {!archivedChats.includes(chat._id) ? (
                      <div>
                        <ChatterAvatar
                          participants={chat.participants}
                          lastMessage={
                            chat.messages.length > 0
                              ? chat.messages[chat.messages.length - 1]
                                  .message || ""
                              : ""
                          }
                          messageDeleted={
                            chat.messages.length > 0
                              ? chat.messages[chat.messages.length - 1]
                                  .deleted || false
                              : false
                          }
                          chatId={chat._id}
                          isArchived={false}
                          userData={userData}
                          socket={socket}
                        />
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="h-[60px] w-full flex justify-center items-center border-t p-[10px]">
        <Link
          className="flex items-center justify-center gap-2 w-full h-full rounded-md hover:bg-[#F3F3F5]"
          href="https://www.messenger.com/desktop/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <MdInstallDesktop size={20} color={"black"} />
          <h1 className="text-black text-[15px] font-semibold lg:hidden">
            Try Messenger for Windows
          </h1>
        </Link>
      </div>
    </div>
  );
}
