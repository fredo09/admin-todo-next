import prisma from "@/lib/prisma";
import { Metadata } from "next";
import { NewTodo, TodoGrid } from "@/todos";


export const metadata: Metadata = {
    title: "server Actions",
    description: "aprender server actions y use Optimistic de react"
}

export default async function ServerActionsPage() {
    //* recuperamos todos los todos
    const todos = await prisma.todo.findMany({ orderBy: { description: 'asc' } });
    console.log("🚀 ~ RestTodoPage ~ todos:", todos);

    return (
        <div>
            <h1 className="text-4xl text-black mb-4">Server Actions</h1>
            {/* TODO: AGREGAR EL FORMUALRIO */}
            <div className="w-full px-3 mx-5 mb-5">
                <NewTodo />
            </div>

            {/* <Widget /> */}
            <TodoGrid todos={todos} />
        </div>
    );
}