import { Prisma } from "@prisma/client";
import { LuciaError } from "lucia";
import { ZodError } from "zod";

export const isZodError = (error: unknown): error is ZodError =>
  error instanceof ZodError;
export const isPrismaError = (
  err: unknown
): err is Prisma.PrismaClientKnownRequestError => {
  return err instanceof Prisma.PrismaClientKnownRequestError;
};

export const isLuciaError = (error: unknown): error is LuciaError =>
  error instanceof LuciaError;
