import prisma from "@/lib/prisma";
import { TodoGrid } from "@/todos";
import { Metadata } from "next";



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
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* TODO: AGREGAR EL FORMUALRIO */}
            {/* <Widget /> */}
            <TodoGrid todos={todos}/>
        </div>
    );
}