"use client";
import { User } from "lucia";
import { Button } from "../ui/button";
import { useLogout } from "@/server/mutations/auth";
import { useRouter } from "next/navigation";

type ProfileProps = {
  user: User;
};
export function Profile({ user }: ProfileProps) {
  const router = useRouter();
  const logoutMutation = useLogout({
    onSuccess: () => {
      router.push("/sign-in");
    },
  });

  const logout = () => {
    logoutMutation.mutate();
  };
  return (
    <div>
      <h1>Profile</h1>
      <p>{user.email}</p>
      <Button disabled={logoutMutation.isPending} onClick={() => logout()}>
        Logout
      </Button>
    </div>
  );
}
