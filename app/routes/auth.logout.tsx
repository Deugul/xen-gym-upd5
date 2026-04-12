import type { ActionFunction } from "@remix-run/node";
import { destroyUserSession } from "~/auth.server";

export const action: ActionFunction = ({ request }) => {
  return destroyUserSession(request, "/");
};
