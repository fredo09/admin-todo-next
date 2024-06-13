import { Metadata } from "next";


export const metada: Metadata = {
    title: 'Autentificacion',
    description: 'Autentificacion de usuarios'
}


export default async function AuthPage () {
    return(
        <div>
            <h1>Autentificaion 🚀 </h1>
        </div>
    );
}