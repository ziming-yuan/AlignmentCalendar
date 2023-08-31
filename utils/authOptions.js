import dbConnect from "/lib/dbConnect";
import User from "/models/user";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const authOptions = {
    providers: [
      CredentialsProvider({
        name: "credentials",
        credentials: {},
        async authorize(credentials) {
          const { email, password } = credentials;
          try {
            await dbConnect();
            const user = await User.findOne({ email });
            if (!user) {
              return null;
            }
            const passwordsMatch = await bcrypt.compare(password, user.password);
            if (!passwordsMatch) {
              return null;
            }
            return user;
          } catch (error) {
            console.log("Error: ", error);
          }
        },
      }),
    ],
    session: {
      strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
      signIn: "/",
    },
    callbacks: {
      session: ({ session, token }) => ({
        ...session,
        user: {
          ...session.user,
          id: token.sub,
        },
      }),
    },
  };

  export default authOptions;