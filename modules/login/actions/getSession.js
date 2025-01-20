"use server";

import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { defaultSession } from "../lib/defaultSession";
import { sessionOptions } from "../lib/sessionOptions";

export const getSession = async () => {
  const session = await getIronSession(await cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn
  }

  return session;
};
