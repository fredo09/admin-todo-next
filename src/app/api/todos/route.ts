/**
 * endPoint todo pagination
 */

import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: Request) {

    const { searchParams } = new URL(request.url)
    const take = Number(searchParams.get('take')) ?? '10';
    const skip = Number(searchParams.get('skip')) ?? '0';

    if ( isNaN(take) || isNaN(skip) ) {
        return NextResponse.json({
            status: 'ERROR',
            code: 400,
            message: 'Take o skip tiene que ser un numero'
        },{ status: 400 });
    }

    // TODO: recuperamos todos los todos y agregamos una paginación
    //* -> al usar el + antes de una variable de tipo string lo combiente a numero
    const todosDB = await prisma.todo.findMany({ take, skip });
    console.log("🚀 ~ GET ~ todosDB:", todosDB);

    return NextResponse.json({
        status: 'OK',
        code: 200,
        data: {
            todos: todosDB
        },
        message: 'Recuperaste todos los todos'
    });
};