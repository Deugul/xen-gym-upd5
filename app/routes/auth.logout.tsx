import type { ActionFunction } from "@remix-run/node";
import { authenticator } from "~/auth.server";

export const action: ActionFunction = ({ request }) => {
  return authenticator.logout(request, { redirectTo: "/" });
};
