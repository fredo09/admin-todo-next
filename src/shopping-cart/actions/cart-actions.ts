/*
*   Actions Shopping cart
*/

import { getCookie, hasCookie, setCookie } from "cookies-next";

//! estructira de shopping-cart
/*
  {
    "uid-12-1":1
    "uid-12-1321":5
    "uid-12-112":6
  } 
 */


/**
 * @description obtenemos la cookie del carrito de compras
 * @returns CookieCart {}
 */
export const getCookieCart = (): { [id: string]: number } => {

    if(hasCookie('cart')){
        //... logic for cookie card 🛍 
        const cartCoookie = JSON.parse( getCookie('cart') as string ?? '{}' );
        return cartCoookie;
    }

    return {};
};


/**
 * @description agregamos el producto a la cookie del carrito
 * @param id {String} recibe el id del producto
 */
export const addCookieProductCart = (id: string) => {
    console.log("🚀 ~ addCookieProductCart ~ id:", id)
    
    const cookieCart = getCookieCart();
    
    if(cookieCart[id]) {
        cookieCart[id] = cookieCart[id] + 1;
    } else {
        cookieCart[id] = 1
    }

    setCookie('cart', JSON.stringify(cookieCart)); 
};


/**
 * @description actions for delete items of shopping cart
 * @param id item cart
 */
export const deleteProductCart = (id: string) => {
    const cookieCart = getCookieCart();

    delete cookieCart[id];

    setCookie('cart', JSON.stringify(cookieCart));
};

