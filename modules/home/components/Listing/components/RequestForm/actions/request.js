"use server";

import { getSession } from "@/modules/login/actions/getSession";

export const request = async (listingId) => {
  const { userId, username } = await getSession();

  const body = {
    listingId,
    userId,
    username,
  };

  const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/requests`, {
    method: "POST",
    body: JSON.stringify(body),
  });

  if (data.status === 400) {
    const result = await data.json();

    if (result.message !== "Missing required fields") {
      return { error: result.message };
    }
  }

  if ([400, 500].includes(data.status)) {
    return { error: "Oops! Something went wrong" };
  }
};
