import { MdDelete } from "react-icons/md";

export default function DeleteChat({ chatId }: any) {
  const handlePageRefresh = () => {
    // Ricarica la pagina
    window.location.reload();
  };

  const deleteChat = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this chat?"
    );
    if (confirm) {
      try {
        const res = await fetch(
          `http://localhost:3000/api/message?id=${chatId}`,
          {
            method: "DELETE",
          }
        );
        if (res.ok) {
          handlePageRefresh();
        } else new Error("Failed to create a Chat");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div
      className="w-full flex items-center gap-3 p-2 rounded-md cursor-pointer hover:bg-[#F9F9F9] select-none"
      onClick={async () => {
        await deleteChat();
      }}
    >
      <div className="p-2 rounded-full bg-[#F5F5F5]">
        <MdDelete color={"black"} size={18} />
      </div>
      <h1 className="text-md font-semibold text-black">Delete chat</h1>
    </div>
  );
}
