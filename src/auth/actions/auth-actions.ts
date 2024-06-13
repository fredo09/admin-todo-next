/**
 * Actions para autentificacion con credenciales "password y email" con auth.js
 */

import prisma from "@/lib/prisma";
import bcrypt from 'bcryptjs';

export const signInWitEmailAndPassowrd = async (email: string, password: string) => {
    if ( !email || !password ) return null;

    const userDB = await prisma.user.findUnique({ where: { email } });


    //* validamos usuario creado
    if ( !userDB ) {
        return  await createNewUser( email, password );
    }

    //* validamos contraseña
    if ( !bcrypt.compareSync(password, userDB.password ?? '') ) {
        return null; //* -> regresamos null cuando el password no coincide
    }

    return userDB;
};


const createNewUser = async (email: string, password: string) => {
    const newUser = prisma.user.create({
        data: {
            email,
            password: bcrypt.hashSync(password),
            name: email.split('@')[0]
        }
    });

    return newUser;
}