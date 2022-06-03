import React, { useEffect } from "react"
import { FC, PropsWithChildren, useState } from "react"
import { Product, products } from "../../data/products"

interface Props {}

interface cartContextData {
    cartItem: Product[]
    getCart: () => void
}

export const cartContext = React.createContext<cartContextData>({
    
    cartItem: products,
    getCart: () => {}
})


const CartProvider:  FC<PropsWithChildren<Props>> = (props) => {

    const [cartItem, setCartItem] = useState<Product[]> ([])

    // Updates productList - Vara i useeffect?
    const getCart: () => void = () => {
        
        const getCurrentCart = localStorage.getItem('cartItem')
        
        console.log(getCurrentCart)
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
        <cartContext.Provider value={{ cartItem, getCart}}>
            {props.children}
        </cartContext.Provider>
    )
}



export default CartProvider