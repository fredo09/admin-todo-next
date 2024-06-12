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
    ],
    //* Algunas configurariones extras acerca de la sesion
    session: {
        strategy: 'jwt' // * -> configurarion con jwt
    },
    callbacks:{ 
        //* funciones que se ejecutan despues de hacer la sesion mediante los providers
        async signIn({ user, account, profile, email, credentials }) {
            // * ... agrega nueva configuracion
            return true;
        },
        async jwt({ token, user, account, profile }){
            // * ... agrega nueva configuracion
            const dbUser = await prisma.user.findUnique({ where: { email: token.email ?? 'no-email' } });

            //* preguntamos si el usuario no esta activo
            if ( dbUser?.isActive === false){
                throw Error ('El usuario no esta activo');
            }

            token.roles = dbUser?.roles ?? ['no-role'];
            token.id = dbUser?.id ?? 'no-id'

            return token;
        },
        async session({ session, token, user }) {
            // * ... agrega nueva configuracion
            console.log({ token })

            if ( session && session.user){
                session.user.roles = token.roles;
                session.user.id = token.id;
            }
            return session;
        }
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; 

