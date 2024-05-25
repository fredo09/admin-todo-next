/*
 *  Agregamos Helpers para la logica de negocio de los todos y hacer peticiones a endPoints 
 */

import { Todo } from "@prisma/client";

//* agregamos alguna latencia
const sleep = (seconds: number = 0):Promise<boolean> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, seconds *  1000 );
    });
};

export const updateTodoApi = async  (id: string, isComplete: boolean ):Promise<Todo> => {
    const payloadBody = { isComplete };

    // TODO: hacer el server actions
    // algo de ver la actualizacion optimista
    //await sleep(2); 

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


export const deletetTodoApi = async(): Promise<Todo | void> => {

    const todoResponse = await fetch('/api/todos', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json());

    console.log("🚀 ~ deletetTodoApi ~ todoResponse:", todoResponse);
    
    return todoResponse;
}

