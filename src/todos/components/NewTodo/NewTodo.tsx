'use client';

import React, { FormEvent, useState } from 'react';
import { IoTrashOutline } from 'react-icons/io5';
//import { useRouter } from 'next/navigation';
//import { createTodoApi, deletetTodoApi } from '@/todos';
import { createTodo, deleteCompleted } from '@/todos/actions/todo-actions';


export const NewTodo = () => {
  const [todoValue, setTodoValue] = useState({
    description: ''
  });

  // const router = useRouter();
  

  //* funcion para envvio de nuevo todo
  const onSubmitTodo = async (event: FormEvent) => {
    const { description } = todoValue;

    event.preventDefault();
    console.log("🚀 ~ NewTodo ~ todoValue:", todoValue);

    if (description.trim().length === 0) return;
    
    //* usando modo apirest
    // const todoCreate = await createTodoApi(description);
    // console.log("🚀 ~ onSubmitTodo ~ todoCreate:", todoCreate)
    
    //* usando server actions para create todo
    await createTodo(description);

    //router.refresh();
    console.log('realizando el eventoon submit');
    setTodoValue({ description: '' });
  };

  const deleteCompleted = async () => {
    // console.log("🚀 ~ deleteCompleted ~ deleteCompleted:"); 

    // const deleteTodo = await deletetTodoApi();
    // console.log("🚀 ~ deleteCompleted ~ deleteTodo:", deleteTodo)

    // * server actions para delete todo
    //await deleteCompleted();

    //router.refresh();
  };

  return (
    <form
      onSubmit={onSubmitTodo}
      className='flex w-full'>
      <input
        onChange={(e) =>  setTodoValue({ description: e.target.value })}
        value={ todoValue.description } 
        type="text"
        className="w-6/12 -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all"
        placeholder="¿Qué necesita ser hecho?" />

      <button type='submit' className="flex items-center justify-center rounded ml-2 bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all">
        Crear
      </button>

      <span className='flex flex-1'></span>

      <button
        onClick={() => deleteCompleted()}
        type='button' className="flex items-center justify-center rounded ml-2 bg-red-400 p-2 text-white hover:bg-red-700 transition-all">
        <IoTrashOutline />
        Delete
      </button>
    </form>
  )
}
