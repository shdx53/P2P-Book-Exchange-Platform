"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { getSession } from "./getSession";

const errorStatusCodes = [400, 404, 500];

export const login = async (formData) => {
  const session = await getSession();

  const formUsername = formData.username;
  const formPassword = formData.password;

  // Fetch user data
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users?username=${formUsername}`,
    { cache: "no-store" },
  );
  const user = await data.json();

  if (errorStatusCodes.includes(data.status)) {
    return { error: user.message };
  }

  const userId = user.user_id;
  const storedHashedPassword = user.password;

  // Compare the plain password with the stored hashed password
  const isMatch = await bcrypt.compare(formPassword, storedHashedPassword);

  if (!user || !isMatch) {
    return { error: "Wrong credentials!" };
  }

  // Update session
  session.userId = userId;
  session.username = formUsername;
  session.isLoggedIn = true;

  await session.save();
  redirect("/");
};
