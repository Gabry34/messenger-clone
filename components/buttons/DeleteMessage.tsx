import React from "react";
import { HiDotsVertical } from "react-icons/hi";

export default function DeleteMessage({ messageId, chatId, socket }: any) {
  const updateChat = async () => {
    // Trova le informazioni sulla chat
    const confirm = window.confirm(
      "Are you sure you want to delete this message?"
    );
    if (confirm) {
      const response = await fetch(
        `http://localhost:3000/api/message/${chatId}`,
        {
          cache: "no-store",
        }
      );

      const chat = await response.json();
      const updatedMessages = chat.chat.messages.map((message: any) =>
        message._id === messageId ? { ...message, deleted: true } : message
      );

      // Aggiorna i messaggi della chat
      try {
        const res = await fetch(`http://localhost:3000/api/message/${chatId}`, {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            newMessages: updatedMessages,
          }),
        });

        if (!res.ok) {
          throw new Error("Failed to update chat");
        } else {
          socket.emit("send-message", 200);
        }
      } catch (error: any) {
        console.log(error.message);
      }
    }
  };

  return (
    <div className="p-1 rounded-full flex justify-center items-center cursor-pointer hover:bg-[#F5F5F5]">
      <div className="popover">
        <label
          className="popover-trigger flex justify-center items-center hover:bg-[#F5F5F5]"
          tabIndex={0}
        >
          <HiDotsVertical color={"black"} size={16} />
        </label>
        <div
          className="popover-content popover-top-center mb-4 p-0 bg-white w-fit with-shadow"
          tabIndex={0}
        >
          <div className="popover-arrow bg-white"></div>
          <div
            className="text-sm p-3 text-black"
            onClick={() => {
              updateChat();
            }}
          >
            Remove
          </div>
        </div>
      </div>
    </div>
  );
}
