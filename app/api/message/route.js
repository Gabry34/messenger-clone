import connectMongoDB from "@/lib/mongodb";
import Chat from "@/models/chat";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { email1, email2, id, by, message, time, seen, images, deleted } =
    await request.json();
  await connectMongoDB("message");
  console.log("Received data:", {
    email1,
    email2,
    id,
    by,
    message,
    time,
    seen,
    images,
    deleted,
  });

  // Verifica se esiste già una chat con le stesse email1 e email2
  const existingChat1 = await Chat.findOne({
    participants: {
      email1: email1,
      email2: email2,
    },
  });

  const existingChat2 = await Chat.findOne({
    participants: {
      email1: email2,
      email2: email1,
    },
  });

  if (existingChat1 || existingChat2) {
    return NextResponse.json(
      { message: "Chat with the same participants already exists" },
      { status: 400 }
    );
  } else {
    await Chat.create({
      participants: { email1, email2 },
      messages: [
        {
          id,
          by,
          message,
          time,
          seen,
          images,
          deleted,
        },
      ],
    });
    return NextResponse.json({ message: "Chat Created" }, { status: 201 });
  }
}

export async function GET() {
  await connectMongoDB("get message");
  const chats = await Chat.find();
  return NextResponse.json({ chats });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB("delete message");
  await Chat.findByIdAndDelete(id);
  return NextResponse.json({ message: "Chat deleted" }, { status: 200 });
}
