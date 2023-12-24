import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import mongoose from "mongoose";
import User from "@/models/user";
import UserInfo from "@/models/userInfo";
import connectMongoDB from "@/lib/mongodb";

mongoose.connect(process.env.DATABASE_URL, {});

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // Add other providers if needed
  ],
  callbacks: {
    async session({ session }) {
      return session;
    },
    async signIn({ profile, account }) {
      console.log(profile);
      try {
        await connectMongoDB("authentication");

        // Check if the sign-in is done with the Google provider
        if (account.provider === "google") {
          const userExist = await User.findOne({ email: profile.email });

          if (!userExist) {
            const user = await User.create({
              name: profile.given_name,
              email: profile.email,
            });
            const userInfo = await UserInfo.create({
              email: profile.email,
              name: profile.given_name,
              surname: profile.family_name,
              image: profile.picture,
            });
          }
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
