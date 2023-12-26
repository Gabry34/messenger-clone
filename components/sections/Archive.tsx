import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import ChatterAvatar from "../avatars/ChatterAvatar";

interface Chat {
  _id: string;
  participants: object;
  messages: any;
  email1: string;
  email2: string;
}

export default function Marketplace({ userData, socket }: any) {
  const { data: session } = useSession();
  const [chats, setChats] = useState<Chat[]>([]);
  const [archived, setArchived] = useState<string[]>([]);

  const getChats = async () => {
    try {
      const res = await fetch(
        "messenger-clone-n60evtay3-gabry34.vercel.app/api/message",
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

  const getArchivedChats = async () => {
    try {
      const res = await fetch(
        "messenger-clone-n60evtay3-gabry34.vercel.app/api/userInfo",
        {
          cache: "no-store",
        }
      );

      const data = await res.json();
      const userInfos = data.userInfo;
      const userInfo = userInfos.find(
        (t: any) => t.email === session?.user?.email
      );

      if (userInfo) {
        setArchived(userInfo.archived);
      }

      if (!res.ok) {
        throw new Error("Failed to fetch userInfo");
      }
    } catch (error) {
      console.log("Error loading userInfos: ", error);
    }
  };

  useEffect(() => {
    getChats();
    getArchivedChats();
  }, []);

  return (
    <div className="h-full w-[360px] border-r flex flex-col">
      <h1 className="text-black text-2xl font-bold pl-4 py-3">
        Archived chats
      </h1>
      <div className="scroll-container h-full w-full px-2 flex overflow-y-scroll">
        {archived[0] ? (
          <div className="w-full">
            {chats.map((chat) => (
              <div key={chat._id} className="w-full">
                {archived.includes(chat._id) ? (
                  <div className="w-full">
                    <ChatterAvatar
                      participants={chat.participants}
                      lastMessage={
                        chat.messages.length > 0
                          ? chat.messages[chat.messages.length - 1].message ||
                            ""
                          : ""
                      }
                      chatId={chat._id}
                      isArchived={true}
                      userData={userData}
                      socket={socket}
                    />
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <h1 className="text-lg text-black">No message found.</h1>
          </div>
        )}
      </div>
    </div>
  );
}
