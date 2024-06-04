'use client';

import React from 'react';
import { Todo } from '@prisma/client';
import { TodoItem, updateTodoApi } from '@/todos';
import { useRouter } from 'next/navigation';
import { toggleTodo } from '@/todos/actions';

interface Props {
    todos?: Todo[]
}

export const TodoGrid = ({ todos = [] }: Props ) => {
    console.log("🚀 ~ TodoGrid ~ todos:", todos);

    //* Modo de hacer un reflesh usando cosas de next y no como del modo convencional en react
    //const router = useRouter();

    //* Usando la misma peticion de toggle usando server actions
    

    //* Funcion para actualizar el todo sin useEffect
    //* Usando la peticion de forma ApiRest 
    // const toggleUpdate = async(id: string, isComplete: boolean) => {
    //     const updatedTodo = await updateTodoApi( id, isComplete );
        
    //     router.refresh();
    //     console.log("🚀 ~ toggleUpdate ~ updatedTodo:", updatedTodo);
    //     return updatedTodo;
    // };

    return (
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-2'>
            {
                todos.map( todo => (
                    <TodoItem 
                        key={ todo.id } 
                        todo={ todo } 
                        toogleUpdate={ toggleTodo } />
                ))
            }
        </div>
    )
}
