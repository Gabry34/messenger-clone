import connectMongoDB from "@/lib/mongodb";
import UserInfo from "@/models/userInfo";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const { newArchived: archived } = await request.json();
  await connectMongoDB("put userInfo by id");
  await UserInfo.findByIdAndUpdate(id, {
    archived,
  });
  return NextResponse.json({ message: "UserInfo updated" }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB("get userInfo by id");
  const travel = await UserInfo.findOne({ _id: id });
  return NextResponse.json({ travel }, { status: 200 });
}
