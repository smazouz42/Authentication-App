import { auth } from "@/server/lucia";
import { NextRequest, NextResponse } from "next/server";
import * as context from "next/headers";
import { signInSchema } from "@/schema/sign-in";
import { isLuciaError, isZodError } from "@/utils/type-guard";

export const POST = async (req: NextRequest) => {
  try {
    const { email, password } = await signInSchema.parseAsync(await req.json());

    const user = await auth.useKey("credentials", email, password);

    const sessions = await auth.getAllUserSessions(user.userId);
    if (sessions.length)
      return NextResponse.json(
        { message: "you're already signed in" },
        { status: 403 }
      );

    const session = await auth.createSession({
      attributes: {},
      userId: user.userId,
    });
    const authRequest = auth.handleRequest(req.method, context);
    authRequest.setSession(session);

    return NextResponse.redirect(new URL("/profile", req.nextUrl));
  } catch (error) {
    if (isZodError(error))
      return NextResponse.json(error.issues, { status: 400 });
    if (
      isLuciaError(error) &&
      ["AUTH_INVALID_KEY_ID", "AUTH_INVALID_PASSWORD"].includes(error.message)
    )
      return NextResponse.json(
        { message: "email or password incorrect" },
        { status: 401 }
      );

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
};
