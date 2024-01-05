import React from "react";
import SingInForm from "@/components/form/SignInFrom";
import * as context from "next/headers";
import { auth } from "@/server/lucia";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const authRequest = auth.handleRequest("GET", context);
  const session = await authRequest.validate();
  if (session) redirect("/profile");
  return (
    <div>
      <SingInForm />
    </div>
  );
}
