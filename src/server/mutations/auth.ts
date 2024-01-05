"use client";
import { SignIn } from "@/schema/sign-in";
import { SignUp } from "@/schema/sign-up";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

export const useSignUp = (
  opts: UseMutationOptions<unknown, AxiosError, SignUp>
) => {
  return useMutation({
    ...opts,
    mutationFn: async ({ email, password, username }) => {
      await axios.post("/api/auth/sign-up", {
        email,
        password,
        username,
      });
      return { email };
    },
    mutationKey: ["sign-up"],
  });
};

export const useSignIn = (
  opts: UseMutationOptions<unknown, AxiosError, SignIn>
) => {
  return useMutation({
    ...opts,
    mutationFn: async ({ email, password }) => {
      await axios.post("/api/auth/sign-in", {
        email,
        password,
      });
      return { email };
    },
    mutationKey: ["sign-in"],
  });
};

export const useLogout = (
  opts: UseMutationOptions<unknown, AxiosError, void>
) => {
  return useMutation({
    ...opts,
    mutationFn: async () => {
      await axios.post("/api/auth/logout");
    },
    mutationKey: ["logout"],
  });
};
