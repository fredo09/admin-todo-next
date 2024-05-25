/**
 * endPoint todo pagination
 */

import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';

//Schemas yup
import { postTodoSchema } from '@/utils'

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
}

/**
 * ! usamos yup para validar el tipo de body y ademas lo tratamos con un try-catch para manejar el posible error
 */

export async function POST(request: Request) {
    try {
        const { description, isComplete } =  await postTodoSchema.validate( await request.json() );

        const todoDB = await prisma.todo.create({ data: { description, isComplete } });

        return NextResponse.json({
            status: 'OK',
            code: 200,
            data: {
                todo: todoDB
            },
            message: 'Todo creado'
        });
    } catch(err) {
        return NextResponse.json({
            status: 'ERROR',
            code: 400,
            message: `Ocurrio un error ${err}`
        }, { status: 400 });
    }
}

//* metodo para elimiar todos completado
export async function DELETE(request: Request) {
    try {
        const todoDeleteDB = await prisma.todo.deleteMany({ where: { isComplete: true } })

        if(!todoDeleteDB) {
            return NextResponse.json({
                status: 'ERROR',
                code: 500,
                message: `Ocurrio un error al hacer la operación`
            }, { status: 500 });
        }

        return NextResponse.json({
            status: 'OK',
            code: 200,
            message: `todos eliminados`
        });
    }catch(error) {
        return NextResponse.json({
            status: 'ERROR',
            code: 500,
            message: `Ocurrio un error al hacer la operación ${error}`
        },{ status: 500 })
    };
}