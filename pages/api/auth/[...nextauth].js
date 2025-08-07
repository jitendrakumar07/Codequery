// ✅ CORRECT for pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const users = [
          { id: 1, name: "Admin", username: "admin", password: "admin", role: "admin" },
          { id: 2, name: "User", username: "user", password: "user", role: "user" }
        ];

        const user = users.find(
          u => u.username === credentials.username && u.password === credentials.password
        );

        if (user) return user;
        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      return session;
    }
  },
  pages: {
    signIn: "/signin" // optional custom sign-in page
  },
  secret: process.env.NEXTAUTH_SECRET || "super-secret"
});
