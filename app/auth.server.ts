import { redirect } from "@remix-run/node";
import { sessionStorage } from "~/sessions.server";

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  picture: string | null;
}

export async function getUserFromSession(request: Request): Promise<UserProfile | null> {
  const session = await sessionStorage.getSession(request.headers.get("Cookie"));
  const user = session.get("user") as UserProfile | undefined;
  return user ?? null;
}

export async function createUserSession(user: UserProfile, redirectTo: string) {
  const session = await sessionStorage.getSession();
  session.set("user", user);
  return redirect(redirectTo, {
    headers: { "Set-Cookie": await sessionStorage.commitSession(session) },
  });
}

export async function destroyUserSession(request: Request, redirectTo: string) {
  const session = await sessionStorage.getSession(request.headers.get("Cookie"));
  return redirect(redirectTo, {
    headers: { "Set-Cookie": await sessionStorage.destroySession(session) },
  });
}
