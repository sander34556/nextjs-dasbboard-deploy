import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectMongoDB } from "../../../../../lib/mongodb";
import User from "../../../../../models/user";
import bcrypt from "bcryptjs";

const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {},
            async authorize(credentials, req) {

                const { email, password } = credentials;

                try {

                    await connectMongoDB();
                    const user = await User.findOne({ email });

                    if (!user) {
                        return null;
                    }

                    const passwordMath = await bcrypt.compare(password, user.password);

                    if (!passwordMath) {
                        return null;
                    }
                    return user;
                    

                } catch (error) {
                    console.log("Error: ", error);
                }

            }
        })
    ],
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login"
    },
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.role = user.role
            }
            return token
        },
        session: async ({ session, token }) => {
            if (session.user) {
                session.user.role = token.role
            }
            return session;
        }
    }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }