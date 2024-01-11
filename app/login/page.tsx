"use client";

import Image from "next/image";
import React from "react";
import logoImage from "@/public/images/logo.svg";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();
  if (session) {
    router.push("/");
  }
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-10">
      <img src={logoImage} alt="logo" width={80} height={80} />
      <h1 className="text-black text-4xl text-center">
        Connect with the people you love.
      </h1>
      <div className="flex flex-col gap-2 w-[300px]">
        <button
          className="w-full flex items-center justify-center gap-2 border py-2 rounded-md"
          onClick={() => {
            signIn("facebook");
          }}
        >
          <FaFacebook size={24} color="blue" />
          <h1 className="text-black text-lg">log in with facebook</h1>
        </button>
        <button
          className="w-full flex items-center justify-center gap-2 border py-2 rounded-md"
          onClick={() => {
            signIn("google");
          }}
        >
          <FcGoogle size={24} color="blue" />
          <h1 className="text-black text-lg">log in with google</h1>
        </button>
      </div>
    </div>
  );
}
