import { Auth as LuciaAuth } from "lucia";

/// <reference types="lucia" />
declare namespace Lucia {
  type Auth = LuciaAuth;
  type DatabaseUserAttributes = {
    username: string;
    email: string;
  };
  type DatabaseSessionAttributes = {};
}
