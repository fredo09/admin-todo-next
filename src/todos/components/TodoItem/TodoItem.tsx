'use client';

import React, { startTransition, useOptimistic } from 'react';
import { Todo } from '@prisma/client';
import { IoCheckboxOutline, IoSquareOutline } from 'react-icons/io5';

import style from './TodoItem.module.css';

interface Props {
    todo: Todo,
    // TODO: acciones que tendra el componente
    toogleUpdate: (id: string, isComplete: boolean) => Promise<Todo | void> 
}

export const TodoItem = ({ todo, toogleUpdate } : Props) => {


    //* create useOptimistic para todo 

    const [todoOptimistic, callBackTodoOptimistic ] = useOptimistic(
        todo, // -> state
        (state, newCompleteValue: boolean) => ({ ...state, isComplete: newCompleteValue }) // -> callback
    );

    const onToggleTodo = async () => {
        try{
            
            startTransition(() => callBackTodoOptimistic( !todoOptimistic.isComplete ));

            await toogleUpdate(todoOptimistic.id, !todoOptimistic.isComplete);
        }catch(error){
            startTransition( () => callBackTodoOptimistic( !todoOptimistic.isComplete ));
        }
    }

  return (
    <div className={ todo.isComplete ? style.todoDone : style.todoPending } >
        <div className='flex flex-col sm:flex-row justify-start items-center gap-4'>
            <div
                // onClick={() => toogleUpdate( todo.id, !todo.isComplete )}
                onClick={ onToggleTodo } //-> useOptimistic
                className={`
                    flex p-2 rounded-md cursor-pointer
                    hover:bg-opacity-60
                    ${ todo.isComplete ? 'bg-blue-100' : 'bg-red-100' }
                `}>
                    {
                        todo.isComplete
                        ? (<IoCheckboxOutline size={30} />) 
                        : ( <IoSquareOutline size={30} /> )
                    }
            </div>

            <div className='text-center sm:text-left'>
                { todo.description }
            </div>
        </div>
    </div>
  )
}
