import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { AuthOptions } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs';
import NextAuth from "next-auth/next";

export const authOptions: AuthOptions = {
    providers: [
      CredentialsProvider({
        name: 'credentials',
            
        credentials: {
          email: {
            label: 'Email',
            type: 'text',
            placeholder: 'your@email.com'
          },
          password: {
            label: 'Password',
            type: 'password'
          }
        },
        authorize: async (credentials) => {
          if(!credentials) {
            return null;
          }

          const { email, password } = credentials;

          const user = {id: ""}   
          
          try {
            await connectMongoDB();
            const user = await User.findOne({ email })
  
            if(!user) {
              return null;
            }
  
            const passwordsMatch = await bcrypt.compare(password, user.password)
  
            if(!passwordsMatch) {
              return null;
            }
  
            return user;
          } catch (error) {
            console.log("Error: ", error)
          }

          return user;
        }
      })
    ],
    pages: {
      signIn: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async session({ session, token }) {
          session.user.id = token.sub || ""
          return session
        },
    }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };