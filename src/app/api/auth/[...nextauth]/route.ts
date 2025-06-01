import NextAuth from "next-auth";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials) {
                try {
                    await connectToDatabase();
                    const user = await User.findOne({ email: credentials?.email })
                    if (!user) {
                        throw new Error("")
                    }
                    const isValidPassword = await bcrypt.compare(
                        credentials?.password || "", user.password as string
                    )
                    if (!isValidPassword) {
                        throw new Error("")
                    }
                    return user
                }
                catch {
                    throw new Error("Invalid Credentials")
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.email = user.email
            }
            return token;

        },
        async session({ session, token }) {
            if (token) {
                session.user = {
                    email: token.email,
                    name: token.name,
                    image: token.picture,
                }
            }
            return session
        }
    },
    pages: {
        signIn: "/auth/signin"
    },
    secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }