import React, { useState } from "react";
import { HiArchiveBox } from "react-icons/hi2";
import { useSession } from "next-auth/react";

export default function ArchiveChat({ isArchived, chatId }: any) {
  const { data: session } = useSession();
  const [archived, setArchived] = useState<string[]>([]);
  const [userId, setUserId] = useState<string>("");

  const handlePageRefresh = () => {
    // Ricarica la pagina
    window.location.reload();
  };

  const archiveChat = async () => {
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
        setUserId(userInfo._id);
      }

      if (!res.ok) {
        throw new Error("Failed to fetch userInfo");
      } else {
        if (!archived.includes(chatId)) {
          try {
            const updatedArchive = [...archived, chatId];
            const res = await fetch(
              `messenger-clone-n60evtay3-gabry34.vercel.app/api/userInfo/${userId}`,
              {
                method: "PUT",
                headers: {
                  "Content-type": "application/json",
                },
                body: JSON.stringify({
                  newArchived: updatedArchive,
                }),
              }
            );

            if (!res.ok) {
              throw new Error("Failed to update chat");
            } else {
              handlePageRefresh();
            }
          } catch (error: any) {
            console.log(error.message);
          }
        }
      }
    } catch (error) {
      console.log("Error loading userInfos: ", error);
    }
  };

  const unarchiveChat = async () => {
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
        setUserId(userInfo._id);
      }

      if (!res.ok) {
        throw new Error("Failed to fetch userInfo");
      } else {
        if (archived.includes(chatId)) {
          try {
            const updatedArchive = archived.filter((id) => id !== chatId);
            const res = await fetch(
              `messenger-clone-n60evtay3-gabry34.vercel.app/api/userInfo/${userId}`,
              {
                method: "PUT",
                headers: {
                  "Content-type": "application/json",
                },
                body: JSON.stringify({
                  newArchived: updatedArchive,
                }),
              }
            );

            if (!res.ok) {
              throw new Error("Failed to update chat");
            } else {
              handlePageRefresh();
            }
          } catch (error: any) {
            console.log(error.message);
          }
        }
      }
    } catch (error) {
      console.log("Error loading userInfos: ", error);
    }
  };
  return (
    <div className="w-full">
      {isArchived ? (
        <div
          className="w-full flex items-center gap-3 p-2 rounded-md cursor-pointer hover:bg-[#F9F9F9]"
          onClick={() => {
            unarchiveChat();
          }}
        >
          <div className="p-2 rounded-full bg-[#F5F5F5]">
            <HiArchiveBox color={"black"} size={18} />
          </div>
          <h1 className="text-md font-semibold text-black">Unarchive chat</h1>
        </div>
      ) : (
        <div
          className="w-full flex items-center gap-3 p-2 rounded-md cursor-pointer hover:bg-[#F9F9F9]"
          onClick={() => {
            archiveChat();
          }}
        >
          <div className="p-2 rounded-full bg-[#F5F5F5]">
            <HiArchiveBox color={"black"} size={18} />
          </div>
          <h1 className="text-md font-semibold text-black">Archive chat</h1>
        </div>
      )}
    </div>
  );
}
