import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { RiSendPlaneFill } from "react-icons/ri";

export default function SendMessage({ userData, input, socket, images }: any) {
  const router = useRouter();
  const { data: session } = useSession();

  // Generate id

  function generateId() {
    const lunghezzaPassword = 10;
    const caratteriLettere =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const caratteriNumeri = "0123456789";
    let passwordCasuale = "";

    for (let i = 0; i < lunghezzaPassword; i++) {
      const scegliCarattere = i % 2 === 0; // Alternare tra lettere e numeri
      const caratteriPossibili = scegliCarattere
        ? caratteriLettere
        : caratteriNumeri;

      const indiceCasuale = Math.floor(
        Math.random() * caratteriPossibili.length
      );
      passwordCasuale += caratteriPossibili.charAt(indiceCasuale);
    }

    return passwordCasuale;
  }

  // Actual Date

  function getCurrentDate() {
    const dataOra = new Date();
    const anno = dataOra.getFullYear();
    const mese = aggiungiZero(dataOra.getMonth() + 1);
    const giorno = aggiungiZero(dataOra.getDate());
    const ore = aggiungiZero(dataOra.getHours());
    const minuti = aggiungiZero(dataOra.getMinutes());
    const secondi = aggiungiZero(dataOra.getSeconds());

    const dataOraFormattate = `${anno}-${mese}-${giorno} ${ore}:${minuti}:${secondi}`;
    return dataOraFormattate;
  }

  function aggiungiZero(numero: number) {
    return numero < 10 ? "0" + numero : numero;
  }

  // Create Chat

  const createChat = async () => {
    try {
      const res = await fetch(
        "https://messenger-clone-peach-two.vercel.app/api/message",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            email1: session?.user?.email,
            email2: userData.email,
            id: generateId(),
            by: session?.user?.email,
            message: input,
            time: getCurrentDate(),
            seen: false,
            images: images,
            deleted: false,
          }),
        }
      );
      if (res.ok) {
        socket.emit("send-message", 200);
      } else new Error("Failed to create a Chat");
    } catch (error) {
      console.log(error);
    }
  };

  //----------------------------

  const updateChat = async () => {
    try {
      // Fetch the chats
      const res = await fetch(
        "https://messenger-clone-peach-two.vercel.app/api/message",
        {
          cache: "no-store",
        }
      );

      const data = await res.json();
      const datas = data.chats;

      // Find the chat
      const findChat = datas.find((chat: any) =>
        [session?.user?.email, userData.email].every((email) =>
          [chat.participants.email1, chat.participants.email2].includes(email)
        )
      );

      if (!findChat) {
        console.log("Chat not found");
        return false; // Chat not found, handle accordingly
      }

      // find chat informations
      const response = await fetch(
        `https://messenger-clone-peach-two.vercel.app/api/message/${findChat._id}`,
        {
          cache: "no-store",
        }
      );

      const chat = await response.json();
      const updatedMessages = [
        ...chat.chat.messages,
        {
          id: generateId(),
          by: session?.user?.email,
          message: input,
          time: getCurrentDate(),
          seen: false,
          images: images,
          deleted: false,
        },
      ];

      // update chat messages
      try {
        const res = await fetch(
          `https://messenger-clone-peach-two.vercel.app/api/message/${findChat._id}`,
          {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              newMessages: updatedMessages,
            }),
          }
        );

        if (!res.ok) {
          throw new Error("Failed to update chat");
        } else {
          socket.emit("send-message", 200);
        }
      } catch (error: any) {
        console.log(error.message);
      }
    } catch (error) {
      console.log("Error loading chats: ", error);
    }
  };

  // ---------------------------
  const sendMessage = () => {
    if (!input && !images[0]) {
      return false;
    } else {
      createChat();
      updateChat();
    }
  };

  return (
    <div>
      <RiSendPlaneFill
        size={26}
        color={"#0976F2"}
        className="rotate-45 cursor-pointer"
        onClick={() => {
          sendMessage();
        }}
      />
    </div>
  );
}
