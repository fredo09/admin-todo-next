import { Metadata } from "next";
import { Product, products } from "@/products/data";
import { cookies } from "next/headers";
import { ItemCard } from "@/shopping-cart/components";
import { Widget } from "@/components";

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
    console.log("🚀 ~ CartPage ~ itemsInCart:", itemsInCart);

    //Total items cart
    const totalToPay = itemsInCart.reduce(  (prev, current) => (current.product.price * current.quantity) + prev , 0)
    console.log("🚀 ~ CartPage ~ totalToPay:", totalToPay);

    return (
        <div className="bg-white p-4 rounded">
            <h1 className="text-5xl"> Productos en el carrito </h1>
            <hr className="mb-2"></hr>

            <div className="flex flex-col sm:flex-row gap-2 w-full">
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
                <div className="flex flex-col w-full sm:w-4/12">
                    <Widget title="Total a pagar">
                        <div className="mt-2 flex justify-center gap-4">
                            <h3 className="text-3xl font-bold text-gray-700">$ {(totalToPay * 1.15).toFixed(2)}</h3>
                        </div>
                        <span className="font-bold text-center ">Impuesto 15%: ${(totalToPay * 0.15).toFixed(2)} </span>
                    </Widget>
                </div>
            </div>
        </div>
    );
}