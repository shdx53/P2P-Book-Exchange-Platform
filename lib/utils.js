import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getSGTFormattedDate(date) {
  // Convert the UTC date to Singapore Time (SGT)
  const singaporeTime = new Date(date.getTime() + 8 * 60 * 60 * 1000); // Add 8 hours to UTC

  // Format the date in YYYY-MM-DD format
  const formattedDate = singaporeTime.toLocaleDateString("en-SG", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return formattedDate;
}
