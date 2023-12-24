import React from "react";

export default function Marketplace() {
  return (
    <div className="h-full w-[360px] border-r flex flex-col">
      <h1 className="text-black text-2xl font-bold pl-4 py-3">
        Marketplace chats
      </h1>
      <div className="scroll-container h-full w-full flex items-center justify-center overflow-y-scroll">
        <h1 className="text-lg text-black">No messages found.</h1>
      </div>
    </div>
  );
}
