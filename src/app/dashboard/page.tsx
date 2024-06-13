import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Widget } from "@/components";

//* importaciones sobre la sesion con nextAuth -> Auth.js
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export const metadata:Metadata = {
    title: 'Dashboard',
    description: 'Dashboard inicial'
}

export default async function DashboardPage () {

    //* Obteniendo la sesion del lado del Server Side
    const UserSession = await getServerSession(authOptions);
    console.log("🚀 ~ DashboardPage ~ UserSession:", UserSession)

    if (!UserSession) {
        redirect('/api/auth/signin');
    }

    return (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
            <h1 className="text-4xl">HOLA DAHSBOARD 🚀 </h1>
            <Widget title="Usuario Conectado">
                <h1>Usuario conectado y Obtenido desde el server</h1>
            </Widget>
        </div>
    );
}
