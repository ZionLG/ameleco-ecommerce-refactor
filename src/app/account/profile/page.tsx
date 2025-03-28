import React from "react";
import ProfileForm from "~/components/profileForm";
import { caller } from "~/trpc/server";

async function ProfilePage() {
  const profile = await caller.user.getProfile();

  return (
    <main className="flex flex-col gap-5 py-10 lg:px-16">
      <span className="text-center text-xl font-semibold lg:text-start">
        My Profile
      </span>
      <ProfileForm profileData={profile} action="edit"/>
    </main>
  );
}

export default ProfilePage;
