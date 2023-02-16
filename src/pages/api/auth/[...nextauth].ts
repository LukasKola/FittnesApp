import NextAuth, { type NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import  CredentialsProvider  from "next-auth/providers/credentials";
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db";
import { User } from "@prisma/client";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  // callbacks: {
  //   session({ session, user }) {
  //     if (session.user) {
  //       session.user.id = user.id;
  //     }
  //     return session;
  //   },
  // },
  pages: {
    signIn: '/login'
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
    // CredentialsProvider({
    //   type: 'credentials',
    //   name: 'Credentials',
    //   credentials: {
    //     email: { label: 'Email', type: 'email', placeholder:'Your Email '},
    //     password: { label: 'password', type: 'password'}
    //   },
    //   async authorize(credentials, req){

    //       const payLoad = {
    //         email: credentials?.email,
    //         password: credentials?.password
    //       }

    //       const user: User = (await prisma.user.findUnique({
    //         where: {
    //           email: payLoad.email
    //         }
    //       })) as User
    //       console.log('in authorize')
    //       if( user.password === (payLoad.password)){
    //         console.log(user)
    //         return user
    //       }
    //       else return null
    //   }
    // })
    /**
     * ...add more providers here
     *
     * Most other providers require a bit more work than the Discord provider.
     * For example, the GitHub provider requires you to add the
     * `refresh_token_expires_in` field to the Account model. Refer to the
     * NextAuth.js docs for the provider you want to use. Example:
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

export default NextAuth(authOptions);
