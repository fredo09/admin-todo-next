'use client';

import React from 'react';
import { Todo } from '@prisma/client';
import { TodoItem } from '@/todos';

interface Props {
    todos?: Todo[]
}

export const TodoGrid = ({ todos = [] }: Props ) => {
    console.log("🚀 ~ TodoGrid ~ todos:", todos);

    return (
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-2'>
            {
                todos.map( todo  => (
                    <TodoItem  key={todo.id} todo={todo} />
                ))
            }
        </div>
    )
}
