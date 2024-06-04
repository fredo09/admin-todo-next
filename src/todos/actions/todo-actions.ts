/*
*  Server actions todo 
*/
'use server';

import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import { revalidatePath } from "next/cache";


export const toggleTodo = async( id: string, isComplete: boolean): Promise<Todo> => {
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
}