import { Metadata } from "next";


export const metada:Metadata = {
    title: "productos",
    description: "Productos a la vista"
}


export default async function ProductsPage() {
    return(
        <div>
            <h1>Hola productos 🚀</h1>
        </div>
    );
}