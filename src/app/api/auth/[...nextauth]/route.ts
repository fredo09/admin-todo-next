/**
 * Auth login api serve
 */

import NextAuth, { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

export const authOptions:NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.AUTH_GITHUB_ID ?? '',
            clientSecret: process.env.AUTH_GITHUB_SECRET ?? ''
        })
    ]
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; 

