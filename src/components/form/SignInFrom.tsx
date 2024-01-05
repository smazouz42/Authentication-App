"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SignIn, signInSchema } from "@/schema/sign-in";
import { useSignIn } from "@/server/mutations/auth";
import { useRouter } from "next/navigation";
const SingInForm = () => {
  const form = useForm<SignIn>({
    resolver: zodResolver(signInSchema),
    
  });
  const router = useRouter();

  const signInMutation = useSignIn({
    onSuccess: () => {
      router.push("/profile");
    },
    onError: (error) => {
      if (error.response?.status === 401) {
        form.setError("email", {
          message: "Email or password is incorrect",
        });
        form.setError("password", {
          message: "Email or password is incorrect",
        });
      }
      if (error.response?.status === 403) {
        form.setError("root", {
          message: "You are not allowed to access this resource",
        });
      }
    },
  });

  const onSubmit = async (values: SignIn) => {
    signInMutation.mutate(values);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="text-muted text-red-500">
          {form.formState.errors.root?.message}
        </div>
        <div className="space-y-1">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="smazouz@example.com"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter ur Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          disabled={signInMutation.isPending}
          className="w-full mt-6 "
          type="submit"
        >
          Sign in
        </Button>
        <div className="flex items-center mt-4">
          <div className="flex-grow border-t border-black"></div>
          <span className="px-4 text-gray-500">Or</span>
          <div className="flex-grow border-t border-black"></div>
        </div>
        <p className="mt-4 text-center text-gray-500 ">
          If you don&apos;t have an account, please &nbsp;
          <Link href="/sign-up" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </Form>
  );
};
export default SingInForm;
