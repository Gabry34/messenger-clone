import React, { useState } from "react";
import { BsGearFill } from "react-icons/bs";

export default function PreferencesModal() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div>
      <div
        className="w-full flex items-center gap-3 p-2 rounded-md cursor-pointer hover:bg-[#F9F9F9]"
        onClick={() => {
          setOpenModal(true);
        }}
      >
        <div className="p-2 rounded-full bg-[#F5F5F5]">
          <BsGearFill color={"black"} size={14} />
        </div>
        <h1 className="text-md font-semibold text-black">Preferences</h1>
      </div>
      {openModal ? <div className=""></div> : null}
    </div>
  );
}
