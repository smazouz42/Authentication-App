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
import { SignUp, signUpSchema } from "@/schema/sign-up";
import { useSignUp } from "@/server/mutations/auth";
import { useRouter } from "next/navigation";

const formSchema = signUpSchema;

const SingUpForm = () => {
  const router = useRouter();
  const form = useForm<SignUp>({
    resolver: zodResolver(formSchema),
  
  });
  const signUpMutation = useSignUp({
    onSuccess: () => {
      router.push("/profile");
    },
    onError: (error) => {
      if (error.response?.status === 409) {
        const field = (error.response.data as any).target[0];
        form.setError(field, { message: `${field} already exists` });
      }
    },
  });

  const onSubmit = (values: SignUp) => {
    signUpMutation.mutate(values);
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
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="smazouz" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          disabled={signUpMutation.isPending}
          className="w-full mt-6 "
          type="submit"
        >
          Sign Up
        </Button>
        <div className="flex items-center mt-4">
          <div className="flex-grow border-t border-black"></div>
          <span className="px-4 text-gray-500">Or</span>
          <div className="flex-grow border-t border-black"></div>
        </div>
        <p className="mt-4 text-center text-gray-500 ">
          If you have an account, please &nbsp;
          <Link href="/sign-in" className="text-blue-500 hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </Form>
  );
};
export default SingUpForm;
