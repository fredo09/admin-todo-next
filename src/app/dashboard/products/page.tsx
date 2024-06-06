import { Metadata } from "next";
import { ProductsCard } from "@/products/components";
import { products } from "@/products/data/products";


export const metada:Metadata = {
    title: "productos",
    description: "Productos a la vista"
}


export default async function ProductsPage() {
    return(
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {/* ProductCard */}
            {
                products.map( product  => (
                    <ProductsCard 
                        key={product.id}
                        {...product}
                    />  
                )) 
            }
        </div>
    );
}