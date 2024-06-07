/**
 * Auth login api serve
 */

import prisma from '@/lib/prisma';
import NextAuth, { NextAuthOptions } from 'next-auth';
import { Adapter } from 'next-auth/adapters';
import { PrismaAdapter } from "@auth/prisma-adapter"
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions:NextAuthOptions = {
    //* Configuracion de apatador para prisma
    adapter: PrismaAdapter(prisma) as Adapter,
    providers: [
        GoogleProvider({
            clientId: process.env.AUTH_GOOGLE_ID ?? '',
            clientSecret: process.env.AUTH_GOGGLE_SECRET ?? ''
        }),
        GithubProvider({
            clientId: process.env.AUTH_GITHUB_ID ?? '',
            clientSecret: process.env.AUTH_GITHUB_SECRET ?? ''
        }),
    ]
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; 

