import { NextResponse } from "next/server";
import { getSession } from "./modules/login/actions/getSession";

const protectedPaths = ["/listings/new", "/requests/my", "/requests/manage"];

export async function middleware(request) {
  const { isLoggedIn } = await getSession();
  const path = request.nextUrl.pathname;

  if (!isLoggedIn && protectedPaths.includes(path)) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/unauthorized`);
  }
}
