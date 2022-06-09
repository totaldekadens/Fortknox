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

    const setCartListToLS: () => void = () => { 
        if(cartItem) {
            localStorage.setItem('cartItem', JSON.stringify(cartItem));
        }
    }

    useEffect(() => {
        setCartListToLS();
        
    }, [cartItem])


    useEffect(() => {

        const getCart: () => void = () => {
        
            const getCurrentCart = localStorage.getItem('cartItem')
            
            if(getCurrentCart) {
                const CurrentCart = JSON.parse(getCurrentCart)
                setCartItem(CurrentCart)
            } 
            
        }
    
        getCart()

    }, [])




    return (
        <cartContext.Provider value={{ cartItem, setCartItem}}>
            {props.children}
        </cartContext.Provider>
    )
}



export default CartProvider