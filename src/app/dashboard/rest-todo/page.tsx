import prisma from "@/lib/prisma";
import { NewTodo, TodoGrid } from "@/todos";
import { Metadata } from "next";

//* forzar la render dymanic de la page con data que pueda cambiar y contruimos la pagen y evitamos la cache
export const dynamic = 'force-dynamic';
export const revalidate = 0;

//* agergamos metadata
export const metadata: Metadata = {
    title: 'Lista de todos',
    description: 'Ve todos los todos aqui'
};

export default async function RestTodoPage () {

    //* recuperamos todos los todos
    const todos = await prisma.todo.findMany({ orderBy: { description: 'asc' }});
    console.log("🚀 ~ RestTodoPage ~ todos:", todos);

    return (
        <div >
            {/* TODO: AGREGAR EL FORMUALRIO */}
            <div className="w-full px-3 mx-5 mb-5">
                <NewTodo />
            </div>
            
            {/* <Widget /> */}
            <TodoGrid todos={todos}/>
        </div>
    );
}