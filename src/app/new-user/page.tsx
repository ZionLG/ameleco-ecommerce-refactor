import React from "react";
import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import { caller } from "~/trpc/server";
import ProfileForm from "~/components/profileForm";

async function NewUserPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const profile = await caller.user.getProfile();

  if (profile) { 
    redirect("/");
  }

  return (
    <main className="container flex flex-col gap-5 py-10 lg:px-16">
      <span className="text-center text-xl font-semibold lg:text-start">
        Create your profile
      </span>
      <ProfileForm action="create"/>
    </main>
  );
}

export default NewUserPage;
