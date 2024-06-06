import { Metadata } from "next";
import { Product, products } from "@/products/data";
import { cookies } from "next/headers";
import { ItemCard } from "@/shopping-cart/components";

export const metadata:Metadata = {
    title: "Carrito de compras",
    description:"Contenido del carrito de compras"
}

interface ProductsCart {
    product: Product,
    quantity: number
}

const getProductsCart = (cart: { [id: string]: number }): ProductsCart[] => {
    const productsInCart: ProductsCart[] = [];

    for (const id of Object.keys(cart) ){
        const product = products.find( prod => prod.id === id );
        if (product) {
            productsInCart.push({ product, quantity: cart[id] })
        }
    }

    return productsInCart;
};

export default async function CartPage () {

    const cookieStore = cookies();
    const cartCokkie = JSON.parse( cookieStore.get('cart')?.value ?? '{}' ) as { [id: string]: number };

    const itemsInCart = getProductsCart(cartCokkie);
    console.log("🚀 ~ CartPage ~ itemsInCart:", itemsInCart)

    return (
        <div className="bg-white p-4 rounded">
            <h1 className="text-5xl"> Productos en el carrito </h1>
            <hr className="mb-2"></hr>

            <div className="flex flex-cols sm:flex-row gap-2 w-full">
                <div className="flex flex-col gap-2 w-full sm:w-8/12">
                    {
                        itemsInCart.map(({ product, quantity }) => (
                            <ItemCard 
                                key={product.id}
                                product={product}
                                quantity={quantity}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}