import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";

export default function MobilePage() {
  const [openLinks, setOpenLinks] = useState(false);
  const [section, setSection] = useState("default");

  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="w-full flex justify-between items-center px-10 py-10">
        <img src="/images/logo.svg" alt="logo" width={32} height={32} />
        <div
          onClick={() => {
            setOpenLinks(!openLinks);
          }}
        >
          {openLinks ? (
            <RxCross2 size={32} color={"black"} />
          ) : (
            <RxHamburgerMenu size={32} color={"black"} />
          )}
        </div>
      </div>
      <div>
        {openLinks ? (
          <div className="w-full flex flex-col gap-2">
            <Link
              href="https://www.messenger.com/features"
              className="w-full bg-[#F5F5F5] p-5 text-gray-600 text-xl font-medium"
            >
              Functions
            </Link>
            <Link
              href="https://www.messenger.com/desktop"
              className="w-full bg-[#F5F5F5] p-5 text-gray-600 text-xl font-medium"
            >
              App desktop
            </Link>
            <Link
              href="https://www.messenger.com/privacy"
              className="w-full bg-[#F5F5F5] p-5 text-gray-600 text-xl font-medium"
            >
              Privacy and security
            </Link>
            <Link
              href="https://developers.facebook.com/products/messenger/"
              className="w-full bg-[#F5F5F5] p-5 text-gray-600 text-xl font-medium"
            >
              For developers
            </Link>
          </div>
        ) : (
          <div className="px-10 pt-5 flex flex-col gap-10">
            <h1
              className="text-gradient text-5xl font-semibold"
              style={{
                background: "linear-gradient(to right, #366BFF, #FF5C87)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              Communicate<br></br>with anyone<br></br>anywhere,<br></br>anytime
            </h1>
            <p className="text-black opacity-90 leading-6">
              With Messenger you can keep in touch<br></br>with the people you
              prefer<br></br>in a simple and fun way.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
