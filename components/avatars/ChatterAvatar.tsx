import { useSession } from "next-auth/react";
import Image from "next/image";
import ChatDropdown from "../dropdowns/ChatDropdown";
import React, { useEffect, useState } from "react";
import DefaultImage from "@/public/images/defaultmage.png";
import { useRouter } from "next/navigation";

export default function ChatterAvatar({
  participants,
  lastMessage,
  messageDeleted,
  chatId,
  isArchived,
  userData,
  socket,
}: any) {
  const router = useRouter();
  const { data: session } = useSession();
  const [isHovered, setIsHovered] = useState(false);
  const [person, setPerson] = useState<any>("");
  const [userInfo, setUserInfo] = useState<any | null>(null);

  useEffect(() => {
    const others = Object.values(participants).filter(
      (email) => email !== session?.user?.email
    );
    const otherPerson = others.find((email) => email !== session?.user?.email);
    if (otherPerson) {
      setPerson(otherPerson);
    }
  }, [participants, session]);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/userInfo?email=${person}`,
          {
            cache: "no-store",
          }
        );
        if (!res.ok) {
          throw new Error("Failed to fetch userInfo");
        }
        const data = await res.json();
        const user = data.userInfo.find((user: any) => user.email === person);

        if (user) {
          setUserInfo(user);
        }
      } catch (error) {
        console.log("Error loading userInfos: ", error);
      }
    };

    if (person) {
      getUserInfo();
    }
  }, [person]);

  return (
    <div
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      className={`flex items-center gap-2 px-2 py-2 rounded-lg cursor-pointer hover:bg-[#F5F5F5] ${
        userData && userInfo
          ? userData.email === userInfo.email
            ? "bg-[#F5F5F5]"
            : null
          : null
      }`}
      onClick={() => {
        localStorage.setItem(
          "userData",
          JSON.stringify({
            id: userInfo._id,
            name: userInfo.name,
            surname: userInfo.surname,
            email: userInfo.email,
            image: userInfo.image,
          })
        );

        socket.emit("get-user-data", 100);
      }}
    >
      {userInfo &&
        (userInfo.image === "DefaultImage" ? (
          <Image
            src={DefaultImage}
            alt="image"
            height={46}
            width={46}
            className="rounded-full border-[1px] border-[#BCBFC4] cursor-pointer opacity-90 hover:opacity-100"
          />
        ) : (
          <Image
            src={userInfo.image}
            alt="image"
            height={46}
            width={46}
            className="rounded-full border-[1px] border-[#BCBFC4] cursor-pointer opacity-90 hover:opacity-100"
          />
        ))}
      <div>
        <h1 className="font-medium text-black">
          {userInfo && `${userInfo.name} ${userInfo.surname}`}
        </h1>
        <h1
          className="text-black text-opacity-70 text-sm overflow-hidden"
          style={{
            maxWidth: "200px",
          }}
        >
          <span
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "block",
              maxWidth: "100%",
            }}
          >
            {messageDeleted ? (
              "Message deleted"
            ) : (
              <div>{lastMessage ? lastMessage : "IMAGE"}</div>
            )}
          </span>
        </h1>
      </div>
      <div
        className={`absolute w-[310px] h-[50px] flex justify-end items-center pr-6 ${
          isHovered ? "block" : "hidden"
        }`}
      >
        <ChatDropdown
          chatId={chatId}
          isArchived={isArchived}
          userData={userData}
        />
      </div>
    </div>
  );
}
