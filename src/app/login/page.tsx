import React from "react";
import Image from "next/image";
import { auth, signIn } from "~/server/auth";
import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";

async function LoginPage() {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  async function signInGoogle() {
    "use server";

    await signIn("google");
  }

  return (
    <main className="flex min-h-screen flex-col-reverse xl:flex-row">
      <div className="flex shrink-0 flex-col justify-around bg-secondary p-5 md:p-24">
        <Image
          src={"registerlogin.svg"}
          priority
          height={600}
          width={600}
          alt="Register reasons"
          className="mb-16 self-center"
        />
        <div>
          <div className="mb-5 text-3xl font-bold">Welcome Back!</div>
          <div className="max-w-md text-xl">
            Choose Ameleco Electrical Supply for all your electrical supply
            needs!
          </div>
        </div>
      </div>
      <div className="my-10 flex grow flex-col items-center justify-center">
        <div className="flex flex-col">
          <div className="text-6xl font-bold">Welcome!</div>
          <div className="my-6 mb-5 text-2xl">
            Start Lorem ipsum dolor sit amet.
          </div>

          <Button onClick={signInGoogle}>Sign in with Google</Button>
        </div>
      </div>
    </main>
  );
}

export default LoginPage;
