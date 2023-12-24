import connectMongoDB from "@/lib/mongodb";
import Chat from "@/models/chat";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const { newMessages: messages } = await request.json();
  await connectMongoDB("put message Id");
  await Chat.findByIdAndUpdate(id, {
    messages,
  });
  return NextResponse.json({ message: "Chat updated" }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB("get message by id");
  const chat = await Chat.findOne({ _id: id });
  return NextResponse.json({ chat }, { status: 200 });
}
