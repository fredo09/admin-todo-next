import prisma from "@/lib/prisma";
import { Metadata } from "next";
import { NewTodo, TodoGrid } from "@/todos";

//* forzar la render dymanic de la page con data que pueda cambiar y contruimos la page y evitamos la cache
export const dynamic = 'force-dynamic';
export const revalidate = 0;

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
            <span className="text-4xl text-black mb-4">Server Actions</span>
            <div className="w-full px-3 mx-5 mb-5 mt-5">
                <NewTodo />
            </div>
            <TodoGrid todos={todos} />
        </div>
    );
}