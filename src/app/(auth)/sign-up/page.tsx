import React from "react";
import SingUpForm from "@/components/form/SignUpForm";
import * as context from "next/headers";
import { auth } from "@/server/lucia";
import { redirect } from "next/navigation";

export default async function SignUpPage() {
  const authRequest = auth.handleRequest("GET", context);
  const session = await authRequest.validate();
  if (session) redirect("/profile");
  return (
    <div>
      <SingUpForm />
    </div>
  );
}
