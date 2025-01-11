import React from "react";
import Image from "next/image";
import { auth, signIn } from "~/server/auth";
import { redirect } from "next/navigation";

async function ProfilePage() {
  const session = await auth();

  return (
    <main className="flex flex-col gap-5 bg-secondary py-10 lg:px-16">
    <span className="text-center text-xl font-semibold lg:text-start">
      My Profile
    </span>
  </main>
  );
}

export default ProfilePage;
