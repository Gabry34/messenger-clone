import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import DeleteMessage from "./buttons/DeleteMessage";

interface Messages {
  _id: string;
  by: string;
  time: string;
  images: any;
  message: string;
  deleted: boolean;
}

export default function Messages({ userData, socket }: any) {
  const { data: session } = useSession();
  const [messages, setMessages] = useState([]);
  const [chatId, setChatId] = useState("");
  const [isHovered, setIsHovered] = useState("a");

  const getChat = async () => {
    try {
      const res = await fetch(
        "https://messenger-clone-peach-two.vercel.app/api/message",
        {
          cache: "no-store",
        }
      );
      if (!res.ok) {
        throw new Error("Failed to fetch Chats");
      }
      const data = await res.json();
      const chats = data.chats;

      const findChat = chats.find((chat: any) => {
        const participants = chat.participants;
        return (
          participants &&
          ((participants.email1 === session?.user?.email &&
            participants.email2 === userData.email) ||
            (participants.email1 === userData.email &&
              participants.email2 === session?.user?.email))
        );
      });

      if (findChat) {
        setMessages(findChat.messages);
        setChatId(findChat._id);
      } else {
        setMessages([]);
      }
    } catch (error) {
      console.log("Error loading travels: ", error);
    }
  };

  socket.on("refresh", () => {
    getChat();
  });

  useEffect(() => {
    getChat();
  }, [userData.email, session]);

  useEffect(() => {
    socket.emit("scroll-down");
    socket.emit("loading-off");
  }, [messages]);

  return (
    <div className="w-full flex flex-col gap-3 px-3 pb-3 pt-[550px]">
      {messages.map((message: Messages) => (
        <div className="full" key={message._id}>
          {message.by === session?.user?.email ? (
            <div>
              <h1 className="text-right text-gray-500 font-medium text-sm">
                {message.time.slice(-8, -3)}
              </h1>
              {message.images[0] ? (
                <div
                  className="w-full flex gap-1 justify-end items-center"
                  onMouseOver={() => setIsHovered(message._id)}
                  onMouseOut={() => setIsHovered("")}
                >
                  {isHovered === message._id && !message.deleted ? (
                    <DeleteMessage
                      messageId={message._id}
                      chatId={chatId}
                      socket={socket}
                    />
                  ) : null}
                  <div className="flex flex-col items-end gap-2">
                    {!message.deleted && (
                      <div className="flex flex-col">
                        {message.images.map((image: string, index: number) => (
                          <img
                            key={index}
                            src={image}
                            alt="image"
                            width={350}
                            height={100}
                            className="rounded-2xl"
                          />
                        ))}
                      </div>
                    )}
                    {message.deleted ? (
                      <div className="w-fit px-3 py-2 rounded-2xl text-[#BCC0C4] border">
                        Message deleted
                      </div>
                    ) : (
                      <div>
                        {message.message && (
                          <div className="bg-[#0A7CFF] w-fit px-3 py-1.5 rounded-full text-white">
                            {message.message}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div
                  className="w-full flex gap-1 justify-end items-center"
                  onMouseOver={() => setIsHovered(message._id)}
                  onMouseOut={() => setIsHovered("")}
                >
                  {isHovered === message._id && !message.deleted ? (
                    <DeleteMessage
                      messageId={message._id}
                      chatId={chatId}
                      socket={socket}
                    />
                  ) : null}
                  {message.deleted ? (
                    <div className="w-fit px-3 py-2 rounded-2xl text-[#BCC0C4] border">
                      Message deleted
                    </div>
                  ) : (
                    <div>
                      {message.message && (
                        <div className="bg-[#0A7CFF] w-fit px-3 py-1.5 rounded-full text-white">
                          {message.message}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div>
              <h1 className="text-left text-gray-500 font-medium text-sm">
                {message.time.slice(-8, -3)}
              </h1>
              {message.images[0] ? (
                <div
                  className="w-full flex gap-1 justify-start items-center"
                  onMouseOver={() => setIsHovered(message._id)}
                  onMouseOut={() => setIsHovered("")}
                >
                  <div className="flex flex-col items-start gap-2">
                    {!message.deleted && (
                      <div className="flex flex-col">
                        {message.images.map((image: string, index: number) => (
                          <img
                            key={index}
                            src={image}
                            alt="image"
                            width={350}
                            height={100}
                            className="rounded-2xl"
                          />
                        ))}
                      </div>
                    )}
                    {message.deleted ? (
                      <div className="w-fit px-3 py-2 rounded-2xl text-[#BCC0C4] border">
                        Message deleted
                      </div>
                    ) : (
                      <div>
                        {message.message && (
                          <div className="bg-[#F0F0F0] w-fit px-3 py-1.5 rounded-full text-black">
                            {message.message}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div
                  className="w-full flex gap-1 justify-start items-center"
                  onMouseOver={() => setIsHovered(message._id)}
                  onMouseOut={() => setIsHovered("")}
                >
                  {message.deleted ? (
                    <div className="w-fit px-3 py-2 rounded-2xl text-[#BCC0C4] border">
                      Message deleted
                    </div>
                  ) : (
                    <div>
                      {message.message && (
                        <div className="bg-[#F0F0F0] w-fit px-3 py-1.5 rounded-full text-black">
                          {message.message}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
