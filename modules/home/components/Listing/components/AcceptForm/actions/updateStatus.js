"use server";

import { getSession } from "@/modules/login/actions/getSession";

export const updateStatus = async (requestId, listingId) => {
  const body = {
    requestId,
    listingId,
  };

  const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/requests`, {
    method: "PUT",
    body: JSON.stringify(body),
  });

  if (data.status === 500) {
    return { error: "Oops! Something went wrong" };
  }
};
