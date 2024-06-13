/**
 * endPoint Seed
 */

import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server'
import bcrypt from 'bcryptjs';

//TODO: crear conexion a DB y insertar algunos datos 🔁 

export async function GET(request: Request) { 
    //! sentencia es lo mismo que hacer un "delete * from todo"
    await prisma.todo.deleteMany(); 
    await prisma.user.deleteMany();

    const user = await prisma.user.create({
        data: {
            email: 'email1@gmail.com',
            password: bcrypt.hashSync('123456'),
            roles: ['admin', 'client', 'super-user'],
            todos: {
                create: [
                    { description: 'Prieda del alma', isComplete: true },
                    { description: 'Prieda del realidad' },   
                    { description: 'Prieda del poder' },
                    { description: 'Prieda del espacio', isComplete: true },
                    { description: 'Prieda del realidad' },     
                    { description: 'Prieda del tiempo', isComplete: true },
                ]
            }
        }
    })
    

    // await prisma.todo.createMany({
    //     data: [
    //         { description: 'Prieda del alma', isComplete: true },
    //         { description: 'Prieda del realidad' },
    //         { description: 'Prieda del poder' },
    //         { description: 'Prieda del espacio' },
    //         { description: 'Prieda del realidad' },
    //         { description: 'Prieda del tiempo' },
    //     ]
    // });

    return NextResponse.json({
        message: 'oki Seed created'
    });
}

 //* como hacer una insersion a la base de datos con prisma 
    // const todoDB = await prisma.todo.create({
    //     data: {
    //         description: 'Prieda del alma',
    //         isComplete: true
    //     }
    // });
    
    // console.log("🚀 ~ GET ~ todoDB:", todoDB);