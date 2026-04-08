import { Authenticator } from "remix-auth";
import { GoogleStrategy } from "remix-auth-google";
import { sessionStorage } from "~/sessions.server";

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  picture: string | null;
}

export const authenticator = new Authenticator<UserProfile>(sessionStorage);

const callbackURL =
  process.env.APP_URL
    ? `${process.env.APP_URL}/auth/google/callback`
    : process.env.NODE_ENV === "production"
    ? "https://xen-gym-upd5.vercel.app/auth/google/callback"
    : "http://localhost:5173/auth/google/callback";

authenticator.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      callbackURL,
    },
    async ({ profile }) => {
      return {
        id: profile.id,
        email: profile.emails[0].value,
        name: profile.displayName,
        picture: profile.photos?.[0]?.value ?? null,
      };
    }
  )
);
