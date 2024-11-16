import React from "react";
import { auth } from "~/server/auth";

async function AdminDashboard() {
  const session = await auth()

  if(session?.user.)
  return (
    <main className="flex flex-col justify-center gap-10 px-10 py-5">

    </main>
  );
}

export default AdminDashboard;
