"use server";

import { getSession } from "@/modules/login/actions/getSession";
import { redirect } from "next/navigation";

export const createListing = async (formData) => {
  const { username } = await getSession();

  const formTitle = formData.title;
  const formAuthor = formData.author;
  const formGenre = formData.genre;
  const formImage = formData.image;
  const formDescription = formData.description;

  const body = new FormData();
  body.append("title", formTitle);
  body.append("author", formAuthor);
  body.append("genre", formGenre);
  body.append("image", formImage);
  body.append("description", formDescription);
  body.append("username", username);

  const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/listings`, {
    method: "POST",
    body: body,
  });

  if ([400, 500].includes(data.status)) {
    return { error: "Oops! Something went wrong" };
  }

  redirect("/");
};
