"use server";

import { redirect } from "next/navigation";

export const createListing = async (formData) => {
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

  const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/listings`, {
    method: "POST",
    body: body,
  });

  if (data.status === 500) {
    return { error: "Oops! Something went wrong" };
  }

    redirect("/");
};
