import React, { useEffect } from "react"
import { FC, PropsWithChildren, useState } from "react"
import { CartProduct, Product, products } from "../../data/products"

interface Props {}

interface cartContextData {
    cartItem: CartProduct | undefined
    setCartItem: React.Dispatch<React.SetStateAction<CartProduct | undefined>>
}

export const cartContext = React.createContext<cartContextData>({
    
    cartItem: undefined,
    setCartItem: () => {}
})


const CartProvider:  FC<PropsWithChildren<Props>> = (props) => {

    const [cartItem, setCartItem] = useState<CartProduct | undefined> ()

    // Updates productList - Vara i useeffect?
    const getCart: () => void = () => {
        
        const getCurrentCart = localStorage.getItem('cartItem')
        
        if(!getCurrentCart) {
            localStorage.setItem("cartItem",JSON.stringify(cartItem))
        } 
        else {
            const cart = JSON.parse(getCurrentCart)
            setCartItem(cart)
        }
    }
   


    useEffect(() => {

        getCart()

    }, [])




    return (
        <cartContext.Provider value={{ cartItem, setCartItem}}>
            {props.children}
        </cartContext.Provider>
    )
}



export default CartProvider