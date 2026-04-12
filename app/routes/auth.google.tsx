import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";

export const loader: LoaderFunction = () => redirect("/login");
export const action: ActionFunction = () => redirect("/login");
