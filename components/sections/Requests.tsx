import React, { useState } from "react";

export default function Requests() {
  const [option, setOption] = useState("people");
  return (
    <div className="h-full w-[360px] border-r px-4 py-3">
      <h1 className="text-black text-2xl font-bold pb-3">Requests</h1>
      <div className="w-full border flex items-center rounded-full mt-1">
        <div
          className={`w-1/2 h-full flex items-center justify-center py-[6px] rounded-full cursor-pointer hover:bg-[#e5e5e562] ${
            option === "people" ? "bg-[#E5E5E5]" : ""
          }`}
          onClick={() => {
            setOption("people");
          }}
        >
          <h1
            className={`text-black text-md font-semibold ${
              option === "people" ? "text-black" : "text-[#656E79]"
            }`}
          >
            You may know
          </h1>
        </div>
        <div
          className={`w-1/2 h-full flex items-center justify-center py-[6px] rounded-full cursor-pointer hover:bg-[#e5e5e562] ${
            option === "spam" ? "bg-[#E5E5E5]" : ""
          }`}
          onClick={() => {
            setOption("spam");
          }}
        >
          <h1
            className={`text-black font-semibold ${
              option === "spam" ? "text-black" : "text-[#656E79]"
            }`}
          >
            Spam
          </h1>
        </div>
      </div>
      <p className="text-[13px] text-[#656E79] leading-4 mt-2">
        Open a request to get info about who&rsquo;s messaging you. They
        won&rsquo;t know you&rsquo;ve seen it until you reply.
      </p>
    </div>
  );
}
