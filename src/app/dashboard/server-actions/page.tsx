import prisma from "@/lib/prisma";
import { Metadata } from "next";
import { NewTodo, TodoGrid } from "@/todos";
import { getSessionUserServer } from "@/auth";
import { redirect } from "next/navigation";

//* forzar la render dymanic de la page con data que pueda cambiar y contruimos la page y evitamos la cache
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
    title: "server Actions",
    description: "aprender server actions y use Optimistic de react"
}

export default async function ServerActionsPage() {

    //* recuperamos el userSession
    const currentSession = await getSessionUserServer();

    //! si no hay usuario redireccionamos al signin
    if( !currentSession ) redirect('/api/auth/signin');

    //* recuperamos todos los todos
    const todos = await prisma.todo.findMany({ 
        orderBy: { description: 'asc' },
        where: { userId: currentSession.id }
    });
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