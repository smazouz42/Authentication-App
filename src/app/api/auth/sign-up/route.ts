import { signUpSchema } from "@/schema/sign-up";
import { auth } from "@/server/lucia";
import { isPrismaError, isZodError } from "@/utils/type-guard";
import * as context from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password, username } = await signUpSchema.parseAsync(
      await req.json()
    );
    const user = await auth.createUser({
      key: {
        providerId: "credentials",
        providerUserId: email,
        password,
      },
      attributes: {
        email,
        username,
      },
    });
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

    if (isPrismaError(error) && error.code === "P2002") {
      console.log(error);
      return NextResponse.json(
        { message: "email already exists", target: error.meta?.target },

        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
