import { auth } from "@/server/lucia";
import * as context from "next/headers";

import { NextResponse, type NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  const authRequest = auth.handleRequest(request.method, context);
  const session = await authRequest.validate();
  if (!session) {
    return NextResponse.redirect(new URL("/sign-in", request.nextUrl));
  }
  // make sure to invalidate the current session!
  await auth.invalidateSession(session.sessionId);

  // delete session cookie
  authRequest.setSession(null);
  return NextResponse.redirect(new URL("/sign-in", request.nextUrl), {});
};
