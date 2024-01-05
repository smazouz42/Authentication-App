import { Profile } from "@/components/profile";
import { Button } from "@/components/ui/button";
import { auth } from "@/server/lucia";
import * as context from "next/headers";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const authRequest = auth.handleRequest("GET", context);
  const session = await authRequest.validate();
  if (!session) redirect("/sign-in");
  const { user } = session;

  return (
    <div>
      <Profile user={user} />
    </div>
  );
}
