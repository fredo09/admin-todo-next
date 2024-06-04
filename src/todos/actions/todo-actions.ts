/*
*  Server actions todo 
*/
'use server';

import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import { revalidatePath } from "next/cache";

//* agregamos alguna latencia
const sleepTodo = (seconds: number = 0): Promise<boolean> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("🚀 ~ setTimeout ~ resolve: ");
            resolve(true);
        }, seconds * 1000);
    });
};


export const toggleTodo = async( id: string, isComplete: boolean): Promise<Todo> => {
    //sleep
    await sleepTodo(3);

    const todoDB = await prisma.todo.findFirst({ where: { id } });

    if (!todoDB) {
        throw new Error(`No exite el id: ${id}`);
    }

    const updateTodo = await prisma.todo.update({ 
        where: { id },
        data: { isComplete }
    });

    //* despues de jecutar lo importante en el sever actions ejecutar esta funcion para revalidar el componente y actualizar
    revalidatePath('/dashboard/server-actions');

    return updateTodo;
};

export const createTodo = async( description: string ) => {
    try {
        //const { description, isComplete } = await postTodoSchema.validate(await request.json());
        const todoDB = await prisma.todo.create({ data: { description } });

        revalidatePath('/dashboard/server-actions');

        return {
            status: 'OK',
            code: 200,
            data: {
                todo: todoDB
            },
            message: 'Todo creado'
        };
    } catch (err) {
        return {
            status: 'ERROR',
            code: 400,
            message: `Ocurrio un error ${err}`,
            data: {
                todo: null
            }
        };
    }
};


export const deleteCompleted = async() => {
    try {
        const todoDeleteDB = await prisma.todo.deleteMany({ where: { isComplete: true } })

        if (!todoDeleteDB) {
            return {
                status: 'ERROR',
                code: 500,
                message: `Ocurrio un error al hacer la operación`
            };
        }

        revalidatePath('/dashboard/server-actions');

        return {
            status: 'OK',
            code: 200,
            message: `todos eliminados`
        };
    } catch (error) {
        return {
            status: 'ERROR',
            code: 500,
            message: `Ocurrio un error al hacer la operación ${error}`
        }
    };
};