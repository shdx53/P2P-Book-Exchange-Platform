export const sessionOptions = {
  password: process.env.SECRET_KEY,
  cookieName: "session",
  cookieOptions: {
    httpOnly: true,
    secure: false,
  },
};
