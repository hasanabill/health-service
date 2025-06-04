import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import User from "@/models/user"
import bcrypt from "bcryptjs";
import connectToDB from "@/lib/mongodb";
export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                await connectToDB();
                const { email, password } = credentials;
                const user = await User.findOne({ email });
                if (!user) throw new Error("User not found");
                const isPasswordValid = await bcrypt.compare(password as string, user.password);
                if (!isPasswordValid) throw new Error("Invalid password");
                return user;
            }
        })
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async session({ session, token }) {
            if (token.sub) {
                session.user.id = token.sub;
            }
            return session;
        }
    }
})