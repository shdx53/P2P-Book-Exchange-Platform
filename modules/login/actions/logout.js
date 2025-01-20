"use server";

import { redirect } from "next/navigation";
import { getSession } from "./getSession";

export const logout = async () => {
  const session = await getSession();
  session.destroy();
  redirect("/");
};
