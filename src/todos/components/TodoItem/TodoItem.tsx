import React from 'react';
import { Todo } from '@prisma/client';
import { IoCheckboxOutline, IoSquareOutline } from 'react-icons/io5';

import style from './TodoItem.module.css';

interface Props {
    todo: Todo
    // TODO: acciones que tendra el componente 
}

export const TodoItem = ({ todo } : Props) => {
  return (
    <div className={ todo.isComplete ? style.todoDone : style.todoPending } >
        <div className='flex flex-col sm:flex-row justify-start items-center gap-4'>
            <div 
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
