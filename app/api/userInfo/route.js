import connectMongoDB from "@/lib/mongodb";
import UserInfo from "@/models/userInfo";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { email, image } = await request.json();
  await connectMongoDB("post userInfo");
  await UserInfo.create({
    email,
    image,
  });
  return NextResponse.json({ message: "UserInfo Created" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB("get userInfo");
  const userInfo = await UserInfo.find();
  return NextResponse.json({ userInfo });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB("delete userInfo");
  await UserInfo.findByIdAndDelete(id);
  return NextResponse.json({ message: "UserInfo deleted" }, { status: 200 });
}
