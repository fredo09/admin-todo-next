/**
 * endPoint todos con id de parametro
 */

import prisma from '@/lib/prisma';
import { Todo } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server';
import { putTodoSchema } from '@/utils';  

interface Segments {
    params: {
        id: string
    }
}

export async function GET(request: Request, { params: { id } }: Segments) { 
    const todoDB = await getTodo(id);

    if (!todoDB) {
        return NextResponse.json({
            status: 'OK',
            code: 404,
            message: `No existe el todo con el id: ${id} `,
        }, { status: 404 });
    }

    return NextResponse.json({
        status: 'OK',
        code: 200,
        message: 'Recuperaste el todo con el id recuperado',
        data: {
            todo: todoDB
        } 
    });
}

export async function PUT(request: Request, { params: { id } }: Segments) {
    
    const todoDB = await getTodo(id);

    if (!todoDB) {
        return NextResponse.json({
            status: 'OK',
            code: 404,
            message: `No existe el todo con el id: ${id} `,
        }, { status: 404 });
    }

    try {
        const { isComplete, description } =  await putTodoSchema.validate( await request.json());
        
        const updateTodoDB = await prisma.todo.update({
            where: { id },
            data: { isComplete, description }
        });

        return NextResponse.json({
            status: 'OK',
            code: 201,
            message: 'Todo actualizado',
            data: {
                todo: updateTodoDB
            }
        });
    } catch (err) {
        return NextResponse.json({
            status: 'ERROR',
            code: 400,
            message: `Ocurrio un error al actualizar el todo ${err} `,
        }, { status: 400 });
    }
}


//* -> metodo para recuperar el todo
const getTodo = async (id: string ): Promise<Todo | null> => {
    const todoDB = await prisma.todo.findFirst({ where: { id } }); 
    return todoDB;
}