import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET, // Add this line
  pages: {
    signIn: "/auth/signin", // Custom sign-in page if needed
    error: "/auth/error", // Error page
  },
});

export { handler as GET, handler as POST };
