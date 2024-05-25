/*
 *  Agregamos Helpers para la logica de negocio de los todos y hacer peticiones a endPoints 
 */

import { Todo } from "@prisma/client";

export const updateTodoApi = async  (id: string, isComplete: boolean ):Promise<Todo> => {
    const payloadBody = { isComplete };

    const todoResponse = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payloadBody),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then( response => response.json());
    
    console.log("🚀 ~ updateTodoApi ~ todoResponse:", todoResponse)
    
    return todoResponse;
};


export const createTodoApi = async ( description: string ): Promise<Todo> => {
    const payloadBody = { description };

    const todoResponse = await fetch(`/api/todos`, {
        method: 'POST',
        body: JSON.stringify(payloadBody),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json());

    console.log("🚀 ~ updateTodoApi ~ todoResponse:", todoResponse);

    return todoResponse;
};